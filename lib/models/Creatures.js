import pool from '../utils/pool';

export default class Creature {
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
      'INSERT INTO creatures (name, species) VALUES ($1, $2) RETURNING *',
      [name, species]
    );
    return new Creature(rows[0]);
  }
  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM creatures WHERE id=$1',
      [id]
    );
    return new Creature(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM creatures');
    return rows.map((row) => new Creature(row));
  }
  static async updateById(id, { name, species }) {
    const existingCreature = await Creature.getById(id);
    const newCreature = name ?? existingCreature.name;
    const newSpecies = species ?? existingCreature.species;

    const { rows } = await pool.query(
      'UPDATE creatures SET name=$1, species=$2 WHERE id=$3 RETURNING *',
      [newCreature, newSpecies, id]
    );
    return new Creature(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM creatures WHERE id=$1 RETURNING *',
      [id]
    );

    return new Creature(rows[0]);
  }
}
