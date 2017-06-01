const Sequelize = require('sequelize');
const db = require('../index.js');

// from pre-db
/*	{id:1,
		coreId: 11,
		minorId: null,
		cluster: 1,
		title: 'Lutherans on the Grand Canal',
		srcId: [1],
		src: '/img/placeholder_06.jpg ',
		caption: 'lorem ipsum',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sem est, ultricies at cursus non, sodales bibendum elit. Suspendisse pellentesque accumsan risus, ac malesuada risus sodales at. Cras imperdiet tellus sed dolor volutpat pellentesque. Quisque eleifend efficitur lacus. Maecenas ornare blandit turpis non bibendum. Cras vel fermentum tortor, vitae auctor sapien. Suspendisse massa neque, pulvinar vel pulvinar vitae, iaculis sit amet massa. Nunc accumsan sapien quis sapien semper ullamcorper. Etiam pellentesque orci ac lectus tempor tincidunt. In viverra nulla felis, ut mollis tortor semper sit amet. Maecenas nec est lacus. Quisque erat lorem, malesuada non faucibus id, fermentum eget velit.',
		catalog: 'lorem ipsum', }, */

const narratives = db.define('Narratives', {
    coreId: {type: Sequelize.INTEGER},
    minorId: {type: Sequelize.INTEGER},
    clusterId: {type: Sequelize.INTEGER, notNull: true },
    title: {type: Sequelize.STRING, notNull: true },
    imageSeries: {type: Sequelize.INTEGER, notNull: true },
    //src: {type: Sequelize.STRING, notNull: true },
    //caption: {type: Sequelize.STRING, notNull: true },
    text: {type: Sequelize.TEXT, notNull: true },
    catalogSource: {type: Sequelize.TEXT, notNull: true },
    catalogLink: {type: Sequelize.STRING },
    biblio: {type: Sequelize.TEXT},
    researcherName: {type: Sequelize.STRING },
    researcherTitle: {type: Sequelize.STRING },
    researcherAffiliation: {type: Sequelize.STRING },
});

module.exports = narratives;
