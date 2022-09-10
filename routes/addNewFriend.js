const db_conection = require('../bd_conection/db_conection')
module.exports = app => {

    

    app.get(`/newFriend/userExist/:friend_tel`, (req, res) => {
        const {friend_tel} = req.params;

        db_conection.query(`select * from "user" where tel='${friend_tel}'`, (err, rows, fields) => {
            if(err)
            {    
                console.log('userExist \n :');
                console.log(err);
            }
            
            else
            res.json(rows);
        })

    })
    app.get(`/newFriend/alreadyFriend/:user_id/:friend_id`, (req, res) => {
        const {user_id,friend_id} = req.params;

        db_conection.query(`select * from "list_of_friend" where  id_user='${user_id}' and id_friend='${friend_id}'`, (err, rows, fields) => {
            if(err)
            {   
                console.log('alreadyFriend \n :');
                console.log(err);
            }
            
            else
            res.json(rows);
        })

    })

    app.get(`/newFriend/lastId`, (req, res) => {

        db_conection.query(`select max(id) as id from "request"`, (err, rows, fields) => {
            if(err)
            {
                console.log('last_id \n :');
                console.log(err);
            }
            
            else
            res.json(rows);
        })

    })


}