<template>
    <header class="flex justify-between items-center p-3 h-14 shadow bg-white">
        <button
            @click="emit('toggle-sidebar')"
            class="flex items-center justify-center rounded transition-colors w-8 h-8 text-gray-700 hover:bg-black/10"
        >
            <Bars3Icon class="w-6" />
        </button>

        <Menu as="div" class="relative inline-block text-left">
            <div>
                <MenuButton class="flex items-center">
                    <img
                        src="https://randomuser.me/api/portraits/men/51.jpg"
                        alt=""
                        class="rounded-full w-8 mr-2"
                    />
                    <small>{{ currentUser.name }}</small>
                    <ChevronDownIcon
                        class="h-5 w-5 text-violet-200 hover:text-violet-100"
                        aria-hidden="tr8"
                    />
                </MenuButton>
            </div>

            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
                <MenuItems
                    class="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                >
                    <div class="px-1 py-1">
                        <MenuItem v-slot="{ active }">
                            <button
                                :class="[
                                    active
                                        ? 'bg-indigo-500 text-white'
                                        : 'text-gray-900',
                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                ]"
                            >
                                <UsersIcon
                                    :active="active"
                                    class="mr-2 h-5 w-5 text-indigo-400"
                                    aria-hidden="true"
                                />
                                Profile
                            </button>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                            <button
                                :class="[
                                    active
                                        ? 'bg-indigo-500 text-white'
                                        : 'text-gray-900',
                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                ]"
                                @click="logout"
                            >
                                <ArrowLongDownIcon
                                    :active="active"
                                    class="mr-2 h-5 w-5 text-indigo-400"
                                    aria-hidden="true"
                                />
                                Logout
                            </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </header>
</template>

<script setup>
import {
    HomeIcon,
    UsersIcon,
    Bars3Icon,
    ChartBarIcon,
    ArrowLongDownIcon,
} from "@heroicons/vue/24/outline";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import store from "../store";
import router from "../router";
import { computed, onMounted } from "vue";

//emit toggle to the parent omponent
const emit = defineEmits(["toggle-sidebar"]);

// Fetch user data when the component is mounted if meron na siyang token
const currentUser = computed(() => store.state.user.data);
onMounted(() => {
    if (store.state.user.token) {
        store.dispatch("getUser").catch((error) => {
            store.commit("setToken", null);
            store.commit("setUser", {});
        });
    }
});
//end

function logout() {
    store.dispatch("logout").then(() => {
        router.push({ name: "login" });
    });
}
</script>

<style></style>
