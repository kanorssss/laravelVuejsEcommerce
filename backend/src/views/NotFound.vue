<template>
    <div class="flex justify-center items-center min-h-full w-full min-w-full">
        <div class="text-indigo-600 text-5xl px-8 font-bold border-r pb-8">
            404
        </div>
        <div class="px-8">
            <h1 class="text-5xl font-bold mb-2">Page not Found</h1>
            <p class="text-gray-700 mb-8">
                Please check the URL in the address basr and try again
            </p>
            <div>
                <router-link
                    :to="{ name: 'app.dashboard' }"
                    class="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Go back home
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup></script>
