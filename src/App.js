import React, { useState, useEffect } from "react";
import SelectForm from "./components/SelectForm";
import "./App.css";

import CountryList from "./components/CountryList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Country from "./components/Country";
// import Rest from "./components/Rest";
import Credits from "./components/Credits";

const BASE_URL = "https://restcountries.com/v2/";
function App() {
	const getInitialMode = () => {
		const savedMode = JSON.parse(localStorage.getItem("dark"));
		return savedMode || false;
	};
	const [found, setFound] = useState(true);
	const [countries, setCountries] = useState([]);
	const [countryQuery, setCountryQuery] = useState("");
	const [regionQuery, setRegionQuery] = useState("");
	const [regionFoundStatus, setRegionFoundStatus] = useState(false);
	const [darkMode, setDarkMode] = useState(getInitialMode());
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		localStorage.setItem("dark", JSON.stringify(darkMode));
	}, [darkMode]);
	useEffect(() => {
		const fetchCountries = async () => {
			await fetch(`${BASE_URL}all`)
				.then((response) => response.json())
				.then((data) => setCountries(data));
		};
		fetchCountries();
	}, []);
	const handleRegionChange = async (region) => {
		setRegionQuery(region);
		// console.log(regionQuery);
		if (region !== "all") {
			await fetch(`${BASE_URL}region/${region}`)
				.then((response) => response.json())
				.then((data) => setCountries(data));
		} else {
			await fetch(`${BASE_URL}all`)
				.then((response) => response.json())
				.then((data) => setCountries(data));
		}
	};

	const handleCountryChange = (e) => {
		console.log(e.target.value);
		const countryName = e.target.value;
		setCountryQuery(countryName);

		if (e.target.value === "") {
			if (regionQuery === "all") {
				fetch(`${BASE_URL}all`)
					.then((response) => response.json())
					.then((data) => setCountries(data));
			} else {
				fetch(`${BASE_URL}region/${regionQuery}`)
					.then((response) => response.json())
					.then((data) => setCountries(data));
			}
		} else {
			if (regionQuery != "all") {
				fetch(`${BASE_URL}name/${countryName}`)
					.then((response) => response.json())
					.then((data) => {
						setLoading(true);
						if (data.length) {
							let tempCountries = data.map((country) => {
								if (
									country.region.toLowerCase() === regionQuery
								) {
									return country;
								}
							});
							tempCountries = tempCountries.filter(
								(item) => item !== undefined
							);
							if (tempCountries.length) {
								setCountries(tempCountries);
							} else {
								setCountries([]);
								setLoading(false);
							}
						} else {
							setCountries([]);
							setLoading(false);
						}
					});
			} else {
				fetch(`${BASE_URL}name/${countryName}`)
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						setCountries(data);
					});
			}
		}
	};
	const lisstCheck = () => {
		if (loading) {
			countries.length ? setLoading(false) : setLoading(true);
			return (
				<div className="loader__frontpage">
					<div
						class={
							darkMode
								? "loader__dark loader"
								: "loader__light loader"
						}
					></div>
				</div>
			);
		} else {
			if (countries.length) {
				return (
					<CountryList countries={countries} darkMode={darkMode} />
				);
			} else {
				return (
					<div className="loader__frontpage">
						<h3>Not Found</h3>
					</div>
				);
			}
		}
	};
	const listPrinter = () => {
		return (
			<Switch>
				<Route
					exact
					path="/"
					render={() => (
						<div>
							<SelectForm
								countries={countries}
								handleRegionChange={handleRegionChange}
								handleCountryChange={handleCountryChange}
								darkMode={darkMode}
							/>
							{lisstCheck()}
						</div>
					)}
				/>
				{/* <Route
					path="/:countrycode"
					render={(props) => <Rest mode={darkMode} {...props} />}
				/> */}
				<Route
					path="/:countrycode"
					render={(props) => <Country mode={darkMode} {...props} />}
				/>
			</Switch>
		);
	};
	return (
		<div
			className={
				darkMode
					? "dark-mode app__container"
					: "light-mode app__container"
			}
		>
			<Credits darkMode={darkMode} />
			<Router>
				<nav className="nav-wrapper">
					<div className="brand-wrapper">
						<h1>Country Search</h1>
					</div>
					<Link to="/">
						<p
							className={
								darkMode
									? "table__link__dark"
									: "table__link__light"
							}
							style={{ fontSize: 20, fontWeight: 800 }}
						>
							Home
						</p>
					</Link>
					<div className="toggle-wrapper">
						<span>Light</span>
						<label className="switch">
							<input
								type="checkbox"
								defaultChecked={darkMode}
								onChange={() =>
									setDarkMode((previous) => !previous)
								}
							/>
							<span className="slider round"></span>
						</label>
						<span>Dark</span>
					</div>
				</nav>
				<div className="list">{listPrinter()}</div>
			</Router>
		</div>
	);
}

export default App;
