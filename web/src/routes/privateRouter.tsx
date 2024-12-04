import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/auth.context"
import Loading from "../components/Loading"
import { useState } from "react"

export default function PrivateRouter() {
	const { isAuthenticated, isLoading } = useAuth()

	const location = useLocation()

	const [from,] = useState(location.pathname)

	if (isLoading) {
		return <Loading />
	}

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from }} replace />
}