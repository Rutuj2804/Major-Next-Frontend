import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../logo";
import {
	AcademicCapIcon,
	BanknotesIcon,
	BoltIcon,
	CalendarDaysIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	FolderIcon,
	HeartIcon,
	PaperAirplaneIcon,
	PlayIcon,
	RectangleStackIcon,
	ShieldCheckIcon,
	Square2StackIcon,
	Square3Stack3DIcon,
	Squares2X2Icon,
	UserGroupIcon,
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
		{
			name: "Lectures",
			icon: <PlayIcon className="h-5 w-5" />,
			link: "/lectures",
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
		{
			name: "Miscellaneous",
			links: [
				{
					name: "Fees",
					icon: <BanknotesIcon className="h-5 w-5" />,
					link: "/fees",
				},
			],
		},
	];

	useEffect(() => {
		console.log(myRole.classes !== 2 && generalLinks.findIndex(v=>v.link === "/classes") === -1);
		if (myRole) {
			if (myRole.subjects !== 2 && generalLinks.findIndex(v=>v.link === "/subjects") === -1) {
				generalLinks.push({
					name: "Subjects",
					icon: <Square2StackIcon className="h-5 w-5" />,
					link: "/subjects",
				});
			}
			if (myRole.students !== 2 && generalLinks.findIndex(v=>v.link === "/students") === -1) {
				generalLinks.push({
					name: "Students",
					icon: <UserGroupIcon className="h-5 w-5" />,
					link: "/students",
				});
			}
			if (myRole.faculty !== 2 && generalLinks.findIndex(v=>v.link === "/faculties") === -1) {
				generalLinks.push({
					name: "Faculties",
					icon: <UsersIcon className="h-5 w-5" />,
					link: "/faculties",
				});
			}
			if (myRole.class !== 2 && generalLinks.findIndex(v=>v.link === "/classes") === -1) {
				generalLinks.push({
					name: "Classes",
					icon: <RectangleStackIcon className="h-5 w-5" />,
					link: "/classes",
				});
			}
			if (myRole.utilities !== 2 && generalLinks.findIndex(v=>v.link === "/utilities") === -1) {
				generalLinks.push({
					name: "Utilities",
					icon: <Square3Stack3DIcon className="h-5 w-5" />,
					link: "/utilities",
				});
			}
			if (myRole.assignments !== 2 && generalLinks.findIndex(v=>v.link === "/assignments") === -1) {
				setGeneralLinks([...generalLinks, {
					name: "Assignments",
					icon: <FolderIcon className="h-5 w-5" />,
					link: "/assignments",
				}])
				// generalLinks.push();
			}
			if (myRole.roles !== 2 && generalLinks.findIndex(v=>v.link === "/roles") === -1 && generalLinks.findIndex(v=>v.link === "/roles/assign") === -1) {
				generalLinks.push(
					{
						name: "Roles",
						icon: <BoltIcon className="h-5 w-5" />,
						link: "/roles",
					},
					{
						name: "Roles Assigned",
						icon: <ShieldCheckIcon className="h-5 w-5" />,
						link: "/roles/assign",
					}
				);
			}
			if(generalLinks.findIndex(v=>v.link === "/results") === -1){
				generalLinks.push({
					name: "Results",
					icon: <AcademicCapIcon className="h-5 w-5" />,
					link: "/results",
				});
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
					<div>
						<span className="category">{sidebarData[2].name}</span>
						{sidebarData[2].links.map((b, i) => (
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
