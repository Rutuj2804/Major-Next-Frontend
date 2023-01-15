import React, { useEffect } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { check_authentication } from "../store/auth";
import { useRouter } from "next/router";
import { get_all_universities } from "../store/university";
import AddUniversity from "../components/popups/AddUniversity";
import { CODES } from "../assets/data/popup"
import { setPopup } from "../store/settings";
import AddClass from "../components/popups/AddClass";
import UpdateClass from "../components/popups/UpdateClass";
import AddStudent from "../components/popups/AddStudent";
import AddFaculty from "../components/popups/AddFaculty";
import AddRoles from "../components/popups/AddRoles";
import { get_my_role } from "../store/roles";
import AssignRole from "../components/popups/AssignRole";

const Layout = ({ children }) => {
	const sidebar = useSelector((state) => state.settings.sidebar);
	const popup = useSelector((state) => state.settings.popup);
	const university = useSelector((state) => state.university.university?._id);

	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("study-auth");
		if (token) {
			dispatch(check_authentication(token));
			dispatch(get_all_universities());
		} else if (!token && !isAuthenticated) {
			router.push("/login");
		}
	}, [isAuthenticated]);

	useEffect(()=>{
		dispatch(get_my_role(university));
	}, [university])

	return (
		<div className={sidebar ? "layout" : "toggle-layout"}>
			<Sidebar />
			<div className="body">
				<Navbar />
				{children}
			</div>
			{popup ? (
				<div className="popups" onClick={()=>dispatch(setPopup(null))}>
					{popup === CODES.CREATE_UNIVERISTY &&  <AddUniversity />}
					{popup === CODES.ADD_CLASS &&  <AddClass />}
					{popup === CODES.UPDATE_CLASS &&  <UpdateClass />}
					{popup === CODES.ADD_STUDENT &&  <AddStudent />}
					{popup === CODES.ADD_FACULTY &&  <AddFaculty />}
					{popup === CODES.ADD_ROLES &&  <AddRoles />}
					{popup === CODES.ASSIGN_ROLES &&  <AssignRole />}
				</div>
			) : null}
		</div>
	);
};

export default Layout;
