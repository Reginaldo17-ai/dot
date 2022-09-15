const db_conection = require('../bd_conection/db_conection')
module.exports=app=>
{

    app.get(`/conversation/:id_user`,(req,res)=>
    {
         const {id_user}=req.params;
           console.log(`1-id_user: ${id_user}`)
        db_conection.query(`select "list_of_friend".id,"user".id as id_user,"user".name,"user".tel,"user".image from "list_of_friend"
        join "user" on "user".id="list_of_friend".id_friend where "list_of_friend".id_user='${id_user}';`, (err, rows, fields) =>
    {
        if(err)
        console.log(err);
        else
        res.json(rows);
    }) 

    })
    app.get(`/conversation_last_id`,(req,res)=>
    {
         

        db_conection.query(`select max(id) as last_id from "message"`, (err, rows, fields) =>
    {
        if(err)
        console.log(err);
        else
        res.json(rows);
    }) 
    })

    app.get(`/conversation/message/:user_id/:friend_id`,(req,res)=>
    {
         const {user_id,friend_id}=req.params;
           console.log(`2-id_user: ${user_id} - 2-${friend_id}`)

        db_conection.query(`select * from "message" where user_id='${user_id}' and friend_id='${friend_id}' order by id asc`, (err, rows, fields) =>
    {
        if(err)
        console.log(err);
        else
        res.json(rows);
    }) 
    })

    app.get(`/conversation/message_one/:user_id/:friend_id`,(req,res)=>
    {
         const {user_id,friend_id}=req.params;
         console.log(`3-id_user: ${user_id} - 3-friend:${friend_id}`)


        db_conection.query(`select * from "message" where user_id='${user_id}' and friend_id='${friend_id}' order by id desc limit 1`, (err, rows, fields) =>
    {

        if(err)
        console.log(err);
        else
        res.json(rows);
    }) 
    })
    
    app.post(`/conversation`,(req,res)=>
    {
         const {user_id,friend_id,message,who_send,type_of_message}=req.body;
       

        db_conection.query(`insert into "message" (id,user_id,friend_id,message,who_send,type_of_message) values(default,'${user_id}','${friend_id}','${message}','${who_send}','${type_of_message}') ;`, (err, rows, fields) =>
    {
        if(err)
        console.log(err);
        else
        res.json(rows);
    }) 
    })

    

    

}
