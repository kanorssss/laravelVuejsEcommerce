import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import RequestPasswordReset from "../views/RequestPasswordReset.vue";
import ResetPassword from "../views/ResetPassword.vue";
import AppLayout from "../components/AppLayout.vue";
import ProductsView from "../views/ProductsView.vue";

const routes = [
    {
        path: "/app",
        name: "app",
        component: AppLayout,
        children: [
            {
                path: "dashboard",
                name: "app.dashboard",
                component: DashboardView,
            },
            {
                path: "products",
                name: "app.products",
                component: ProductsView,
            },
        ],
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
