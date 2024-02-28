<script setup>
	import TextInput from "../components/TextInput.vue";
	import { ref } from "vue";
	import { validateEmail, encodeText } from "../utils";
	import { useUserDataStore } from "../store";
	import { useRoute } from "vue-router";

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
		console.log("checking!");
		if (usernameInput.value.textVal.length < 3) {
			usernameInput.value.hasError = true;
			if (!usernameInput.value.textVal.length) {
				usernameInput.value.errorMsg = "Please enter a user name";
			}
			usernameInput.value.errorMsg = "User name must be longer";
			// return;
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
		console.log("submitting");
		// store.fetchingData = true;
		if (isCreateAcctPage) {
			checkName();
		}

		checkEmail();
		checkPassword();

		if (emailInput.value.hasError || passwordInput.value.hasError) {
			return;
		}

		const HASHPASS = encodeText(passwordInput.value.textVal);
		const BODY = JSON.stringify({
			email: emailInput.value.textVal,
			password: HASHPASS,
			userName: usernameInput.value.textVal
				? usernameInput.value.textVal
				: null,
		});

		const OPTIONS = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: BODY,
		};
		console.log("sadfds", OPTIONS);

		// setTimeout(() => {
		// 	store.setMockData();
		// 	router.push("/choose-character");
		// 	store.fetchingData = false;
		// }, 1000);

		if (isCreateAcctPage) {
			handleMakeNewUser(OPTIONS);
		} else {
			handleLogin(OPTIONS);
		}
	}
	async function handleLogin(OPTIONS) {
		await fetch("http://localhost:3000/api/auth", OPTIONS)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	}
	async function handleMakeNewUser(OPTIONS) {
		await fetch("http://localhost:3000/api/auth", OPTIONS)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
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
		<h1>Welcome Adventurer</h1>
		<form @submit.prevent="handleFormSubmit">
			<TextInput
				v-if="isCreateAcctPage"
				:errorMsg="usernameInput.errorMsg"
				:hasError="usernameInput.hasError"
				inputType="text"
				inputId="username"
				labelText="username"
				:maxLength="30"
				placeHolder="Name"
				:textInput="usernameInput.textVal"
				v-on:emitTextInput="
					(e) => setTextInputValue('usernameInput', e)
				" />
			<TextInput
				:errorMsg="emailInput.errorMsg"
				:hasError="emailInput.hasError"
				inputType="text"
				inputId="email"
				labelText="Email"
				:maxLength="75"
				placeHolder="Example@email.com"
				:textInput="emailInput.textVal"
				v-on:emitTextInput="
					(e) => setTextInputValue('emailInput', e)
				" />
			<TextInput
				:textInput="passwordInput.textVal"
				labelText="Password"
				inputType="password"
				inputId="password"
				:maxLength="20"
				placeHolder="Password"
				:hasError="passwordInput.hasError"
				:errorMsg="passwordInput.errorMsg"
				v-on:emitTextInput="
					(e) => setTextInputValue('passwordInput', e)
				" />
			<button
				:disabled="store.fetchingData === true"
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
