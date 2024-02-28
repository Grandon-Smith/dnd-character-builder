<script setup>
	import { useRouter, useRoute } from "vue-router";
	import { useUserDataStore } from "./store";
	import { onMounted } from "vue";

	const store = useUserDataStore();

	const route = useRoute();
	const router = useRouter();

	onMounted(() => {
		console.log("App mounted");
		store.setMockData();
		//remember to check out the DND API for data.
	});
</script>

<template>
	<router-view :key="route.fullPath"> </router-view>
</template>

<style scoped></style>
