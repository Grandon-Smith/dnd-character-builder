<script setup>
	import { onMounted } from "vue";
	import { useStore } from "../store";
	import { ref } from "vue";

	const store = useStore();
	const props = defineProps({
		headerText: String,
	});

	const floatingNavOptions = [
		{
			text: "Choose Character",
			path: "/choose-character",
		},
		{
			text: "Add Character",
			path: "/add-character",
		},
		{
			text: "Add Member",
			path: "/add-member",
		},
		{
			text: "Log Out",
			path: "/",
		},
	];

	const showFloatNav = ref(false);

	function toggleFloatingNav() {
		showFloatNav.value = !showFloatNav.value;
	}
</script>

<template>
	<nav>
		<div class="float-nav-container">
			<button
				aria-label="navigation menu"
				class="nav-btn"
				@click="toggleFloatingNav">
				<div class="nav-btn-line"></div>
				<div class="nav-btn-line"></div>
				<div class="nav-btn-line"></div>
			</button>

			<ul
				class="floating-nav"
				v-if="showFloatNav">
				<li
					v-for="link in floatingNavOptions"
					:key="link.path">
					<router-link :to="link.path">{{ link.text }}</router-link>
				</li>
			</ul>
		</div>
		<h2>{{ headerText }}</h2>
	</nav>
</template>

<style scoped>
	nav {
		background-color: #ffffff54;
		display: flex;
		align-items: center;
		padding: 0.5rem;
		position: relative;
	}

	nav h2 {
		width: 100%;
		text-align: center;
		font-weight: 700;
	}

	nav h2::before {
		background-color: var(--clr-red-1);
		border-radius: 100% 100% 100% 100%;
		content: "";
		width: 90%;
		height: 0.35rem;
		position: absolute;
		bottom: -0.25rem;
		right: 5%;
	}

	.float-nav-container {
		position: relative;
	}

	.nav-btn {
		aspect-ratio: 1/1;
		background: transparent;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;
		padding: 0.5rem 0.25rem;
		height: 2rem;
	}

	.nav-btn-line {
		height: 2px;
		width: 100%;
		background-color: var(--clr-black-1);
	}

	.floating-nav {
		background-color: #e7e7e7;
		border: 1px solid var(--clr-grey-1);
		position: absolute;
		left: 0;
		z-index: 1;
	}

	.floating-nav li a {
		display: block;
		white-space: nowrap;
		border-bottom: 1px solid var(--clr-grey-1);
		padding: 0.25rem 1rem;
	}

	.floating-nav li a:hover,
	.floating-nav li a:focus {
		background-color: #fce4f1;
	}
</style>
