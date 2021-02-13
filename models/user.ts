import { Model, DataTypes } from "sequelize";
import sequelize from "../middlewares/sequelize";

class User extends Model {
  public id!: number;
  public name!: string;
  public userId!: number;
  public first?: number;
  public second?: number;
  public third?: number;

  static async add(user: User) {
    const newUser = await this.create({
      ...user,
    });
    return newUser;
  }

  async updateProfile(user: User) {
    const updateUser = await this.update({
      ...user,
    });
    return updateUser;
  }
}

User.init(
  {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(250),
    },
    first: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    second: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    third: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "users",
    sequelize: sequelize,
  }
);

export default User;
