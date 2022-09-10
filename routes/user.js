const db_conection = require('../bd_conection/db_conection')
module.exports = app => {

    app.post(`/user`, (req, res) => {
        const { id, name, password, tel, image } = req.body;

        db_conection.query(`insert into "user"(id,name,password,tel,image)
        values('${id}','${name}','${password}','${tel}','${image}');`, (err, rows, fields) => {
            
            if(err)
            console.log(err);
            else
            res.json(rows);
        })

    })

    app.get(`/user/:id_user`, (req, res) => {
        const { id_user } = req.params;

        db_conection.query(`select * from "user" where id='${id_user}';`, (err, rows, fields) => {
            if(err)
            console.log(err);
            else
            res.json(rows);
        })
    })

    app.get(`/user_last_id`, (req, res) => {


        db_conection.query(`select max(id) as id from "user" ;`, (err, rows, fields) => {
            if(err)
            console.log(err);
            else
            res.json(rows);
        })
    })

    app.get(`/user/user_data/:tel_user/:password`, (req, res) => {

        const { tel_user,password } = req.params

        db_conection.query(`select * from "user" where tel='${tel_user}' and password='${password}' ;`, (err, rows, fields) => {
            if(err)
            console.log(err);
            else
            res.json(rows);
        
        })
    })



}