import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Country.css";
const BASE_URL = "https://restcountries.com/v2/";
function Country(props) {
	const countryName = props.match.params.countryName;
	const code = props.match.params.countrycode;
	const [country, setCountry] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			await fetch(`${BASE_URL}alpha?codes=${code}`)
				.then((response) => response.json())
				.then((data) => setCountry(data[0]));
		};
		fetchData();
	}, [code]);
	const latlonghandle = () => {
		const status =
			country.latlng !== undefined
				? `(${country.latlng[0]}, ${country.latlng[1]})`
				: "loading";
		return status;
	};
	// console.log(props.location.state.mode);
	return (
		<div className="single__main__container">
			<div className="header__info">
				<h1 className="single__name">{country.name}</h1>
				<div
					className={
						props.mode
							? "header__image__container header__image__container_dark"
							: "header__image__container header__image__container_light"
					}
				>
					<img
						src={country.flag}
						alt="FLAG"
						className="single__flag"
					/>
				</div>
			</div>
			<div
				className={
					props.mode
						? "single__infoContainer single__infoContainer_dark"
						: "single__infoContainer single__infoContainer_light"
				}
			>
				<div className="single__containerItem">
					<div className="single__containerItemLeft">
						<h4>Capital</h4>
					</div>
					<div className="single__containerItemRight">
						<h4>{country.capital}</h4>
					</div>
				</div>
				<div className="single__containerItem">
					<div className="single__containerItemLeft">
						<h4>Region</h4>
					</div>
					<div className="single__containerItemRight">
						<h4>{country.region}</h4>
					</div>
				</div>
				<div className="single__containerItem">
					<div className="single__containerItemLeft">
						<h4>Sub-Region</h4>
					</div>
					<div className="single__containerItemRight">
						<h4>{country.subregion}</h4>
					</div>
				</div>
				<div className="single__containerItem">
					<div className="single__containerItemLeft">
						<h4>Population</h4>
					</div>
					<div className="single__containerItemRight">
						<h4>{country.population}</h4>
					</div>
				</div>
				<div className="single__containerItem">
					<div className="single__containerItemLeft">
						<h4>Borders</h4>
					</div>
					<div className="single__containerItemRight">
						{country.borders !== undefined ? (
							country.borders.map((single) => (
								<Link
									to={{
										pathname: `/${single}`,
										state: {
											code: single,
										},
									}}
								>
									<p
										className={
											props.mode
												? "table__link__dark"
												: "table__link__light"
										}
									>
										{single}
									</p>
								</Link>
							))
						) : (
							<p>Data not available</p>
						)}
					</div>
				</div>
				<div className="single__containerItem">
					<div className="single__containerItemLeft">
						<h4>(lat,long)</h4>
					</div>
					<div className="single__containerItemRight">
						{/* {country.latlng !== undefined ? (
							country.latlng.map((single) => <p>{single}</p>)
						) : (
							<p>Data not available</p>
						)} */}
						{latlonghandle()}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Country;
