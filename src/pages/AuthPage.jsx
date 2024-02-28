import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import { useState } from "react";

export default function AuthPage({ setUser }) {
  const [login, setLogin] = useState(true);

  return (
    <div className="bg-second min-h-[100vh]">
      {login ? (
        <LoginForm setUser={setUser} setLogin={setLogin} />
      ) : (
        <SignUpForm setUser={setUser} setLogin={setLogin} />
      )}
    </div>
  );
}
