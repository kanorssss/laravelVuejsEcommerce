export async function setUser(state, user) {
    // set the user data from store/index.js stae
    state.user.data = user;
}
export async function setToken(state, token) {
    state.user.token = token;
    //check if the token is exist
    if (token) {
        //save the token in the session storage
        sessionStorage.setItem("token", token);
    } else {
        //remove the token
        sessionStorage.removeItem("token");
    }
}

export async function setProducts(state, [loading, response = null]) {
    //check if the response exist
    if (response && response.meta) {
        state.products = {
            data: response.data || [],
            links: response.meta.links || [],
            total: response.meta.total || 0,
            limit: response.meta.per_page || 0,
            from: response.meta.from || 0,
            to: response.meta.to || 0,
            page: response.meta.current_page || 1,
        };
    } else {
        // Set to empty/default values to avoid rendering errors in frontend
        state.products = {
            data: [],
            links: [],
            total: 0,
            limit: 0,
            from: 0,
            to: 0,
            page: 1,
        };
    }

    state.products.loading = loading;
}

export default {
    setUser,
    setToken,
    setProducts,
};
