import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import RequestPasswordReset from "../views/RequestPasswordReset.vue";
import ResetPassword from "../views/ResetPassword.vue";

const routes = [
    {
        path: "/dashboard",
        name: "dashboard",
        component: DashboardView,
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
    },
    {
        path: "/request-password",
        name: "requestPassword",
        component: RequestPasswordReset,
    },
    {
        path: "/reset-password/:token",
        name: "resetPassword",
        component: ResetPassword,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
