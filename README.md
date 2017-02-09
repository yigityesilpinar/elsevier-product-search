# Elsevier product search application by Yigit Yesilpinar

## Instructions

Please install all required npm modules for the main application

```sh
npm install
```

#### Production Build

To build the application production-ready under "./production" folder, please type

```sh
npm run build
```

When the building process is finished, to go inside the production folder, please type

```sh
cd production
```

Please install the dependencies of production module

```sh
npm install
```

To run the application (from the production folder), please type

```sh
npm start
```

Please navigate to http://127.0.0.1:3000 (with default configuration)

Or create a zip file from the content of production folder and upload/deploy to AWS Elastic Beanstalk

#### Local build

Local build is for testing optimized webpack production build in local environment 

If you are still inside the production folder, please navigate back to the application root by typing

```sh
cd ..
```

Initialize webpack production bundling to /dist folder (in Production build production/dist) please type

```sh
npm run build:front
```

After the local build the server will run automatically, Please navigate to http://127.0.0.1:3000 (with default configuration)

As long as the *./dist* folder is built, can type **npm start** from the root of the main application to run the local server


#### Developing Mode

To launch the application in developing mode please type

```sh
npm run dev:start
```

Developing mode benefits from **Hot Module Replacement** using express.js, webpack-dev-server, webpack-dev-middleware and webpack-hot-middleware 


For linting with eslint, please type

```sh
npm run lint
```
