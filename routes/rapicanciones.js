module.exports = function (app, gestorBD) {
    app.get("/api/cancion", function (req, res) {
        gestorBD.obtenerCanciones({}, function (canciones) {
            if (canciones == null) {
                res.status(500);
                res.json({
                    error: "se ha producido un error"
                })
            } else {
                res.status(200);
                res.send(JSON.stringify(canciones));
            }
        });
    });

    app.get("/api/cancion/:id", function (req, res) {
        var criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)}
        gestorBD.obtenerCanciones(criterio, function (canciones) {
            if (canciones == null) {
                res.status(500);
                res.json({error: "se ha producido un error"})
            } else {
                res.status(200);
                res.send(JSON.stringify(canciones[0]));
            }
        });
    });

    app.delete("/api/cancion/:id", function (req, res) {
        var criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)}
        gestorBD.eliminarCancion(criterio, function (canciones) {
            if (canciones == null) {
                res.status(500);
                res.json({error: "se ha producido un error"})
            } else {
                res.status(200);
                res.send(JSON.stringify(canciones));
            }
        });
    });

    app.post("/api/cancion", function (req, res) {
        var cancion = {nombre: req.body.nombre, genero: req.body.genero, precio: req.body.precio,}

        // ¿Validar nombre, genero, precio?
        if (cancion.nombre == null || cancion.nombre.length == 0) {
            res.status(500);
            res.json({error: "se ha producido un error"})

        }
        if (cancion.genero == null || cancion.genero.length == 0) {
            res.status(500);
            res.json({error: "se ha producido un error"})

        }
        if (cancion.precio == null || cancion.precio < 0) {
            res.status(500);
            res.json({error: "se ha producido un error"})

        }
        gestorBD.insertarCancion(cancion, function (id) {
            if (id == null) {
                res.status(500);
                res.json({error: "se ha producido un error"})
            } else {
                res.status(201);
                res.json({mensaje: "canción insertarda", _id: id})
            }
        });
    });


    app.put("/api/cancion/:id", function (req, res) {
        var criterio = {"_id": gestorBD.mongo.ObjectID(req.params.id)};
        var cancion = {}; // Solo los atributos a modificar
        if (req.body.nombre != null)
            cancion.nombre = req.body.nombre;
        if (req.body.genero != null)
            cancion.genero = req.body.genero;
        if (req.body.precio != null)
            cancion.precio = req.body.precio;

        gestorBD.modificarCancion(criterio, cancion, function (result) {
            if (result == null) {
                res.status(500);
                res.json({error: "se ha producido un error"})
            } else {
                res.status(200);
                res.json({mensaje: "canción modificada"})

            }
        });
    });
}