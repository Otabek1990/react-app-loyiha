import { Outlet, type RouteObject } from "react-router-dom";
import Products from "../pages/products/Products";
import Home from "../pages/home/Home";
import Category from "../pages/category/Category";
import NotFound from "../pages/notFound/NotFound";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Outlet />,
        children: [
            {
                index: true, element: <Home />
            },
            {
                path: "products", element: <Products />
            },
            {
                path: "category", element: <Category />
            },
        ]
    },
    {
        path: "*", element: <NotFound />
    }
]