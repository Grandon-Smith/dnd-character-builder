<script setup>
	import { defineProps, defineEmits, onMounted } from "vue";

	const props = defineProps({
		textInput: String,
		labelText: String,
		inputType: String,
		inputId: String,
		maxLength: Number,
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
			:type="inputType"
			:id="inputId"
			:value="textInput"
			:maxlength="maxLength"
			@input="(e) => handleInputChange(e)" />
		<!-- <div class="input-error-text-wrapper"> -->
		<Transition>
			<p
				v-if="hasError"
				class="error-text"
				:aria-hidden="!hasError">
				{{ errorMsg }}
			</p>
		</Transition>
	</div>
	<!-- </div> -->
</template>

<style scoped>
	.input-wrapper {
		padding-bottom: 2rem;
		transition: all 0.3s ease;
		position: relative;
	}

	label {
		display: block;
		margin-bottom: 0.2rem;
		margin-left: 0.2rem;
	}

	input {
		border: 1px solid #000;
		border-radius: 2em;
		padding: 0.75em 1em;
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
		padding-bottom: 3.5rem;
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
