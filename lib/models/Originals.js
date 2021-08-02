import pool from '../utils/pool';

export default class Originals {
  id;
  name;
  species;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.species = row.species;
  }
  static async insert({ name, species }) {
    const { rows } = await pool.query(
      'INSERT INTO originals (name, species) VALUES ($1, $2) RETURNING *',
      [name, species]
    );
    return new Originals(rows[0]);
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM originals WHERE id=$1', [id]);
    return new Originals(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM originals');
    return rows.map((row) => new Originals(row));
  }
  static async updateById(id, { name, species }) {
    const existingOriginal = await Originals.getById(id);
    const newOriginal = name ?? existingOriginal.name;
    const newSpecies = species ?? existingOriginal.species;

    const { rows } = await pool.query(
      'UPDATE originals SET name=$1, species=$2 WHERE id=$3 RETURNING *',
      [newOriginal, newSpecies, id]
    );
    return new Originals(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM originals WHERE id=$1 RETURNING *',
      [id]
    );

    return new Originals(rows[0]);
  }
}
