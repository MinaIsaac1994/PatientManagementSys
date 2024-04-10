// const User = require("./user");
// const Ward = require("./ward");

// // Sequelize hooks to enforce constraint
// const UserTeamWard = sequelize.define('UserTeamWard', {
//   wardId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'Wards',
//       key: 'id'
//     }
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'Users',
//       key: 'id'
//     }
//   }
// }, {
//   hooks: {
//     beforeCreate: async (userTeamWard) => {
//       const user = await User.findByPk(userTeamWard.userId);
//       const ward = await Ward.findByPk(userTeamWard.wardId);

//       // Check if the ward is covered by the user's team
//       // You would need to define your own logic here to determine team coverage
//       if (user.teamId !== ward.teamId) {
//         throw new Error('User cannot be associated with a ward not covered by their team');
//       }
//     },
//     // You might also want to implement similar logic for beforeUpdate, beforeBulkCreate, etc.
//   }
// });

// // Associate Ward and User models with UserTeamWard junction model
// User.belongsToMany(Ward, { through: UserTeamWard });
// Ward.belongsToMany(User, { through: UserTeamWard });
