'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING(120),
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      parentId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'URL de l\'icône/image de la catégorie'
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {},
        comment: 'Données additionnelles (ex: couleur, icône, ordre d\'affichage)'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Index pour améliorer les performances
    await queryInterface.addIndex('Categories', ['slug']);
    await queryInterface.addIndex('Categories', ['parentId']);
    await queryInterface.addIndex('Categories', ['isActive']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  }
};