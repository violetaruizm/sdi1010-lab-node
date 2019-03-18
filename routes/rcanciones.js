module.exports = function (app,swig) {
    app.get("/canciones", function (req, res) {

        var respuesta = "";
        if (req.query.nombre != null) {

            respuesta += 'Nombre: ' + req.query.nombre + '<br>';
        }
        if (typeof(req.query.autor) != "undefined") {
            respuesta += 'Autor: ' + req.query.autor;
        }
        res.send(respuesta);
    });


    app.get('/suma', function (req, res) {

        var respuesta = parseInt(req.query.num1) + parseInt(req.query.num2);

        res.send(String(respuesta));
    });

    app.get('/canciones/:id',function(req,res){
        var respuesta = 'id: ' + req.params.id;
        res.send(respuesta);


    });

    app.get('/canciones/:genero/:id',function(req,res){
        var respuesta = 'id: ' + req.params.id
            +'<br>'+'Género: '+req.params.genero;
        res.send(respuesta);


    });

    app.post("/cancion",function(req,res){
       res.send("Canción agregada: "+req.body.nombre+"<br>"
       +" Género: "+req.body.genero+"<br>"+" Precio: "+req.body.precio);
    });

    app.get('/promo*',function(req,res){
        res.send("Respuesta patrón promo*");
    });


};