#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import { exit } from "process";
console.log(chalk.green("Wellcome to the ATM Machine"));
let userId = "masood";
let userPin = 1234;
let accountBalance = 100000;
start();
async function start() {
    console.log("Enter your Credentials to Login : ");
    await inquirer.prompt([{
            type: "input",
            message: "Enter Your ID : ",
            name: "id"
        }, {
            type: "number",
            message: "Enter Your Password : ",
            name: "pass"
        }]).then((answers) => {
        if (login(answers.id, answers.pass)) {
            console.log("Login Successfull");
            //againPlayMatch()
            startFunctionality();
        }
        else {
            console.log("Login Failed");
        }
    });
}
async function startFunctionality() {
    await inquirer.prompt([{
            type: "list",
            message: "......... Select any Options .......",
            name: "option",
            choices: ["Balance Check", "WithDraw Cash", "Deposit Cash", "Exit"]
        }])
        .then((answers) => {
        if (answers.option == "Balance Check") {
            chkBalance();
        }
        else if (answers.option == "WithDraw Cash") {
            withdraw();
        }
        else if (answers.option == "Deposit Cash") {
            deposit();
        }
        else if (answers.option == "Exit") {
            exit();
        }
    });
}
async function withdraw() {
    await inquirer.prompt([{
            type: "number",
            message: "Enter the Amount",
            name: "amount"
        }]).then((answers) => {
        if (answers.amount > accountBalance) {
            console.log("You don't have Enough Balance.......");
        }
        else {
            accountBalance = accountBalance - answers.amount;
            console.log("................ Withdraw Successful ....................");
            console.log(`........... Your Remaining Balance is : ${accountBalance}`);
        }
    });
}
async function deposit() {
    await inquirer.prompt([{
            type: "number",
            message: "Enter the Amount",
            name: "amount"
        }]).then((answers) => {
        if (answers.amount > 0) {
            accountBalance = accountBalance + answers.amount;
            console.log("................ Deposit Successful ....................");
            console.log(`........... Your Current Balance is : ${accountBalance}`);
        }
        else {
            console.log("Deposit Amount should be Greater then 0");
        }
    });
}
function chkBalance() {
    console.log(`........... Your Current Balance is : ${accountBalance}`);
}
function login(user, pin) {
    if (user == userId && pin == userPin) {
        return true;
    }
    else {
        return false;
    }
}
