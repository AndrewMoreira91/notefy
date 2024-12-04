import "./style.css";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Loading from "../../components/Loading";
import { useAuth } from "../../contexts/auth.context";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, isLoading, erroMessage, isAuthenticated } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email,
      password,
    }

    await signIn(data);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container-login">
      <form onSubmit={handleSubmit} className="login-form">
        <span className="login-form-title">
          Bem vindo ao <strong>Notefy</strong>
        </span>

        <div className="container-inputs">
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {erroMessage && (
          <span className="text-error">{erroMessage}</span>
        )}

        <Button type="submit">
          Login
        </Button>

        <div className="text-center">
          <span className="txt1">Ainda não tem conta? </span>
          <Link className="txt2" to="/register">
            Crie uma rápido e fácil.
          </Link>
        </div>
      </form>
    </div>
  );
};
