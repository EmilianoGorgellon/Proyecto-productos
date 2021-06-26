const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const fetch = require('node-fetch');

nunjucks.configure('views',{
    autoescape: true,
    express: app
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) =>{
    fetch("https://raw.githubusercontent.com/EmilianoGorgellon/proyecto-productos/main/data/lista-productos.json")
    .then (response => response.json())
    .then (datosJson => {
        res.render('index.html', {datosJson})
    })
    .catch (error => res.send(`Hubo un error ${error} `))
  
})
app.get ('/productos/:id', (req,res) => {
    fetch("https://raw.githubusercontent.com/EmilianoGorgellon/proyecto-productos/main/data/lista-productos.json")
    .then (response => response.json())
    .then (datosJson => {
        for(datos of datosJson){
            if (parseInt(req.params.id) === parseInt(datos.id)){
                res.render('producto.html', {datos})
            }
        }
        
    })
    .catch(error => console.log(error))
}) 

app.get('/categoria/:categoria', (req, res) =>{
    fetch("https://raw.githubusercontent.com/EmilianoGorgellon/proyecto-productos/main/data/lista-productos.json")
    .then (response => response.json())
    .then (datosJson => {
        let categoria_productos = [];
        for (datos of datosJson){
            if (req.params.categoria == datos.categoria){
                categoria_productos.push(datos)
            }
        }
        res.render('categoria.html', {categoria_productos})
    })
    .catch(error => console.log(`aca hubo un error: ${error}`))
})
app.get('/buscador', (req, res) => {
    fetch("https://raw.githubusercontent.com/EmilianoGorgellon/proyecto-productos/main/data/lista-productos.json")
    .then (response => response.json())
    .then (datosJson => {
        const buscador = req.query.busqueda;
        const resultado = datosJson.filter(datos => datos.nombre_producto.toLowerCase().includes(buscador.toLowerCase()));
        res.render('buscador.html', {resultado});
    })
    .catch(error => console.log(`Error: ${error} `))
})
app.get('/contacto', (req ,res)=>{
    res.render('contacto.html')
})
app.listen(8080, () => console.log("iniciando"))