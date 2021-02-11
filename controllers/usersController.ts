import { Request, Response } from "express";
import User from "../models/user";
import { Op } from "sequelize";

type Params = "first" | "second" | "third";
const userId = 1;
export default {
  async index(req: Request, res: Response) {
    const attr = req.params.id;
    if (!["first", "second", "third"].includes(attr)) {
      return res.status(404).json({ message: "wrong request" });
    }
    try {
      const users = await User.findAll({
        where: {
          [attr]: {
            [Op.ne]: 0,
          },
        },
        order: [[attr as Params, "ASC"]],
      });
      res.json({ users });
    } catch (error) {
      console.log("error");
      res.status(400).json({ error: "errorが発生しました。" });
    }
  },

  async create(req: any, res: Response) {
    const { user } = req.body;
    const { id, ...params } = user;
    const dbUser = { ...params, userId: userId };
    try {
      const targetUser = await User.findOne({
        where: {
          [Op.and]: [{ name: dbUser.name }, { userId: dbUser.userId }],
        },
      });

      if (targetUser) {
        await targetUser.updateProfile(dbUser);
        return res.status(201);
      }
      await User.add(dbUser);
      res.status(201);
    } catch (error) {
      console.log("error");
      res.status(400).json({ error: "errorが発生しました。" });
    }
  },
};
