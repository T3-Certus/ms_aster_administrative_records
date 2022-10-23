import { DataTypes } from 'sequelize'
import { sequelize } from '../db/dbConnection'

export const IndividualProductModel = sequelize.define(
  "individual_products", {
    id_individual_product:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_stock:{
      type:  DataTypes.INTEGER
    },
    product_color: {
      type: DataTypes.STRING
    },
    product_price: {
      type: DataTypes.DECIMAL
    },
    product_sku:{
      type: DataTypes.STRING
    },
    product_url_img: {
      type: DataTypes.STRING
    },
    has_offer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    percent_discount: {
      type: DataTypes.INTEGER
    }
  }
)