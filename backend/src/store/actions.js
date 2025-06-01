import axiosClient from "../axios.js";

//getUser
export function getUser({ commit }) {
    return axiosClient.get("user").then(({ response }) => {
        commit("setUser", response.data);
        return response.data;
    });
}

// login action function
export function login({ commit }, user) {
    return axiosClient.post("login", user).then(({ data }) => {
        commit("setUser", data.user);
        commit("setToken", data.token);
        return data;
    });
}

//logout action function
export function logout({ commit }) {
    return axiosClient.post("logout").then(({ data }) => {
        //
        commit("setToken", null);
        return data;
    });
}

export default {
    login,
    logout,
    getUser,
};
