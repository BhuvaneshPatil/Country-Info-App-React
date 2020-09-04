import React, { useState, useEffect } from "react";
import "../FormStyle.css";
function SelectForm({
	countries,
	handleRegionChange,
	handleCountryChange,
	darkMode,
}) {
	const [region, setRegion] = useState("all");
	const regionChange = (e) => {
		const target = e.target;
		setRegion(target.value);
	};
	useEffect(() => {
		const changeRegion = () => {
			handleRegionChange(region);
		};
		changeRegion();
	}, [region]);

	return (
		<div>
			<form className="form_search">
				<input
					type="text"
					placeholder="Country Name"
					onChange={handleCountryChange}
					className={
						darkMode
							? "form__country form__country_dark"
							: "form__country form__country_light"
					}
				/>
				<select
					onChange={regionChange}
					value={region}
					className={
						darkMode
							? "form__region form__region_dark"
							: "form__region form__region_light"
					}
				>
					<option value="all" selected className="option__text">
						All
					</option>
					<option className="option__text" value="africa">
						Africa
					</option>
					<option className="option__text" value="americas">
						Americas
					</option>
					<option className="option__text" value="asia">
						Asia
					</option>
					<option className="option__text" value="europe">
						Europe
					</option>
					<option className="option__text" value="oceania">
						Oceania
					</option>
				</select>
			</form>
		</div>
	);
}

export default SelectForm;
