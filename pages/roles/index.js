import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeader } from "../../store/settings";
import Paper from "../../components/paper";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Switch } from "@mui/material";

const rolesData = [
	{ name: "Admin" },
	{ name: "Student" },
	{ name: "Faculty" },
	{ name: "Management" },
];

const Roles = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setHeader("Roles"));
	}, []);

	return (
		<div className="roles__Wrapper mt-4">
			<Head>
				<title>Roles</title>
			</Head>
			<main>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
					<div className="roles_definition">
						<Paper className="roles_sticky">
							{rolesData.map((e, i) => (
								<div className="role" key={i}>
									<ArrowRightIcon className="h-5 w-5 text-black" />
									<h4>{e.name}</h4>
								</div>
							))}
						</Paper>
					</div>
					<div className="md:col-span-2 lg:col-span-3">
                        <Paper>
                            <div className="single">
                                <h6>Students</h6>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Read students</h5>
                                        <p>Read and access students data</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Write students</h5>
                                        <p>Write and modify existing students data</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                            <hr />
                            <div className="single">
                                <h6>Faculty</h6>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Read faculty</h5>
                                        <p>Read and access faculty data</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Write faculty</h5>
                                        <p>Write and modify existing faculty data</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                            <hr />
                            <div className="single">
                                <h6>Class</h6>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Read classes</h5>
                                        <p>Read and access classes data</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Write classes</h5>
                                        <p>Write and modify existing classes data</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                            <hr />
                            <div className="single">
                                <h6>Subjects</h6>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Read subjects</h5>
                                        <p>Read and access subjects data</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Write subjects</h5>
                                        <p>Write and modify existing subjects data</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                            <hr />
                            <div className="single">
                                <h6>Events</h6>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Read events</h5>
                                        <p>Read and access events data</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Write events</h5>
                                        <p>Write and modify existing events data</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                            <hr />
                            <div className="single">
                                <h6>Utilities</h6>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Read utilities</h5>
                                        <p>Read and access utilities data</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Write utilities</h5>
                                        <p>Write and modify existing utilities data</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                            <hr />
                            <div className="single">
                                <h6>Assignments</h6>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Read assignments</h5>
                                        <p>Read and access assignments data</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Write assignments</h5>
                                        <p>Write and modify existing assignments data</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                            <hr />
                            <div className="single">
                                <h6>Roles</h6>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Create roles</h5>
                                        <p>Create and assign roles to entities</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                        </Paper>
                    </div>
				</div>
			</main>
		</div>
	);
};

export default Roles;
