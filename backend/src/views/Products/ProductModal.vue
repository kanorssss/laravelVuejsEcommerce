<template>
    <TransitionRoot appear :show="show" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div
                    class="flex min-h-full items-center justify-start pl-[40%] p-4 text-center"
                >
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                        >
                            <SpinnerView
                                v-if="loading"
                                class="absolute left-0 top-0 bg-white right-0 bottom-0 flex items-center justify-center"
                            />
                            <header
                                class="py-3 px-4 flex justify-between items-center"
                            >
                                <DialogTitle
                                    as="h3"
                                    class="text-lg leading-6 font-medium text-gray-900"
                                >
                                    {{
                                        product.id
                                            ? `Update product: "${props.product.title}"`
                                            : "Create new Product"
                                    }}</DialogTitle
                                >
                                <button
                                    @click="closeModal()"
                                    class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
                                ></button>
                            </header>
                            <!-- form  -->
                            <form @submit.prevent="onSubmit">
                                <!-- content  -->
                                <div class="bg-white px-4 pt-5 pb-4">
                                    <CustomInput
                                        class="mb-2"
                                        v-model="product.title"
                                        label="Product Title"
                                    />
                                    <CustomInput
                                        type="file"
                                        class="mb-2"
                                        label="Product Image"
                                        @change="
                                            (file) =>
                                                (product.image =
                                                    file.target.files[0])
                                        "
                                    />
                                    <CustomInput
                                        class="mb-2"
                                        v-model="product.description"
                                        label="Product Description"
                                        type="textarea"
                                    />
                                    <CustomInput
                                        class="mb-2"
                                        v-model="product.price"
                                        label="Product Price"
                                        type="number"
                                        prepend="$"
                                    />
                                </div>
                                <!-- footer  -->
                                <footer
                                    class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                                >
                                    <button
                                        type="submit"
                                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        @click="closeModal"
                                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm text-black bg-white"
                                    >
                                        Cancel
                                    </button>
                                </footer>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { computed, onUpdated, ref, watch } from "vue";
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from "@headlessui/vue";

import store from "../../store/index.js"; // Import the store to dispatch actions
import CustomInput from "../../components/CORE/CustomInput.vue"; // Import the custom input component
import SpinnerView from "../../components/CORE/SpinnerView.vue";

// Import necessary components from Headless UI for the submit modal
const loading = ref(false);

const props = defineProps({
    modelValue: Boolean,
    // Define the product prop to pass product data
    product: {
        required: true,
        type: Object,
    },
});
// make sure props is already defined before using it
const product = ref({
    id: props.product.id,
    title: props.product.title,
    image: props.product.image,
    description: props.product.description,
    price: props.product.price,
});

// Define emits
//add close to emit to know the parent component that the modal is closed
const emit = defineEmits(["update:modelValue", "close"]);
const show = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});

// Watch for changes in props.product and update local product
// This replaces the problematic onUpdated hook
watch(
    () => props.product,
    (newProduct) => {
        product.value = {
            id: newProduct.id,
            title: newProduct.title,
            image: newProduct.image,
            description: newProduct.description,
            price: newProduct.price,
        };
    },
    { deep: true, immediate: true } // deep watch for object changes, immediate to run on first render
);

function closeModal() {
    show.value = false;
    // Notify the parent component that the modal is closed
    emit("close");
}

// Import the store to dispatch actions on the backend
async function onSubmit() {
    //loading indicator to be true for the request on the backend
    loading.value = true;
    //check if the id has a value, if it has a value then update the product
    if (product.value.id) {
        await store
            .dispatch("updateProduct", product.value)
            .then((response) => {
                //close the modal after the product is updated
                loading.value = false;
                if (response.status == 200) {
                    // TODO notify the user that the product is updated successfully
                    // getProducts to refresh the list
                    store.dispatch("getProducts");
                    //closeModal
                    closeModal();
                }
            });
    } else {
        //if the id is not set then create a new product
        await store
            .dispatch("createProduct", product.value)
            .then((response) => {
                //close the modal after the product is created
                loading.value = false;
                if (response.status == 201) {
                    // TODO notify the user that the product is created successfully
                    // getProducts to refresh the list
                    store.dispatch("getProducts");
                    //closeModal
                    closeModal();
                }
            });
    }
}
</script>
