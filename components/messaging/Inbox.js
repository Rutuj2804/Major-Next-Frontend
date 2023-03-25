import { Avatar, IconButton } from "@mui/material";
import React from "react";
import { PencilIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "../../store/settings";
import { CODES } from "../../assets/data/popup";
import { useRouter } from "next/router";
import { setRoom } from "../../store/chat";

const Contact = ({ notifications, name, msg, id }) => {

    const router = useRouter()

    const dispatch = useDispatch()

    const onClick = () => {
        router.push(`/messaging/${id}`)
        dispatch(setRoom(id))
    }

    return (
        <div className="contact__Wrapper" onClick={()=>onClick()}>
            <div className="left_contact">
                <Avatar />
                <div className="user">
                    <h6>{name}</h6>
                    <p>{msg}</p>
                </div>
            </div>
            <div className="right">
                {notifications ? (
                    <div className="bg-green-500">{notifications}</div>
                ) : null}
            </div>
        </div>
    );
};

const Inbox = () => {
    const dispatch = useDispatch();

    const contact_lists = useSelector((state) => state.chat.rooms);
    const user = useSelector((state) => state.auth.id);

    const seperate = (v) => {
        const x = v?.users?.filter((t) => t._id !== user);
        if(x.length > 0) {
            return x[0].firstname + " " + x[0].lastname
        } else {
            return v?.admin?.firstname + " " + v?.admin?.lastname
        }
    };

    return (
        <div className="inbox__Wrapper">
            <div className="top">
                <h4>Inbox</h4>
                <div>
                    <IconButton onClick={() => dispatch(setPopup(CODES.ADD_CHAT))}>
                        <PencilSquareIcon className="h-6 w-6 text-black" />
                    </IconButton>
                    <IconButton onClick={() => dispatch(setPopup(CODES.ADD_GROUP))}>
                        <PencilIcon className="h-6 w-6 text-black" />
                    </IconButton>
                </div>
            </div>
            <hr />
            <div className="contacts">
                {contact_lists.map((v) => {
                    const title = seperate(v);
                    return (
                        <Contact
                            name={
                                v.name
                                    ? v.name
                                    : title
                            }
                            key={v._id}
                            msg={v.messages[v.messages.length - 1]?.text}
                            id={v._id}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Inbox;
