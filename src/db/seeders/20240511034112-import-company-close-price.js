'use strict';

const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const priceCloses = [];
    const filePath = path.join(__dirname, '../fixtures/company-price-close.csv');
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          priceCloses.push({
            date: new Date(row.date),
            company_id: row.company_id,
            price: parseFloat(row.price),
            date_created: new Date(row.date_created)
          });
        })
        .on('end', () => {
          queryInterface.bulkInsert('swsCompanyPriceClose', priceCloses)
            .then(() => resolve())
            .catch((error) => reject(error));
        });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('swsCompanyPriceClose', null, {});
  }
};
