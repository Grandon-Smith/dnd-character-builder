<script setup>
	import TextInput from "../components/TextInput.vue";
	import { ref } from "vue";
	import { useUserDataStore } from "../store";
	import { useRouter } from "vue-router";

	const store = useUserDataStore();
	const router = useRouter();

	const emailInput = ref({
		textVal: "",
		hasError: false,
		errorMsg: "",
	});
	const passwordInput = ref({
		textVal: "",
		hasError: false,
		errorMsg: "",
	});

	function checkEmail() {
		let isEmailValid = false;
		if (!emailInput.value.textVal.length) {
			emailInput.value.hasError = true;
			emailInput.value.errorMsg = "Please enter an email address";
			return;
		}

		isEmailValid = validateEmail(emailInput.value.textVal);

		if (!isEmailValid) {
			emailInput.value.hasError = true;
			emailInput.value.errorMsg =
				"Please enter a valid email address";
			return;
		}
	}

	function checkPassword() {
		if (!passwordInput.value.textVal.length) {
			passwordInput.value.hasError = true;
			passwordInput.value.errorMsg = "Please enter a password";
			return;
		}
	}

	function handleLoginSubmit() {
		console.log("handle login");
		checkEmail();
		checkPassword();

		if (emailInput.value.hasError || passwordInput.value.hasError) {
			return;
		}

		store.fetchingData = true;
		setTimeout(() => {
			store.setMockData();
			router.push("/choose-character");
			store.fetchingData = false;
		}, 1000);

		// send data to back end
		// back end validates email matches with password given.
		// if match, send success status and redirect to user account character sheet.
		// if fail, send failure status with specific failure type.
	}

	function setTextInputValue(inputField, e) {
		// event listner function for input components
		if (inputField === "email") {
			// on input in email field, set state value, and end error states
			emailInput.value.textVal = e.target.value;
			emailInput.value.hasError = false;
			emailInput.value.errorMsg = "";
		}

		if (inputField === "pass") {
			// on input in password field, set state value, and end error states
			passwordInput.value.textVal = e.target.value;
			passwordInput.value.hasError = false;
			passwordInput.value.errorMsg = "";
		}
	}

	function validateEmail(email) {
		var regexEmail =
			/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

		if (!email.match(regexEmail)) {
			return false;
		}

		return true;
	}
</script>

<template>
	<div class="login-screen-container">
		<h1>Welcome Adventurer</h1>
		<form @submit.prevent="handleLoginSubmit">
			<TextInput
				:errorMsg="emailInput.errorMsg"
				:hasError="emailInput.hasError"
				inputType="text"
				inputId="email"
				labelText="Email"
				:maxLength="75"
				placeHolder="Example@email.com"
				:textInput="emailInput.textVal"
				v-on:emitTextInput="(e) => setTextInputValue('email', e)" />
			<TextInput
				:textInput="passwordInput.textVal"
				labelText="Password"
				inputType="password"
				inputId="password"
				:maxLength="20"
				placeHolder="Password"
				:hasError="passwordInput.hasError"
				:errorMsg="passwordInput.errorMsg"
				v-on:emitTextInput="(e) => setTextInputValue('pass', e)" />

			<button
				class="login-submit-btn btn-1"
				type="submit">
				Log in
			</button>
			<p class="forgot-pass">
				<router-link to="/">Forgot password?</router-link>
			</p>
			<p>
				Don't have an account?
				<router-link to="/">Sign up</router-link>
			</p>
		</form>
	</div>
</template>

<style scoped>
	.login-screen-container {
		background-image: url("../assets/login-bg.jpg");
		background-size: cover;
		height: 100%;
		padding: 20% 0 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
	}

	.login-screen-container h1 {
		font-weight: 800;
		text-align: center;
	}

	form {
		width: 100%;
		max-width: 25em;
		padding: 0 1.5em;
		margin: 2em 0;
		display: flex;
		flex-direction: column;
	}

	.login-submit-btn {
		border-radius: 0.3rem;
		width: 8em;
		margin: 3rem auto 0.25rem auto;
	}

	.forgot-pass {
		margin-bottom: 1rem;
	}

	@media only screen and (min-width: 350px) {
		.login-screen-container {
			padding: 20% 1.5rem 0 1.5rem;
		}
		form {
			padding: 0 2rem;
		}
	}
</style>
