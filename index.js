import http from "http"
import pug from "pug"
import body2Obj from "./utils/body2obj.js";
let name =""
let difficulty=""
let classe= ""

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
            if (req.method == 'POST') {
                var body = [];
                req.on('data', chunk => {
                    body.push(chunk);
                }).on('end', () => {
                    body = Buffer.concat(body);
                    body = body2Obj(body);
                    name =body.name
                    difficulty = body.difficulty
                    classe = body.class

                });
            }

        }
        if (url === 'fight') {
            let html = pug.renderFile('./views/fight.pug', {
                name: "Thrall",
                work: "Chaman",
                difficulty: "easy"
            }, (err, data) => {
                if (err) return console.log(err.message);

                res.end(data);



            })
        } else {
            res.end()
        }

    }
)

console.log("Server running at http://127.0.0.1:8000");
server.listen(8000)