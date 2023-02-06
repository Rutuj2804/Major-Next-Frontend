import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../logo";
import {
	CalendarDaysIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	HeartIcon,
	PaperAirplaneIcon,
	Squares2X2Icon,
	UsersIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/settings";

const NavLink = ({ name, icon, link }) => {
	const router = useRouter();
	return (
		<Link
			href={link}
			className={`flex items-center gap-4 navlink ${
				router.pathname === link ? "active" : null
			}`}
		>
			{icon}
			<h6>{name}</h6>
		</Link>
	);
};

const Sidebar = () => {
	const dispatch = useDispatch();

	const sidebar = useSelector((state) => state.settings.sidebar);

	const myRole = useSelector((state) => state.roles.role?.roles);

	const [generalLinks, setGeneralLinks] = useState([
		{
			name: "Dashboard",
			icon: <Squares2X2Icon className="h-5 w-5" />,
			link: "/",
		},
	]);

	const sidebarData = [
		{
			name: "General",
			links: generalLinks,
		},
		{
			name: "Communication",
			links: [
				{
					name: "Messaging",
					icon: <PaperAirplaneIcon className="h-5 w-5" />,
					link: "/messaging",
				},
				{
					name: "Events",
					icon: <HeartIcon className="h-5 w-5" />,
					link: "/events",
				},
			],
		},
	];

	useEffect(() => {
		if (myRole) {
			if (myRole.subjects !== 2) {
				generalLinks.push({
					name: "Subjects",
					icon: <UsersIcon className="h-5 w-5" />,
					link: "/subjects",
				});
			}
			if (myRole.students !== 2) {
				generalLinks.push({
					name: "Students",
					icon: <CalendarDaysIcon className="h-5 w-5" />,
					link: "/students",
				});
			}
			if (myRole.faculty !== 2) {
				generalLinks.push({
					name: "Faculties",
					icon: <CalendarDaysIcon className="h-5 w-5" />,
					link: "/faculties",
				});
			}
			if (myRole.classes !== 2) {
				generalLinks.push({
					name: "Classes",
					icon: <UsersIcon className="h-5 w-5" />,
					link: "/classes",
				});
			}
			if (myRole.utilities !== 2) {
				generalLinks.push({
					name: "Utilities",
					icon: <CalendarDaysIcon className="h-5 w-5" />,
					link: "/utilities",
				});
			}
			if (myRole.assignments !== 2) {
				generalLinks.push({
					name: "Assignments",
					icon: <CalendarDaysIcon className="h-5 w-5" />,
					link: "/assignments",
				});
			}
			if (myRole.roles !== 2) {
				generalLinks.push(
					{
						name: "Roles",
						icon: <CalendarDaysIcon className="h-5 w-5" />,
						link: "/roles",
					},
					{
						name: "Roles Assigned",
						icon: <CalendarDaysIcon className="h-5 w-5" />,
						link: "/roles/assign",
					}
				);
			}
		}
	}, [myRole]);

	return (
		<div>
			<div className="sidebar__Wrapper">
				<div className="">
					<Logo />
				</div>
				<div className="middle">
					<div>
						<span className="category">{sidebarData[0].name}</span>
						{generalLinks.map((b, i) => (
							<NavLink
								key={i}
								name={b.name}
								icon={b.icon}
								link={b.link}
							/>
						))}
					</div>
					<div>
						<span className="category">{sidebarData[1].name}</span>
						{sidebarData[1].links.map((b, i) => (
							<NavLink
								key={i}
								name={b.name}
								icon={b.icon}
								link={b.link}
							/>
						))}
					</div>
				</div>
			</div>
			<div className="pannel" onClick={() => dispatch(toggleSidebar())}>
				{sidebar ? (
					<ChevronLeftIcon className="h-5 w-5" />
				) : (
					<ChevronRightIcon className="h-5 w-5" />
				)}
			</div>
		</div>
	);
};

export default Sidebar;
