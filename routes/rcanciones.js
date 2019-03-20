module.exports = function (app, swig) {


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
        res.send("Canción agregada: " + req.body.nombre + "<br>"
            + " Género: " + req.body.genero + "<br>" + " Precio: " + req.body.precio);
    });

    app.get('/promo*', function (req, res) {
        res.send("Respuesta patrón promo*");
    });


};