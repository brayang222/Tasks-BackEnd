import express from "express";
import tasksController from "../controllers/tasks.js";

const router = express.Router();

router.get("/", tasksController.getAll);
router.post("/", tasksController.create);
router.get("/:id", tasksController.getOne);
router.put("/:id", tasksController.update);
router.delete("/:id", tasksController.delete);

export default router;
