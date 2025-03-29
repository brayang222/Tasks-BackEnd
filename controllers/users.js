import { generateToken } from "../helpers/autentication.js";
import usersModel from "../models/users.js";
import bcrypt from "bcrypt";

class usersController {
  constructor() {}

  async getAllUsers(req, res) {
    try {
      const data = await usersModel.getAllUsers();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener usuarios",
        error: error.message,
      });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const data = await usersModel.getOneUserById(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener usuario",
        error: error.message,
      });
    }
  }

  async profile(req, res) {
    try {
      const { email } = req.params;
      const data = await usersModel.getOneUserByEmail(email);

      if (data.length === 0)
        return res
          .status(400)
          .json({ error: "No se encontraron usuarios con este email" });

      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener el perfil del usuario",
        error: error.message,
      });
    }
  }

  async register(req, res) {
    try {
      const { email } = req.body;

      const userExist = await usersModel.getOneUserByEmail(email);
      if (userExist.length != 0)
        return res.status(400).json({ error: "El usuario ya existe" });

      const data = await usersModel.createUser(req.body);
      console.log(data);
      res.status(201).json(data);
    } catch (error) {
      console.error("data: ", req.body, "Error: ", error);
      res.status(500).json({
        success: false,
        message: "Error al crear usuario",
        error: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const userExist = await usersModel.getOneUserByEmail(email);
      if (userExist.length === 0)
        return res.status(400).json({ error: "El usuario no existe" });

      const validPassword = await bcrypt.compare(
        password,
        userExist[0].password
      );
      if (!validPassword)
        return res.status(400).json({ error: "La clave no es válida" });

      const token = generateToken(email);

      console.log("Usuario: ", email, "pass:", password, "token:", token);
      return res.status(200).json({ user: userExist[0], token });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error al iniciar sesión usuario",
        error: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = await usersModel.updateUser(id, req.body);
      console.log("Usuario actualizado", req.body);
      return res
        .status(200)
        .json({ message: "Usuario actualizado", data: data });
    } catch (error) {
      console.error(error, req.body);
      res.status(500).json({
        success: false,
        message: "Error al actualizar usuario",
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const data = await usersModel.deleteUser(id);
      return res.status(206).json({ message: "Usuario eliminado", data: data });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al eliminar usuario",
        error: error.message,
      });
    }
  }
}

export default new usersController();
