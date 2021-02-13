const { date, age, grade } = require("../../lib/utils");
const dbSchool = require("../../config/dbschool");

module.exports = {
    all(callback) {
        dbSchool.query(`SELECT * FROM students`,
            (error, results) => {
                if (error) throw `Database error ${error}`;
                callback(results.rows);
            })
     },
    create(data, callback) {
        const query = `
            INSERT INTO students
            (
                avatar_url,
                name,
                email,
                birth,
                grade,
                hours,
                created_at
            ) VALUES($1,$2,$3,$4,$5,$6,$7)
            RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            grade(data.grade),
            data.hours,
            date(Date.now()).iso
        ]

        dbSchool.query(query, values,
            (error, results) => {
                if (error) throw `Database error ${error}`;
                callback(results.rows[0]);
            })
    },
    update(data, callback) {
        const query = `
            UPDATE students SET
            avatar_url = ($1),
            name = ($2),
            email = ($3),
            birth = ($4),
            grade = ($5),
            hours = ($6)
            WHERE id = $7
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            grade(data.grade),
            data.hours,
            data.id
        ]

        dbSchool.query(query, values,
            (error, results) => {
                if (error) throw `Database error ${error}`;
                callback();
        })
     },
    getById(id, callback) {
        dbSchool.query(`SELECT * FROM students WHERE id = $1`, [id],
            (error, results) => {
                if (error) throw `Database error ${error}`;
                callback(results.rows[0]);
        })
     },
    delete(id,callback) {
        dbSchool.query(`DELETE FROM students WHERE id = $1`, [id],
            (error, results) => {
                if (error) throw `Database error ${error}`;
                callback();
        })
    }
}
