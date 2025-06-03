import { createStore } from "vuex";
import state from "./state.js";
import { login, logout, getUser } from "./actions.js";
import { setUser, setToken } from "./mutations.js";

const store = createStore({
    state,
    getters: {},
    actions: {
        login,
        logout,
        getUser,
    },
    mutations: {
        setUser,
        setToken,
    },
});

export default store;
