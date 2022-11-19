// import { sequelize } from "./model"
import { sequelize } from "./db/dbConnection";
import { app, port } from "./app";

async function main() {
  
  await sequelize
    .sync({ force: false })
    .then(() => console.log("Connected with the database"))
    .catch((err) => {
      console.log("Cannot connect to the database", err);
      process.exit();
    });

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at ${port} port`);
  });
}

main();
