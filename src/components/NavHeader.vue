<script setup>
	import { ref, defineProps, onMounted } from "vue";
	import { useUserDataStore } from "../store";
	import {} from "vue";

	const store = useUserDataStore();
	const props = defineProps({
		headerText: String,
	});

	onMounted(() => {
		console.log("navbar mount", store);
	});
</script>

<template>
	<nav>
		<h1>{{ headerText }}</h1>
		<p>
			<router-link to="/login">go login</router-link>
		</p>
		<router-link to="/">go home</router-link>
	</nav>
</template>

<style scoped>
	nav {
		background-color: green;
		/* position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 5em; */
	}
</style>
