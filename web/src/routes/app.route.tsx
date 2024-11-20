import { type RouteObject, useRoutes } from "react-router-dom"
import { Dashboard } from "../pages/Dashboard"
import NoteEdit from "../pages/NoteEdit"

export default function AppRoute() {
	const appRoutes: RouteObject[] = [
		{
			path: "/",
			element: <Dashboard />
		},
		{
			path:"note/:id",
			element: <NoteEdit />
		},
		{
			path: "*",
			element: <Dashboard />
		}
	]
	return useRoutes(appRoutes)
}