<template>
    <div class="min-h-full flex">
        <!-- sidebar  -->
        <SidebarView />
        <!-- sidebar  -->
        <div class="flex-1">
            <!-- header  -->
            <TopHeader />
            <!-- header  -->

            <!-- content here on main -->
            <main class="p-6">
                <router-view></router-view>
            </main>
            <!-- content -->
        </div>
    </div>
</template>

<script setup>
import SidebarView from "./SidebarView.vue";
import TopHeader from "./TopHeader.vue";

const { title } = defineProps({
    title: String,
});
</script>

<style></style>
