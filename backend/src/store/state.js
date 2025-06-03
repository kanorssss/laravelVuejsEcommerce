import { createStore } from "vuex";
import * as actions from "./actions.js";
import * as mutations from "./mutations.js";

const state = {
    user: {
        token: sessionStorage.getItem("token"),
        data: {},
    },
    products: {
        loading: false,
        data: [],
    },
};

export default state;
