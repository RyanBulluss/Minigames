import { useState } from "react";
import "./App.css";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
// import NewOrderPage from "../NewOrderPage/NewOrderPage";
// import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import GamesPage from "../GamesPage";
import NavBar from "../../components/NavBar/NavBar";

import { Routes, Route } from "react-router-dom";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="container">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<GamesPage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
