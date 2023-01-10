import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "../../components/paper"
import { get_my_subjects } from "../../store/class";
import Cards from "./Cards";

const Subjects = () => {

	const dispatch = useDispatch()

	const subjects = useSelector(state=>state.class.subjects)

	useEffect(()=>{
		dispatch(get_my_subjects())
	}, [])

	return (
		<div className="mt-4">
			<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{
					subjects.map(s=>(
						<Paper key={s._id}>
							<Cards name={s.name} id={s._id} />
						</Paper>
					))
				}
			</div>
		</div>
	);
};

export default Subjects;
