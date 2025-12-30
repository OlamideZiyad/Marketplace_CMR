'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Si l'utilisateur est supprimé, ses adresses aussi
      },
      label: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: 'Ex: Domicile, Bureau, Chez mes parents'
      },
      fullName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: 'Nom complet du destinataire'
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: 'Numéro de téléphone du destinataire'
      },
      line1: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Adresse ligne 1 (rue, numéro)'
      },
      line2: {
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: 'Adresse ligne 2 (complément, bâtiment, étage)'
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: 'Ville (ex: Douala, Yaoundé, Bafoussam)'
      },
      region: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: 'Région (ex: Littoral, Centre, Ouest)'
      },
      /* postalCode: {
        type: Sequelize.STRING(10),
        allowNull: true,
        comment: 'Code postal (optionnel au Cameroun)'
      }, */
      country: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'Cameroun'
      },
      isDefault: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        comment: 'Adresse par défaut pour les commandes'
      },
      deliveryInstructions: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Instructions spéciales de livraison'
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
    await queryInterface.addIndex('Addresses', ['userId']);
    await queryInterface.addIndex('Addresses', ['isDefault']);
    await queryInterface.addIndex('Addresses', ['city']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  }
};