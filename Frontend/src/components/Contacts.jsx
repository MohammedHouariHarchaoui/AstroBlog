import React, { useState, useEffect } from "react";
import suggestionsIcon from "../assets/icons/link.png";
import communityImg from "../assets/images/community.jpg";
import communitiesIcon from "../assets/icons/group.png";

function Contacts() {
    const [suggestions, setSuggestions] = useState([
        {
            img: communityImg,
            name: "IoT community",
            followers: "2k",
            likes: "4.5M"
        },
        {
            img: communityImg,
            name: "IoT community",
            followers: "2k",
            likes: "4.5M"
        },
        {
            img: communityImg,
            name: "IoT community",
            followers: "2k",
            likes: "4.5M"
        },
        {
            img: communityImg,
            name: "IoT community",
            followers: "2k",
            likes: "4.5M"
        },
        {
            img: communityImg,
            name: "IoT community",
            followers: "2k",
            likes: "4.5M"
        }
    ]
    );
    const [my_communities, setMyCommunities] = useState([
        {
            img: communityImg,
            name: "IoT community",
            followers: "2k",
            likes: "4.5M"
        },
        {
            img: communityImg,
            name: "IoT community",
            followers: "2k",
            likes: "4.5M"
        },
        {
            img: communityImg,
            name: "IoT community",
            followers: "2k",
            likes: "4.5M"
        },
        {
            img: communityImg,
            name: "IoT community",
            followers: "2k",
            likes: "4.5M"
        },
        {
            img: communityImg,
            name: "IoT community",
            followers: "2k",
            likes: "4.5M"
        }
    ],);

    const createSuggestions = () => {
        return suggestions.map(function (community) {
            return <div className="flex flex-row items-center justify-between my-4 gap-2">
                <div className="flex flex-row items-center justify-start gap-2 cursor-pointer">
                    <img src={community.img} alt="community" className="h-[40px] w-[40px] rounded-[20px]" />
                    <div className="block">
                        <span className="block text-small-subtitle text-white font-semibold">{community.name}</span>
                        <span className="block text-mini-text text-subtitle font-medium">{community.followers} followers, {community.likes} likes</span>
                    </div>
                </div>
                <button className="border-2 rounded-md border-feed-border text-description text-mini-text text-medium px-4 py-2">follow</button>
            </div>;
        });
    }
    const createMyCommunities = () => {
        return my_communities.map(function (community) {
            return <div className="flex flex-row items-center justify-start my-4 gap-2">
                <img src={community.img} alt="community" className="h-[40px] w-[40px] rounded-[20px]" />
                <div className="block cursor-pointer">
                    <span className="block text-small-subtitle text-white font-semibold">{community.name}</span>
                    <span className="block text-mini-text text-subtitle font-medium">{community.followers} followers, {community.likes} likes</span>
                </div>
            </div>;
        });
    }
    return (
        <div className="sticky top-4">
            <div className="mt-16">
                <div className="flex flex-row justify-start items-center gap-2 mb-4">
                    <img src={suggestionsIcon} alt="suggestions" className="h-[20px] w-[20px]" />
                    <h4 className="text-white font-semibold">Suggestions for me</h4>
                </div>
                <div>
                    {createSuggestions()}
                </div>
            </div>
            <div className="mt-8">
                <div className="flex flex-row justify-start items-center gap-2 mb-4">
                    <img src={communitiesIcon} alt="suggestions" className="h-[20px] w-[20px]" />
                    <h4 className="text-white font-semibold">My communities</h4>
                </div>
                <div>
                    {createMyCommunities()}
                </div>
            </div>
        </div>
    );
}

export default Contacts;