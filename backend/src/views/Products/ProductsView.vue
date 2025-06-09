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
        <ProductsTable />
        <!-- Spinner (show when loading) -->
    </div>
</template>
<script setup>
import ProductsTable from "./ProductsTable.vue";
</script>
