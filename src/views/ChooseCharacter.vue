<script setup>
	import { ref } from "vue";
	import { useUserDataStore } from "../store";
	import { onMounted } from "vue";

	const store = useUserDataStore();
	onMounted(() => {
		console.log("choose char mount", store);
	});
</script>

<template>
	<div>
		<h2>Welcome back {{ store.userData.name }}</h2>
		<p>{{ store.userData }}</p>
	</div>
</template>

<style scoped></style>
