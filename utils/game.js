import chalk from "chalk";
import setCharacter from "./setCharacters.js";
import inquirer from "inquirer";
import action from './action.js'

let hydra = setCharacter("hydra");
let player = null;
let turn = 1;


const game = async (winnerName, looserName, winnerSecondName, winnerHP) => {
    if (turn === 1) {
        console.log("\n");
        console.log(`GG, close one ^^, ${winnerSecondName} still had ${winnerHP} HP, bummer`);
        console.log("\n");
    } else {
        console.log("\n");
        console.log(`${winnerName} defeat ${looserName}, ${winnerSecondName} win with ${winnerHP} HP at turn ${turn}`);
        console.log("\n");
    }

    turn = 1;
    hydra = setCharacter("hydra");

    prompt("list", "Play an other game?", ["Yes", "No"], 5);
};

// recursion function
const prompt = (type, message, choices, number) => {
    inquirer
        .prompt([
            {
                type: type,
                name: "answer",
                message,
                choices,
            },
        ])
        .then((res) => {
            switch (number) {
                case 1:
                    if (res.answer === "Easy") hydra.headNumber = 1;
                    else if (res.answer === "Medium") hydra.headNumber = 2;
                    else hydra.headNumber = 3;

                    return prompt("list", "Which class do you want to play?", ["Magician", "Paladin", "Barbarian"], 2);
                case 2:
                    // create player
                    player = setCharacter(res.answer);
                    return prompt("input", "What's your name?", [], 3);
                case 3:
                    if (res.answer === "") {
                        return prompt("input", "What's your name, seriously?", [], 3);
                    }

                    player.pseudo = res.answer;
                    break;
                case 4:
                    // player play first
                    if (player.speed > hydra.speed) {
                        // player attack
                        action(res.answer, player, hydra, true);

                        // is hydra alive
                        if (hydra.health <= 0) return game(player.pseudo, "Hydra", "you", player.health);

                        // hydra attack
                        for (let i = 0; i < hydra.headNumber; i++) action(res.answer, hydra, player, false);

                        // is player alive
                        if (player.health <= 0) return game("Hydra", player.pseudo, "Hydra", hydra.health);

                        // hydra play first
                    } else {
                        // hydra attack
                        for (let i = 0; i < hydra.headNumber; i++) action(res.answer, hydra, player, false);

                        // is player alive
                        if (player.health <= 0) return game("Hydra", player.pseudo, "Hydra", hydra.health);

                        // player attack
                        action(res.answer, player, hydra, true);

                        // hydra is alive
                        if (hydra.health <= 0) return game(player.pseudo, "Hydra", "you", player.health);
                    }

                    turn++;

                    break;
                case 5:
                    // restart game
                    if (res.answer === "Yes") return prompt("list", "What difficulty do you want", ["Easy", "Medium", "Hard"], 1);

                    // exit game
                    return process.exit(0);
                default:
                    break;
            }

            // send data
            console.log("\n");
            console.log(`Turn ${turn}`);
            console.table([player, hydra]);
            console.log("\n");

            // call recursion
            prompt("list", "What attack do you want to make?", ["Physical attack", "Magic attack", "Armor boost", "Strenght boost", "Magic boost", "Speed boost", "Healing spell"], 4);
        });
};


export default prompt
