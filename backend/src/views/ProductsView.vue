<template>
    <div class="flex items-center justify-between mb-3">
        <h1 class="text-3xl">Products</h1>
        <!-- BUTTON  -->
        <button
            type="submit"
            class="flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            Add new Products
        </button>
        <!-- BUTTON  -->

        <div class="bg-white p-4 rounded-lg shadow">
            <div class="flex justify-between border-b-2 pb-3">
                <div class="flex items-center">
                    <span class="whitespace-nowrap mr-3">Per page</span>
                    <select
                        v-model="perPage"
                        class="border border-gray-300 rounded-md p-2"
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>
        </div>
        <!-- TABLE  -->

        <!-- SEARCH  -->
        <div>
            <input
                type="text"
                v-model="search"
                placeholder="type to search product"
                class="border border-gray-300 rounded-md p-2 w-full mt-4 focus:outline-none"
            />
        </div>
        <!-- SEARCH  -->

        <!-- SPINNER WITH TABLE  -->
        <SpinnerView />
        <template>
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <th class="border-b-2 p-2 text-left">ID</th>
                        <th class="border-b-2 p-2 text-left">Image</th>
                        <th class="border-b-2 p-2 text-left">Title</th>
                        <th class="border-b-2 p-2 text-left">Price</th>
                        <th class="border-b-2 p-2 text-left">
                            Last Updated at
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <!-- LOOP PRODUCT TO DISPLAY ITEMS  -->
                    <tr>
                        <td>ID</td>
                    </tr>
                </tbody>
            </table>
        </template>
        <!-- SPINNER WITH TABLE  -->
    </div>
</template>

<script setup></script>
