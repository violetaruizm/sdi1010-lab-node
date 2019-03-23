module.exports = function (app, swig,mongo) {


    app.get('/canciones/agregar', function(req,res){
       var respuesta = swig.renderFile('views/bagregar.html',{

       });
       res.send(respuesta);

    });


    app.get("/nuevas/canciones", function (req, res) {

        var canciones = [
            {
                "nombre": "Blank space",
                "precio": "1.2"
            },


            {
                "nombre": "See you again",
                "precio": "1.12"
            },

            {
                "nombre": "Uptown funk",
                "precio": "1.25"
            }


        ];

        var respuesta = swig.renderFile('views/btienda.html',
            {
                vendedor : 'Tienda de canciones',
                canciones : canciones
            });



        res.send(respuesta);
    });


    app.get('/suma', function (req, res) {

        var respuesta = parseInt(req.query.num1) + parseInt(req.query.num2);

        res.send(String(respuesta));
    });

    app.get('/canciones/:id', function (req, res) {
        var respuesta = 'id: ' + req.params.id;
        res.send(respuesta);


    });

    app.get('/canciones/:genero/:id', function (req, res) {
        var respuesta = 'id: ' + req.params.id
            + '<br>' + 'Género: ' + req.params.genero;
        res.send(respuesta);


    });

    app.post("/cancion", function (req, res) {
        var cancion = {
            nombre : req.body.nombre,
            genero : req.body.genero,
            precio : req.body.precio
        }
    //Conectarse

        mongo.MongoClient.connect(app.get('db'),function(err,db){

            if(err){
                res.send("Error de conexión "+err);
            }else{

                var collection = db.collection('canciones');
                collection.insertOne(cancion,function (err, result) {
                    if(err){
                        res.send("Error al insertar "+err);
                    }else{
                        res.send("Agregada id: "+result.ops[0]._id);
                    }
                    db.close();

                })
            }
        })



    });

    app.get('/promo*', function (req, res) {
        res.send("Respuesta patrón promo*");
    });


};