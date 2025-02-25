import { useState } from "react";
import sendIcon from "../assets/icons/send.png";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddComment({ profile }) {
    const article = useParams().articleId;
    const [inputs, setInputs] = useState({ user: profile.id });
    const url = `http://localhost:5000/comments/${article}`;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(url, inputs, { withCredentials: true }).then(res => {
            if (res.data.errors) {
                console.log(res.data.errors);
            } else {
                window.location.reload();
            }
        }).catch(errors => { console.log(errors) });
    }
    return (
        <div className="px-20 flex flex-row justify-center items-center gap-2">
            <img src={profile.img} alt="profile" className="h-[30px] w-[30px] object-cover rounded-full" />
            <form action="" onSubmit={handleSubmit}>
                <div className="flex flex-row gap-2 justify-start items-center pb-2 border-b-2 border-feed-border w-[400px] relative">
                    <input type="text" placeholder="Add comment" required className="bg-transparent border-none outline-none text-mini-text w-full" onChange={(e) => setInputs({ ...inputs, comment_text: e.target.value })} />
                    <input type="submit" value="send" className="cursor-pointer text-transparent w-[20px] text-left absolute right-0" /><img src={sendIcon} alt="send" className="h-[20px] w-[20px]" />
                </div>
            </form>
        </div>
    );
}

export default AddComment;