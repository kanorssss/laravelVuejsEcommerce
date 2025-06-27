import axiosClient from "../axios.js";

//getUser
export async function getUser({ commit }) {
    return axiosClient.get("/user").then(({ data }) => {
        commit("setUser", data);
        return data;
    });
}

// login action function
export async function login({ commit }, user) {
    return axiosClient.post("login", user).then(({ data }) => {
        commit("setUser", data.user);
        commit("setToken", data.token);
        return data;
    });
}

//logout action function
export async function logout({ commit }) {
    return axiosClient.post("logout").then(({ data }) => {
        commit("setToken", null);
        return data;
    });
}

// getProducts
export async function getProducts(
    { commit },
    {
        url = null,
        search = "",
        perPage = 10,
        sortField = "updated_at",
        sortDirection = "desc",
    }
) {
    //set loading to true and empty products from mutation
    commit("setProducts", [true, []]);
    //fetch products from the server
    url = url || "/products";
    return axiosClient
        .get(url, {
            params: {
                //add search and perpage for the backend
                search,
                per_page: perPage,
                sort_field: sortField,
                sort_direction: sortDirection,
            },
        })
        .then((res) => {
            // if the request is successful, set loading to false and set products
            commit("setProducts", [false, res.data]);
        })
        .catch(() => {
            // if there is an error, set loading to false and empty products
            commit("setProducts", [false, []]);
        });
}

export async function createProduct({ commit }, product) {
    //if the user not select an image this loop not run
    if (product.image instanceof File) {
        const form = new FormData();
        formData.append("title", product.title);
        formData.append("image", product.image);
        formData.append("description", product.description);
        formData.append("price", product.price);
        //set the form to product
        product = form;
    }
    return axiosClient.post("/products", product);
}

export async function updateProduct({ commit }, { product }) {
    const id = product.id;
    //if the user not select an image this loop not run
    // if the user selects an image, we need to append it to the form data
    // and set the method to PUT
    if (product.image instanceof File) {
        const form = new FormData();
        formData.append("id", product.id);
        formData.append("title", product.title);
        formData.append("image", product.image);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("_method", "PUT");
        //set the form to product
        product = form;
    } else {
        product._method = "PUT"; // for laravel to know it's an update request
    }
    // send the request to update the product
    return axiosClient.post(`/products/${id}`, product);
}

export default {
    login,
    logout,
    getUser,
    getProducts,
    createProduct,
    updateProduct,
};
