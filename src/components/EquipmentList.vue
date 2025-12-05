<script setup>
	import { reactive, computed, ref } from "vue";

	// Sample equipment data
	const equipment = reactive([
		{
			id: 1,
			name: "Longsword",
			category: "weapon",
			equipped: false,
			weight: 3,
			properties: "1d8 slashing, versatile (1d10)",
		},
		{
			id: 2,
			name: "Leather Armor",
			category: "armor",
			equipped: true,
			weight: 10,
			properties: "AC 11 + Dex modifier",
		},
		{
			id: 3,
			name: "Explorer's Pack",
			category: "pack",
			equipped: false,
			weight: 12,
			properties: "Includes backpack, rations, rope, etc.",
		},
	]);

	// Filter categories
	const categories = ["all", "weapon", "armor", "pack"];
	const filterCategory = ref("all");

	// Computed filtered equipment
	const filteredEquipment = computed(() => {
		return filterCategory.value === "all"
			? equipment
			: equipment.filter(
					(item) => item.category === filterCategory.value
			  );
	});

	// Computed total weight
	const totalWeight = computed(() => {
		return equipment.reduce((sum, item) => sum + item.weight, 0);
	});
</script>
<template>
	<div class="equipment-container">
		<h2>Equipment</h2>

		<!-- Category Filter -->
		<div class="filters">
			<button
				v-for="cat in categories"
				:key="cat"
				@click="filterCategory = cat"
				:class="{ active: filterCategory === cat }">
				{{ cat }}
			</button>
		</div>

		<!-- Equipment Table -->
		<table class="equipment-table">
			<thead>
				<tr>
					<th>Equipped</th>
					<th>Name</th>
					<th>Category</th>
					<th>Weight</th>
					<th>Details</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="item in filteredEquipment"
					:key="item.id">
					<td class="center">
						<input
							type="checkbox"
							v-model="item.equipped" />
					</td>
					<td>{{ item.name }}</td>
					<td>{{ item.category }}</td>
					<td>{{ item.weight }} lb</td>
					<td>
						<details>
							<summary>Properties</summary>
							<p>{{ item.properties }}</p>
						</details>
					</td>
				</tr>
			</tbody>
		</table>

		<p class="total-weight">
			<strong>Total Weight:</strong> {{ totalWeight }} lb
		</p>
	</div>
</template>

<style scoped>
	.equipment-container {
		max-width: 700px;
		margin: auto;
		font-family: sans-serif;
	}

	.filters {
		margin-bottom: 10px;
	}

	.filters button {
		margin-right: 5px;
		padding: 5px 10px;
		cursor: pointer;
	}

	.filters button.active {
		background-color: #007bff;
		color: white;
	}

	.equipment-table {
		width: 100%;
		border-collapse: collapse;
	}

	.equipment-table th,
	.equipment-table td {
		border: 1px solid #ccc;
		padding: 8px;
	}

	.equipment-table th {
		background-color: #f0f0f0;
	}

	.center {
		text-align: center;
	}

	.total-weight {
		margin-top: 10px;
		font-weight: bold;
	}
</style>
