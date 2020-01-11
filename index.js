var fs = require("fs");
var inquirer = require("inquirer");

inquirer
    .prompt([
        {
            type: "input",
            message: "Question 1",
            name: "q1"
        }
    ])
    .then(function(response){
        console.log(response)
        console.log(response.q1)
    })