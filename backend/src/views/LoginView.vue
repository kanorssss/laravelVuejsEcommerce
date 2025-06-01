<script setup>
import { ref } from "vue";
import GuestLayouts from "../components/GuestLayouts.vue";
import store from "../store";
import router from "../router";

let loading = ref(false);
let errorMsg = ref("");

const user = {
    email: "",
    password: "",
    remember: false,
};

function submit() {
    loading.value = true;
    store
        .dispatch("login", user)
        .then(() => {
            loading.value = false;
            router.push({ name: "app.dashboard" });
        })
        .catch((error) => {
            loading.value = false;
            errorMsg.value = error.response.data.message;
        });
}
</script>

<template>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <GuestLayouts title="Sign in to your account" />
        <form @submit.prevent="submit">
            <div>
                <label
                    for="email"
                    class="block text-sm/6 font-medium text-gray-900"
                    >Email address</label
                >
                <div class="mt-2">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autocomplete="email"
                        required=""
                        v-model="user.email"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label
                        for="password"
                        class="block text-sm/6 font-medium text-gray-900"
                        >Password</label
                    >
                    <div class="text-sm">
                        <router-link
                            :to="{ name: 'requestPassword' }"
                            class="font-semibold text-indigo-600 hover:text-indigo-500"
                            >Forgot password?</router-link
                        >
                    </div>
                </div>
                <div class="mt-2">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autocomplete="current-password"
                        required=""
                        v-model="user.password"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div>

            <div class="flex items-center justify-between mt-4">
                <div class="flex items-center">
                    <input
                        id="remember_me"
                        name="remember-me"
                        type="checkbox"
                        v-model="user.remember"
                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                        for="remember_me"
                        class="ml-2 block text-sm text-gray-900"
                        >Remember me</label
                    >
                </div>
            </div>

            <div class="mt-4">
                <button
                    :disabled="loading"
                    type="submit"
                    :class="{
                        'cursor-not-allow': loading,
                        'opacity-50': loading,
                    }"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Sign in
                </button>
            </div>
        </form>
        <GuestLayouts />
    </div>
</template>

<style></style>
