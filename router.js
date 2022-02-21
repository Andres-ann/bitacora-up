const express = require('express');
const router = express.Router();

const conexion = require('./database/db');


//Mostrar todos los resgistros
router.get('/', (req, res) => {    
    conexion.query('SELECT * FROM frases', (err, results) => {
        if (err) {
            throw err;
        } else {
            res.render('index', { results:results });
        }
    })
});

//Crear registros
router.get('/create', (req, res) => {    
    res.render('create');
});


//Editar registros
router.get('/edit/:id', (req, res) => {    
    const id = req.params.id;
    conexion.query('SELECT * FROM frases WHERE id=?',[id], (err, results) => {
        if (err) {
            throw error;
        } else {
            res.render('edit', { item:results[0] });
        }
    })
});

//Eliminar resgistros
router.get('/delete/:id', (req, res) => {    
    const id = req.params.id;
    conexion.query('DELETE FROM frases WHERE id=?',[id], (err, results) => {
        if (err) {
            throw error;
        } else {
            res.redirect('/');
        }
    })
});


const crud = require('./controllers/crud');
router.post('/save' ,crud.save);
router.post('/update', crud.update);

module.exports = router;