<script setup>
	const props = defineProps({
		errorMsg: String,
		hasError: { type: Boolean, required: false, default: false },
		inputId: String,
		inputType: { type: String, required: false, default: "text" },
		labelText: { type: String, required: true },
		maxLength: { type: Number, required: false, default: 30 },
		placeHolder: { type: String, required: false },
		showLabel: { type: Boolean, required: false, default: true },
		textInput: { type: String, required: true },
	});

	const emit = defineEmits(["emitTextInput"]);

	function handleInputChange(e) {
		emit("emitTextInput", e);
	}
</script>

<template>
	<div
		class="input-wrapper"
		:class="{ error: hasError }">
		<label
			for="username"
			:class="{ hidden: !showLabel }"
			>{{ labelText }}</label
		>
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
	}

	input {
		border: 1px solid var(--clr-black-1);
		border-radius: 0.3rem;
		font-size: 1.1rem;
		padding: 0.5rem;
		width: 100%;
		position: relative;
	}

	label.hidden {
		opacity: 0;
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
