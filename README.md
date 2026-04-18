# Cypress QE Portfolio

A simple log in page with feedback form behind it.

To sign in, use the following (hard coded) values:
```
Username: l.jenkins
Password: hunter2
```

The feedback form has validation to check that all required items are present, and phone, email and postcodes all look like they should. It doesn't actually do anything with the values, it just takes the user to a 'submitted' page. This is good enough for the test.

## To run:
`docker-compose up --build -d`

## Testing
`npm test` to execute tests

## UI Tests
Prequisites for local execution of the Cypress UI tests

>npm intall

>npm start

Ensure the app is running successfully on [Localhost](http://localhost:3000) 

Install Cypress Globally

> npm install cypress -g

For headless execution of the tests

> npm run cy:headless 

For browser execution of the tests

> npm run cy:chrome

or

> npx cypress open
