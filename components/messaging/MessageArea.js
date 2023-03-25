import { EllipsisVerticalIcon, PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/solid";
import { Avatar, Button, IconButton } from "@mui/material";
import moment from "moment/moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { send_message } from "../../store/chat";

const Message = ({ isOwner, message }) => {
    return (
        <div className={isOwner ? "message owner" : "message"}>
            <div className="">
                <h6>{message}</h6>
            </div>
        </div>
    );
};

const MessageArea = ({ id, messages, title, me, updatedAt }) => {

    const [message, setMessage] = useState("")

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()
        dispatch(send_message({ text: message, id: id }))
    }

    return (
        <div className="messageArea__Wrapper">
            <div className="top">
                <div className="left">
                    <Avatar />
                    <div className="user">
                        <h4>{title}</h4>
                        <p>last message {moment(updatedAt).fromNow()}</p>
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
                {messages?.map((m)=><Message key={m._id} isOwner={m.sender === me} message={m.text} />)}
            </div>
            <hr />
            <div className="messageArea__Text">
                <form onSubmit={onSubmit}>
                    <div>
                        <input placeholder="Write a message..." required value={message} onChange={e=>setMessage(e.target.value)} />
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
