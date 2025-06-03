<template>
    <div class="min-h-full flex">
        <SpinnerView />
        <!-- sidebar  -->
        <SidebarView
            :class="{ '-ml-50': !sidebarOpened, 'ml-0': sidebarOpened }"
        />
        <!-- sidebar  -->
        <div class="flex-1">
            <!-- header  -->
            <TopHeader @toggle-sidebar="toggleSidebar" />
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
import { ref, onMounted, onUnmounted } from "vue";
import SidebarView from "./SidebarView.vue";
import TopHeader from "./TopHeader.vue";

const { title } = defineProps({
    title: String,
});

const sidebarOpened = ref(true);
function toggleSidebar() {
    sidebarOpened.value = !sidebarOpened.value;
}

onMounted(() => {
    handleSidebarOpened();
    window.addEventListener("resize", handleSidebarOpened);
});

onUnmounted(() => {
    window.removeEventListener("resize", handleSidebarOpened);
});

function handleSidebarOpened() {
    sidebarOpened.value = window.outerWidth > 768;
}
</script>

<style></style>
