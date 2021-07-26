import pool from '../utils/pool';

export default class Genre {
    id;
    name;
    type;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.element = row.element;
    }
    static async insert({ name, element }) {
        const { rows } = await pool.query(
            'INSERT INTO genres (name, element) VALUES ($1, $2) RETURNING *', [name, element]
        );
        return new Genre(rows[0]);
    }
}