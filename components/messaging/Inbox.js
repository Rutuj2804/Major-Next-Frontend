import { Avatar, IconButton } from "@mui/material";
import React from "react";
import { EllipsisVerticalIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

const Contact = ({ notifications }) => {
    return (
        <div className="contact__Wrapper">
            <div className="left_contact">
                <Avatar />
                <div className="user">
                    <h6>Rutuj Jeevan Bokade</h6>
                    <p>Heyy!! How are you doing??</p>
                </div>
            </div>
            <div className="right">
                {notifications ? <div className="bg-green-500">{notifications}</div> : null}
            </div>
        </div>
    );
};

const Inbox = () => {
    return (
        <div className="inbox__Wrapper">
            <div className="top">
                <h4>Inbox</h4>
                <IconButton>
                    <PencilSquareIcon className="h-6 w-6 text-black" />
                </IconButton>
            </div>
            <hr />
            <div className="contacts">
                <Contact notifications={2} />
                <Contact notifications={6} />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
                <Contact />
            </div>
        </div>
    );
};

export default Inbox;
