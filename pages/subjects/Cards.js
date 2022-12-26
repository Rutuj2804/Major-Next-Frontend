import React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Button } from "@mui/material";

const Cards = () => {
	return (
		<div className="subjectsCards__Wrapper">
			<div className="header">
				<h4>Information Security</h4>
				<p>
					Explore 4,819 design cards work, designs, illustrations, and
					graphic elements. Explore 4,819 design cards work, designs,
					illustrations, and graphic elements.
				</p>
			</div>
			<div className="footer">
				<AvatarGroup max={4}>
					<Avatar>AM</Avatar>
					<Avatar>AZ</Avatar>
					<Avatar>RJ</Avatar>
					<Avatar>FM</Avatar>
					<Avatar>FZ</Avatar>
					<Avatar>RM</Avatar>
				</AvatarGroup>
                <Button>Open</Button>
			</div>
		</div>
	);
};

export default Cards;
