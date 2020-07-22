# Simple Hiring Task
A simple demo app made to demonstrate basic client-server flow of data.

## TL;DR

To get the project running locally, simply execute these scripts in order.

```bash
$ git clone https://github.com/roshnet/simple-hiring-task
$ cd simple-hiring-task/server
$ npm install
$ npm run start
```
In another shell, run the MongoDB daemon by -
```bash
$ mongod
```
If your local MongoDB instance has different configuration than default, change the `devURI` in `server/config.js` file.

## About this repository
The repository is two things -
  - the front end (index.html)
  - the server side code (the `server/` directory)
  - the database (hosted remotely)

The front end (which is a single page index.html), is hosted on Surge.sh ([link here]()), and the Node.js server is deployed on Heroku ([link here](https://comunev-task-roshan.herokuapp.com/)).

The database is a free MongoDB Atlas cluster, which is used by the Heroku server instance. When running locally, the app uses your local MongoDB installation by default.

## Instructions to run locally
1. Clone this repository, and navigate to the `server/` directory.
2. Run `npm install` (from the `server` directory).
3. While that completes, install MongoDB. Run the daemon by `mongod` in another shell.
4. Once installed without errors, run `npm run start` (again, from the **server/** directory) to launch the server.
5. Open **index.html** in the browser.
6. Fill the form, and see the data appear in MongoDB, along with the uploaded file in **`server/uploads`** directory (use [Compass](https://docs.mongodb.com/compass/master/install/) to view the local and/or remote database).
