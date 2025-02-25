import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import article from "../assets/icons/article.png";
import feather from "../assets/icons/feather.png";
import loadMoreImg from "../assets/icons/reload.png";
import { useNavigate } from "react-router-dom";

function createArticleCards(articles) {
    return articles.map(function (article) { return <ArticleCard infos={article} /> });
}

function Feed({ articles, maxArticlesPerPage, setArticles, isProfile }) {
    const navigate = new useNavigate();
    const [max, setMax] = useState(maxArticlesPerPage);

    const handleLoadMore = () => {
        setMax(max + maxArticlesPerPage);
    }

    useEffect(() => {
        const fetchArticles = async () => {
            var result = await fetch(`http://localhost:5000/articles/-${max}`, { credentials: "include" });
            if (result.status === 401 || result.status === 403) {
                const data = await fetch("http://localhost:5000/refresh", { credentials: "include" });
                if (data.status === 401 || data.status === 403) {
                    navigate("/login");
                } else {
                    navigate("/home");
                }
            } else {
                if (result.status === 200) {
                    result.json().then(json => {
                        setArticles(json.articles);
                    });
                } else {
                    navigate("/E404");
                }
            }
        };

        if (max > maxArticlesPerPage) fetchArticles();
    }, [max]);


    return (
        <div className="col-span-5" >
            <div className="pb-4 border-b-2 border-feed-border flex flex-row justify-between items-center">
                <div className="flex flex-row items-center justify-start gap-4">
                    <img src={article} alt="articles" className="h-5 w-5" />
                    <h2 className="font-semibold text-big-title text-white">Articles</h2>
                </div>
                {!isProfile && <button className="flex flex-row items-center justify-center gap-2 border border-white py-2 px-4 rounded-md" onClick={() => navigate("/write_article")}>
                    <img src={feather} alt="write" className="h-4 w-4" />
                    <span className="text-white font-medium text-base">write</span>
                </button>}
            </div>
            <div className="flex flex-col justify-start items-strech">
                <div>
                    {createArticleCards(articles)}
                </div>
                {articles.length === max &&
                    <button className="mt-8 flex flex-row items-center justify-center gap-4 border-2 px-4 py-2 rounded-md border-feed-border bg-load-more" onClick={handleLoadMore}>
                        <img className="h-4 w-4 opacity-70" src={loadMoreImg} alt="load more" />
                        <span className="text-description font-semibold">Load more..</span>
                    </button>
                }
            </div>
        </div>
    );
}

export default Feed;