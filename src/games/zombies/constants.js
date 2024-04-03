const startingHealth = 100;
const startingAngle = 45;
const playerSize = 15;
const zombieSize = 15;

const startingBulletSpeed = 50;
const startingZombieSpeed = 1000;
const startingZombieSpawnRate = 1000;
const startingFireRate = 200;

// Most values are what board width is divided by to get the real value
const scoutPlayer = {
    loadout: "scout",
  speed: 200,
  width: 20,
  height: 20,
  health: 100,
  bulletSize: 5,
  bulletDamage: 30,
  fireRate: 200,
  bulletSpeed: 75,
};

const sniperPlayer = {
    loadout: "sniper",
  speed: 300,
  width: 16,
  height: 16,
  health: 150,
  bulletSize: 4,
  bulletDamage: 200,
  fireRate: 800,
  bulletSpeed: 50,
};

const tankPlayer = {
    loadout: "tank",
  speed: 400,
  width: 12,
  height: 12,
  health: 200,
  bulletSize: 2,
  bulletDamage: 60,
  fireRate: 600,
  bulletSpeed: 100,
};

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
  scoutPlayer
};
