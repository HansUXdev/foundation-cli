var fs = require('fs');
var path = require('path');

module.exports = function(options) {
  var questions = [];

  // Which Framework would the user want to use?
  questions.push({
    type: 'list',
    name: 'framework',
    message: 'What are you building today?',
    default: 'sites',
    choices: [
      {
        name: 'A website (Foundation for Sites)',
        value: 'sites'
      }, 
      {
        name: 'A web app (Foundation for Apps)',
        value: 'apps'
      }, 
      {
        name: 'An email (Foundation for Emails)',
        value: 'emails'
      },
      {
        name: 'A wordpress site (Foundation for WordPress)',
        value: 'wordpress'
      }
    ],
    when: function () {
      if (!options.framework || !options.framework.match(/^(site|app|email)s?$/i))
        return true;
    }
  });

  // What will they call the project?
  questions.push({
    type: 'input',
    name: 'directory',
    message: 'What\'s the project called? (no spaces)',
    validate: function(input) {
      var folder = path.join(process.cwd(), input);
      if (fs.existsSync(folder)) {
        return 'There\'s already a folder with that name in this directory.';
      }
      if (input.indexOf(" ") != -1) {
        return "The project name should not contain any spaces.";
      }
      return true;
    },
    when: function () {
      if (!options.directory)
        return true;
    }
  });

  // Which site template would they like to use?
  questions.push({
    type: 'list',
    name: 'sites_templates', 
    message: 'Which template would you like to use?',
    default: 'basic',
    choices: [
      {
        name: 'An Express.js fork of the classic Zurb Template.',
        value: 'basic'
      }, 
      {
        name: 'ZURB Styleguide: A styleguide for designing components and getting feedback via Notable.',
        value: 'styleguide'
      },
      {
        name: 'ZURB Template: includes Handlebars templates and Sass/JS compilers',
        value: 'zurb'
      },
    ],
    when: function(answers) {
      if (!options.template && (answers.framework === 'sites' || options.framework === 'sites'))
        return true;
    }
  });

  // Template for Apps
  questions.push({
    type: 'list',
    name: 'app_templates',
    message: 'Which template would you like to use?',
    default: 'angular',
    choices: [
      {
        name: 'Our starter template for Foundation for Apps projects.',
        value: 'angular'
      }, 
      {
        name: 'React with Foundation 6',
        value: 'react'
      }, 
      {
        name: 'A simple Express App',
        value: 'express'
      },
      {
        name: 'A simple MarkoJs Site',
        value: 'marko'
      } 
    ],
    when: function(answers) {
      if (!options.template && (answers.framework === 'apps' || options.framework === 'apps'))
        return true;
    }
  });

  // Template for Emails
  questions.push({
    type: 'list',
    name: 'email_templates',
    message: 'Which email template would you like to use?',
    default: 'basic',
    choices: [
      {
        name: 'Official template for new Foundation for Emails projects.',
        value: 'Basic'
      }, 
      {
        name: 'A lightweight node Email Server.',
        value: 'server'
      }, 
    ],
    when: function(answers) {
      if (!options.template && (answers.framework === 'emails' || options.framework === 'emails'))
        return true;
    }
  });


  // Template for WordPress
  questions.push({
    type: 'list',
    name: 'WP_templates',
    message: 'Which template would you like to use?',
    default: 'FoundationPress',
    choices: [
      {
        name: 'FoundationPress is a WordPress starter theme based on Foundation 6 by Zurb.',
        value: 'FoundationPress'
      },
      {
        name: 'A blank WordPress theme built with Foundation 6, giving you all the power and flexibility you need to build complex, mobile friendly websites without having to start from scratch.',
        value: 'JointsWP'
      },
    ],
    when: function(answers) {
      if (!options.template && (answers.framework === 'wordpress' || options.framework === 'wordpress'))
        return true;
    }
  });

  return questions;
}
