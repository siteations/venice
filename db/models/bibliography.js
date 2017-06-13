const Sequelize = require('sequelize');
const db = require('../index.js');

// from pre-db

const biblio = db.define('Biblio', {
    narrativeId: {type: Sequelize.INTEGER }, //one or the other... multiple entries per each narrative if desired
    imageId: {type: Sequelize.INTEGER },

    author: {type: Sequelize.STRING, notNull: true },
    title: {type: Sequelize.STRING, notNull: true },
    published: {type: Sequelize.STRING, notNull: true },
    physical: {type: Sequelize.STRING, },
    page: {type: Sequelize.STRING },
    link: {type: Sequelize.STRING },
});

module.exports = biblio;

/*
author:	Braun, Georg, 1540 or 1541-1622.
title:	Diuersi Dithmarsorum et vicinarum gentium habitus.
published:	[Amsterdam : Van Hoeve, 1980]
physical:	1 view ; 36 x 50 cm.
page: whatever pg or folio, etc.
link:	https://i-share.carli.illinois.edu/nby/cgi-bin/Pwebrecon.cgi?DB=local&v1=1&BBRecID=947138
*/
