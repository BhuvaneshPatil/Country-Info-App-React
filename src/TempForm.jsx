import React from "react";

function TempForm() {
	const handleChange = (e) => {
		console.log(e.target.text.value);
	};
	return (
		<div>
			<form onChange={handleChange}>
				<input type="text" name="field" />
				<select name="selection">
					<option value="hi">hi</option>
					<option value="hi">hi</option>
					<option value="hi">hi</option>
					<option value="hi">hi</option>
				</select>
			</form>
		</div>
	);
}

export default TempForm;
