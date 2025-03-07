import tasksModel from "../models/tasks.js";

class tasksController {
  constructor() {}

  async getAll(req, res) {
    try {
      const data = await tasksModel.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error al obtener tarea:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener tareas",
        error: error.message,
      });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const data = await tasksModel.getOne(id);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error al obtener la tarea:", error);
      res.status(500).json({
        success: false,
        message: "Error al obtener la tarea",
        error: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      console.log("Datos recibidos en el backend:", req.body);
      const data = await tasksModel.create(req.body);
      res.status(201).json({ message: "Tarea creada", task: data });
    } catch (error) {
      console.error("Error al crear tarea:", error);
      res.status(500).json({
        success: false,
        message: "Error al crear tarea",
        error: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = await tasksModel.update(id, req.body);
      res.status(200).json({ message: "Tarea actualizada", task: data });
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar tarea",
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const data = await tasksModel.delete(id);
      res.status(206).json({ message: "Tarea eliminada", task: data });
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      res.status(500).json({
        success: false,
        message: "Error al eliminar tarea",
        error: error.message,
      });
    }
  }
}

export default new tasksController();
