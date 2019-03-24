module.exports = function (app, swig,gestorBD) {


    app.get('/canciones/agregar', function(req,res){
        if(req.session.usuario==null){
            res.redirect("/tienda");
            return;
        }
       var respuesta = swig.renderFile('views/bagregar.html',{});
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

        if(req.session.usuario==null){
            res.redirect("/tienda");
            return;
        }
        var cancion = {
            nombre : req.body.nombre,
            genero : req.body.genero,
            precio : req.body.precio,
            autor : req.session.usuario
        }

// Conectarse
        gestorBD.insertarCancion(cancion, function(id){
            if (id == null) {
                res.send("Error al insertar canción");
            } else {
                if (req.files.portada != null) {
                    var imagen = req.files.portada;
                    imagen.mv('public/portadas/' + id + '.png', function(err) {
                        if (err) {
                            res.send("Error al subir la portada");
                        } else {
                            if (req.files.audio != null) {
                                var audio = req.files.audio;
                                audio.mv('public/audios/'+id+'.mp3', function(err) {
                                    if (err) {
                                        res.send("Error al subir el audio");
                                    } else {
                                        res.send("Agregada id: "+ id);
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });



    });

    app.get('/promo*', function (req, res) {
        res.send("Respuesta patrón promo*");
    });

    app.get("/tienda", function(req, res) {
        var criterio = {};
        if( req.query.busqueda != null ){
            criterio = { "nombre" :  {$regex : ".*"+req.query.busqueda+".*"} };
        }
        gestorBD.obtenerCanciones( criterio,function(canciones) {
            if (canciones == null) {
                res.send("Error al listar ");
            } else {
                var respuesta = swig.renderFile('views/btienda.html',
                    {
                        canciones : canciones
                    });
                res.send(respuesta);
            }
        });
    });

    app.get('/cancion/:id', function (req, res) {
        var criterio = { "_id" :  gestorBD.mongo.ObjectID(req.params.id)  };
        gestorBD.obtenerCanciones(criterio,function(canciones){
            if ( canciones == null ){
                res.send(respuesta);
            } else {
                var respuesta = swig.renderFile('views/bcancion.html',
                    {
                        cancion : canciones[0]
                    });
                res.send(respuesta);
            }
        });
    });





};