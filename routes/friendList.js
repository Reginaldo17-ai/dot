const db_conection = require('../bd_conection/db_conection')
module.exports=app=>
{

    app.get(`/friendList/:id_user`,(req,res)=>
    {
         const {id_user}=req.params;

        db_conection.query(`select "list_of_friend".id,"user".id as id_user,"user".name,"user".tel,"user".image from "list_of_friend"
        join "user" on "user".id="list_of_friend".id_friend where "list_of_friend".id_user='${id_user}';`, (err, rows, fields) =>
    {
        if(err)
        {
            console.log('FriendList_get \n');
            console.log(err);
        }
        
        else
        res.json(rows);
    }) 
    })

    
    app.get(`/friendList_last_id`,(req,res)=>
    {
       
        db_conection.query(`select max(id) as id from "list_of_friend";`, (err, rows, fields) =>
    {
        if(err)
        {
              console.log('FriendList_last_id \n');
              console.log(err);
        }
      
        else
        res.json(rows);
    }) 
    })


    app.delete(`/friendList/:id_user/:id_friend`,(req,res)=>
    {

        const {id_friend,id_user} = req.params 

        db_conection.query(`delete from "list_of_friend" where id_friend='${id_friend}' and id_user='${id_user}';`,(err,rows,fields)=>
        {
            if(err)
            {
                console.log('FriendList_id_friend \n');
                console.log(err);
            }
        
        else
        res.json(rows);
        })

    })
    app.post(`/friendList`,(req,res)=>
    {           

        const {id,user_id,friend_id} = req.body

        db_conection.query(`insert into "list_of_friend" (id,id_friend,id_user)values('${id}','${friend_id}','${user_id}')`,(err,rows,fields)=>
        {
            if(err)
            {
                console.log(err);
                 console.log('FriendList_post \n');
            }
           
            else
            res.json(rows);
        })

    })

}