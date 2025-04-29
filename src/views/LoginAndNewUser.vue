<script setup>
import TextInput from "../components/TextInput.vue";
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { validateEmail, encodeText } from "../utils";
import { useUserDataStore } from "../store";
import { useRoute } from "vue-router";
import { authServices } from "../services/auth";

const route = useRoute();
const store = useUserDataStore();

const isCreateAcctPage = ref(route.path === "/create-account");
const usernameInput = ref({
  textVal: "",
  hasError: false,
  errorMsg: "",
});
const emailInput = ref({
  textVal: "",
  hasError: false,
  errorMsg: "",
});
const passwordInput = ref({
  textVal: "",
  hasError: false,
  errorMsg: "",
});

function checkEmail() {
  let isEmailValid = false;
  if (!emailInput.value.textVal.length) {
    emailInput.value.hasError = true;
    emailInput.value.errorMsg = "Please enter an email address";
    return;
  }

  isEmailValid = validateEmail(emailInput.value.textVal);

  if (!isEmailValid) {
    emailInput.value.hasError = true;
    emailInput.value.errorMsg = "Please enter a valid email address";
    return;
  }
}

function checkName() {
  if (usernameInput.value.textVal.length < 3) {
    usernameInput.value.hasError = true;
    if (!usernameInput.value.textVal.length) {
      usernameInput.value.errorMsg = "Please enter a user name";
    }
    usernameInput.value.errorMsg = "User name must be longer";
  }
}

function checkPassword() {
  if (!passwordInput.value.textVal.length) {
    passwordInput.value.hasError = true;
    passwordInput.value.errorMsg = "Please enter a password";
    return;
  }
}

async function handleFormSubmit() {
  store.fetchingData = true;

  if (isCreateAcctPage) {
    checkName();
  }

  checkEmail();
  checkPassword();

  if (emailInput.value.hasError || passwordInput.value.hasError) {
    return;
  }

  const HASHPASS = encodeText(passwordInput.value.textVal);
  console.log(HASHPASS);
  const BODY = JSON.stringify({
    email: emailInput.value.textVal,
    password: HASHPASS,
    userName: usernameInput.value.textVal ? usernameInput.value.textVal : null,
  });

  const OPTIONS = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: BODY,
  };

  if (isCreateAcctPage.value) {
    // new user submit
    authServices.handleMakeNewUser(OPTIONS);
  } else {
    // login submit
    await authServices.handleLogin(BODY);
  }
}

function setTextInputValue(inputField, e) {
  // event listner function for input components
  // func uses 'this' keyword to bind to the text input
  // variables. inputField arg will be eg. emailInput, so this func
  // can handle each of the 3 input types
  this[inputField].textVal = e.target.value;
  this[inputField].hasError = false;
  this[inputField].errorMsg = "";
}
</script>

<template>
  <div
    class="login-screen-container flex flex-col justify-center items-center overflow-auto h-full"
  >
    <h1 class="text-5xl font-extrabold text-center">
      {{
        isCreateAcctPage ? "Welcome New Adventurer!" : "Welcome Back Adventurer"
      }}
    </h1>
    <form
      @submit.prevent="handleFormSubmit"
      class="flex flex-col px-4 md:px-8 my-8 w-full max-w-[25em]"
    >
      <TextInput
        v-if="isCreateAcctPage"
        :errorMsg="usernameInput.errorMsg"
        :hasError="usernameInput.hasError"
        inputId="username"
        labelText="username"
        :showLabel="false"
        placeHolder="Name"
        :textInput="usernameInput.textVal"
        v-on:emitTextInput="(e) => setTextInputValue('usernameInput', e)"
      />
      <TextInput
        :errorMsg="emailInput.errorMsg"
        :hasError="emailInput.hasError"
        inputId="email"
        labelText="Email"
        :showLabel="false"
        :maxLength="75"
        placeHolder="Example@email.com"
        :textInput="emailInput.textVal"
        v-on:emitTextInput="(e) => setTextInputValue('emailInput', e)"
      />
      <TextInput
        :textInput="passwordInput.textVal"
        labelText="Password"
        :showLabel="false"
        inputType="password"
        inputId="password"
        :maxLength="20"
        placeHolder="Password"
        :hasError="passwordInput.hasError"
        :errorMsg="passwordInput.errorMsg"
        v-on:emitTextInput="(e) => setTextInputValue('passwordInput', e)"
      />
      <p v-if="store.errorMsg.length">
        {{ store.errorMsg }}
      </p>
      <!-- :disabled="store.isFetching === true" -->
      <Button class="login-submit-btn text-xl mb-2" type="submit">
        {{ isCreateAcctPage ? "Create Account" : "Log in" }}
      </Button>
      <p class="forgot-pass mb-4" v-if="isCreateAcctPage">
        Have an account?
        <router-link to="/login">Log in</router-link>
      </p>
      <p class="forgot-pass mb-4" v-if="isCreateAcctPage">
        <router-link to="/">Forgot password?</router-link>
      </p>
      <p v-if="!isCreateAcctPage">
        Don't have an account?
        <router-link to="/create-account">Sign up</router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
.login-screen-container {
  background-image: url("../assets/login-bg.jpg");
  background-size: cover;
  padding: 20% 0 0 0;
}

@media only screen and (min-width: 350px) {
  .login-screen-container {
    padding: 20% 1.5rem 0 1.5rem;
  }
}
</style>
