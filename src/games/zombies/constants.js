const startingHealth = 100;
const startingAngle = 45;
const playerSize = 10;
const zombieSize = playerSize;
const powerUpSize = playerSize * 0.8;
const maxZombies = 25;

const startingBulletSpeed = 50;
const startingZombieSpeed = 500;
const startingZombieSpawnRate = 1000;
const startingFireRate = 200;


// Most values are what board width is divided by to get the real value
const scoutPlayer = {
  loadout: "scout",
  speed: 200,
  width: playerSize,
  height: playerSize,
  health: 100,
  bulletSize: 5,
  bulletDamage: 20,
  fireRate: 100,
  bulletSpeed: 75,
};

const sniperPlayer = {
  loadout: "sniper",
  speed: 250,
  width: playerSize,
  height: playerSize,
  health: 150,
  bulletSize: 4,
  bulletDamage: 200,
  fireRate: 800,
  bulletSpeed: 50,
};

const tankPlayer = {
  loadout: "tank",
  speed: 300,
  width: playerSize,
  height: playerSize,
  health: 200,
  bulletSize: 2,
  bulletDamage: 15,
  fireRate: 600,
  bulletSpeed: 100,
};

const regularZombie = {
  type: "regular",
  speed: startingZombieSpeed,
  width: zombieSize,
  height: zombieSize,
  health: 100,
  damage: 1,
  color: "#090",
};

const tankZombie = {
  type: "tank",
  speed: startingZombieSpeed * 1.5,
  width: zombieSize * 0.8,
  height: zombieSize * 0.8,
  health: 300,
  damage: 5,
  color: "#0b0",
};

const fastZombie = {
  type: "fast",
  speed: startingZombieSpeed * 0.5,
  width: zombieSize * 1.2,
  height: zombieSize * 1.2,
  health: 100,
  damage: 2,
  color: "#0d0",
};

class powerUp {
  constructor(type) {
    this.type = type;
    this.width = powerUpSize;
    this.height = powerUpSize;
  }
}

const nuke = new powerUp("nuke")
const instantKill = new powerUp("instant kill")
const doubleSpeed = new powerUp("double speed")

const powerUpTime = 5000;


const zombiesArr = [regularZombie, tankZombie, fastZombie];
const powerUpsArr = [nuke, instantKill, doubleSpeed];

export {
  startingHealth,
  startingAngle,
  playerSize,
  zombieSize,
  startingZombieSpeed,
  startingBulletSpeed,
  startingZombieSpawnRate,
  startingFireRate,
  tankPlayer,
  sniperPlayer,
  scoutPlayer,
  zombiesArr,
  maxZombies,
  powerUpsArr,
  powerUpTime
};
