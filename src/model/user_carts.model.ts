import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";
import { UserDataModel } from "./user_data.model";

export const UserCartModel = sequelize.define(
  "user_carts", {
    id_user_cart: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    selected_products:{
      type: DataTypes.JSON
    }
  },
  {
    timestamps: false
  }
)

UserCartModel.belongsTo(UserDataModel, {
  foreignKey: 'id_user',
  targetKey: 'id_user'
})

UserDataModel.hasOne(UserCartModel, {
  foreignKey: 'id_user',
  sourceKey: 'id_user'
})