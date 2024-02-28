<script setup>
	import { defineEmits, onMounted } from "vue";

	const props = defineProps({
		textInput: String,
		labelText: String,
		inputType: String,
		inputId: String,
		maxLength: Number,
		placeHolder: String,
		hasError: Boolean,
		errorMsg: String,
	});

	const emit = defineEmits(["emitTextInput"]);

	onMounted(() => {
		console.log("text Input mount");
	});

	function handleInputChange(e) {
		emit("emitTextInput", e);
	}
</script>

<template>
	<div
		class="input-wrapper"
		:class="{ error: hasError }">
		<label for="username">{{ labelText }}</label>
		<input
			:id="inputId"
			:maxlength="maxLength"
			:placeholder="placeHolder"
			:type="inputType"
			:value="textInput"
			@input="(e) => handleInputChange(e)" />
		<Transition>
			<p
				v-if="hasError"
				class="error-text"
				:aria-hidden="!hasError">
				{{ errorMsg }}
			</p>
		</Transition>
	</div>
</template>

<style scoped>
	.input-wrapper {
		padding-bottom: 1.25rem;
		transition: all 0.3s ease;
		position: relative;
	}

	label {
		display: block;
		opacity: 0;
	}

	input {
		border: 1px solid var(--clr-black-1);
		border-radius: 0.3rem;
		font-size: 1.1rem;
		padding: 0.5rem;
		width: 100%;
		position: relative;
	}

	.error-text {
		color: var(--clr-error-red);
		position: absolute;
		top: 4.25rem;
		left: 1em;
	}

	.input-wrapper.error {
		padding-bottom: 2.5rem;
	}

	.input-wrapper.error input {
		border: 2px solid var(--clr-error-red);
	}

	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.3s ease;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}

	@media only screen and (min-width: 400px) {
		.input-wrapper {
			position: relative;
		}
	}
</style>
