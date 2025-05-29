<template>
    <div class="w-[200px] transition-all bg-indigo-700 text-gray-300 py-4 px-2">
        <!-- this is the side bar  -->
        <router-link
            :to="{ name: 'app.dashboard' }"
            class="flex items-center py-2 px-3 rounded hover:bg-black/30 transition-colors font-light mb-1"
        >
            <span class="mr-2">
                <HomeIcon class="w-5" />
            </span>
            <span class="text-sm font-light">Dashboard</span>
        </router-link>
        <router-link
            :to="{ name: 'app.products' }"
            class="flex items-center py-2 px-3 rounded hover:bg-black/30 transition-colors font-light mb-1"
        >
            <span class="mr-2">
                <Bars3Icon class="w-5" />
            </span>
            <span class="text-sm font-light">Products</span>
        </router-link>

        <router-link
            :to="{ name: 'app.dashboard' }"
            class="flex items-center py-2 px-3 rounded hover:bg-black/30 transition-colors font-light mb-1"
        >
            <span class="mr-2">
                <UsersIcon class="w-5" />
            </span>
            <span class="text-sm font-light">Users</span>
        </router-link>
        <router-link
            :to="{ name: 'app.dashboard' }"
            class="flex items-center py-2 px-3 rounded hover:bg-black/30 transition-colors font-light mb-1"
        >
            <span class="mr-2">
                <ChartBarIcon class="w-5" />
            </span>
            <span class="text-sm font-light">Reports</span>
        </router-link>
    </div>
</template>

<script setup>
import {
    HomeIcon,
    UsersIcon,
    Bars3Icon,
    ChartBarIcon,
} from "@heroicons/vue/24/outline";
</script>

<style></style>
