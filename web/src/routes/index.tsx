import { useAuth } from "../contexts/auth.context"
import AppRoute from "./app.route"
import AuthRoute from "./auth.route"

import Loading from "../components/Loading"

export default function Routes() {
  const {isLoading, isAuthenticated} = useAuth()
  return isLoading ? <Loading /> : isAuthenticated ? <AppRoute /> : <AuthRoute />
}
