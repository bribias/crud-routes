import pool from '../utils/pool';

export default class Plant {
  id;
  name;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
  }
  static async insert({ name, type }) {
    const { rows } = await pool.query(
      'INSERT INTO plants (name, type) VALUES ($1, $2) RETURNING *',
      [name, type]
    );
    return new Plant(rows[0]);
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM plants WHERE id=$1', [id]);
    return new Plant(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM plants');
    return rows.map((row) => new Plant(row));
  }
  static async updateById(id, { name, type }) {
    const existingPlant = await Plant.getById(id);
    const newPlant = name ?? existingPlant.name;
    const newType = type ?? existingPlant.type;

    const { rows } = await pool.query(
      'UPDATE plants SET name=$1, type=$2 WHERE id=$3 RETURNING *',
      [newPlant, newType, id]
    );
    return new Plant(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM plants WHERE id=$1 RETURNING *',
      [id]
    );

    return new Plant(rows[0]);
  }
}
