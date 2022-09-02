// create character stats
import fs from "fs"
const characters = JSON.parse(fs.readFileSync("./data/characters.json")).characters;

const setCharacter = (character) => {
    const stats = {};

    for (const { name, health, armor, magic, strength, speed } of characters) {
        if (name === character.toLowerCase()) {
            stats.name = name;
            stats.armor = Math.floor(Math.random() * (armor.max - armor.min + 1)) + armor.min;
            stats.health = Math.floor(Math.random() * (health.max - health.min + 1)) + health.min;
            stats.magic = Math.floor(Math.random() * (magic.max - magic.min + 1)) + magic.min;
            stats.strength = Math.floor(Math.random() * (strength.max - strength.min + 1)) + strength.min;
            stats.speed = Math.floor(Math.random() * (speed.max - speed.min + 1)) + speed.min;
        }
    }

    // return character stats
    return stats;
};
export default setCharacter