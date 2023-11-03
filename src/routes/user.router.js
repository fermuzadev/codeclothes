import { Router } from "express";
import { __dirname } from "../utils.js";

import UserModel from "../dao/models/user.model.js";

const router = Router();
router.get("/user", async (req, res) => {
  const users = await UserModel.find();
  res.status(200).json(users);
});

router.post("/user", async (req, res) => {
  try {
    const { body } = req;
    const user = await UserModel.create(body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/user/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await UserModel.findById(uid);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/user/:uid", async (req, res) => {
  const { uid } = req.params;
  const { body } = req;
  const result = await UserModel.updateOne({ _id: uid }, { $set: body });
  res.status(204).end();
});

router.delete("/user/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const deleted = await UserModel.deleteOne({ _id: uid });
    if (!deleted) {
      res.status(404).json({ message: "User not found" });
    } else {
      return res.status(204).end();
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;