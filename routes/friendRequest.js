const db_conection = require('../bd_conection/db_conection')
module.exports = app => {

    app.post(`/request`, (req, res) => {
      
        const { id, user_id, friend_id } = req.body;
        console.log(id + "\n" +user_id+"\n" + friend_id)
       

        db_conection.query(`insert into "request"(id,user_id,friend_id,data)
        values('${id}','${user_id}','${friend_id}',CURRENT_TIMESTAMP);`, (err, rows, fields) => {
            if (err)
            {    console.log(err);
                console.log('request \n');
            }
               
            else
                res.json(rows);
        })

    })

    app.get(`/request/user/:user_id`, (req, res) => {
        const { user_id } = req.params;

        db_conection.query(`select "request".id,"request".user_id,"user".name,"user".image,"request".data from "request" join "user"
        on "user".id = "request".user_id where "request".friend_id='${user_id}' order by "request".data desc`, (err, rows, fields) => {
            if (err)
            {        console.log('request_user_id \n');
                 console.log(err);
            }
           
        else
            res.json(rows);
        })

    })



    app.delete(`/request`, (req, res) => {

        const { user_id, friend_id } = req.params

        db_conection.query(`delete from "request" where user_id='${user_id}' and friend_id='${friend_id}' ;`, (err, rows, fields) => {
            if (err)
            {    console.log('request_delete_friendship \n');
                console.log(err);

            }
            
        else
            res.json(rows);
        })
    })

    app.delete(`/request/one_request/:id`, (req, res) => {

        const { id } = req.params

        db_conection.query(`delete from "request" where  id='${id}' ;`, (err, rows, fields) => {
            if (err)
            {    console.log('request_delete_one \n');
                console.log(err);
            }
            
        else
            res.json(rows);
        })
    })

}