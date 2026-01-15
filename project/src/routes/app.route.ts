import express from "express";
import { Routes } from "../types/interfaces/app.inter";
import AdminRoute from "./admin.route";
import AuthRoute from "./auth.route";
import ProfileRoute from "./profile.route";
import ProductRoute from "./product.route";
import InventoryRoute from "./inventory.route";
import BlochainRoute from "./blockchain.route";
import OrderRoute from "./order.route";



const AppRouter = express.Router();

const appRoutes: Routes = [
    {
        path: "/admin",
        router: AdminRoute,
    },
    {
        path: "/auth",
        router: AuthRoute,
    },
    {
        path: "/profile",
        router: ProfileRoute,
    },
    {
        path: "/product",
        router: ProductRoute
    },
    {
        path: "/inventory",
        router: InventoryRoute
    },
    {
        path: "/order",
        router: OrderRoute
    },
    {
        path: "/blockchain",
        router: BlochainRoute
    }
];

appRoutes.forEach((route) => {
    AppRouter.use(route.path, route.router);
});

export default AppRouter;
