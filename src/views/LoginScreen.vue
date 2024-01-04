<script setup lang="ts">
	import { ref, onMounted } from "vue";
	import { useRouter, useRoute } from "vue-router";
	import { useUserDataStore } from "../store";

	const store = useUserDataStore();

	const route = useRoute();
	const router = useRouter();

	defineProps({
		msg: String,
	});

	const usernameInput = ref("");
	const passwordInput = ref("");

	function handleLoginSubmit() {
		console.log("handle login");
		console.log("asfsd", route, router);

		store.fetchingData = true;
		setTimeout(() => {
			router.push("/choose-character");
			store.setMockData();
			store.fetchingData = false;
		}, 1000);

		// if (!usernameInput.value.length || !passwordInput.value.length) {
		// 	return;
		// }

		// send data to back end
		// back end validates username matches with password given.
		// if match, send success status and redirect to user account character sheet.
		// if fail, send failure status with specific failure type.
	}
</script>

<template>
	<div class="login-screen-bg">
		<div class="login-screen-container">
			<h1>Welcome Adventurer</h1>
			<form @submit.prevent="handleLoginSubmit">
				<div class="login-form-section">
					<label for="username">Username</label>
					<input
						type="text"
						id="username"
						v-model="usernameInput" />
				</div>
				<div class="login-form-section">
					<label for="password">Password</label>
					<input
						type="password"
						id="password"
						v-model="passwordInput" />
				</div>

				<button
					class="login-submit-btn"
					type="submit">
					login
				</button>
				<p><router-link to="/">Forgot password?</router-link></p>
				<p>
					Don't have an account?
					<router-link to="/">Sign up</router-link>
				</p>
			</form>
		</div>
	</div>
</template>

<style scoped>
	label {
		display: block;
		margin-bottom: 0.35em;
		padding-left: 0.25em;
	}

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
		padding: 20% 1em 0 1em;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.login-screen-container h1 {
		color: #ffffff;
		font-weight: 400;
	}

	form {
		background-color: rgb(203, 203, 203);
		border-radius: 2em;
		width: 100%;
		max-width: 25em;
		padding: 2em;
		margin: 5em 0;
		display: flex;
		flex-direction: column;
	}

	.login-form-section {
		margin-bottom: 2em;
	}
	.login-form-section input {
		border: 1px solid #000;
		border-radius: 2em;
		padding: 0.75em 1em;
		width: 100%;
	}

	.login-submit-btn {
		border: 1px solid #000;
		border-radius: 2em;
		padding: 0.75em 1em;
		width: 6em;
		display: block;
		margin: 0 auto;
	}

	@media only screen and (min-width: 600px) {
		form {
			display: flex;
			flex-direction: column;
		}
	}
</style>
