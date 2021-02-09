import { Request, Response } from "express";
import User from "../models/user";

export default {
  async index(req: Request, res: Response) {
    const users = await User.findAll();
    if (!users) {
      return res.status(404).json({ message: "not exist" });
    }
    res.json({ users });
  },

  async create(req: any, res: Response) {
    const { user } = req.body;
    try {
      const targetUser = await User.findOne({ where: { name: user.name } });
      if (targetUser) {
        return res.json({ targetUser });
      }
      const newUser = await User.add(user);
      res.json({ newUser });
    } catch (error) {
      res.status(400);
    }
  },
  async update(req: any, res: Response) {
    const id = req.params.id;
    const { user } = req.body;
    const targetUser = await User.findOne({ where: { id } });
    if (!targetUser) {
      return res.status(404).json({ message: "not exist" });
    }
    try {
      const updateUser = await targetUser.updateProfile(user);
      res.json({ updateUser });
    } catch (error) {
      res.status(400);
    }
  },
};
