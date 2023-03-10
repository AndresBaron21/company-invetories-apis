const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('../middlewares/auth');
const PublicController = require('../controllers/public');
const PrivateController = require('../controllers/private');
const AuthController = require('../controllers/auth');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Here are the authentication routes
app.post('/auth/register', AuthController.register);
app.post('/auth/login', AuthController.login);

// Here are the public routes
app.get('/public', PublicController.getPublicData);
// Company
app.get('/company/reed', PublicController.reedCompany);

// Here are the private routes
app.use(authMiddleware);
app.get('/roles', PrivateController.getRoles);
// Company
app.post('/company/store', PrivateController.addCompany);
app.post('/company/update', PrivateController.updateCompany);
app.post('/company/show', PrivateController.showCompany);
app.post('/company/delete', PrivateController.deleteCompany);
app.post('/company/categories', PrivateController.getCompanyCategories);

// Category
app.post('/category/store', PrivateController.addCategory);
app.post('/category/update', PrivateController.updateCategory);
app.post('/category/show', PrivateController.showCategory);
app.post('/category/delete', PrivateController.deleteCategory);
app.post('/category/articles', PrivateController.getCategoryArticles);

// Article
app.post('/article/store', PrivateController.addArticle);
app.post('/article/update', PrivateController.updateArticle);
app.post('/article/show', PrivateController.showArticle);
app.post('/article/delete', PrivateController.deleteArticle);
app.post('/article/pdf', PrivateController.downloadPDF);
app.post('/article/send-email', PrivateController.sendEmail);

module.exports = app;
