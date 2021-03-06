#!/usr/bin/env node
'use strict';

/**
 * Module dependencies
 */
var chalk = require('chalk');
var semver = require('semver');
var tildify = require('tildify');
var Liftoff = require('liftoff');
var v8flags = require('v8flags');
var argv = require('minimist')(process.argv.slice(2));

/**
 * Meanie dependencies
 */
var errorHandler = require('../lib/utility/errorHandler');
var cliPackage = require('../package');

/**
 * Create cli instance
 */
var cli = new Liftoff({
  name: 'meanie',
  v8flags: v8flags
});

//Event listeners for CLI
cli.on('require', function(name) {
  console.log('Requiring external module', chalk.magenta(name));
});
cli.on('requireFail', function(name) {
  console.error(chalk.red('Failed to load external module', name));
});

//Launch CLI application
cli.launch({
  cwd: argv.cwd,
  configPath: argv.meanfile
}, run);

/**
 * CLI logic
 */
function run(env) {

  //Append cli package
  env.cliPackage = cliPackage;

  //Change working directory of process if needed
  if (process.cwd() !== env.cwd) {
    process.chdir(env.cwd);
    console.log(
      'Working directory changed to', chalk.magenta(tildify(env.cwd))
    );
  }

  //Initialize meanie instance var
  var meanie;

  //If no local version present, use CLI bundled package.
  if (!env.modulePath) {
    meanie = require('../lib/meanie');
  }
  else {

    //Log and check for version difference between cli and local installation
    console.log(chalk.yellow('Local meanie found at'), chalk.magenta(tildify(env.modulePath)));
    if (env.modulePackage && typeof env.modulePackage.version !== 'undefined') {
      if (semver.gt(cliPackage.version, env.modulePackage.version)) {
        console.log(chalk.yellow('Warning: Meanie version mismatch'));
        console.log(chalk.yellow('CLI version is', cliPackage.version));
        console.log(chalk.yellow('Local version is', env.modulePackage.version));
      }
    }

    //Use local meanie package
    meanie = require(env.modulePath);
  }

  //Determine command
  if (argv.v || argv.version) {
    meanie.command = 'version';
  }
  else if (meanie.resolveCommand(argv._[0])) {
    meanie.command = argv._.shift();
  }
  else {
    return errorCallback(new Error('Unknown command!'));
  }

  //Load
  meanie.load(env, argv, function(error) {
    if (error) {
      return errorHandler(error);
    }

    //Run command
    process.nextTick(function() {
      meanie.commands[meanie.command](argv._, errorHandler);
    });
  });
}
