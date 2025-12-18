'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Ajout de la colonne categoryId dans Products
    await queryInterface.addColumn('Products', 'categoryId', {
      type: Sequelize.UUID,
      allowNull: true, // Nullable au début pour les produits existants
      references: {
        model: 'Categories',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT' // Empêche la suppression d'une catégorie avec des produits
    });

    // Ajout d'un index pour améliorer les performances des requêtes
    await queryInterface.addIndex('Products', ['categoryId']);
  },

  async down(queryInterface, Sequelize) {
    // Suppression de l'index
    await queryInterface.removeIndex('Products', ['categoryId']);
    
    // Suppression de la colonne
    await queryInterface.removeColumn('Products', 'categoryId');
  }
};