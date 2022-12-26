import React from "react";
import Paper from "../../components/paper"
import Cards from "./Cards";

const Subjects = () => {
	return (
		<div className="mt-4">
			<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Paper>
					<Cards />
				</Paper>
				<Paper>
					<Cards />
				</Paper>
				<Paper>
					<Cards />
				</Paper>
				<Paper>
					<Cards />
				</Paper>
				<Paper>
					<Cards />
				</Paper>
				<Paper>
					<Cards />
				</Paper>
			</div>
		</div>
	);
};

export default Subjects;
