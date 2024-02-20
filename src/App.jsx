import { useState } from "react";
import { getUser } from "./utilities/users-service";
import AuthPage from "./pages/AuthPage";
import GamesPage from "./pages/GamesPage";
import SideBar from "./components/SideBar";

import { Routes, Route } from "react-router-dom";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main>
      {user ? (
        <div className="min-h-[100vh] flex">
          
          <Routes>
            <Route path="/" element={<GamesPage user={user} setUser={setUser} />} />
          </Routes>
        </div>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
