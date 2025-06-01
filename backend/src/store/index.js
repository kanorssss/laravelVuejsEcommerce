import { createStore } from "vuex";
import * as actions from "./actions.js";
import * as mutations from "./mutations.js";
import { login, logout, getUser } from "./actions.js";
import { setUser, setToken } from "./mutations.js";

const store = createStore({
    state: {
        user: {
            token: sessionStorage.getItem("token"),
            data: {},
        },
    },
    getters: {},
    //actions functions
    actions: {
        login,
        logout,
        getUser,
    },
    //mutations functions
    mutations: {
        setUser,
        setToken,
    },
});

export default store;
