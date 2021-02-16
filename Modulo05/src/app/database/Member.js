const { age, date } = require("../../lib/utils");
const dbgym = require("../../config/dbgym");

module.exports = {
    all(callback) {
    const query = `SELECT * FROM members ORDER BY name ASC`;
    dbgym.query(query, (error, results) => {
      if (error) throw `Database Error ${error}`;
        callback(results.rows);
    });
    },
    create(data, callback) {
      const querie = `
      INSERT INTO members(
        name,
        avatar_url,
        email,
        gender,
        birth,
        blood,
        weight,
        height,
        instructor_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `;
    
    const values = [
        data.name,
        data.avatar_url,
        data.email,
        data.gender,
        date(data.birth).iso,
        data.blood,
        data.weight,
        data.height,
        data.instructor
      ];
        
    dbgym.query(querie, values, (error, results) => {
        if (error) throw `Database Error ${error}`;
        callback(results.rows[0]);
      });
    },
    getById(id, callback) {
      dbgym.query(`SELECT members.*, instructors.name AS instructor_name
      FROM members
      LEFT JOIN instructors ON (members.instructor_id = instructors.id)
      WHERE members.id = $1`, [id],
      function (error, results) {
        if (error) throw `Database Error ${error}`;
        callback(results.rows[0])
      });
    },
    update(data, callback) {
      
      const query = `
        UPDATE members SET 
        name = ($1),
        avatar_url = ($2),
        email = ($3),
        gender = ($4),
        birth = ($5),
        blood = ($6),
        weight = ($7),
        height = ($8),
        instructor_id = ($9)
        WHERE id = $10
      `

      const values = [
        data.name,
        data.avatar_url,
        data.email,
        data.gender,
        date(data.birth).iso,
        data.blood,
        data.weight,
        data.height,
        data.instructor,
        data.id
      ]

      dbgym.query(query, values, (error, results) => {
        if (error) throw `Database Error ${error}`
        callback();
      })

    },
    delete(id, callback) {
      dbgym.query(`DELETE FROM members WHERE id = $1`, [id],
        (error, results) => {
          if (error) throw `Database Error ${error}`
          callback();
        }
    )
    },
    instructorsSelectOptions(callback) {
      dbgym.query(`SELECT id, name FROM instructors`,
        (error, results) => {
          if (error) throw `Database error ${error}`;
          callback(results.rows);
      })
    }
    
}