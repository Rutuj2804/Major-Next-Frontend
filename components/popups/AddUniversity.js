import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPopup } from "../../store/settings";
import { create_university } from "../../store/university";

const AddUniversity = () => {

    const [ name, setName ] = useState("")

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()
        dispatch(create_university(name))
    }

	return (
		<div className="addUniversity__Wrapper" onClick={e=>e.stopPropagation()}>
			<div className="addUniversity__Top">
                <div className="left">
                    <h4>Add University</h4>
                </div>
                <div className="right">
                    <IconButton onClick={()=>dispatch(setPopup(null))}>
                        <XMarkIcon className="h-5 w-5 text-black" />
                    </IconButton>
                </div>
            </div>
			<div className="addUniversity__Bottom">
                <form onSubmit={onSubmit}>
                    <div className="inputDiv">
                        <input
                            type="text"
                            value={name}
                            onChange={e=>setName(e.target.value)}
                            required
                        />
                        <label>University Name</label>
                    </div>
                    <div>
                        <Button type="submit">Create</Button>
                    </div>
                </form>
            </div>
		</div>
	);
};

export default AddUniversity;
