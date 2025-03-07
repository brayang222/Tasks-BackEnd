import client from "../config/client.js";
import bcrypt from "bcrypt";

class usersModel {
  async getAllUsers() {
    const db = await client.connect();
    try {
      const [rows] = await db.execute("SELECT * FROM users");
      return rows;
    } catch (error) {
      throw error;
    } finally {
      db.release();
    }
  }

  async getOneUserByEmail(email) {
    const db = await client.connect();
    try {
      const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return rows;
    } catch (error) {
      throw error;
    } finally {
      db.release();
    }
  }

  async getOneUserById(id) {
    const db = await client.connect();
    try {
      const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
      return rows;
    } catch (error) {
      throw error;
    } finally {
      db.release();
    }
  }

  async createUser(user) {
    const db = await client.connect();
    try {
      const { name, email, password, phone, created_at } = user;

      const encryptPassword = await bcrypt.hash(password, 10);

      const [rows] = await db.execute(
        "INSERT INTO users (name, email, password, phone, created_at) VALUES (?, ?, ?, ?, ?)",
        [name, email, encryptPassword, phone, created_at]
      );
      return rows;
    } catch (error) {
      throw error;
    } finally {
      db.release();
    }
  }

  async updateUser(id, user) {
    const db = await client.connect();
    try {
      const { name, email, password, phone } = user;

      const encryptPassword = await bcrypt.hash(password, 10);

      const [rows] = await db.execute(
        "UPDATE users SET name = ?, email = ?, password = ?, phone = ? WHERE id = ?",
        [name, email, encryptPassword, phone, id]
      );
      return rows;
    } catch (error) {
      throw error;
    } finally {
      db.release();
    }
  }

  async deleteUser(id) {
    const db = await client.connect();
    try {
      const [rows] = await db.execute("DELETE FROM users WHERE id = ?", [id]);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      db.release();
    }
  }
}

export default new usersModel();
