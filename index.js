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
            name: "name"
        },
        {
            type: "input",
            message: "What is your Github username?",
            name: "username"
        },
        {
            type: "input",
            message: "Please enter a link to your blog",
            name: "blog"
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
            <style>
            img {
                width: 200px;
                height: 200px;
                border-radius: 100px;
                border-width: 4px;
                color: gold;
                border-style: solid;            
            }
            .contain {
                background-color: gold;
                position: relative;
                margin: 25px 25px 25px 100px;
                padding: 15px;
                width: 200px;
                height: 50px;
                border-radius: 15px;
                text-align: center;
                float: left;
            }
            .maincontent {
                background-color: green;
                width: 50%;
                height: auto;
                position: absolute;
                margin-left: 25%;
                margin-right: 25%;
            }
            header {
                width: 50%;
                margin-left: 25%;
                margin-right: 25%;
                background-color: blue; 
                position: relative;
                height: 400px;   
            }
            .imgcontain {
                position: absolute;
                top: 20px;
                left: 34%;
            }
            .headtext {
                position: absolute;
                bottom: 10px;
                left: 34%;
                text-align: center;
            }
            </style>
        </head>
        <body>
                <header>
                    <div class="imgcontain">
                        <img src="${git.avatar_url}">
                    </div>
                    <div class="headtext">
                        <h1>Hello</h1>
                        <h2>My name is ${response.name}</h2>
                        <h3>Currently @ ${git.company} </h3>
                    
                        <a href="${git.html_url}">GitHub</a>
                        <a href="https://www.google.com/maps/place/${git.location}">Chicago, IL</a>
                        <a href="${git.blog}">Blog</a>
                    </div>    
                </h3>
                </header>
                <br>
                <div class="maincontent">
                    <p style="text-align: center;">${git.bio}</p>
                    <div class="contain">
                        <div class="maintext">Public Repositories<br>${git.public_repos}</div>
                    </div>
                    <div class="contain">
                        <div class="maintext">Followers<br>${git.followers}</div>
                    </div>
                    <div class="contain">
                        <div class="maintext">Public Gists<br>${git.public_gists}</div>
                    </div>
                    <div class="contain">
                        <div class="maintext">Following<br>${git.following}</div>
                    </div> 
                </div>
        </body>
        </html>`
        fs.writeFile("index.html", $html, function(err){
            if (err) throw (err)
        })
    })