import { Link } from "react-router-dom";
import * as usersService from "../utilities/users-service";
import allGames from "../variables/games-list";

export default function SideBar({ user, setUser, setCurrentGame }) {
  function handleLogOut() {
    usersService.logOut();
    setUser(null);
  }

  return (
    <nav className="w-40 bg-first py-4 flex flex-col justify-between no-select">
      <div>
        <h1 onClick={() => setCurrentGame(null)} className="hover:bg-second hover:cursor-pointer p-2 text-2xl mb-8">Minigames</h1>
        {allGames.map((game, idx) => (
            <div key={idx} className="hover:bg-second p-2 hover:cursor-pointer" onClick={() => setCurrentGame(game.name)}>{game.name}</div>
        ))}
      </div>
      {/* <div>
        <div>Welcome {user.name}</div>
        <div>
          <Link to="" onClick={handleLogOut}>
            Log Out
          </Link>
        </div>
      </div> */}
    </nav>
  );
}
