import 'dotenv/config';
import mysql from 'mysql2/promise';

class Client {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.HOST_DB,
      user: process.env.USER_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE,
      waitForConnections: true,
      connectionLimit: 10, 
      queueLimit: 0
    });
    console.log('Database pool created and connected to database');
  }

  async connect() {
    return await this.pool.getConnection(); 
  }

  async disconnect() {
    await this.pool.end();
    console.log('Disconnected from database');
  }
}

export default new Client();