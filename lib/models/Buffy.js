import pool from '../utils/pool';

export default class Buffy {
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
      'INSERT INTO buffy_characters (name, species) VALUES ($1, $2) RETURNING *',
      [name, species]
    );
    return new Buffy(rows[0]);
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM buffy_characters WHERE id=$1', [
      id,
    ]);
    return new Buffy(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM buffy_characters');
    return rows.map((row) => new Buffy(row));
  }
  static async updateById(id, { name, species }) {
    const existingCharacter = await Buffy.getById(id);
    const newCharacter = name ?? existingCharacter.name;
    const newSpecies = species ?? existingCharacter.species;

    const { rows } = await pool.query(
      'UPDATE buffy_characters SET name=$1, species=$2 WHERE id=$3 RETURNING *',
      [newCharacter, newSpecies, id]
    );
    return new Buffy(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM buffy_characters WHERE id=$1 RETURNING *',
      [id]
    );

    return new  Buffy(rows[0]);
  }
}
