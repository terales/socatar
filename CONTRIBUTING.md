First off, thank you for considering contributing to Socatar. It’s people like you that make Socatar such a great service.

* [Basic development workflow](#basic-development-workflow)
    * [Add a new source](#add-a-new-source)
    * [Implement a new feature](#implement-a-new-feature)
* [Set up a development environment](#set-up-a-development-environment)
* [Run Socatar locally](#run-socatar-locally)
* [Run Socatar in production by yourself](#run-socatar-in-production-by-yourself)

### Basic development workflow

[After setting up your development environment](#set-up-a-development-environment) the workflow is very straighforward:

#### Add a new source

Let's add a Facebook source:

* Create an issue "Add Facebook source", it would be [#2](https://github.com/terales/socatar/issues/2)
* Ask for written permissions to use other people profiles, like we did in [#43](https://github.com/terales/socatar/issues/43)
* Create a branch like `2-add-facebook-source` for the created issue

> Master branch could be updated only with pull request which passes tests at Travic CI and coverage at Coveralls

* Run test suite `npm test` to ensure that it passes on your machine
* Add image samples into `/tests/sources/facebook/samples/`

> Please, note that pull request won't be merged without samples set.

> **if your samples are not JPEG** you would need to add a parser to `/tests/macros/validateReceivedImages.js`. Please, create a separate issue for that.

* Run test suite `npm test` to ensure that test fails with new samples
* Add `/src/sources/facebook.js` file
* Implement a function with receive user identificator and returns an URL of an image. Use `async` functions if you need to fetch some additional data to get the desired URL.

> **if you need to pass additional credentials to get an image** than add it to the `.env` file and to `/.env-template` with a link to receive this credentials.

* Automatically fix code style issues with `npm run fix-style`
* Run test suite `npm test` to ensure that it passes with new source
* Commit changes and message with link to the issue like this: `Add Facebook source, closes #2`
* Push your changes
* Create a pull request and wait all checks results

> **if you need to add a source which requires some credentials** you would have to wait until maintainer add required credentials to the Travis CI for tests and Heroku for production.

* Get your pull request merged if all automated checks are passed
* Socatar would be automatically deployed after merging into master in about 5 minutes

#### Implement a new feature

Implementing a new feature is pretty much the same as adding a new source, but you would need to create a new test file `feature.test.js` for it in the `/tests/` folder.

Please, note that pull request won't be merged without a new test added.

[We are using AVA](https://github.com/avajs/ava) for tests.

If you need any help with creating tests or implementing a feature than commit your current code as `WIP …` and ask a question in the pull request.

### Set up a development environment

The only system requirement is Node.js. You don't need anything else installed to start contributing.

It's okay if it's your first Node.js project, just ask for setup help on the issue you are trying to implement.

* Check Node.js version in `/package.json` engines section. We are using a default `npm` which comes with the Node.js release.
* Clone the project from GitHub
* Copy `/.env-template` to `/.env` and fill it with credentials following links there
* Run `npm install` to download all project dependencies
* Run `npm test` to ensure that system tests pass on your machine
* You're all set! Happy coding!

### Run Socatar locally

* Start server with `npm run start-dev` command, which automatically restarts on any `.js` file change in the `/src` directory. You would see an `Opbeat isn't correctly…` warning — ignore it as you don't need to log errors you see in development.
* Check that homepage accessible at http://localhost:8383/

### Run Socatar in production by yourself

* The easiest start with Heroku ([basic guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)): setup environment variables in Heroku settings and push code to the Heroku remote repo.
* If you need to run it on the virtual machine that you have to know how to set up a Node.js production environment there
