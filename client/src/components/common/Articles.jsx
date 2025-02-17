import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";
import { FiPlus } from 'react-icons/fi';
import { getBaseUrl } from '../../utils/config';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();
  const [selection, setSelection] = useState("");
  const selectedCategory = watch("category");
  const { currentUser } = useAuth();

  //get all articles
  async function getArticles() {
    //get jwt token
    const token = await getToken();
    //make authenticated request
    let res = await axios.get(`${getBaseUrl()}/author-api/articles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.message === "articles") {
      setArticles(res.data.payload);
      setError("");
    } else {
      setError(res.data.message);
    }
  }

  //go to article by id
  function goToArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  }

  useEffect(() => {
    getArticles();
  }, []);
  console.log(articles);

  //filter
  // useEffect(() => {
  //   if (selectedCategory) {
  //     console.log("Category changed to:", selection);
  //   }
  // }, [selectedCategory]);

  return (
    <div className="container">
      <div>
        {error.length !== 0 && (
          <p className="display-4 text-center mt-5 text-danger">{error}</p>
        )}
        <div className="filter-section">
          <select
            {...register("category")}
            defaultValue=""
          >
            <option value="All">All Categories</option>
            <option value="programming">Programming</option>
            <option value="AI&ML">AI & Machine Learning</option>
            <option value="database">Database</option>
          </select>
        </div>
        <div className="article-grid">
          {articles.map(
            (articleObj) =>
              (selectedCategory === "All" ||
                articleObj.category === selectedCategory) && (
                <div className="col g-4 article-card" key={articleObj.articleId}>
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="author-details text-end">
                        <img
                          src={articleObj.authorData.profileImageUrl}
                          alt="ProfileImage"
                          width="40px"
                          className="rounded-circle"
                        />
                        <p>
                          <small className="text-secondary">
                            {articleObj.authorData.nameOfAuthor}
                          </small>
                        </p>
                      </div>
                      <h5 className="card-title">{articleObj.title}</h5>
                      <p className="card-context">
                        {articleObj.content.substring(0, 80) + "....."}
                      </p>
                      <button
                        className="custom-btn btn-4"
                        onClick={() => goToArticleById(articleObj)}
                      >
                        Read more
                      </button>
                    </div>
                    <div className="card-footer">
                        Last updated on {articleObj.dateOfModification}
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      {currentUser?.role === 'author' && (
        <button 
          className="new-article-btn"
          onClick={() => navigate('/post-article')}
          title="Write new article"
        >
          <FiPlus />
        </button>
      )}
    </div>
  );
}

export default Articles;
