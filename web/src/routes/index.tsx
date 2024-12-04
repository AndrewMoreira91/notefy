import { Route } from "react-router-dom"
import { Dashboard } from "../pages/Dashboard"
import NoteEdit from "../pages/NoteEdit"
import { Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import PrivateRouter from "./privateRouter"

export default function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<PrivateRouter />}>
				<Route path="/" element={<Dashboard />} />
				<Route path="/note/:id" element={<NoteEdit />} />
			</Route>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	)
}