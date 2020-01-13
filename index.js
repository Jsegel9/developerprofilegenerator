var fs = require("fs");
var inquirer = require("inquirer");
const axios = require("axios");
var util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

inquirer
    .prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "q1"
        },
        {
            type: "input",
            message: "What is your Github username?",
            name: "username"
        }
    ])
    .then(function(response){
        // axios.get('https://api.github.com/users/' + response.username)
        //     .then(res => {
        //         // writeFileAsync("git.json", JSON.stringify(res.data))
        //         fs.writeFile("git.json", JSON.stringify(res.data), function(err){
        //             if (err) throw (err)
        //         })
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
        let raw = fs.readFileSync("git.json");
        let git = JSON.parse(raw);
        console.log(git);
        const $html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Developer Profile</title>
        </head>
        <body>
                <header>
                    <div class="imgcontain">
                       <img src="">
                    </div>
                    <h1>Hello</h1>
                    <h2>My name is ${response.q1}</h2>
                    <h3>Currently @ </h3>
                    <h3><a href="${git.html_url}">GitHub</a></h3>
                </header>
        </body>
        </html>`
        fs.writeFile("index.html", $html, function(err){
            if (err) throw (err)
        })
    })