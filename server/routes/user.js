const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../db");

const router = express.Router();

module.exports = function (authMiddleware) {
  router.get("/", async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        res
          .status(401)
          .json({ name: "TokenExpiredError", message: "jwt expired" });
      } else {
        res
          .status(200)
          .json({ name: "TokenSuccess", message: "Token Acitive" });
      }
    });
  });
  router.get("/user", authMiddleware, async (req, res) => {
    res.json({ user: req.user });
  });
  router.put("/:id", authMiddleware, async (req, res) => {
    const user = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
      },
    });
    res.json({ user: user });
  });
  router.post("/register", async (req, res) => {
    try {
      const { email, name, password } = req.body;

      // Validate input and ensure uniqueness
      if (!email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const existingUser = await prisma.user.findFirst({
        where: { email: email },
      });

      if (existingUser) {
        return res.status(409).json({ message: "email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { email: email, name: name, password: hashedPassword },
      });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "23h",
      });

      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Registration failed" });
    }
  });
  router.delete("/", authMiddleware, async (req, res) => {
    await prisma.user.delete({ where: { id: req.user.id } });
    res.status(200).json({ message: "User deleted successfully" });
  });
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find user by username
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token with user ID
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "23h",
      }); // Adjust expiration as needed

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Error logging in" });
    }
  });
  router.get("/logs", authMiddleware, async (req, res) => {
    const logs = await prisma.log.findMany({
      where: {
        user: {
          id: req.user.id,
        },
      },
      include: {
        workout: true,
      },
    });
    res.status(200).json({ logs: logs });
  });
  router.delete("/", authMiddleware, async function (req, res) {
    let id = req.user.id;
    let activities = await prisma.activity.findMany({ where: { userId: id } });
    await Promise.all(
      activities.map(async (act) => {
        await prisma.set.deleteMany({ where: { activityId: act.id } });
        await prisma.activity.delete({ where: { id: act.id } });
        return { message: "Deleted Successfully" };
      })
    );
    let logs = await prisma.log.findMany({ where: { userId: id } });
    logs.map(async (log) => {
      await prisma.activity.deleteMany({ where: { logId: log.id } });
      await prisma.log.delete({ where: { id: log.d } });
    });
    await prisma.log.deleteMany({ where: { userId: id } });
    let exercises = await prisma.exercise.findMany({ where: { userId: id } });
    await Promise.all(
      exercises.map(async (exer) => {
        await prisma.workoutExercise.deleteMany({
          where: {
            exerciseId: exer.id,
          },
        });
        await prisma.activity.deleteMany({
          where: {
            exerciseId: exer.id,
          },
        });
        await prisma.exercise.delete({
          where: {
            id: exer.id,
          },
        });
        return { message: "Deleted Successfully" };
      })
    );
    res.status(200).json({ message: "Deleted Successfully" });
  });
  router.post("/logout", async function (req, res, next) {});
  return router;
};
