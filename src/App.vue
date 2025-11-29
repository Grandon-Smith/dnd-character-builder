<script setup>
	import { useRouter, useRoute } from "vue-router";
	import { useStore } from "./store";
	import { onMounted } from "vue";

	const store = useStore();

	const route = useRoute();
	const router = useRouter();

	onMounted(() => {
		store.setMockData();
		//remember to check out the DND API for data.
	});
</script>

<template>
	<router-view :key="route.fullPath"> </router-view>
</template>

<style scoped></style>
