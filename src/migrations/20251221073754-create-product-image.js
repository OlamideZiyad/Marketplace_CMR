'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductImages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Si le produit est supprimé, ses images aussi
      },
      url: {
        type: Sequelize.STRING(500),
        allowNull: false,
        comment: 'URL de l\'image sur Cloudinary'
      },
      publicId: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Public ID Cloudinary pour la suppression' 
      },
      isPrimary: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: 'Image principale affichée en premier'
      },
      order: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment: 'Ordre d\'affichage des images (0 = première)'
      },
      width: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Largeur de l\'image en pixels'
      },
      height: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Hauteur de l\'image en pixels'
      },
      format: {
        type: Sequelize.STRING(10),
        allowNull: true,
        comment: 'Format du fichier (jpg, png, webp, etc.)'
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Taille du fichier en bytes'
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
    await queryInterface.addIndex('ProductImages', ['productId']);
    await queryInterface.addIndex('ProductImages', ['isPrimary']);
    await queryInterface.addIndex('ProductImages', ['order']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductImages');
  }
};