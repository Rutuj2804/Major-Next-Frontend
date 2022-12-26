import { EllipsisVerticalIcon, PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/solid";
import { Avatar, Button, IconButton } from "@mui/material";
import React from "react";

const messageData = [
    { message: "Heyy!! How are you doing??", isOwner: false },
    { message: "Heyy!! I am good", isOwner: true },
    { message: "How are you doing??", isOwner: true },
    { message: "I am also doing good", isOwner: false },
    { message: "Are you in town or somewhere else", isOwner: false },
    { message: "No, I am in town ... Working from home nowadays", isOwner: false },
    { message: "Where have you been from such a long time??", isOwner: false },
    { message: "Well I was quite busy with my schedule", isOwner: true },
    { message: "Attending too many meetings lately", isOwner: true },
    { message: "Well I am also facing a lot of work load", isOwner: false },
    { message: "Well I have a surprise for you", isOwner: true },
    { message: "Well I am excited!!", isOwner: false },
    { message: "What is it?", isOwner: false },
    { message: "I don't want to tell you like this", isOwner: true },
    { message: "I want to meet you physically to tell you", isOwner: true },
    { message: "Lets meet today at cafe if you are free??", isOwner: false },
    { message: "Sure!! why not", isOwner: true },
    { message: "Ok then 8:00pm at cafe", isOwner: false },
    { message: "Done!!", isOwner: true },
]

const Message = ({ isOwner, message }) => {
    return (
        <div className={isOwner ? "message owner" : "message"}>
            <div className="">
                <h6>{message}</h6>
            </div>
        </div>
    );
};

const MessageArea = () => {
    return (
        <div className="messageArea__Wrapper">
            <div className="top">
                <div className="left">
                    <Avatar />
                    <div className="user">
                        <h4>Rutuj Jeevan Bokade</h4>
                        <p>last seen 2 days ago</p>
                    </div>
                </div>
                <div className="right">
                    <IconButton>
                        <EllipsisVerticalIcon className="h-5 w-5 text-black" />
                    </IconButton>
                </div>
            </div>
            <hr />
            <div className="messageArea__Display">
                {messageData.map((m,i)=><Message key={i} isOwner={m.isOwner} message={m.message} />)}
            </div>
            <hr />
            <div className="messageArea__Text">
                <form>
                    <div>
                        <input placeholder="Write a message..." required />
                        <IconButton>
                            <PaperClipIcon className="h-5 w-5 text-black" />
                        </IconButton>
                    </div>
                    <Button type="submit" endIcon={<PaperAirplaneIcon className="h-5 w-5 text-white" />}>Send</Button>
                </form>
            </div>
        </div>
    );
};

export default MessageArea;
