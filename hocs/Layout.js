import React, { useEffect } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { check_authentication } from "../store/auth";
import { useRouter } from "next/router";
import { get_all_universities } from "../store/university";
import AddUniversity from "../components/popups/AddUniversity";
import { CODES } from "../assets/data/popup";
import { setPopup } from "../store/settings";
import AddClass from "../components/popups/AddClass";
import UpdateClass from "../components/popups/UpdateClass";
import AddStudent from "../components/popups/AddStudent";
import AddFaculty from "../components/popups/AddFaculty";
import AddRoles from "../components/popups/AddRoles";
import { get_my_role } from "../store/roles";
import AssignRole from "../components/popups/AssignRole";
import { CircularProgress } from "@mui/material";
import BulkAddStudent from "../components/popups/BulkAddStudent";
import BulkAddFaculty from "../components/popups/BulkAddFaculty";
import AddSubject from "../components/popups/AddSubject";
import AddNotes from "../components/popups/AddNotes";
import AddAssignment from "../components/popups/AddAssignment";
import Success from "../components/report-messages/Success";
import UploadAssignment from "../components/popups/UploadAssignment";
import AddLecture from "../components/popups/AddLecture";
import AddEvent from "../components/popups/AddEvent";
import AddGroups from "../components/popups/AddGroups";

const Layout = ({ children }) => {
	const sidebar = useSelector((state) => state.settings.sidebar);
	const popup = useSelector((state) => state.settings.popup);
	const university = useSelector((state) => state.university.university?._id);
	const successMessage = useSelector((state) => state.settings.success);
	const errorMessage = useSelector((state) => state.settings.error);

	// loaders
	const isLoading =
		useSelector((state) => state.university.isloading) |
		useSelector((state) => state.auth.isloading) |
		useSelector((state) => state.class.isloading) |
		useSelector((state) => state.roles.isloading) |
		useSelector((state) => state.subjects.isloading) |
		useSelector((state) => state.notes.isloading) |
		useSelector((state) => state.assignments.isloading) |
		useSelector((state) => state.lecture.isloading) |
		useSelector((state) => state.events.isloading);

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

	useEffect(() => {
		if(university)
		dispatch(get_my_role(university));
	}, [university]);

	return (
		<div className={sidebar ? "layout" : "toggle-layout"}>
			<Sidebar />
			<div className="body">
				<Navbar />
				{children}
			</div>
			{popup ? (
				<div
					className="popups"
					onClick={() => dispatch(setPopup(null))}
				>
					{popup === CODES.CREATE_UNIVERISTY && <AddUniversity />}
					{popup === CODES.ADD_CLASS && <AddClass />}
					{popup === CODES.UPDATE_CLASS && <UpdateClass />}
					{popup === CODES.ADD_STUDENT && <AddStudent />}
					{popup === CODES.ADD_FACULTY && <AddFaculty />}
					{popup === CODES.ADD_ROLES && <AddRoles />}
					{popup === CODES.ASSIGN_ROLES && <AssignRole />}
					{popup === CODES.BULK_ADD_STUDENT && <BulkAddStudent />}
					{popup === CODES.BULK_ADD_FACULTY && <BulkAddFaculty />}
					{popup === CODES.ADD_SUBJECT && <AddSubject />}
					{popup === CODES.ADD_NOTES && <AddNotes />}
					{popup === CODES.ADD_ASSIGNMENTS && <AddAssignment />}
					{popup === CODES.UPLOAD_ASSIGNMENTS && <UploadAssignment />}
					{popup === CODES.ADD_LECTURE && <AddLecture />}
					{popup === CODES.ADD_EVENT && <AddEvent />}
					{popup === CODES.ADD_GROUP && <AddGroups />}
				</div>
			) : null}

			{isLoading && (
				<div className="loader">
					<CircularProgress />
				</div>
			)}

			{successMessage ? (
				<Success msg={successMessage} isError={false} />
			) : null}
			{errorMessage ? (
				<Success msg={errorMessage} isError={true} />
			) : null}
		</div>
	);
};

export default Layout;
