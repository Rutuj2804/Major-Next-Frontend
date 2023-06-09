import { XMarkIcon } from "@heroicons/react/24/solid";
import { Avatar, Button, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create_rooms, get_users } from "../../store/chat";
import { setPopup } from "../../store/settings";

const AddGroups = () => {
    const [name, setName] = useState("");
    const [temporaryName, setTemporaryName] = useState("");
    const [users, setUsers] = useState([]);

	const [error, setError] = useState("")

    const users_from_server = useSelector((state) => state.chat.users);

    const dispatch = useDispatch();
    const router = useRouter();

    const onSubmit = (e) => {
        e.preventDefault();
		const u = []
		for (let i = 0; i < users.length; i++) {
			u.push(users[i]._id)
		}
		if(users.length !== 0) {
			dispatch(create_rooms({ name, router, users: u }));
			setName("");
			dispatch(setPopup(null));
		} else {
			setError("Group must have atleast 1 user")
		}
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
                    <div className="inputDiv">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label>Group Name</label>
                    </div>
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
                                        onClick={() => {
                                            setUsers((v) => [...v, u]);
                                            setTemporaryName("");
											setError("")
                                        }}
                                    >
                                        {u.firstname + " " + u.lastname}
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
					{
						error ? <p className="text-red-500 mb-4">{error}</p> : null
					}
                    <div className="users__result">
                        {users.map((v) => (
                            <div className="box" key={v._id}>
								<div className="left">
									<Avatar />
									<div className="user">
										<h6>{v.firstname + " " + v.lastname}</h6>
										<p>{v.email}</p>
									</div>
								</div>
                                <span className="bg-red-500 cursor-pointer" onClick={()=>setUsers(t=>t.filter(x=>x._id !== v._id))}><XMarkIcon className="h-4 w-4 text-white" /></span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <Button type="submit">Create</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddGroups;
