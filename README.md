# FITNESSPLUS
## Features
The data model is designed to store comprehensive information about gym memberships, including member details, membership type, payment details, and invoice links.
A cron job is implemented to run periodically (e.g., every 4 hours) to check for upcoming membership fees. The job queries the database for memberships with upcoming
due dates and sends email reminders accordingly.
The system uses an email service provider (ESP) to send email reminders to members about upcoming payments. The emails include membership details and links to relevant invoices.
 
# Dependencies
This project was bootstrapped with the following tools:

1. [Postgresql](https://www.postgresql.org/)
2. [Typescript](https://www.typescriptlang.org/)
3. [Node](https://nodejs.org/en/)
4. [ExpressJs](https://expressjs.com/)
5. [eslint linter](https://eslint.org/)
6. [Prettier code formatter](https://prettier.io/)
7. [Jest](https://jestjs.io)

All of these dependencies required are listed in the package.json file. Use `npm install` on the command line.
Environment variables are defined in a .env.sample file. 

> However, you will need to install node and postgreSQL on your local machine.

## Installation
The steps outline will provide a walkthrough on how to install the app on your local machine

1. Clone this repository `git clone https://github.com/stephentk/FITNESSPLUS.git
2. From the terminal, change directory to wallet app folder `cd FITNESSPLUS
3. Run `npm install` from your terminal in your project directory to install all dependencies 
4. Then run the app with the command `npm run watch`


## Author
STEPHEN KOFOWOROLA
- Github: [https://github.com/stephentk)
- LinkedIn: [https://www.linkedin.com/in/stephen-kofoworola-536483145/)

 
