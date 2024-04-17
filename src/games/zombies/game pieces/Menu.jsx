import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBinoculars,
  faShieldAlt,
  faCrosshairs,
} from "@fortawesome/free-solid-svg-icons";

const Menu = ({ startGame, loadouts, icon }) => {
  const LoadoutButton = ({ name, icon }) => {
    return (
      <button
        className="hover:bg-slate-500/50 py-2 px-4 rounded-xl"
        onClick={() => startGame(loadouts[name.toLowerCase()])}
      >
        {name}&nbsp;&nbsp;{icon}
      </button>
    );
  };

  return (
    <div className="h-full w-full flex flex-col gap-4 justify-center items-center text-2xl">
      <h2 className="font-semibold p-4">Choose Your Loadout:</h2>

      <LoadoutButton
        name="Scout"
        icon={<FontAwesomeIcon icon={faBinoculars} />}
      />

      <LoadoutButton
        name="Sniper"
        icon={<FontAwesomeIcon icon={faCrosshairs} />}
      />

      <LoadoutButton
        name="Tank"
        icon={<FontAwesomeIcon icon={faShieldAlt} />}
      />
    </div>
  );
};

export default Menu;
