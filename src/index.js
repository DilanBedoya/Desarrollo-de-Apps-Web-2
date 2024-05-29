const express = require('express');
const app = express(); 
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const Integrantes = [
    {
        "id" : 1,
        "nombre":"Freddy",
        "apellido":"Villavicencio",
        "edad":21
    },
    {
        "id" : 2,
        "nombre":"Mónica",
        "apellido":"Jaña",
        "edad":24
    },
    {
        "id" : 3,
        "nombre":"Miguel",
        "apellido":"Carvajal",
        "edad":20
    },
    {
        "id" : 4,
        "nombre":"Dilan",
        "apellido" : "",
        "edad" : 23,
    },
    {
        "id" : 5,
        "nombre":"Alexis",
        "apellido":"Farinango",
        "edad":24
    }
];

const products = [
    { id: 1, name: 'Terreneitor', price: 50.00, image: 'Terreneitor.jpg' },
    { id: 2, name: 'Auto', price: 20000.00, image: 'Carro.jpg' },
    { id: 3, name: 'Laptop', price: 1600.00, image: 'Laptop.jpg' },
    { id: 4, name: 'Terreneitor', price: 50.00, image: 'Terreneitor.jpg' },
    { id: 5, name: 'Auto', price: 20000.00, image: 'Carro.jpg' },
    { id: 6, name: 'Laptop', price: 1600.00, image: 'Laptop.jpg' },
    { id: 7, name: 'Terreneitor', price: 50.00, image: 'Terreneitor.jpg' },
    { id: 8, name: 'Auto', price: 20000.00, image: 'Carro.jpg' },
    { id: 9, name: 'Laptop', price: 1600.00, image: 'Laptop.jpg' }
];

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Landing Page</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    text-align: center;
                    padding: 100px;
                }
                h1 {
                    color: #333;
                    font-size: 36px;
                }
                img {
                    max-width: 100%;
                    height: auto;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Landing Page - Grupo#1, GR2</h1>
                <img src="land.png" alt="Landing Image">
            </div>
        </body>
        </html>
    `);
});

app.get('/integrantes', (req, res) => {
    res.json(Integrantes);
});

app.get('/integrantes/:id', (req, res) => {
    const { id } = req.params;
    const response = Integrantes.find(integrante => integrante.id === +id);
    response ? res.json(response) : res.json("integrante no encontrado");
});

app.get('/products', (req, res) => {
    let productsHtml = '';
    for (let i = 0; i < products.length; i += 3) {
        productsHtml += '<div style="display: flex; justify-content: space-around;">';
        for (let j = i; j < i + 3 && j < products.length; j++) {
            const product = products[j];
            productsHtml += `
                <div style="flex: 1; border: 1px solid #ddd; padding: 16px; margin: 16px; text-align: center;">
                    <h2 style="color: Green">${product.name}</h2>
                    <p>Precio: $${product.price.toFixed(2)}</p>
                    <img src="${product.image}" alt="${product.name}" style="max-width: 100%; height: auto;"/>
                </div>
            `;
        }
        productsHtml += '</div>';
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Catálogo de productos</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    padding: 20px;
                }
                h1 {
                    color: #333;
                    text-align: center;
                }
                .product {
                    flex: 1;
                    border: 1px solid #ddd;
                    padding: 16px;
                    margin: 16px;
                    text-align: center;
                }
                .product img {
                    max-width: 100%;
                    height: auto;
                }
            </style>
        </head>
        <body>
            <h1>Catálogo de productos</h1>
            ${productsHtml}
        </body>
        </html>
    `);
});

// Middleware para manejar errores 404
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 Not Found</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 20px;
                }
                h1 {
                    color: Red;
                }
                button {
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <h1>ERROR 404</h1>
            <p>¡Upssss, La página que has solicitado no existe!</p>
            <button onclick="window.location.href='/'">Regresar a la página principal</button>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
