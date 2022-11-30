// import { sequelize } from "./model"
import { sequelize } from "./db/dbConnection";
import { app, port } from "./app";
import mongoConnection from "./db/mongoConnection"

async function main() {
  
  const host = '0.0.0.0'

  await sequelize
    .sync({ force: false })
    .then(() => console.log("Connected with the database"))
    .catch((err) => {
      console.log("Cannot connect to the database", err);
      process.exit();
    });

  app.listen(port, host, () => {
    console.log(`Server running at ${host}:${port}`);
  });

  mongoConnection
}

main();
