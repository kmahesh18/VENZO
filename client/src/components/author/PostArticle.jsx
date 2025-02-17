import React from "react";
import { useForm } from "react-hook-form";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from '../../utils/config';

function PostArticle() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { currentUser } = useContext(userAuthorContextObj);

  async function postArticle(articleObj) {
    console.log(articleObj);
    //create article object as per article schema
    const authorData = {
      nameOfAuthor: currentUser.firstName,
      email: currentUser.email,
      profileImageUrl: currentUser.profileImageUrl,
    };
    articleObj.authorData = authorData;

    //article id(timestamp)
    articleObj.articleId = Date.now();

    //add date of creation and modification
    let currentDate = new Date();
    articleObj.dateOfCreation =
      currentDate.getDate() +
      "-" +
      currentDate.getMonth() +
      "-" +
      currentDate.getFullYear() +
      " " +
      currentDate.toLocaleTimeString("en-US", { hour12: true });

    articleObj.dateOfModification =
      currentDate.getDate() +
      "-" +
      currentDate.getMonth() +
      "-" +
      currentDate.getFullYear() +
      " " +
      currentDate.toLocaleTimeString("en-US", { hour12: true });

    //add comments array
    articleObj.comments = [];
    //add article active state
    articleObj.isArticleActive = true;
    console.log(articleObj);

    //make HTTP POST req to create new article in backend

    let res = await axios.post(
      `${getBaseUrl()}/author-api/article`,
      articleObj
    );
    if (res.status === 201) {
      //navigate to articles component
      navigate(`/author-profile/${currentUser.email}/articles`);
    } else {
      //set error
    }
  }
  return (
    <div className="post-article-container">
      <div className="post-article-card">
        <div className="post-article-header">
          <h2>Write an Article</h2>
        </div>
        <div className="post-article-body">
          <form onSubmit={handleSubmit(postArticle)}>
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="form-input"
                {...register("title")}
                placeholder="Enter article title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Select a category
              </label>
              <select
                {...register("category")}
                id="category"
                className="form-select"
                defaultValue=""
              >
                <option value="" disabled>
                  --categories--
                </option>
                <option value="programming">Programming</option>
                <option value="AI&ML">AI&ML</option>
                <option value="database">Database</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                {...register("content")}
                id="content"
                className="form-textarea"
                placeholder="Write your article content here..."
              ></textarea>
            </div>

            <div className="text-end">
              <button type="submit" className="add-article-btn">
                Post Article
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostArticle;
