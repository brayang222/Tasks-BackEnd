import client from "../config/client.js";

class tasksModel {
  async getAll() {
    const db = await client.connect();
    try {
      const [rows] = await db.execute("SELECT * FROM tasks");
      return rows;
    } catch (error) {
      throw error;
    } finally {
      db.release();
    }
  }

  async getOne(id) {
    const db = await client.connect();
    try {
      const [rows] = await db.execute("SELECT * FROM tasks WHERE id = ?", [id]);
      return rows;
    } catch (error) {
      throw error;
    } finally {
      db.release();
    }
  }

  async create(task) {
    const db = await client.connect();
    try {
      const { user_id, title, description, status, due_date } = task;
      const [rows] = await db.execute(
        "INSERT INTO tasks (user_id, title, description, status, due_date) VALUES (?, ?, ?, ?, ?)",
        [user_id, title, description, status, due_date]
      );
      return rows;
    } catch (error) {
      throw error;
    } finally {
      db.release();
    }
  }

  async update(id, task) {
    const db = await client.connect();
    try {
      const { user_id, title, description, status, due_date } = task;
      const [rows] = await db.execute(
        "UPDATE tasks SET user_id = ?, title = ?, description = ?, status = ?, due_date = ? WHERE id = ?",
        [user_id, title, description, status, due_date, id]
      );
      return rows;
    } catch (error) {
      throw error;
    } finally {
      db.release();
    }
  }

  async delete(id) {
    const db = await client.connect();
    try {
      const [rows] = await db.execute("DELETE FROM tasks WHERE id = ?", [id]);
      return rows;
    } catch (error) {
      throw error;
    } finally {
      db.release();
    }
  }
}

export default new tasksModel();
