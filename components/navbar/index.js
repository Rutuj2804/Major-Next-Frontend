import { Badge, IconButton } from "@mui/material";
import React, { useState } from "react";
import {
	BellIcon,
	Cog6ToothIcon,
	KeyIcon,
	MagnifyingGlassIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import {
	BoltIcon,
	MoonIcon,
	SunIcon,
	WrenchScrewdriverIcon,
	UserIcon as UserSolid,
} from "@heroicons/react/24/solid";
import { Fullscreen } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleDisplayMode } from "../../store/settings";
import { useRouter } from "next/router";

const notificationData = [
	{ name: "Jon Snow", message: "Posted on his social media" },
	{ name: "Cersie Lannister", message: "Earned 140k today" },
	{ name: "Aarya Stark", message: "Posted her insights" },
	{ name: "Jon Snow", message: "Sent you a message" },
	{ name: "Rutuj Bokade", message: "Schedule a event with you" },
];

const Navbar = () => {
	const [settingsPanel, setSettingsPanel] = useState(false);
	const [notificationPanel, setNotificationPanel] = useState(false);
	const [profile, setProfile] = useState(false);

	const header = useSelector((state) => state.settings.header);

	const router = useRouter();

	const dispatch = useDispatch();

	return (
		<div className="navbar__Wrapper flex justify-between items-center p-4">
			<div className="left">
				<h4 className=" hidden md:flex sm:hidden lg:flex">{header}</h4>
			</div>
			<div className="right flex justify-between items-center gap-6">
				<form className="hidden md:hidden sm:hidden lg:flex">
					<MagnifyingGlassIcon className="h-6 w-6 text-black" />
					<input type="text" placeholder="Search..." />
					<code>Ctr + K</code>
				</form>
				<div className="dropdown">
					<IconButton>
						<Fullscreen className="h-6 w-6 text-black" />
					</IconButton>
				</div>
				<div className="dropdown">
					<IconButton onClick={() => setSettingsPanel((v) => !v)}>
						<Cog6ToothIcon className="h-6 w-6 text-black" />
					</IconButton>
					{settingsPanel && (
						<div className="menu">
							<div
								className="item"
								onClick={() => dispatch(toggleDisplayMode())}
							>
								<h6>Dark mode</h6>
								<MoonIcon className="h-5 w-5 " />
							</div>
							<div className="item">
								<h6>Access mode</h6>
								<BoltIcon className="h-5 w-5 text-balck" />
							</div>
							<div className="item">
								<h6>Display Settings</h6>
								<WrenchScrewdriverIcon className="h-5 w-5 text-balck" />
							</div>
						</div>
					)}
				</div>
				<div className="dropdown">
					<IconButton onClick={() => setNotificationPanel((v) => !v)}>
						<Badge badgeContent={4} color="error">
							<BellIcon className="h-6 w-6 text-black" />
						</Badge>
					</IconButton>
					{notificationPanel && (
						<div className="menu">
							{notificationData.map((n, i) => (
								<div className="notification" key={i}>
									<h4>{n.name}</h4>
									<p>{n.message}</p>
								</div>
							))}
						</div>
					)}
				</div>
				<div className="dropdown">
					<IconButton onClick={() => setProfile((v) => !v)}>
						<Badge badgeContent={4} color="error">
							<UserIcon className="h-6 w-6 text-black" />
						</Badge>
					</IconButton>
					{profile && (
						<div className="menu">
							<div className="item">
								<h6>Profile</h6>
								<UserSolid className="h-5 w-5 " />
							</div>
							<div
								className="item"
								onClick={() => router.push("/auth/login")}
							>
								<h6>Login Page</h6>
								<BoltIcon className="h-5 w-5 text-balck" />
							</div>
							<div
								className="item"
								onClick={() => router.push("/auth/register")}
							>
								<h6>Register Page</h6>
								<WrenchScrewdriverIcon className="h-5 w-5 text-balck" />
							</div>
							<div
								className="item"
								onClick={() =>
									router.push("/auth/forgetpassword")
								}
							>
								<h6>Forget Password Page</h6>
								<KeyIcon className="h-5 w-5 text-balck" />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
