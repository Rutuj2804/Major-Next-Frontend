import React from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
	const sidebar = useSelector((state) => state.settings.sidebar);

	return (
		<div className={sidebar ? "layout" : "toggle-layout"}>
			<Sidebar />
			<div className="body">
				<Navbar />
				{children}
			</div>
		</div>
	);
};

export default Layout;
