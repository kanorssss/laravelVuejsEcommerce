<script setup>
import { ref } from "vue";
import GuestLayouts from "../components/GuestLayouts.vue";
import store from "../store";
import router from "../router";

let loading = ref(false);
//error message on
let errorMsg = ref("");

const user = {
    email: "",
    password: "",
    remember: false,
};

function submit() {
    //
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
            <div
                v-if="errorMsg"
                class="flex items-center justify-between py-3 px-5 bg-red-700 text-white rounded"
            >
                <p>{{ errorMsg }}</p>

                <span
                    @click="errorMsg = ''"
                    class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-black/20"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </span>
            </div>
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
                    <svg
                        v-if="loading"
                        class="mr-4 -ml-1 size-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            class="opacity-25 mr-10"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        ></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </button>
            </div>
        </form>
        <GuestLayouts />
    </div>
</template>

<style></style>
