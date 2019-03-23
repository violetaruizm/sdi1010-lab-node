module.exports = function (app, swig,gestorBD) {


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
   
// Conectarse
        gestorBD.insertarCancion(cancion, function(id){
            if (id == null) {
                res.send("Error al insertar canción");
            } else {
                res.send("Agregada la canción ID: " + id);
            }
        });



    });

    app.get('/promo*', function (req, res) {
        res.send("Respuesta patrón promo*");
    });


};