const Pool = require("pg").Pool;
const pool = new Pool({
    user:"postgres",
    password:"mypassword",
    host:"localhost",
    port:"5432",
    database:"ecommerce"
});
module.exports = pool;