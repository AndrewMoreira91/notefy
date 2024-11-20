import { useRoutes, type RouteObject } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export default function AuthRoute() {
	const routes: RouteObject[] = [
		{
			path: "/",
			element: <Login />
		},
		{
			path: "/register",
			element: <Register />
		}
	]

	return useRoutes(routes)
}