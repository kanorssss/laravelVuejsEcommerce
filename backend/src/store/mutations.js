export function setUser(state, user) {
    // set the user data from store/index.js stae
    state.user.data = user;
}
export function setToken(state, token) {
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
export default {
    setUser,
    setToken,
};
