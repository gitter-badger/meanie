# Meanie
Meanie is a boilerplate for developing full-stack modular javascript applications using the MEAN stack (MongoDB, Express, AngularJS and Node.js), powered by the Gulp task runner.

* [Meanie @ npm](https://www.npmjs.com/package/meanie)
* [Meanie @ github](https://github.com/meanie/meanie)

## Installation
```shell
# Install meanie CLI globally
npm install -g meanie
```

## Usage
To get started, first create a new Meanie project:
```shell
# Create a new Meanie project in the current directory
meanie create

# Create a new Meanie project in a given directory
meanie create ~/some/path
```

After you've created a new Meanie project, you can install additional Meanie modules as follows:
```shell
# Install a specific Meanie module for the current project
meanie install fontello
```

To find out what Meanie modules are available, check Meanie on [github](https://github.com/meanie) or find Meanie modules in the [npm registry](https://www.npmjs.com/search?q=meanie-module).

## Gulp tasks
Meanie comes with fully configured [Gulp](http://gulpjs.com/) tasks for all common development and build tasks.

*Note*: The gulpfile for Meanie has been configured for use with Gulp version 4. This version is not officially released yet, but you can install and use the alpha version by following  [these instructions](http://demisx.github.io/gulp4/2015/01/15/install-gulp4.html).

### Default
The default task, which you can run by simply typing `gulp` is to run the three main tasks, build, watch and start. This is perfect for ongoing development.
```shell
$ gulp
```
You can also run these tasks individually if needed.

### Build
Build the application and populate the public folder with compiled javascript, stylesheets and static assets. The build task also lints your files and runs your tests prior to building.
```shell
$ gulp build
```

### Watch
Watch your files for changes and runs linters, unit tests and recompiles the application files as needed.
```shell
$ gulp watch
```
The watch task also comes with livereload, which gets triggered every time the index file is rebuilt. To use it, simply install the [Chrome livereload plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en).

### Start
Starts the Node server using [Nodemon](http://nodemon.io/).
```shell
$ gulp start
```

### Testing
You can test your client and server side code without building by using one of the following tasks:
```shell
# Test server side code and client side code
$ gulp test

# Test server side code
$ gulp test-server

# Test client side code
$ gulp test-client
```

### Versioning
There are three versioning tasks which help you bump your version numbers in your package files and automatically update the version in your README file, as well as commit the bump to the repository and tag it with the new version.

This process uses [semantic versioning](https://github.com/npm/node-semver).

```shell
# Bump the patch version (0.1.0 -> 0.1.1)
$ gulp patch

# Bump the minor version (0.1.0 -> 0.2.0)
$ gulp minor

# Bump the major version (0.1.0 -> 1.0.0)
$ gulp major
```

### Helpers
Some of the helper tasks have also been exposed to the CLI:``

```shell
# Cleans the public folder
$ gulp clean

# Copy all static assets to the public folder
$ gulp static
```

## Folder structure
The following is an outline of the folder structure of this boilerplate:

```shell
# Client side code and assets
├─ client

  # This is where your client side Angular application resides.
  # Everything in this folder should be explicitly specific to
  # your application.
  ├─ app

    # The home module of your application. Feel free to rename to
    # anything that suits better (e.g. index, dashboard, ...)
    ├─ home

    # This folder contains the layout module for you application.
    # It's a good place to store all common stylesheets and templates.
    ├─ layout

    # The navigation module, for application wide navigation logic.
    ├─ nav

    # Any application specific, but shared services, directives and
    # filters that don't belong to one specific module reside here.
    └─ shared

  # Common (non packaged) services, directives and filters are arranged
  # in this folder. Everything in here is not specific to a particular
  # application and could be recycled in other projects.
  ├─ common

  # Static assets for your client application go here. This is a good
  # place to store fonts, images, audio files, etc. Anything in here
  # will be copied as-is to the public folder.
  ├─ static

  # Vendor resources reside here. Bower is configured to download all
  # 3rd party resources into this folder, and this folder is excluded
  # from the GIT repository.
  └─ vendor

# Server side code and assets
├─ server

  # This is where your server side Node/Express application resides.
  # Everything in this folder should be specific to your application.
  ├─ app

  # Common (non packaged) node modules are arranged in this folder.
  # Everything in here is not specific to a particular application
  # and could be recycled in other projects.
  └─ common

# Environment configuration (shared by client and server)
├─ env

# Public folder for compiled assets (generated by Gulp)
└─ public

  # Compiled CSS stylesheets
  ├─ css

  # Compiled Javascript sources
  ├─ js

  # Fonts (copied over from client/static)
  ├─ fonts

  # Images (copied over from client/static)
  └─ images
```

## FAQ

#### How is Meanie different from other MEAN boilerplates?
The most important difference between Meanie and other MEAN boilerplates like [MEAN.JS](https://github.com/meanjs/mean), is that Meanie uses a [modular approach to folder/file structuring](http://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript), whereas most others use more of a "sock drawer" approach to organizing files. Meanie thinks that a modular approach is easier to navigate, easier to reuse/refactor, and easier to develop with.

Other differences are:
* Meanie uses Gulp 4 as it's task runner instead of Grunt.
* Meanie doesn't serve the Angular HTML files as views, but instead leverages powerful Gulp tasks to compile and pre-process these files.
* Meanie has a simple overarching environment/configuration system that makes it a breeze to use your specific environment configuration options in your server app, client app, and even in your gulpfile and Karma configuration file.

#### Why doesn't Meanie use Yeoman?
[Yeoman](http://yeoman.io/) prescribes a particular folder structure (e.g. must have /app in your root), whereas Meanie likes to split your code between server/ and client/ first.

#### Why can't I simply install Meanie modules with npm?
Unfortunately, npm currently doesn't support moving package code outside of the `node_modules` folder. Since the Meanie boilerplate has to reside in your project folder and not in `node_modules`, it was necessary to circumvent this limitation by creating a custom CLI tool.

If at some point npm and Bower somehow fuse into a single wonderful tool to manage both client and server side dependencies, Meanie will be the first to use it!

#### What if I want to use different server architecture?
Just delete the `server` folder and replace it with whatever you'd like to use. You can use backend mocks for the client application by installing the [Meanie Backend Mocks](https://github.com/meanie/meanie-backend-mocks) module.

#### What if I want to use different client architecture?
The Meanie client app is built on the AngularJS framework. If you want to use a different framework, it is recommended you find a different boilerplate, suited for that specific framework.

## Further reading
* [Modular vs sock drawer folder structure](http://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript)
* [Editor config](http://editorconfig.org)
* [Bower configuration](http://bower.io/docs/config/)
* [JSHint configuration](http://jshint.com/docs/options/)
* [Package.json configuration](https://docs.npmjs.com/files/package.json)
* [Debugging Javascript](https://developer.chrome.com/devtools/docs/javascript-debugging)

## Bugs, issues, suggestions, feature requests
Please report all bugs, issues, suggestions and feature requests in our [GitHub issue tracker](https://github.com/meanie/meanie/issues).

## Contributing
If you would like to contribute to Meanie, please check out [CONTRIBUTING.md](https://github.com/meanie/meanie/blob/master/CONTRIBUTING.md).

## Credits
* Server side logic partially derived from [MEAN.JS](https://github.com/meanjs/mean)
* MEAN name coined by [Valeri Karpov](http://blog.mongodb.org/post/49262866911/the-mean-stack-mongodb-expressjs-angularjs-and)
* CLI tool inspired by [Gulp](https://github.com/gulpjs/gulp) and [npm](https://github.com/npm/npm).

## License
(MIT License)

Copyright 2015, [Adam Buczynski](http://adambuczynski.com)
