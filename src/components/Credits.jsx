import React from "react";

function Credits({ darkMode }) {
	return (
		<div
			className={
				darkMode
					? "credits__window credits__window__dark "
					: "credits__window credits__window__light "
			}
		>
			<h3>
				Made &nbsp;with &nbsp;&nbsp;
				<i className="fas fa-heart fa-2x"></i>
				&nbsp; &nbsp;by&nbsp;
				<a
					href="https://www.linkedin.com/in/bhuvanesh-patil-scoe"
					className={
						darkMode ? "table__link__dark" : "table__link__light"
					}
				>
					&nbsp;Bhuvanesh
				</a>
			</h3>
		</div>
	);
}

export default Credits;
