export function validateEmail(email) {
	var regexEmail =
		/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

	if (!email.match(regexEmail)) {
		return false;
	}

	return true;
}

export function encodeText(string) {
	const enc = new TextEncoder();
	return Array.from(enc.encode(string), (point) =>
		point.toString(16)
	).join("");
}

export function createFormObj(
	isCreateAcctPage,
	username,
	email,
	password
) {
	const formDataObj = {
		email,
		password,
	};

	if (isCreateAcctPage) {
		formDataObj.username = username;
	}

	return JSON.stringify(formDataObj);
}

export function calcProficiencyBonus(level) {
	return 2 + Math.floor((level - 1) / 4);
}

export function calcAbilityModifier(score) {
	return Math.floor((score - 10) / 2);
}
