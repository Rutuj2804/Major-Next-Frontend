import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeader, setPopup } from "../../store/settings";
import Paper from "../../components/paper";
import { ArrowRightIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Button, Switch } from "@mui/material";
import { CODES } from "../../assets/data/popup"
import { get_all_roles } from "../../store/roles";

const Roles = () => {
	const dispatch = useDispatch();
    const university = useSelector(state=>state.university.university._id)
    const rolesDataFromServer = useSelector(state=>state.roles.roles)

    const [selectedRole, setSelectedRole] = useState(rolesDataFromServer[0])
    
    const [formData, setFormData] = useState({
        name: selectedRole?.name,
        students: selectedRole?.students,
        faculty: selectedRole?.faculty,
        class: selectedRole?.class,
        subjects: selectedRole?.subjects,
        events: selectedRole?.events,
        utilities: selectedRole?.utilities,
        assignments: selectedRole?.assignments,
        roles: selectedRole?.roles,
    })

	useEffect(() => {
		dispatch(setHeader("Roles"));
	}, []);

    useEffect(()=>{
        if(selectedRole){
            setFormData({
                name: selectedRole.name,
                students: selectedRole.students,
                faculty: selectedRole.faculty,
                class: selectedRole.class,
                subjects: selectedRole.subjects,
                events: selectedRole.events,
                utilities: selectedRole.utilities,
                assignments: selectedRole.assignments,
                roles: selectedRole.roles,
            })
        }
    }, [selectedRole])

    useEffect(()=>{
        dispatch(get_all_roles(university))
    }, [university])

    const getSetterValue = (b, c, r) => {
        // boolean, change name, read value
        if(b && c==="write" && r==0) return 1
        else if(b && c==="write" && r==2) return 1
        else if(!b && c==="write" && r==1) return 0
        else if(!b && c==="read" && r==0) return 2
        else if(!b && c==="read" && r==1) return 2
        else if(b && c==="read" && r==2) return 0
    }
console.log(formData.students);
	return (
		<div className="roles__Wrapper mt-4">
			<Head>
				<title>Roles</title>
			</Head>
			<main>
				<div className="flex justify-between items-center mt-4 breadcrumps">
                    <div></div>
                    <div className="">
                        <Button startIcon={<PlusIcon className="h-5 w-5 text-white" />} onClick={()=>dispatch(setPopup(CODES.ADD_ROLES))}>Add Roles</Button>
                    </div>
                </div>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
					<div className="roles_definition">
						<Paper className="roles_sticky">
							{rolesDataFromServer.map((e) => (
								<div className={selectedRole?.name === e.name ? "role bg-[#efefef]": "role"} key={e._id} onClick={()=>setSelectedRole(e)}>
									<ArrowRightIcon className="h-5 w-5 text-black" />
									<h4>{e.name}</h4>
								</div>
							))}
						</Paper>
					</div>
					<div className="md:col-span-2 lg:col-span-3">
                        <Paper>
                            <div className="single">
                                <div className="flex justify-between items-center">
                                    <h6>Students</h6>
                                    <Switch checked={formData.students !== 2} onChange={e=>e.target.checked ? setFormData({ ...formData, students: 1 }) : setFormData({ ...formData, students: 2 })} />
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Read students</h5>
                                        <p>Read and access students data</p>
                                    </div>
                                    <Switch checked={formData.students >= 0 && formData.students !== 2} onChange={e=>setFormData({ ...formData, students: getSetterValue(e.target.checked, "read", formData.students) })}/>
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Write students</h5>
                                        <p>Write and modify existing students data</p>
                                    </div>
                                    <Switch checked={formData.students >= 1 && formData.students !== 2} onChange={e=>setFormData({ ...formData, students: getSetterValue(e.target.checked, "write", formData.students) })}/>
                                </div>
                            </div>
                            <hr />

                            <div className="single">
                                <div className="flex justify-between items-center">
                                    <h6>Faculty</h6>
                                    <Switch checked={formData.faculty !== 2} onChange={e=>e.target.checked ? setFormData({ ...formData, faculty: 1 }) : setFormData({ ...formData, faculty: 2 })} />
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Read faculty</h5>
                                        <p>Read and access faculty data</p>
                                    </div>
                                    <Switch checked={formData.faculty >= 0 && formData.faculty !== 2} onChange={e=>setFormData({ ...formData, faculty: getSetterValue(e.target.checked, "read", formData.faculty) })}/>
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Write faculty</h5>
                                        <p>Write and modify existing faculty data</p>
                                    </div>
                                    <Switch checked={formData.faculty >= 1 && formData.faculty !== 2} onChange={e=>setFormData({ ...formData, faculty: getSetterValue(e.target.checked, "write", formData.faculty) })}/>
                                </div>
                            </div>
                            <hr />

                            <div className="single">
                                <div className="flex justify-between items-center">
                                    <h6>Class</h6>
                                    <Switch checked={formData.class !== 2} onChange={e=>e.target.checked ? setFormData({ ...formData, class: 1 }) : setFormData({ ...formData, class: 2 })} />
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Read class</h5>
                                        <p>Read and access class data</p>
                                    </div>
                                    <Switch checked={formData.class >= 0 && formData.class !== 2} onChange={e=>setFormData({ ...formData, class: getSetterValue(e.target.checked, "read", formData.class) })}/>
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Write class</h5>
                                        <p>Write and modify existing class data</p>
                                    </div>
                                    <Switch checked={formData.class >= 1 && formData.class !== 2} onChange={e=>setFormData({ ...formData, class: getSetterValue(e.target.checked, "write", formData.class) })}/>
                                </div>
                            </div>
                            <hr />
                            <div className="single">
                            <div className="flex justify-between items-center">
                                    <h6>Subjects</h6>
                                    <Switch checked={formData.subjects !== 2} onChange={e=>e.target.checked ? setFormData({ ...formData, subjects: 1 }) : setFormData({ ...formData, subjects: 2 })} />
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Read subjects</h5>
                                        <p>Read and access subjects data</p>
                                    </div>
                                    <Switch checked={formData.subjects >= 0 && formData.subjects !== 2} onChange={e=>setFormData({ ...formData, subjects: getSetterValue(e.target.checked, "read", formData.subjects) })}/>
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Write subjects</h5>
                                        <p>Write and modify existing subjects data</p>
                                    </div>
                                    <Switch checked={formData.subjects >= 1 && formData.subjects !== 2} onChange={e=>setFormData({ ...formData, subjects: getSetterValue(e.target.checked, "write", formData.subjects) })}/>
                                </div>
                            </div>
                            <hr />
                            <div className="single">
                                <div className="flex justify-between items-center">
                                    <h6>Events</h6>
                                    <Switch checked={formData.events !== 2} onChange={e=>e.target.checked ? setFormData({ ...formData, events: 1 }) : setFormData({ ...formData, events: 2 })} />
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Read events</h5>
                                        <p>Read and access events data</p>
                                    </div>
                                    <Switch checked={formData.events >= 0 && formData.events !== 2} onChange={e=>setFormData({ ...formData, events: getSetterValue(e.target.checked, "read", formData.events) })}/>
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Write events</h5>
                                        <p>Write and modify existing events data</p>
                                    </div>
                                    <Switch checked={formData.events >= 1 && formData.events !== 2} onChange={e=>setFormData({ ...formData, events: getSetterValue(e.target.checked, "write", formData.events) })}/>
                                </div>
                            </div>
                            <hr />
                            <div className="single">
                                <div className="flex justify-between items-center">
                                    <h6>Utilities</h6>
                                    <Switch checked={formData.utilities !== 2} onChange={e=>e.target.checked ? setFormData({ ...formData, utilities: 1 }) : setFormData({ ...formData, utilities: 2 })} />
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Read utilities</h5>
                                        <p>Read and access utilities data</p>
                                    </div>
                                    <Switch checked={formData.utilities >= 0 && formData.utilities !== 2} onChange={e=>setFormData({ ...formData, utilities: getSetterValue(e.target.checked, "read", formData.utilities) })}/>
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Write utilities</h5>
                                        <p>Write and modify existing utilities data</p>
                                    </div>
                                    <Switch checked={formData.utilities >= 1 && formData.utilities !== 2} onChange={e=>setFormData({ ...formData, utilities: getSetterValue(e.target.checked, "write", formData.utilities) })}/>
                                </div>
                            </div>
                            <hr />
                            <div className="single">
                                <div className="flex justify-between items-center">
                                    <h6>Assignments</h6>
                                    <Switch checked={formData.assignments !== 2} onChange={e=>e.target.checked ? setFormData({ ...formData, assignments: 1 }) : setFormData({ ...formData, assignments: 2 })} />
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Read assignments</h5>
                                        <p>Read and access assignments data</p>
                                    </div>
                                    <Switch checked={formData.assignments >= 0 && formData.assignments !== 2} onChange={e=>setFormData({ ...formData, assignments: getSetterValue(e.target.checked, "read", formData.assignments) })}/>
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Write assignments</h5>
                                        <p>Write and modify existing assignments data</p>
                                    </div>
                                    <Switch checked={formData.assignments >= 1 && formData.assignments !== 2} onChange={e=>setFormData({ ...formData, assignments: getSetterValue(e.target.checked, "write", formData.assignments) })}/>
                                </div>
                            </div>
                            <hr />
                            <div className="single">
                                <div className="flex justify-between items-center">
                                    <h6>Roles</h6>
                                </div>
                                <div className="options">
                                    <div className="desc">
                                        <h5>Create roles</h5>
                                        <p>Create and assign roles to entities</p>
                                    </div>
                                    <Switch checked={formData.roles === 2} onChange={e=>setFormData({ ...formData, roles: e.target.checked ? 1 : 2 })} />
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
