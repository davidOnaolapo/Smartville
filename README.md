# Smartville

Smartville is an application that helps you set up your smart home. Your handy robot helper Nao guides you through the process, by explaining what apps you need to download and recommending products for you based on your budget and needs. It was built with React, SCSS, JavaScript, 
Node.js, express and Psql.

## Final Product

!["Nao welcomes you to Smartville"](https://github.com/davidOnaolapo/smartHomeSetup/blob/master/docs/Smartville_welcome.png?raw=true)
!["First survey question"](https://github.com/davidOnaolapo/smartHomeSetup/blob/master/docs/Smartville_budget_survey.png?raw=true)
!["Final survey question"](https://github.com/davidOnaolapo/smartHomeSetup/blob/master/docs/Smartville_products_survey.png?raw=true)
!["Here are your recommendations"](https://github.com/davidOnaolapo/smartHomeSetup/blob/master/docs/Smartville_recommendations.png?raw=true)

## Setup

1. Install dependencies on the client side with `npm install`

2. Install dependencies on the server side with `npm install`

3. Create the .env by using .env.example as a reference

4. Update the .env file with your correct local information
DB_HOST=localhost
DB_USER=smart
DB_PASS=smart
DB_NAME=final

6. Install dependencies: npm i

8. Reset database: npm run db:reset

9. Check the db folder to see what gets created and seeded in the SDB

10. Run the server: npm run local

Note: nodemon is used, so you should not have to restart your server

## Dependencies

- axios
- react-dom
- react-scripts
- node-sass
- bcrypt
- jsonwebtoken
- morgan


