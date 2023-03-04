const Company = require('../models/company');

const PublicController = {
    getPublicData: (req, res) => {
        res.status(200).json({ message: 'This is public data' });
    },

    // Companies controllers
    reedCompany: (req, res) => {
        Company.reed((err, records) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ records });
            }
        });
      },
};

module.exports = PublicController;
