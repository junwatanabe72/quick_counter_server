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

    const targetUser = await User.findOne({
      where: {
        [Op.and]: [{ name: dbUser.name }, { userId: dbUser.userId }],
      },
    });
    try {
      if (targetUser) {
        await targetUser.updateProfile(dbUser);
        res.status(201).end();
        return;
      }
      console.log(dbUser);
      await User.add(dbUser);
      res.status(201).end();
    } catch (error) {
      console.log("error");
      res.status(400).json({ error: "errorが発生しました。" });
    }
  },
};
