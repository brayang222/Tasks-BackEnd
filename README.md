# CRUD Task Manager

Este proyecto es una API RESTful para la gestión de tareas y usuarios. Está diseñado para ser utilizado junto con el front-end disponible en el siguiente repositorio: [Tasks-FrontEnd](https://github.com/brayang222/Tasks-FrontEnd.git).

## Despliegue

- **Back-end**: El back-end está desplegado en [Railway](https://railway.app/).
- **Front-end**: El front-end está desplegado en [Vercel](https://tasks-front-end.vercel.app/).

## Características

- Gestión de usuarios:
  - Registro de usuarios.
  - Inicio de sesión con generación de token JWT.
  - Actualización y eliminación de usuarios.
  - Perfil de usuario protegido por autenticación.
- Gestión de tareas:
  - Creación, lectura, actualización y eliminación de tareas.
  - Relación entre usuarios y tareas.
- Seguridad:
  - Autenticación mediante tokens JWT.
  - Encriptación de contraseñas con bcrypt.
- Base de datos:
  - Conexión a base de datos MySQL utilizando `mysql2`.

## Tecnologías utilizadas

- **Back-end**: Node.js, Express.js
- **Base de datos**: MySQL
- **Autenticación**: JSON Web Tokens (JWT)
- **Despliegue**: Railway (Back-end), Vercel (Front-end)

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/brayang222/CRUD-task.git
   cd CRUD-task
   ```
