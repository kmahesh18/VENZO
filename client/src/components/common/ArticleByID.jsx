import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdRestore } from "react-icons/md";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { getBaseUrl } from '../../utils/config';
import toast, { Toaster } from 'react-hot-toast';

function ArticleByID() {
  const { state } = useLocation();
  const { currentUser } = useContext(userAuthorContextObj);
  const { register, handleSubmit, reset } = useForm();
  const [editArticleStatus, setEditArticleStatus] = useState(false);
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [currentArticle, setCurrentArticle] = useState(state);
  const [commentStatus, setCommentStatus] = useState("");
  // console.log(state);

  //enable edit of article
  function enableEdit() {
    setEditArticleStatus(true);
  }

  //to save modified article
  async function onSave(modifiedArticle) {
    const articleAfterChanges = { ...state, ...modifiedArticle };
    const token = await getToken();
    const currentDate = new Date();
    //change date of mofification
    articleAfterChanges.dateOfModification =
      currentDate.getDate() +
      "-" +
      currentDate.getMonth() +
      "-" +
      currentDate.getFullYear();
    console.log(articleAfterChanges);

    //make http post request
    let res = await axios.put(
      `${getBaseUrl()}/author-api/article/${articleAfterChanges.articleId}`,
      articleAfterChanges,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.message === "article modified") {
      //change edit article status to false
      setEditArticleStatus(false);
      navigate(`/author-profile/articles/${state.articleId}`, {
        state: res.data.payload,
      });
    }

    // console.log(modifiedArticle);
  }

  //add comment by user
  async function addComment(commentObj) {
    try {
      if (!commentObj.comment?.trim()) {
        toast.error('Comment cannot be empty');
        return;
      }

      // Get current date and time
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });

      // Prepare comment object
      const enrichedCommentObj = {
        commentId: `comment-${Date.now()}`,
        comment: commentObj.comment.trim(),
        nameOfUser: currentUser.firstName,
        userImage: currentUser.profileImageUrl,
        timestamp: {
          date: formattedDate,
          time: formattedTime
        }
      };
      
      // Make API request
      const res = await axios.put(
        `${getBaseUrl()}/user-api/comment/${currentArticle.articleId}`,
        enrichedCommentObj
      );
      
      if (res.data.message === "comment added") {
        // Update local state with new comment
        const updatedArticle = res.data.payload;
        setCurrentArticle(updatedArticle);
        
        // Update parent state
        state.comments = updatedArticle.comments;
        
        // Show success notification
        toast.success('Comment posted successfully!', {
          duration: 3000,
          position: 'top-center',
        });
        
        // Clear form
        reset();
        
        // Scroll to new comment
        const commentList = document.querySelector('.comment-list');
        if (commentList) {
          commentList.scrollTop = commentList.scrollHeight;
        }
      }
    } catch (error) {
      console.error('Comment error:', error);
      toast.error(error.response?.data?.message || 'Failed to post comment. Please try again.', {
        duration: 3000,
        position: 'top-center',
      });
    }
  }

  //delete article
  async function deleteArticle() {
    state.isArticleActive = false;

    let res = await axios.put(
      `${getBaseUrl()}/author-api/articles/${state.articleId}`,
      state
    );
    if (res.data.message === "article deleted or restored") {
      setCurrentArticle(res.data.payload);
    }
  }

  //restore article
  async function restoreArticle() {
    state.isArticleActive = true;
    let res = await axios.put(
      `${getBaseUrl()}/author-api/articles/${state.articleId}`,
      state
    );
    if (res.data.message === "article deleted or restored") {
      setCurrentArticle(res.data.payload);
    }
  }

  // Add this function to check if current user is the article author
  const isArticleAuthor = () => {
    return currentUser.email === state.authorData.email;
  };

  return (
    <div className="article-container">
      <Toaster />
      {editArticleStatus === false ? (
        <>
          <div className="article-header-section">
            <div className="article-title-section">
              <h1>{state.title}</h1>
              <div className="article-meta-info">
                <span>Created on: {state.dateOfCreation}</span>
                <span>Modified on: {state.dateOfModification}</span>
                <div className="author-info">
                  <img
                    src={state.authorData.profileImageUrl}
                    alt={state.authorData.nameOfAuthor}
                    className="author-avatar"
                  />
                  <span>{state.authorData.nameOfAuthor}</span>
                </div>
              </div>
            </div>
            
            {/* Modify this condition to check if user is the article author */}
            {currentUser.role === "author" && isArticleAuthor() && (
              <div className="article-actions">
                <button className="action-btn edit-btn" onClick={enableEdit}>
                  <FaEdit />
                </button>
                {state.isArticleActive ? (
                  <button className="action-btn delete-btn" onClick={deleteArticle}>
                    <MdDelete />
                  </button>
                ) : (
                  <button className="action-btn restore-btn" onClick={restoreArticle}>
                    <MdRestore />
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="article-content">
            <p>{state.content}</p>
          </div>

          <div className="comments-section">
            <div className="comments-header">
              <h3>Comments ({currentArticle.comments.length})</h3>
            </div>
            
            <div className="comment-list">
              {currentArticle.comments.length === 0 ? (
                <p className="text-center text-secondary">No comments yet</p>
              ) : (
                currentArticle.comments.map((commentObj) => (
                  <div key={commentObj.commentId} className="comment-item">
                    <img
                      src={commentObj.userImage || state.authorData.profileImageUrl}
                      alt=""
                      className="comment-avatar"
                    />
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-username">{commentObj.nameOfUser}</span>
                        <span className="comment-time">
                          {commentObj.timestamp ? 
                            `${commentObj.timestamp.date} at ${commentObj.timestamp.time}` : 
                            'Just now'}
                        </span>
                      </div>
                      <p className="comment-text">{commentObj.comment}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {currentUser.role === "user" && (
              <form onSubmit={handleSubmit(addComment)} className="comment-form">
                <input
                  type="text"
                  {...register("comment", { 
                    required: "Comment cannot be empty",
                    minLength: {
                      value: 3,
                      message: "Comment must be at least 3 characters"
                    }
                  })}
                  className="comment-input"
                  placeholder="Add a comment..."
                />
                <button type="submit" className="comment-submit">
                  Post
                </button>
              </form>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Only show edit form if user is the article author */}
          {isArticleAuthor() ? (
            <form onSubmit={handleSubmit(onSave)}>
              <div className="mb-4">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  defaultValue={state.title}
                  {...register("title")}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="category" className="form-label">
                  Select a category
                </label>
                <select
                  {...register("category")}
                  id="category"
                  className="form-select"
                  defaultValue={state.category}
                >
                  <option value="programming">Programming</option>
                  <option value="AI&ML">AI&ML</option>
                  <option value="database">Database</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <textarea
                  {...register("content")}
                  className="form-control"
                  id="content"
                  rows="10"
                  defaultValue={state.content}
                ></textarea>
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="alert alert-danger">
              You are not authorized to edit this article
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ArticleByID;
