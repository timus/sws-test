'use strict';

const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const scores = [];
    const filePath = path.join(__dirname, '../fixtures/company-scores.csv');

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          scores.push({
            id: parseInt(row.id),
            company_id: row.company_id,
            date_generated: new Date(row.date_generated),
            dividend: parseInt(row.dividend),
            future: parseInt(row.future),
            health: parseInt(row.health),
            management: parseInt(row.management),
            past: parseInt(row.past),
            value: parseInt(row.value),
            misc: parseInt(row.misc),
            total: parseInt(row.total),
            sentence: row.sentence
          });
        })
        .on('end', () => {
          queryInterface.bulkInsert('swsCompanyScore', scores)
            .then(resolve)
            .catch(reject);
        });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('swsCompanyScore', null, {});
  }
};
