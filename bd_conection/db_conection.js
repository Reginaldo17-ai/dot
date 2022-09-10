const postgres = require ('pg')

module.exports= new postgres.Pool ({

    host: 'ec2-3-214-2-141.compute-1.amazonaws.com',
    user: 'rgymmsiwqjwmjk',
    port: '5432',
    password:'4ada1310e97acb88cfc91b3108964b420e2220ac3ff001eb3240f2e3b89be12f',
    database: 'd1aia8immctevp', 
    ssl: {
        rejectUnauthorized: false
      }
 

});



 /*
host: 'localhost',
    user: 'postgres',
    port: '5432',
    password:'akualina',
    database: 'dotchat'
 */

 