import Link from "next/link";
import React from "react";
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

const sidebarData = [
	{
		name: "Student General",
		links: [
			{
				name: "Dashboard",
				icon: <Squares2X2Icon className="h-5 w-5" />,
				link: "/",
			},
			{
				name: "Subjects",
				icon: <UsersIcon className="h-5 w-5" />,
				link: "/subjects",
			},
			{
				name: "Utilities",
				icon: <CalendarDaysIcon className="h-5 w-5" />,
				link: "/utilities",
			},
			{
				name: "Assignments",
				icon: <CalendarDaysIcon className="h-5 w-5" />,
				link: "/assignments",
			},
		],
	},
	{
		name: "Faculty General",
		links: [
			{
				name: "Dashboard",
				icon: <Squares2X2Icon className="h-5 w-5" />,
				link: "/",
			},
			{
				name: "Classes",
				icon: <UsersIcon className="h-5 w-5" />,
				link: "/classes",
			},
			{
				name: "Students",
				icon: <CalendarDaysIcon className="h-5 w-5" />,
				link: "/students",
			},
		],
	},
	{
		name: "Admin General",
		links: [
			{
				name: "Dashboard",
				icon: <Squares2X2Icon className="h-5 w-5" />,
				link: "/",
			},
			{
				name: "Classes",
				icon: <UsersIcon className="h-5 w-5" />,
				link: "/classes",
			},
			{
				name: "Students",
				icon: <CalendarDaysIcon className="h-5 w-5" />,
				link: "/students",
			},
			{
				name: "Faculties",
				icon: <CalendarDaysIcon className="h-5 w-5" />,
				link: "/faculties",
			},
			{
				name: "Roles",
				icon: <CalendarDaysIcon className="h-5 w-5" />,
				link: "/roles",
			},
		],
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

const Sidebar = () => {
	const dispatch = useDispatch();

	const sidebar = useSelector((state) => state.settings.sidebar);

	return (
		<div>
			<div className="sidebar__Wrapper">
				<div className="">
					<Logo />
				</div>
				<div className="middle">
					{sidebarData.map((a, j) => (
						<div key={j}>
							<span className="category">{a.name}</span>
							{a.links.map((b, i) => (
								<NavLink
									key={i}
									name={b.name}
									icon={b.icon}
									link={b.link}
								/>
							))}
						</div>
					))}
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
