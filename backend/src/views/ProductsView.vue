<template>
    <div class="p-6">
        <!-- Header section with title and button -->
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-4xl font-bold">Products</h1>
            <button
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
            >
                Add new Product
            </button>
        </div>

        <!-- Controls section -->
        <div class="flex items-center gap-4 mb-6">
            <div class="flex items-center gap-2">
                <span class="text-gray-700">Per Page</span>
                <select
                    @change="getProducts(null)"
                    v-model="perPage"
                    class="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            <input
                type="text"
                v-model="search"
                placeholder="Type to Search products"
                class="sborder border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            />
        </div>

        <!-- Table section -->
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table class="w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th
                            class="text-left py-4 px-6 font-semibold text-gray-700"
                        >
                            ID
                        </th>
                        <th
                            class="text-left py-4 px-6 font-semibold text-gray-700"
                        >
                            Image
                        </th>
                        <th
                            class="text-left py-4 px-6 font-semibold text-gray-700"
                        >
                            Title
                        </th>
                        <th
                            class="text-left py-4 px-6 font-semibold text-gray-700"
                        >
                            Price
                        </th>
                        <th
                            class="text-left py-4 px-6 font-semibold text-gray-700"
                        >
                            Updated At
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <!-- LOOP PRODUCT TO DISPLAY ITEMS  -->
                    <!-- <tr
                        class="border-t border-gray-200"
                        v-for="product of products.data"
                    ></tr> -->
                    <tr v-for="product in products.data" :key="product.id">
                        <td class="py-4 px-6">{{ product.id }}</td>
                        <td class="py-4 px-6">
                            <img
                                :src="product.image"
                                class="w-16 h-16 object-cover rounded"
                            />
                        </td>
                        <td class="py-4 px-6">{{ product.title }}</td>
                        <td class="py-4 px-6">{{ product.price }}</td>
                        <td class="py-4 px-6">
                            {{ product.updated_at }}
                        </td>
                    </tr>
                    <!-- Add more rows as needed -->
                </tbody>
            </table>
            <SpinnerView v-if="products.loading" />
            <!-- pagination -->
            <div
                class="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0"
            >
                <span v-if="products.total > 0" class="text-gray-600 text-sm">
                    Showing from {{ products.from }} to {{ products.to }} of
                    {{ products.total }} results
                </span>

                <nav
                    v-if="products.total > products.to"
                    class="inline-flex -space-x-px text-sm shadow-sm"
                    aria-label="Pagination"
                >
                    <a
                        v-for="(link, i) in products.links"
                        :key="i"
                        href="#"
                        @click.prevent="getForPage($event, link)"
                        v-html="link.label"
                        :disabled="!link.url"
                        :aria-current="link.active ? 'page' : null"
                        :class="[
                            'px-3 py-2 border text-sm font-medium',
                            link.active
                                ? 'z-10 bg-blue-600 border-blue-600 text-white'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-100',
                            i === 0 ? 'rounded-l-md' : '',
                            i === products.links.length - 1
                                ? 'rounded-r-md'
                                : '',
                            !link.url ? 'cursor-not-allowed opacity-50' : '',
                        ]"
                    />
                </nav>
            </div>

            <!-- pagination -->
        </div>

        <!-- Spinner (show when loading) -->
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import store from "../store/index.js";
import SpinnerView from "../components/CORE/SpinnerView.vue";
import { PRODUCTS_PER_PAGE } from "../constants.js";

//working for products table
const perPage = ref(PRODUCTS_PER_PAGE);
const search = ref("");

const products = computed(() => store.state.products);
//register or create getProducts on action.js
onMounted(() => {
    getProducts();
});
// Function to fetch products from the store
//accept the url on pagination
function getProducts(url = null) {
    store.dispatch("getProducts", { url });
}

// Function to handle pagination
function getForPage(ev, link) {
    if (!link.url || link.active) {
        ev.preventDefault(); // Prevent default action if no URL or already active
        return; // If there's no URL, do nothing
    }

    getProducts(link.url);
}
</script>
