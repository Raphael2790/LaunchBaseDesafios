const { date, graduation } = require("../../lib/utils");
const dbSchool = require("../../config/dbschool");

module.exports = {
    all(callback) {
        const sql = `SELECT teachers.*, count(students.name) as total_students
                     FROM teachers
                     LEFT JOIN students ON (teachers.id = students.teacher_id)
                     GROUP BY teachers.id
                     ORDER BY total_students DESC 
        `

        dbSchool.query(sql,
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
                lessioning,
                created_at
            ) VALUES($1,$2,$3,$4,$5,$6, $7)
            RETURNING id
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            graduation(data.grade),
            data.classmodel,
            data.lessioning,
            date(Date.now()).iso
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
    getTeacherByNameOrLesson(filter, callback) {
        const sqlQuery = ` SELECT teachers.*, count(students.name) as total_students
                           FROM teachers  
                           LEFT JOIN students ON (teachers.id = students.teacher_id)
                           WHERE teachers.name ILIKE '%${filter}%'
                           OR teachers.lessioning ILIKE '%${filter}%'
                           GROUP BY teachers.id
                           ORDER BY total_students DESC 
                         `
        
        dbSchool.query(sqlQuery, (error, results) => {
            if (error) throw `Database error ${error}`;
            callback(results.rows);
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
            WHERE id = ($7)
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            graduation(data.grade),
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