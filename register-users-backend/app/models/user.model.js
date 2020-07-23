module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      name: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      idade: {
        type: Sequelize.INTEGER
      },
      endereco: { 
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      }


    });
  
    return User;
  };