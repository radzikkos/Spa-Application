const Pool = require('pg').Pool

const pool = new Pool({
    user: 'ibwbksua',
    host: 'ziggy.db.elephantsql.com',
    database: 'ibwbksua',
    password: 'lyyCPZGsY_DRtnOYdRY8RdvbwxHf175w',
})
module.exports = pool;