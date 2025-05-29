import { createRouter, createWebHistory } from "vue-router";

import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import RequestPasswordReset from "../views/RequestPasswordReset.vue";
import ResetPassword from "../views/ResetPassword.vue";
import AppLayout from "../components/AppLayout.vue";
import ProductsView from "../views/ProductsView.vue";
import store from "../store";
import NotFound from "../views/NotFound.vue";

const routes = [
    {
        path: "/app",
        name: "app",
        component: AppLayout,
        //add this meta for the authentication
        meta: {
            requiresAuth: true,
        },
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
        meta: {
            requiredGuest: true,
        },
        component: LoginView,
    },
    {
        path: "/request-password",
        name: "requestPassword",
        meta: {
            requiredGuest: true,
        },
        component: RequestPasswordReset,
    },
    {
        path: "/reset-password/:token",
        name: "resetPassword",
        meta: {
            requiredGuest: true,
        },
        component: ResetPassword,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "nontFound",
        component: NotFound,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!store.state.user.token;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: "login" });
    } else if (to.meta.requiredGuest && isAuthenticated) {
        next({ name: "app.dashboard" });
    } else {
        next();
    }
});

export default router;
