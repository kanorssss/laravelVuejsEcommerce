import { createStore } from "vuex";
import state from "./state.js";
import {
    login,
    logout,
    getUser,
    getProducts,
    createProduct,
    updateProduct,
} from "./actions.js";
import { setUser, setToken, setProducts } from "./mutations.js";

const store = createStore({
    state,
    getters: {},
    actions: {
        login,
        logout,
        getUser,
        getProducts,
        createProduct,
        updateProduct,
    },
    mutations: {
        setUser,
        setToken,
        setProducts,
    },
});

export default store;
