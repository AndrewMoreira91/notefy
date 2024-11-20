import { Link } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../contexts/auth.context";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Loading from "../../components/Loading";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { signUp, isLoading, erroMessage } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
    }

    await signUp(data);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container-login">
      <form onSubmit={handleSubmit} className="login-form">
        <span className="login-form-title">
          Registre, e <strong>Fácil e Rápido</strong>
        </span>

        <div className="container-inputs">
          <Input
            placeholder="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
          Vamos lá!
        </Button>

        <div className="text-center">
          <span className="txt1">Já possui conta? </span>
          <Link className="txt2" to="/">
            Faça login.
          </Link>
        </div>
      </form>
    </div>
  );
};
