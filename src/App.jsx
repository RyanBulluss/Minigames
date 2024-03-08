import { useState } from "react";
import { getUser } from "./utilities/users-service";
import AuthPage from "./pages/AuthPage";
import GamesPage from "./pages/GamesPage";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const [user, setUser] = useState({ name: "test", email: "test@test" });

  return (
    <main>
      {user ? (
        <div>
          <GamesPage user={user} setUser={setUser} />
        </div>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
