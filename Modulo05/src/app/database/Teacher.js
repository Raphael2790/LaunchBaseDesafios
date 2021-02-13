const { date, grade } = require("../../lib/utils");
const dbSchool = require("../../config/dbschool");

module.exports = {
    all(callback) { 
        dbSchool.query(`SELECT * FROM teachers`,
            (error, results) => {
                if (error) throw `Database Error`;
                callback(results.rows);
            })
    },
    create(data, callback) {
        const query = `
            INSERT INTO teachers(
                avatar_url,
                name,
                birth,
                grade,
                classmodel,
                lessioning
            ) VALUES($1,$2,$3,$4,$5,$6)
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            grade(data.grade),
            data.classmodel,
            data.lessioning
        ]

        dbSchool.query(query, values,
            (error, results) => {
                if (error) throw `Database error ${error}`;
                callback(results.rows[0]);
            })
     },
    getById(id, callback) {
        dbSchool.query(`SELECT * FROM teachers WHERE id = $1`, [id],
            (error, results) => {
                if (error) throw `Database error`;
                callback(results.rows[0]);
        })
     },
    update(data, callback) {
        const query = `
            UPDATE teachers SET
            avatar_url = ($1),
            name = ($2),
            birth = ($3),
            grade = ($4),
            classmodel = ($5),
            lessioning = ($6)
            WHRERE id = ($7)
        `

        const values = [
            data.avatar_url,
            data.name,
            grade(data.grade),
            data.classmodel,
            data.lessioning,
            data.id
        ]

        dbSchool.query(query, values,
            (error, results) => {
                if (error) throw `Database error ${error}`;
                callback();
            })
     },
    delete(id, callback) {
        dbSchool.query(`DELETE FROM teachers WHERE id = $1`, [id],
            (error, results) => {
                if (error) throw `Database error ${error}`;
                callback();
            } )
    }
}