'use strict';

const Sequelize = require('sequelize');
const db = require('../index.js');

var crypto = require('crypto');

var user = db.define('User', {
  name: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    set: function (plaintext) {
      this.setDataValue('password', this.hashPassword(plaintext));
    }
  },
  salt: {
    type: Sequelize.STRING,
    defaultValue: function () {
      return crypto.randomBytes(16).toString('base64');
    }
  }
}, {
  defaultScope: {
    attributes: {exclude: ['password', 'salt']}
  },
  instanceMethods: {
    hashPassword: function (plaintext) {
      return crypto.pbkdf2Sync(plaintext, this.salt, 10000, 64,'sha1').toString('base64');
    },
    isPasswordValid: function (attempt) {
      return this.hashPassword(attempt) === this.password;
    }
  },
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('story'),
        attributes: {exclude: ['paragraphs']}
      }]
    })
  }
});

module.exports = user;
