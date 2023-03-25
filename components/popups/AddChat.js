import { XMarkIcon } from "@heroicons/react/24/solid";
import { Avatar, Button, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_rooms, get_users } from "../../store/chat";
import { setPopup } from "../../store/settings";

const AddChat = () => {
    const [temporaryName, setTemporaryName] = useState("");

    const [error, setError] = useState("");

    const users_from_server = useSelector((state) => state.chat.users);

    const dispatch = useDispatch();
    const router = useRouter();

    const onSubmit = (t) => {
        dispatch(create_rooms({ router, users: [t] }));
        dispatch(setPopup(null));
        setTemporaryName("");
        setError("");
    };

    const handleChange = (e) => {
        setTemporaryName(e.target.value);
        if (e.target.value) {
            dispatch(get_users(e.target.value));
        }
    };

    return (
        <div className="addClass__Wrapper" onClick={(e) => e.stopPropagation()}>
            <div className="top">
                <h4>Add Group</h4>
                <IconButton onClick={() => dispatch(setPopup(null))}>
                    <XMarkIcon className="h-5 w-5 text-black" />
                </IconButton>
            </div>
            <div className="bottom">
                <form onSubmit={onSubmit}>
                    <div className="selectBox">
                        <div className="inputDiv">
                            <input
                                type="text"
                                value={temporaryName}
                                onChange={(e) => handleChange(e)}
                            />
                            <label>Search User</label>
                        </div>
                        {temporaryName != "" ? (
                            <div className="options">
                                {users_from_server.map((u) => (
                                    <div
                                        key={u._id}
                                        onClick={() => onSubmit(u._id)}
                                    >
                                        {u.firstname + " " + u.lastname}
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                    {error ? (
                        <p className="text-red-500 mb-4">{error}</p>
                    ) : null}
                </form>
            </div>
        </div>
    );
};

export default AddChat;
