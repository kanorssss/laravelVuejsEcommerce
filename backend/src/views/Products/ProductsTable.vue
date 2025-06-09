<template>
    <div class="p-6">
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
                @change="getProducts(null)"
                placeholder="Type to Search products"
                class="sborder border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            />
        </div>

        <!-- Table section -->
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table class="w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <TableHeadingCell
                            @click="sortProduct"
                            class="text-left py-4 px-6 font-semibold text-gray-700"
                            field="id"
                            :sort-field="sortField"
                            :sort-direction="sortDirection"
                        >
                            ID
                        </TableHeadingCell>
                        <TableHeadingCell
                            class="text-left py-4 px-6 font-semibold text-gray-700"
                            field=""
                            :sort-field="sortField"
                            :sort-direction="sortDirection"
                        >
                            Image
                        </TableHeadingCell>
                        <TableHeadingCell
                            @click="sortProduct"
                            class="text-left py-4 px-6 font-semibold text-gray-700"
                            field="title"
                            :sort-field="sortField"
                            :sort-direction="sortDirection"
                        >
                            Title
                        </TableHeadingCell>
                        <TableHeadingCell
                            @click="sortProduct"
                            class="text-left py-4 px-6 font-semibold text-gray-700"
                            field="price"
                            :sort-field="sortField"
                            :sort-direction="sortDirection"
                        >
                            Price
                        </TableHeadingCell>
                        <TableHeadingCell
                            @click="sortProduct"
                            class="text-left py-4 px-6 font-semibold text-gray-700"
                            field="updated_at"
                            :sort-field="sortField"
                            :sort-direction="sortDirection"
                        >
                            Updated At
                        </TableHeadingCell>
                    </tr>
                </thead>
                <tbody v-if="products.loading">
                    <tr>
                        <td colspan="5">
                            <SpinnerView class="my-4" v-if="products.loading" />
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
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
            <!-- <SpinnerView class="my-4" v-if="products.loading" /> -->
            <!-- pagination -->
            <div
                class="flex flex-col sm:flex-row justify-between items-center mt-10 space-y-4 sm:space-y-0 my-5"
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
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import store from "../../store/index.js";
import SpinnerView from "../../components/CORE/SpinnerView.vue";
import { PRODUCTS_PER_PAGE } from "../../constants.js";
import TableHeadingCell from "../../components/CORE/Table/TableHeadingCell.vue";

//working for products table
const perPage = ref(PRODUCTS_PER_PAGE);
const search = ref("");

const products = computed(() => store.state.products);
//sortField
const sortField = ref("updated_at");
const sortDirection = ref("desc");

//register or create getProducts on action.js
onMounted(() => {
    getProducts();
});
// Function to fetch products from the store
//accept the url on pagination
function getProducts(url = null) {
    console.log(perPage.value, search.value);
    store.dispatch("getProducts", {
        url,
        search: search.value,
        perPage: perPage.value,
        sortField: sortField.value,
        sortDirection: sortDirection.value,
    });
}

// Function to handle pagination
function getForPage(ev, link) {
    if (!link.url || link.active) {
        ev.preventDefault(); // Prevent default action if no URL or already active
        return; // If there's no URL, do nothing
    }

    getProducts(link.url);
}

// Function to sort products
function sortProduct(field) {
    if (sortField.value === field) {
        // toggle direction
        sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
        sortField.value = field;
        sortDirection.value = "asc"; // default to ascending if a new field is selected
    }
    // Call getProducts to apply sorting
    // Note: This assumes your backend supports sorting based on the field and direction
    getProducts();
}
</script>
