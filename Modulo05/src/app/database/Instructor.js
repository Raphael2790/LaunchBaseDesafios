const { age, date } = require("../../lib/utils");
const dbgym = require("../../config/dbgym");

module.exports = {
    all(callback) {
    const query = `SELECT instructors.*, count(members.name) as total_students
    FROM instructors
    LEFT JOIN members ON (instructors.id = members.instructor_id)
    GROUP BY instructors.id`;
    dbgym.query(query, (error, results) => {
      if (error) throw `Database Error ${error}`;
        callback(results.rows);
    });
    },
    create(data, callback) {
      const querie = `
      INSERT INTO instructors(
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;
    
    const values = [
        data.avatar_url,
        data.name,
        date(data.birth).iso,
        data.gender,
        data.services,
        date(Date.now()).iso
      ];
        
    dbgym.query(querie, values, (error, results) => {
        if (error) throw `Database Error ${error}`;
        callback(results.rows[0]);
      });
    },
    getById(id, callback) {
    dbgym.query(`SELECT * FROM instructors WHERE id = $1`, [id],
      function (error, results) {
        if (error) throw `Database Error ${error}`;
        callback(results.rows[0])
      });
    },
    update(data, callback) {
      
      const query = `
        UPDATE instructors SET 
        avatar_url = ($1),
        name = ($2),
        birth = ($3),
        gender = ($4),
        services = ($5)
        WHERE id = $6
      `

      const values = [
        data.avatar_url,
        data.name,
        date(data.birth).iso,
        data.gender,
        data.services,
        data.id
      ]

      dbgym.query(query, values, (error, results) => {
        if (error) throw `Database Error ${error}`
        callback();
      })

    },
    delete(id, callback) {
      dbgym.query(`DELETE FROM instructors WHERE id = $1`, [id],
        (error, results) => {
          if (error) throw `Database Error ${error}`
          callback();
        }
    )}
}