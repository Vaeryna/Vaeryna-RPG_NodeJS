import http from "http"
import pug from "pug"
import setCharacter from "./utils/setCharacters.js";

import body2Obj from "./utils/body2Obj.js";

let name = ""
let difficulty = ""
let classe = ""
let hydra = setCharacter("hydra");
let player;
let html;
let turn = 0

const server = http.createServer((req, res) => {
        let url = req.url.replace('/', '');
        res.setHeader("Content-Type", "text/html");
        if (url === "") {
            let html = pug.renderFile('./views/home.pug', {bool: true});

            res.end(html)
        }
        if (url === "newGame") {
            let html = pug.renderFile('./views/newGame.pug');
            res.end(html)
        }

        if (url === 'fight') {
            let body = [];
            if (req.method === 'POST') {
                req.on('data', chunk => {
                    body.push(chunk);


                }).on('end', () => {
                    body = Buffer.concat(body);
                    body = body2Obj(body);
                    console.log(body)
                    name = body.name
                    difficulty = body.difficulty
                    classe = body.class

                    let player = setCharacter(name)

                     html = pug.renderFile('./views/fight.pug', {
                        name: name,
                        work: classe,
                        difficulty: difficulty,
                        PlayerStats: {
                            health: player.health,
                            armor: hydra.armor,
                            magic: hydra.magic,
                            strength: hydra.strength,
                            speed: hydra.speed
                        },
                        HydraStats: {
                            head: hydra.head,
                            health: hydra.health,
                            armor: hydra.armor,
                            magic: hydra.magic,
                            strength: hydra.strength,
                            speed: hydra.speed
                        }, turn
                    })

                })
                res.end(html)
            } else {
                res.end()
            }
        }
    }
)
console.log("Server running at http://127.0.0.1:8000");
server.listen(8000)