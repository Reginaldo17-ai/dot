const db_conection = require('../bd_conection/db_conection')
module.exports = app => {

    app.post(`/notification`, (req, res) => {
        const { id, user_id, notification } = req.body;
         
        db_conection.query(`insert into "notification"(id,user_id,notification,data)
        values('${id}','${user_id}','${notification}',CURRENT_TIMESTAMP);`, (err, rows, fields) => {
            if (err)
                console.log(err);
            else
                res.json(rows);
        })

    })
    //

    app.get(`/notification_last_id`, (req, res) => {

        db_conection.query(`select max(id) as id from "notification"`, (err, rows, fields) => {
            if (err)
                console.log(err);
            else
                res.json(rows);
        })
    })


    app.get(`/notification/:id_user`, (req, res) => {
        const { id_user } = req.params;

        db_conection.query(`select * from "notification" where user_id='${id_user}' order by data desc;`, (err, rows, fields) => {
            if (err)
                console.log(err);
            else
                res.json(rows);
        })
    })

    app.delete(`/notification/:notification_id`, (req, res) => {

        const { notification_id } = req.params;

        db_conection.query(`delete from "notification" where id='${notification_id}' ;`, (err, rows, fields) => {
            if (err)
                console.log(err);
            else
                res.json(rows);
        })
    })




}