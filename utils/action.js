// act function
import chalk from "chalk";

const action = (action, attacker, target, choose) => {
    const dice = Math.floor(Math.random() * 6) * 2;
    let damage = null;

    if (choose) {
        switch (action) {
            case "Physical attack":
                damage = attacker.strength + dice - target.armor;
                target.health -= damage;
                console.log(chalk.blue(`${attacker.pseudo} inflicted ${damage} physical damages`));
                break;
            case "Magic attack":
                damage = attacker.magic + dice - target.armor;
                target.health -= damage;
                console.log(chalk.blue(`${attacker.pseudo} inflicted ${damage} magic damages`));
                break;
            case "Armor boost":
                attacker.armor += dice / 2;
                console.log(chalk.blue(`${attacker.pseudo} gain ${dice / 2} armor points`));
                break;
            case "Strenght boost":
                attacker.strength += dice / 2;
                console.log(chalk.blue(`${attacker.pseudo} gain ${dice / 2} strenght points`));
                break;
            case "Magic boost":
                attacker.magic += dice / 2;
                console.log(chalk.blue(`${attacker.pseudo} gain ${dice / 2} magic points`));
                break;
            case "Speed boost":
                attacker.speed += dice / 2;
                console.log(chalk.blue(`${attacker.pseudo} gain ${dice / 2} speed points`));
                break;
            case "Healing spell":
                attacker.health += dice * 2;
                console.log(chalk.blue(`${attacker.pseudo} recovers ${dice * 2} health points`));
                break;
            default:
                break;
        }
    } else {
        if (dice > 6) {
            damage = attacker.strength + dice - target.armor;
            target.health -= damage;
            console.log(chalk.red(`${attacker.name} inflicted ${damage} physical damages`));
        } else {
            damage = attacker.magic + dice - target.armor;
            target.health -= damage;
            console.log(chalk.red(`${attacker.name} inflicted ${damage} magic damages`));
        }
    }
};
export default action