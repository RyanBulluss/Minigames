import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import { useState } from "react";

export default function AuthPage({ setUser }) {
  const [login, setLogin] = useState(true);

  return (
    <main>
      <div className="">
        {login ? (
          <LoginForm setUser={setUser} />
        ) : (
          <SignUpForm setUser={setUser} />
        )}
      </div>
      <button className="" onClick={() => setLogin(!login)}>
        {login ? "Sign Up" : "Log in"}
      </button>
    </main>
  );
}
