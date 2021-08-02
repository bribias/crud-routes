import pool from '../utils/pool';

export default class Genre {
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
      'INSERT INTO genres (name, type) VALUES ($1, $2) RETURNING *',
      [name, type]
    );
    return new Genre(rows[0]);
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM genres WHERE id=$1', [id]);
    return new Genre(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM genres');
    return rows.map((row) => new Genre(row));
  }
  static async updateById(id, { name, type }) {
    const existingGenre = await Genre.getById(id);
    const newGenre = name ?? existingGenre.name;
    const newType = type ?? existingGenre.type;

    const { rows } = await pool.query('UPDATE genres SET name=$1, type=$2 WHERE id=$3 RETURNING *', [newGenre, newType, id]);
    return new Genre(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM genres WHERE id=$1 RETURNING *', [id]);

    return new Genre(rows[0]);
  }
}
