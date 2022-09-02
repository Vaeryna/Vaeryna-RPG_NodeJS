import figlet from "figlet";
import http from "http"
import prompt from "./utils/game.js"
import pug from "pug"


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
})

const options = {
    hostname: '127.0.0.1',
    port: 8000,
    path: '/begin',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};
const data = JSON.stringify({
    name: 'John Doe',
    job: 'DevOps Specialist'
});

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });
    console.log(data)

    res.on('end', () => {
        console.log(JSON.parse(data));
    });

}).on("error", (err) => {
    console.log("Error: ", err.message);
});



req.end();

// start process
// figlet("Jeu", (err, data) => {
//   if (err) return console.log(err);
//
//   // clear terminal
//   const lines = process.stdout.getWindowSize()[1];
//   for (let i = 0; i < lines; i++) console.log("\r\n");
//
//   console.log(data);
//   console.log("\n");
//
//   // call recursion
//   prompt("list", "What difficulty do you want", ["Easy", "Medium", "Hard"], 1);
// });

console.log("Server running at http://127.0.0.1:8000");
server.listen(8000)