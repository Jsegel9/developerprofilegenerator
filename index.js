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
            type: "list",
            name: "color",
            message: "What is your favorite color?",
            choices: [
                "Red", 
                "Blue", 
                "Green"
            ]
        }
    ])
    .then(function(response){
        axios.get('https://api.github.com/users/' + response.username)
            .then(res => {
                // writeFileAsync("git.json", JSON.stringify(res.data))
                fs.writeFile("git.json", JSON.stringify(res.data), function(err){
                    if (err) throw (err)
                })
            })
            .catch(error => {
                console.log(error);
            })
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
            .containRed {
                background-color: rgb(233, 72, 67);
                position: relative;
                margin: 25px 25px 25px 100px;
                padding: 15px;
                width: 200px;
                height: 50px;
                border-radius: 15px;
                text-align: center;
                float: left;
            }
            .containBlue {
                background-color: rgb(23, 208, 233);
                position: relative;
                margin: 25px 25px 25px 100px;
                padding: 15px;
                width: 200px;
                height: 50px;
                border-radius: 15px;
                text-align: center;
                float: left;
            }
            .containGreen {
                background-color: rgb(28, 92, 28);
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
                background-color: white;
                width: 800px;
                height: auto;
                position: absolute;
                margin-left: 25%;
                /* margin-right: 25%; */
                border-radius: 10px;
                /* bottom: 50px; */
                /* padding: 30px; */
            }
            header {
                width: 800px;
                margin-left: 25%;
                /* margin-right: 25%; */
                background-color: blue; 
                position: relative;
                height: 400px;
                border-radius: 10px;   
            }
            .headerRed {
                width: 800px;
                margin-left: 25%;
                /* margin-right: 25%; */
                background-color: rgb(233, 72, 67); 
                position: relative;
                height: 400px;
                border-radius: 10px;   
            }
            .headerBlue {
                width: 800px;
                margin-left: 25%;
                /* margin-right: 25%; */
                background-color: rgb(23, 208, 233); 
                position: relative;
                height: 400px;
                border-radius: 10px;  
            }
            .headerGreen {
                width: 800px;
                margin-left: 25%;
                /* margin-right: 25%; */
                background-color: rgb(28, 92, 28); 
                position: relative;
                height: 400px;
                border-radius: 10px;
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
                color: white;
            }
            body {
                background-color:silver;
                font-family:Arial, Helvetica, sans-serif;
            }
            .maintext {
                color: white;
            }
            .biotextRed{
                color:rgb(233, 72, 67);
            }
            .biotextBlue{
                color: rgb(23, 208, 233);
            }
            .biotextGreen{
                color: rgb(28, 92, 28);
            }
            </style>
        </head>
        <body>
                <header class="header${response.color}">
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
                    <p style="text-align: center;" class="biotext${response.color}">${git.bio}</p>
                    <div class="contain${response.color}">
                        <div class="maintext">Public Repositories<br>${git.public_repos}</div>
                    </div>
                    <div class="contain${response.color}">
                        <div class="maintext">Followers<br>${git.followers}</div>
                    </div>
                    <div class="contain${response.color}">
                        <div class="maintext">Public Gists<br>${git.public_gists}</div>
                    </div>
                    <div class="contain${response.color}">
                        <div class="maintext">Following<br>${git.following}</div>
                    </div> 
                </div>
        </body>
        </html>`
        fs.writeFile("index.html", $html, function(err){
            if (err) throw (err)
        })
    })