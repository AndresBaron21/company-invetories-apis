const connection = require('../config/database');
const Company = require('../models/company');
const Category = require('../models/category');
const Article = require('../models/article');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

require("jspdf-autotable");

const PrivateController = {
  getRoles: (req, res) => {
    const userId = req.params.id;
    
    // Query to get user roles
    const query = `
    SELECT roles.*
    FROM roles
    JOIN role_user ON roles.id = role_user.role_id
    JOIN users ON role_user.user_id = users.id
    WHERE users.id = ${userId};
    `;
    
    // Run the query
    connection.query(query, (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error getting user roles');
        return;
      }
      res.json(results);
    });
  },

  // Companies controllers
  addCompany: (req, res) => {
    const { tin, name, address, phone, user_id } = req.body;

    Company.create(tin, name, address, phone, user_id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Record saved successfully' });
        }
    });
  },
  updateCompany: (req, res) => {
    const { name, address, phone, user_id, tin } = req.body;

    Company.update(name, address, phone, user_id, tin, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Record update successfully' });
        }
    });
  },
  deleteCompany: (req, res) => {
    const { tin } = req.body;

    Company.delete(tin, (err ) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Record delete successfully' });
        }
    });
  },
  showCompany: (req, res) => {
    const { tin } = req.body;

    Company.show(tin, (err, record) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ record });
        }
    });
  },
  getCompanyCategories: (req, res) => {
    const { company_id } = req.body;

    Company.getCategories(company_id, (err, record) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ record });
        }
    });
  },


  // Categories controllers
  addCategory: (req, res) => {
    const { name, company_id } = req.body;

    Category.create(name, company_id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Record saved successfully' });
        }
    });
  },
  updateCategory: (req, res) => {
    const { name, company_id, id, } = req.body;

    Category.update(name, company_id, id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Record update successfully' });
        }
    });
  },
  deleteCategory: (req, res) => {
    const { id } = req.body;

    Category.delete(id, (err ) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Record delete successfully' });
        }
    });
  },
  showCategory: (req, res) => {
    const { id } = req.body;

    Category.show(id, (err, record) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ record });
        }
    });
  },
  getCategoryArticles: (req, res) => {
    const { category_id } = req.body;
    Category.getArticles(category_id, (err, record) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ record });
        }
    });
  },


   // Article controllers
   addArticle: (req, res) => {
    const { name, description, category_id } = req.body;

    Article.create(name, description, category_id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Record saved successfully' });
        }
    });
  },
  updateArticle: (req, res) => {
    const { name, description, category_id, id, } = req.body;

    Article.update(name, description, category_id, id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Record update successfully' });
        }
    });
  },
  deleteArticle: (req, res) => {
    const { id } = req.body;

    Article.delete(id, (err ) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Record delete successfully' });
        }
    });
  },
  showArticle: (req, res) => {
    const { id } = req.body;

    Article.show(id, (err, record) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ record });
        }
    });
  },
  downloadPDF: (req, res) => {
    const { category_id } = req.body;

    Category.getArticles(category_id, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            try {
                    // Get the data from the items table
                    const articlesP = result;
                    
                    // Create a new PDF document
                    const doc = new PDFDocument();

                    // Add the title to the document
                    doc.fontSize(20).text('List of articlesP', {align: 'center'}).moveDown();

                    // Add item data to the document
                    articlesP.forEach(article => {
                    doc.fontSize(16).text(`${article.name}:  ${article.description}`);
                    });

                    // Download the PDF file
                    doc.pipe(fs.createWriteStream('articlesP.pdf'));
                    doc.end();
                    // console.log('The PDF file has been downloaded successfully');

                    // Send the PDF file as a response to the client
                    res.download('articlesP.pdf', 'my_file.pdf', (err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ error: 'No se pudo descargar el archivo PDF.' });
                        }
                });
            } catch (error) {
                console.log(error);
                throw new Error('An error occurred while downloading the PDF file');
            }
        }
    });
  },
  sendEmail: (req, res) => {
    const { 
        category_id, 
        sender_email, 
        sender_password, 
        email_recipient, 
        subject, 
        message 
    } = req.body;

    try {
        // Obtener los datos de los artículos de la categoría especificada
        Category.getArticles(category_id, async (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                try {
                    // Get article data
                    const articles = result;

                    // Create a new PDF document
                    const doc = new PDFDocument();

                    // Add the title to the document
                    doc.fontSize(20).text('List of articles', {align: 'center'}).moveDown();

                    // Add item data to the document
                    articles.forEach(article => {
                        doc.fontSize(16).text(`${article.name}: ${article.description}`);
                    });

                    // Save the PDF file on the server
                    doc.pipe(fs.createWriteStream('articles.pdf'));
                    doc.end();

                    // Configure the transporter object with the data from the email service
                    const transporter = nodemailer.createTransport({
                        host: 'smtp.office365.com',
                        port: 587,
                        auth: {
                            user: sender_email,
                            pass: sender_password,
                        },
                        tls: {
                            ciphers: 'SSLv3'
                        }
                    });

                    // Configure the options of the email with the attached PDF file
                    const mailOptions = {
                        from: sender_email,
                        to: email_recipient,
                        subject: subject,
                        text: message,
                        attachments: [{
                            filename: 'articles.pdf',
                            path: 'articles.pdf',
                            contentType: 'application/pdf'
                        }]
                    };

                    // Send the email
                    await transporter.sendMail(mailOptions);

                    // Send a response to the customer indicating that the email was sent successfully
                    res.status(200).send('Email sent successfully');

                } catch (error) {
                    console.log(error);
                    throw new Error('An error occurred while sending the email');
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Email could not be sent');
    }
  },

};

module.exports = PrivateController;
