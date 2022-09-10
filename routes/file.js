const db_conection = require('../bd_conection/db_conection')
var formidable = require('formidable');
var fs = require('fs');
module.exports=app=>
{
    app.post(`/upload`,(req,res)=>
    {
      
        const { img } = req.body;

        let form = new formidable.IncomingForm(
            {

                uploadDir: '../api/images',
                keepExtensions: true,
                hash: ''

            });

        form.parse(req, (err, fields, files) =>
        //
        {
            res.json(files.dot.filepath);

        })

    })
    
    app.get(`/file`,(req,res)=>
    {

        let path = '../api/images/' + req.query.path;

        if (fs.existsSync(path)) {
            fs.readFile(path, (err, data) => {
                if (err) {
                    console.log(err)
                    res.status(400).json({ error: err })
                } else {
                    res.status(200).end(data)
                }
            })

        }
        else {
            res.status(400).json({ error: 'file not found' })
        }


    })
    app.put(`/update_user_pic`,(req,res)=>
    {
        const { img,user_id } = req.body

        var $queryString = `update "user" set image='${img}' where id='${user_id}' ;`;
        db_conection.query($queryString, (err, rows, fields) => {


            if (err) {
                return console.log("Erro ao alterar foto", err);
            }

            return res.json(rows);
        });
    })

}