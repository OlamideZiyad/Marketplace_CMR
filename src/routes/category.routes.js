'use strict';

const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryTree,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory
} = require('../controllers/category.controller');
const categoryValidator = require('../middlewares/validators/category.validator');
const { protect } = require("../middlewares/auth.middleware");
const { isSeller, isAdmin } = require("../middlewares/role.middleware");


/**
 * Routes publiques (accessibles sans authentification)
 */

// Récupérer toutes les catégories avec filtres
router.get(
  '/',
  categoryValidator.validateGetAll(),
  getAllCategories
);

// Récupérer l'arbre complet des catégories
router.get(
  '/tree',
  getCategoryTree
);

// Récupérer une catégorie par slug (AVANT /:id pour éviter les conflits)
router.get(
  '/slug/:slug',
  categoryValidator.validateGetBySlug(),
  getCategoryBySlug
);

// Récupérer une catégorie par ID
router.get(
  '/:id',
  categoryValidator.validateGetById(),
  getCategoryById
);

// Créer une catégorie
router.post(
  '/',
  protect,
 isAdmin,
  categoryValidator.validateCreate(),
  createCategory
);

// Mettre à jour une catégorie
router.put(
  '/:id',
  protect,
 isAdmin,
  categoryValidator.validateUpdate(),
  updateCategory
);

// Supprimer une catégorie
router.delete(
  '/:id',
  protect,
 isAdmin,
  categoryValidator.validateDelete(),
  deleteCategory
);

module.exports = router;