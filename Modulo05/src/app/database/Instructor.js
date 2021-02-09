const { age, date } = require("../../lib/utils");
const dbgym = require("../../config/dbgym");

module.exports = {
    all(callback) {
    const query = `SELECT * FROM instructors`;
    dbgym.query(query, (err, results) => {
      if (err) return res.send("Database error");
      console.log(results);
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
        if (error) return res.send("Database Error");
        callback(results.rows[0]);
      });
    },
    getById(value, callback) {
        const query = `
        SELECT * FROM instructors
        WHERE id = $1
        `

        dbgym.query(query, [value], (error,results) => {
            callback(error, results.rows[0]);
        })
    }
}