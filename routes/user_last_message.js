const db_conection = require('../bd_conection/db_conection')
module.exports=app=>
{

    app.get(`/user_last_message/:id_user`,(req,res)=>
    {
         const {id_user}=req.params;

        db_conection.query(`select "user_last_message".id,"user".name,"user".image,"user_last_message".friend_id,
        "user_last_message".date_message,"user_last_message".seem from "user_last_message" join "user" on "user".id="user_last_message".friend_id
         where "user_last_message".user_id='${id_user}' order by "user_last_message".date_message desc;`, (err, rows, fields) =>
    {
        if(err)
        console.log(err);
        else
        res.json(rows);
    }) 

    })
 
    app.post(`/user_last_message`,(req,res)=>
    {
         const {id,user_id,friend_id,seem}=req.body;

        db_conection.query(`INSERT into "user_last_message" (id,user_id,friend_id,date_message,seem) values ('${id}','${user_id}','${friend_id}',CURRENT_TIMESTAMP,'${seem}')`, (err, rows, fields) =>
    {   
        if(err)
        console.log(err);
        else
        res.json(rows);
    }) 
    })

    app.get(`/user_last_message_id`,(req,res)=>
    {
        db_conection.query(`select max(id) as last_message_id from "user_last_message"`, (err, rows, fields) =>
    {
        if(err)
        console.log(err);
        else
        res.json(rows);
    }) 
    })

    app.get(`/user_last_message/user/:id_user/:friend_id`,(req,res)=>
    {

            const {id_user,friend_id} = req.params

        db_conection.query(`select * from "user_last_message" where user_id='${id_user}' and friend_id='${friend_id}' limit 1;`, (err, rows, fields) =>
    {
        if(err)
        console.log(err);
        else
        res.json(rows);
    }) 
    })

    app.put(`/user_last_message`,(req,res)=>
    {

            const {id_user,friend_id} = req.body

        db_conection.query(`update "user_last_message" set date_message=CURRENT_TIMESTAMP where user_id='${id_user}' and friend_id='${friend_id}'`, (err, rows, fields) =>
    {
        if(err)
        console.log(err);
        else
        res.json(rows);
    }) 
    })
    app.put(`/user_last_message_put`,(req,res)=>
    {

            const {id_last_message,seem} = req.body

        db_conection.query(`update "user_last_message" set seem='${seem}' where id='${id_last_message}'`, (err, rows, fields) =>
    {
        if(err)
        console.log(err);
        else
        res.json(rows);
    }) 
    })

}