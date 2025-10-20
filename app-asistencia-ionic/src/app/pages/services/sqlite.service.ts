import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class SQLiteService {
  private sqliteConnection: SQLiteConnection;
  private db: SQLiteDBConnection | null = null; //Inicializado en null
  private readonly dbName = 'appDB';

  constructor() {
    // Pasar la implementación concreta requerida por la librería
    this.sqliteConnection = new SQLiteConnection(CapacitorSQLite);
    this.init();
  }

  // Inicializa la conexión y la DB (si no existe la crea)
  async init(): Promise<void> {
    try {
      const consistency = await this.sqliteConnection.checkConnectionsConsistency();
      const isConn = (await this.sqliteConnection.isConnection(this.dbName, false)).result;

      if (consistency.result && isConn) {
        // Recupera la conexión existente
        this.db = await this.sqliteConnection.retrieveConnection(this.dbName, false);
      } else {
        // Crea una nueva conexión (name, encrypted, mode, version, readonly)
        this.db = await this.sqliteConnection.createConnection(this.dbName, false, 'no-encryption', 1, false);
      }

      if (this.db) {
        await this.db.open();
        await this.createTable();
        console.log('Base de datos SQLite inicializada correctamente');
      }
    } catch (err) {
      console.error('Error al inicializar SQLite:', err);
    }
  }

  private async createTable(): Promise<void> {
    if (!this.db) return;

    const query = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `;
    await this.db.execute(query);
    console.log('Tabla usuarios creada o verificada');
  }

  // Inserta un nuevo usuario (maneja UNIQUE constraint)
  async addUser(username: string, password: string): Promise<void> {
    if (!this.db) await this.init();
    if (!this.db) return;

    const query = `INSERT INTO usuarios (username, password) VALUES (?, ?);`;
    try {
      await this.db.run(query, [username, password]);
      console.log(`Usuario '${username}' agregado`);
    } catch (error: any) {
      if (error.message?.includes('UNIQUE constraint failed')) {
        console.warn(`Usuario '${username}' ya existe`);
      } else {
        console.error('Error al agregar usuario:', error);
      }
    }
  }

  //Consulta un usuario por username
  async getUser(username: string): Promise<{ username: string; password: string } | null> {
    if (!this.db) await this.init();
    if (!this.db) return null;

    const query = `SELECT username, password FROM usuarios WHERE username = ?;`;
    const res = await this.db.query(query, [username]);
    if (res.values && res.values.length > 0) {
      return res.values[0] as { username: string; password: string };
    }
    return null;
  }

  // Cierra la conexión usando la API del plugin
  async closeConnection(): Promise<void> {
    if (this.db) {
      await this.sqliteConnection.closeConnection(this.dbName, false);
      this.db = null;
      console.log('Conexión SQLite cerrada');
    }
  }

  // Método público con el nombre que usabas en inicio.page.ts
  async closeDB(): Promise<void> {
    await this.closeConnection();
  }
}
