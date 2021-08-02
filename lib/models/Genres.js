import pool from '../utils/pool';

export default class Genres {
  id;
  name;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
  }
  static async insert({ name, element }) {
    const { rows } = await pool.query(
      'INSERT INTO genres (name, element) VALUES ($1, $2) RETURNING *',
      [name, element]
    );
    return new Genre(rows[0]);
  }
}
