const fs = require('fs')
const http = require('http')
const url = require('url')
const replaceTemplate = require('./starter/modules/replaceTemplate')


const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html` , 'utf-8' )
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html` , 'utf-8' )
const tempProduct = fs.readFileSync(`${__dirname}/starter//templates/template-product.html` , 'utf-8' ) 

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json` , 'utf-8' )
const dataObject = JSON.parse(data)

const server = http.createServer((req , res) =>{

    const {query , pathname} = url.parse(req.url , true)
    const path =  req.url
    // Overview

    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200 , {'content-type' : 'text/html'})

        const cardsHtml = dataObject.map(ele => replaceTemplate(tempCard , ele)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}' , cardsHtml)
        res.end(output)
    // Product
    } else if(pathname === '/product') {
        res.writeHead(200 , {'content-type' : 'text/html'})
        const product = dataObject[query.id]
        const output = replaceTemplate(tempProduct , product)
        res.end(output)
    // API

    } else if(pathname === '/api') {
            res.writeHead(200 , {'content-type' : 'application/json'})
            res.end(data)
        
    }
    else {
        res.writeHead(404 ,{
            'content-type' : 'text/html'
        })
        res.end(`<h1>path not found</h1>`)
    }
})

server.listen(8000 ,'127.0.0.1' , () => console.log("listening to request"))