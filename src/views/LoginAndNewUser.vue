<script setup>
	import TextInput from "../components/TextInput.vue";
	import { ref } from "vue";
	import { validateEmail, encodeText } from "../utils";
	import { useUserDataStore } from "../store";
	import { useRoute } from "vue-router";
	import { authServices } from "../services/services.auth";

	const route = useRoute();
	const store = useUserDataStore();

	const isCreateAcctPage = ref(route.path === "/create-account");
	const usernameInput = ref({
		textVal: "",
		hasError: false,
		errorMsg: "",
	});
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

	function checkName() {
		if (usernameInput.value.textVal.length < 3) {
			usernameInput.value.hasError = true;
			if (!usernameInput.value.textVal.length) {
				usernameInput.value.errorMsg = "Please enter a user name";
			}
			usernameInput.value.errorMsg = "User name must be longer";
		}
	}

	function checkPassword() {
		if (!passwordInput.value.textVal.length) {
			passwordInput.value.hasError = true;
			passwordInput.value.errorMsg = "Please enter a password";
			return;
		}
	}

	function handleFormSubmit() {
		if (isCreateAcctPage) {
			checkName();
		}

		checkEmail();
		checkPassword();

		if (emailInput.value.hasError || passwordInput.value.hasError) {
			return;
		}

		// const HASHPASS = encodeText(passwordInput.value.textVal);
		const HASHPASS = passwordInput.value.textVal;
		const BODY = JSON.stringify({
			email: emailInput.value.textVal,
			password: HASHPASS,
			userName: usernameInput.value.textVal
				? usernameInput.value.textVal
				: null,
		});

		const OPTIONS = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: BODY,
		};

		store.fetchingData = true;

		if (isCreateAcctPage.value) {
			// new user submit
			authServices.handleMakeNewUser(OPTIONS);
		} else {
			// login submit
			// authServices.handleLogin(OPTIONS);
			store.login(emailInput.value.textVal, HASHPASS);
		}
	}

	function setTextInputValue(inputField, e) {
		// event listner function for input components
		// func uses 'this' keyword to bind to the text input
		// variables. inputField arg will be eg. emailInput, so this func
		// can handle each of the 3 input types
		this[inputField].textVal = e.target.value;
		this[inputField].hasError = false;
		this[inputField].errorMsg = "";
	}
</script>

<template>
	<div class="login-screen-container">
		<h1>
			{{
				isCreateAcctPage
					? "Welcome New Adventurer!"
					: "Welcome Back Adventurer"
			}}
		</h1>
		<form @submit.prevent="handleFormSubmit">
			<TextInput
				v-if="isCreateAcctPage"
				:errorMsg="usernameInput.errorMsg"
				:hasError="usernameInput.hasError"
				inputId="username"
				labelText="username"
				:showLabel="false"
				placeHolder="Name"
				:textInput="usernameInput.textVal"
				v-on:emitTextInput="
					(e) => setTextInputValue('usernameInput', e)
				" />
			<TextInput
				:errorMsg="emailInput.errorMsg"
				:hasError="emailInput.hasError"
				inputId="email"
				labelText="Email"
				:showLabel="false"
				:maxLength="75"
				placeHolder="Example@email.com"
				:textInput="emailInput.textVal"
				v-on:emitTextInput="
					(e) => setTextInputValue('emailInput', e)
				" />
			<TextInput
				:textInput="passwordInput.textVal"
				labelText="Password"
				:showLabel="false"
				inputType="password"
				inputId="password"
				:maxLength="20"
				placeHolder="Password"
				:hasError="passwordInput.hasError"
				:errorMsg="passwordInput.errorMsg"
				v-on:emitTextInput="
					(e) => setTextInputValue('passwordInput', e)
				" />
			<p v-if="store.errorMsg.length">
				{{ store.errorMsg }}
			</p>
			<button
				:disabled="store.isFetching === true"
				class="login-submit-btn btn-1"
				type="submit">
				{{ isCreateAcctPage ? "Create Account" : "Log in" }}
			</button>
			<p
				class="forgot-pass"
				v-if="isCreateAcctPage">
				Have an account?
				<router-link to="/login">Log in</router-link>
			</p>
			<p
				class="forgot-pass"
				v-if="isCreateAcctPage">
				<router-link to="/">Forgot password?</router-link>
			</p>
			<p v-if="!isCreateAcctPage">
				Don't have an account?
				<router-link to="/create-account">Sign up</router-link>
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
		margin: 2rem auto 1rem auto;
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
