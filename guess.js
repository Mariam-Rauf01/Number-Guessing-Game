#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
async function numberGuessGame() {
    console.log(chalk.bgYellow.blackBright.bold("=== Guess the Number Game ==="));
    let playAgain = true;
    while (playAgain) {
        const randomNumber = Math.floor(Math.random() * 10 + 1);
        let score = 10;
        let chances = 5;
        let invalidAttempts = 0;
        while (chances > 0) {
            const answers = await inquirer.prompt([
                {
                    name: "userGuessedNumber",
                    type: "input",
                    message: chalk.cyanBright(`Please guess a number between 1 - 10.\nYou've ${chances} chances:`),
                    validate: function (input) {
                        const num = parseInt(input);
                        if (isNaN(num) || num < 1 || num > 10) {
                            invalidAttempts++;
                            if (invalidAttempts >= 3) {
                                console.log(chalk.red.bold("Too many invalid attempts. Exiting the game."));
                                process.exit(1); // Exit the game after too many invalid attempts
                            }
                            return "Please enter a valid number between 1 and 10.";
                        }
                        return true;
                    },
                },
            ]);
            const guessedNumber = parseInt(answers.userGuessedNumber);
            if (guessedNumber === randomNumber) {
                console.log(chalk.green.bold("\nCongratulations! You guessed the right number."));
                console.log(chalk.greenBright.bold(`Your score is: ${score}`));
                break;
            }
            else {
                console.log(chalk.red.bold("\nSorry, you guessed the wrong number. Try again."));
                score--;
                chances--;
            }
        }
        if (chances === 0) {
            console.log(chalk.magenta.bold(`\nYou've run out of chances. The correct number was ${randomNumber}.`));
        }
        const playAgainAnswer = await inquirer.prompt([
            {
                name: "playAgain",
                type: "confirm",
                message: chalk.gray("Do you want to play again?"),
                default: true,
            },
        ]);
        playAgain = playAgainAnswer.playAgain;
    }
    console.log(chalk.blue.bold("\nThanks for playing!"));
}
numberGuessGame();
