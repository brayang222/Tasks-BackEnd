import "dotenv/config";
import jwt from "jsonwebtoken";

export function generateToken(email) {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "168h",
  });
}

export function verificateToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log(token);
  if (!token)
    return res.status(401).json({ error: "Acceso denegado, token requerido" });

  try {
    const dataToken = jwt.verify(token, process.env.JWT_SECRET);
    req.emailConectado = dataToken.email;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Token no válido" });
  }
}
