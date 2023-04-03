const express = require('express');
const router_admin = express.Router();

/* GET admin page. */
router_admin.get('/dashbord', function(req, res, next) {
    res.render('backend/pages/index', { title: 'Express' });
  });
  
  router_admin.get('/page-account-login', function(req, res, next) {
      res.render('backend/pages/page-account-login', { title: 'Express' });
  });
  
  router_admin.get('/page-account-register', function(req, res, next) {
      res.render('backend/pages/page-account-register', { title: 'Express' });
  });
  
  router_admin.get('/page-blank', function(req, res, next) {
      res.render('backend/pages/page-blank', { title: 'Express' });
  });
  
  router_admin.get('/page-brands', function(req, res, next) {
      res.render('backend/pages/page-brands', { title: 'Express' });
  });
  
  router_admin.get('/page-categories', function(req, res, next) {
      res.render('backend/pages/page-categories', { title: 'Express' });
  });
  
  router_admin.get('/page-form-product-1', function(req, res, next) {
      res.render('backend/pages/page-form-product-1', { title: 'Express' });
  });
  
  router_admin.get('/page-form-product-2', function(req, res, next) {
      res.render('backend/pages/page-form-product-2', { title: 'Express' });
  });
  
  router_admin.get('/page-invoice', function(req, res, next) {
      res.render('backend/pages/page-invoice', { title: 'Express' });
  });
  
  router_admin.get('/page-orders-1', function(req, res, next) {
      res.render('backend/pages/page-orders-1', { title: 'Express' });
  });
  
  router_admin.get('/page-orders-2', function(req, res, next) {
      res.render('backend/pages/page-orders-2', { title: 'Express' });
  });
  
  router_admin.get('/page-orders-detail', function(req, res, next) {
      res.render('backend/pages/page-orders-detail', { title: 'Express' });
  });
  
  router_admin.get('/page-orders-tracking', function(req, res, next) {
      res.render('backend/pages/page-orders-tracking', { title: 'Express' });
  });
  
  router_admin.get('/page-products-grid', function(req, res, next) {
      res.render('backend/pages/page-products-grid', { title: 'Express' });
  });
  router_admin.get('/page-products-grid-2', function(req, res, next) {
      res.render('backend/pages/page-products-grid-2', { title: 'Express' });
  });
  
  router_admin.get('/page-products-list', function(req, res, next) {
      res.render('backend/pages/page-products-list', { title: 'Express' });
  });
  
  router_admin.get('/page-reviews', function(req, res, next) {
      res.render('backend/pages/page-reviews', { title: 'Express' });
  });
  
  router_admin.get('/page-seller-detail', function(req, res, next) {
      res.render('backend/pages/page-seller-detail', { title: 'Express' });
  });
  
  router_admin.get('/page-sellers-cards', function(req, res, next) {
      res.render('backend/pages/page-sellers-cards', { title: 'Express' });
  });
  
  router_admin.get('/page-sellers-list', function(req, res, next) {
      res.render('backend/pages/page-sellers-list', { title: 'Express' });
  });
  
  router_admin.get('/page-settings-1', function(req, res, next) {
      res.render('backend/pages/page-settings-1', { title: 'Express' });
  });
  
  router_admin.get('/page-settings-2', function(req, res, next) {
      res.render('backend/pages/page-settings-2', { title: 'Express' });
  });
  
  router_admin.get('/page-transactions-1', function(req, res, next) {
      res.render('backend/pages/page-transactions-1', { title: 'Express' });
  });
  
  router_admin.get('/page-transactions-2', function(req, res, next) {
      res.render('backend/pages/page-transactions-2', { title: 'Express' });
  });
  
  router_admin.get('/page-transactions-details', function(req, res, next) {
      res.render('backend/pages/page-transactions-details', { title: 'Express' });
  });

  module.exports = router_admin