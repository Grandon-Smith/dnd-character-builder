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
	<div class="login-screen-bg">
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
					:textInput="emailInput.textVal"
					v-on:emitTextInput="(e) => setTextInputValue('email', e)" />
				<TextInput
					:textInput="passwordInput.textVal"
					labelText="Password"
					inputType="password"
					inputId="password"
					:maxLength="20"
					:hasError="passwordInput.hasError"
					:errorMsg="passwordInput.errorMsg"
					v-on:emitTextInput="(e) => setTextInputValue('pass', e)" />

				<button
					class="login-submit-btn"
					type="submit">
					Login
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
	</div>
</template>

<style scoped>
	.login-screen-bg {
		height: 100%;
		background: linear-gradient(
			150deg,
			var(--clr-red-1),
			var(--clr-red-1) 35%,
			var(--clr-red-2) 35%,
			var(--clr-red-2) 40%,
			var(--clr-red-3) 40%,
			var(--clr-red-3) 45%,
			#ffffff 45%,
			#ffffff 65%,
			var(--clr-grey-3) 65%,
			var(--clr-grey-3) 70%,
			var(--clr-grey-2) 70%,
			var(--clr-grey-2) 75%,
			var(--clr-font-main) 75%,
			var(--clr-font-main) 100%
		);
	}

	.login-screen-container {
		padding: 20% 0 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.login-screen-container h1 {
		color: #ffffff;
		font-weight: 400;
		text-align: center;
	}

	form {
		background-color: rgb(203, 203, 203);
		border-radius: 2em;
		width: 100%;
		max-width: 25em;
		padding: 1em 1.5em;
		margin: 3em 0;
		display: flex;
		flex-direction: column;
	}

	.login-submit-btn {
		border: 1px solid #000;
		border-radius: 2em;
		padding: 0.75em 1em;
		width: 6em;
		display: block;
		margin: 0 auto 2rem auto;
	}

	.forgot-pass {
		margin-bottom: 1rem;
	}

	@media only screen and (min-width: 350px) {
		.login-screen-container {
			padding: 20% 1.5rem 0 1.5rem;
		}
		form {
			padding: 1.5rem 2rem;
		}
	}
</style>
