import React from "react";
import { Link } from "react-router-dom";
import "./ListStyle.css";
function CountryList({ countries, darkMode }) {
	const getMode = () => darkMode;
	// console.log(darkMode, "in list");
	const listPrinter = () => {
		if (countries.length) {
			return (
				<table
					className={
						darkMode ? "table table__dark" : "table table__light"
					}
				>
					<thead>
						<th>Flag</th>
						<th>Country Name</th>
						<th>Region</th>
					</thead>
					<tbody>
						{countries.map((country) => {
							if (country) {
								return (
									<tr>
										<td className="country__photo">
											<img
												src={country.flag}
												alt="FLAG"
												className="flag__table"
											/>
										</td>
										<td className="country__name">
											<Link
												to={{
													pathname: `/${country.alpha3Code}`,
												}}
											>
												<p
													className={
														darkMode
															? "table__link__dark"
															: "table__link__light"
													}
												>
													{country.name}
												</p>
											</Link>
										</td>
										<td className="country__region">
											{country.region}
										</td>
									</tr>
								);
							}
						})}
					</tbody>
				</table>
			);
		} else {
			return (
				<h3 className="notFound__message">
					Try searching other country
				</h3>
			);
		}
	};
	return (
		<div>
			<div className="container">{listPrinter()}</div>
		</div>
	);
}

export default CountryList;
