<script setup>
import { ref } from "vue";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateEmail, encodeText, createFormObj } from "../utils";
import { useStore } from "../store";
import { useRoute } from "vue-router";
import { authServices } from "../services/auth";
import {
  PhEnvelopeSimple,
  PhLock,
  PhDoorOpen,
  PhUserPlus,
} from "@phosphor-icons/vue";

const route = useRoute();
const store = useStore();

const isCreateAcctPage = ref(route.path === "/create-account");
const usernameInput = ref("");
const emailInput = ref("");
const passwordInput = ref("");

function checkEmail() {
  let isEmailValid = false;
  if (!emailInput.value.length) {
    emailInput.value = "Please enter an email address";
    return;
  }

  isEmailValid = validateEmail(emailInput.value);

  if (!isEmailValid) {
    emailInput.value = "Please enter a valid email address";
    return;
  }
}

function checkName() {
  if (usernameInput.value.length < 3) {
    usernameInput.value = "User name must be longer";
  }
}

function checkPassword() {
  if (!passwordInput.value.length) {
    passwordInput.value.hasError = true;
    passwordInput.value.errorMsg = "Please enter a password";
    return;
  }
}

async function submitLoginForm() {
  if (isCreateAcctPage) {
    checkName();
  }

  checkEmail();
  checkPassword();

  if (emailInput.value.hasError || passwordInput.value.hasError) {
    return;
  }

  const hashedPassword = encodeText(passwordInput.value.textVal);
  const postBody = createFormObj(
    isCreateAcctPage.value,
    usernameInput.value.textVal,
    emailInput.value.textVal,
    hashedPassword,
  );

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: postBody,
  };

  if (isCreateAcctPage.value) {
    // new user submit
    authServices.handleMakeNewUser(options);
  } else {
    // login submit
    await authServices.handleLogin(options);
  }
}
</script>

<template>
  <div
    class="login-screen-container flex flex-col items-center min-h-screen justify-center"
  >
    <form @submit.prevent="submitLoginForm">
      <h1 class="text-4xl font-extrabold mb-8 text-shadow-lg">
        {{
          isCreateAcctPage
            ? "Welcome New Adventurer!"
            : "Welcome Back Adventurer"
        }}
      </h1>
      <div class="w-full mb-6">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel class="font-bold" for="email">
                <PhEnvelopeSimple :size="24" /> Email
              </FieldLabel>
              <Input
                class="w-full bg-white"
                id="email"
                type="email"
                placeholder="baron.vonswordson@dungeonmail.com"
                v-model="emailInput"
              />
              <FieldDescription> Enter your email address. </FieldDescription>
            </Field>
            <Field>
              <FieldLabel class="font-bold" for="password">
                <PhLock :size="24" /> Password
              </FieldLabel>
              <Input
                class="w-full bg-white"
                id="password"
                type="password"
                placeholder="********"
                v-model="passwordInput"
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
      <div class="flex items-center justify-between gap-4">
        <Button :disabled="store.isFetching" class="login-submit-btn">
          <PhUserPlus v-if="isCreateAcctPage" />
          <PhDoorOpen v-else />

          {{ isCreateAcctPage ? "Create Account" : "Log in" }}
        </Button>
        <p class="forgot-pass" v-if="isCreateAcctPage">
          Have an account?
          <router-link class="underline" to="/login">Log in</router-link>
        </p>
        <p class="forgot-pass" v-if="isCreateAcctPage">
          <router-link class="underline" to="/">Forgot password?</router-link>
        </p>
        <div v-if="!isCreateAcctPage">
          Don't have an account?
          <router-link class="underline" to="/create-account"
            >Sign up</router-link
          >
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-screen-container {
  background-image: url("../assets/login-bg.jpg");
  background-size: cover;
}
</style>
