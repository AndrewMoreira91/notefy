import { useAuth } from "../contexts/auth.context"

import Loading from "../components/Loading"
import { Navigate, Outlet } from "react-router-dom"

export default function PrivateRouter() {
  const {isLoading, isAuthenticated} = useAuth()

  if (isLoading) return <Loading />

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
