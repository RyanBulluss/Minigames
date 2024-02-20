import { Link } from "react-router-dom";
import * as usersService from "../utilities/users-service";
import allGames from "../variables/games-list";

export default function SideBar({ user, setUser, setCurrentGame }) {
  function handleLogOut() {
    usersService.logOut();
    setUser(null);
  }

  return (
    <nav className="w-40 bg-first p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl mb-8">Minigames</h1>
        {allGames.map((game, idx) => (
            <button onClick={() => setCurrentGame(game.name)}>{game.name}</button>
        ))}
      </div>
      <div>
        <div>Welcome {user.name}</div>
        <div>
          <Link to="" onClick={handleLogOut}>
            Log Out
          </Link>
        </div>
      </div>
    </nav>
  );
}
