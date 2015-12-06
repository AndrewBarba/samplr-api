samplr-api
==========

[![wercker status](https://app.wercker.com/status/74d737510390fe618b54f0c481675b92/s/master "wercker status")](https://app.wercker.com/project/bykey/74d737510390fe618b54f0c481675b92)

Samplr API built with Node.js and RethinkDB

## Setup
You must be running [Node.js](https://nodejs.org/en/) version 4.2.3 or later to run this project.
```
make
```

## Test
To run tests you must have [RethinkDB](http://rethinkdb.com/docs/install/) running locally on the default port. Before running tests, make sure to build the project by running `make` in this directory.
```
npm test
```

#### Unit Tests
```
make test-unit
```

#### Integration Tests
```
make test-int
```

## Workflow
There are two main branches in this project, `master` and `dev`. `master` is expected to be production ready at all times. All new features should make a branch off of `dev` and then open a [Pull Request](https://developer.github.com/v3/pulls/) back into dev. Pull Requests should not be merged until all tests are passing.

When `dev` is ready to be merged to `master`, open a Pull Request and merge when all tests are passing.

#### Continuous Integration
Every time code is pushed to the remote repository, [Wercker](https://app.wercker.com/#applications/5649495fcf52f280570cbc8e) will build and test the new code. This happens for all branches, including open Pull Requests. Wercker will report back to Github automatically to let you know when it is safe to merge a branch. Code pushed to the `dev` branch will automatically be deployed to the development environment. See [Hosting](#hosting) below for more details.

#### Deploy
All deploys are done from [Wercker](https://app.wercker.com/#applications/5649495fcf52f280570cbc8e) with the exception of Pull Requests. To deploy to production, select a passing commit and then select "Deploy to" in the top right, and select "production". Follow the same instruction to deploy to "development".

## Hosting
We have two main hosting providers, [Heroku](https://www.heroku.com) and [Compose.io](https://www.compose.io). Heroku hosts our application nodes and scheduled jobs. Compose.io hosts our RethinkDB deployment and any future databases we may introduce.

#### Heroku
We have 3 types of environments on Heroku:

1. [Production](https://samplr-api-prod.herokuapp.com)
2. [Development](https://samplr-api-dev.herokuapp.com)
3. Review

The production environment connects to the production database on Compose.io and is what all official Samplr clients connect to. The development environment connects to a development database. This separation allows us to freely experiment on the development environment without interfering with our users. A review environment is a set of servers started from a Pull Request. This can be done manually from the Heroku dashboard with any open Pull Request. These environments will connect to the development database on Compose.io.

#### Compose.io
Currently we have a single RethinkDB deployment hosted on Compose.io. The environment has two databases, production and development. Soon we will be separating these databases onto their own deployments for more security and scalability.
