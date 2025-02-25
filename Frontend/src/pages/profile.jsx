import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import AnimatedBg from "../components/AnimatedBg";
import filterIcon from "../assets/icons/filter.png";
import searchIcon from '../assets/icons/search.png'
import Contacts from "../components/Contacts";
import Feed from "../components/Feed";
import Footer from "../components/Footer";
import "../styles/pages/feed.css";
import { useNavigate } from "react-router-dom";
import SmoothScroll from "../components/SmoothScroll";
import SearchBar from "../components/SearchBar";



function Profile() {
    const [articles, setArticles] = useState([]);
    const [profile, setProfile] = useState();
    const [prevProfile, setPrevProfile] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            var result = await fetch("http://localhost:5000/articles/mine", { credentials: "include" });
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
                        setProfile({ id: json.userId });
                    });
                } else {
                    navigate("/E404");
                }
            }
        };

        fetchArticles();

    }, []);

    useEffect(() => {
        const fetchProfile = (async () => {
            setPrevProfile(profile);
            const result = await fetch(`http://localhost:5000/user/${profile.id}`, { credentials: "include" });
            result.json().then(data => {
                setProfile(prevalue => prevalue = { ...prevalue, ...data }); localStorage.setItem('userInfo', JSON.stringify(profile)); document.title = profile.fullname;
                ;
            });
        });
        if (JSON.stringify(profile) != JSON.stringify(prevProfile)) fetchProfile();
    }, [profile]);

    return (
        <>
            {articles && profile?.fullname ?
                <div id="feed" className="bg-gradient-to-b from-page-light-dark to-page-dark relative">
                    <AnimatedBg />
                    <div className="relative z-10">
                        <NavBar profile={profile} />
                        <SmoothScroll />
                        <div className="px-20 flex flex-row gap-4 items-center justify-start mt-4 mb-24">
                            <img src={profile?.img ? profile.img : ""} alt="profile" className="rounded-full h-[150px] w-[150px] object-cover p-0 m-0" />
                            <div className="flex flex-col items-start justify-end">
                                <span className="text-big-title text-white font-bold mb-2">{profile.fullname}</span>
                                <span className="text-subtitle text-sm font-semibold">bio</span>
                                <span className="text-white text-sm w-1/2 mb-2">{profile.bio}</span>
                                <span className="text-small-subtitle text-description font-semibold text-center w-full">{profile.likes} likes, {profile.publications} publications</span>
                            </div>
                        </div>
                        <div className="px-20 grid grid-cols-8 grid-rows-1 gap-8 mt-4 mb-8">
                            <div></div>
                            <div className="col-span-5">
                                <SearchBar />
                            </div>
                            <div className="col-span-2"></div>
                        </div>
                        <div className="px-20 grid grid-cols-8 grid-rows-1 gap-8 mt-4 mb-16">
                            <div></div>
                            <Feed articles={articles} isProfile={true} />
                            <div className="col-span-2 h-full w-full relative">
                                <Contacts userId={profile.id} />
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div > : <span>loading...</span>
            }
        </>

    );
}

export default Profile