var fs = require("fs");
var inquirer = require("inquirer");
var $ = require("jquery");

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
        $.ajax({
            url: "https://api.github.com/users/" + response.username,
            method: "GET"
        }).then(function(res){
            console.log(res);
        })
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
                </header>
        </body>
        </html>`
        fs.writeFile("index.html", $html, function(err){
            if (err) throw (err)
        })
    })