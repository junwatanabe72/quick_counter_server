import { Request, Response } from "express";
import User from "../models/user";
import { Op } from "sequelize";

type Params = "first" | "second" | "third";

export default {
  async index(req: Request, res: Response) {
    const attr = req.params.id;
    if (!["first", "second", "third"].includes(attr)) {
      return res.status(404).json({ message: "wrong request" });
    }
    console.log(attr);
    const users = await User.findAll({
      where: {
        [attr]: {
          [Op.ne]: 0,
        },
      },
      order: [[attr as Params, "ASC"]],
    });

    if (!users) {
      return res.status(404).json({ message: "not exist" });
    }
    res.json({ users });
  },

  async create(req: any, res: Response) {
    const { user } = req.body;
    console.log(user);
    try {
      const targetUser = await User.findOne({
        where: {
          [Op.and]: [{ name: user.name }, { userId: user.userId }],
        },
      });

      if (targetUser) {
        const updateUser = await targetUser.updateProfile(user);
        return res.json({ updateUser });
      }
      const newUser = await User.add(user);
      res.json({ newUser });
    } catch (error) {
      res.status(400);
    }
  },
};
