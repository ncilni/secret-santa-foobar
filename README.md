# Secret Santa

http://secretsanta.herokuapp.com

Secret Santa is a web app that makes it easy to organize a round of Secret Santa for a list of participants.
An organizer can enter a list of participants with name and email address. You can also enter a happy message for everyone to read.

The system will assign each person in the pool of participants a secret other person from the list who should receive a small Christmas gift.
Once the assignments are generated and emails are sent that include the happy message and the name of the individual random recipient.

## Architecture

Secret Santa is a Full-Stack Javascript application, built with the following frameworks/libraries:
UI Framework: Angular 7
CSS framework: Bootstrap
Backend: Mode.js & Express.js
Database: MongoDB

## Architecture resoning

This appliation is built with the MEAN stack. Following are some of the reasons to work with this stack:

1. It’s Entirely JavaScript
2. Known for its Flexibility and Efficiency
3. Advantage of Having JSON
4. Scales excellently

## Development instructions

To run the backend server:

```bash
npm install # installs all the dependencies for the backend server application
node server.js # runs the express server
```

To run the frontend application:

```bash
cd client # change directory to the client application
npm install # installs all the dependencies for the angular application
ng serve # runs the angular application
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
