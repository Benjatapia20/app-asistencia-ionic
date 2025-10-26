import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection
} from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private readonly dbName = 'ticketfastDB';

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  // Inicializa la base de datos
  async initDB(): Promise<void> {
    try {
      this.db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false);
      await this.db.open();

      const createTable = `
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,
          password TEXT NOT NULL
        );
      `;
      await this.db.execute(createTable);
      console.log('Base de datos inicializada correctamente.');
    } catch (error) {
      console.error('Error al inicializar SQLite:', error);
    }
  }

  // Guarda un nuevo usuario
  async saveUser(username: string, password: string): Promise<void> {
    if (!this.db) {
      await this.initDB();
    }
    const query = `INSERT INTO users (username, password) VALUES (?, ?);`;
    await this.db?.run(query, [username, password]);
    console.log('Usuario guardado:', username);
  }

  // Obtiene un usuario por su nombre
  async getUser(username: string): Promise<any> {
    if (!this.db) {
      await this.initDB();
    }
    const query = `SELECT * FROM users WHERE username = ?;`;
    const res = await this.db?.query(query, [username]);
    return res?.values?.length ? res.values[0] : null;
  }

  // Cierra la conexión a la base de datos
  async closeDB(): Promise<void> {
    try {
      await this.sqlite.closeConnection(this.dbName, false);
      this.db = null;
      console.log('Conexión SQLite cerrada correctamente.');
    } catch (error) {
      console.error('Error al cerrar la conexión SQLite:', error);
    }
  }
}