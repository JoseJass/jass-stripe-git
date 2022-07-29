// 1. IMPORTACIONES
// IMPORTACIÓN DE LA LIBRERIA EXPRESS
// REALIZAR GESTION DE RUTAS
const express = require("express")

//GENERAR VARIABLES DE ENTORNO
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_KEY)

const app = express()

const cors = require("cors")

// 2. MIDDLEWARES
app.use(express.json({extended: true}))
//Fexibilidad en el manejo de peticiones del cliente al servidor 

app.use(cors())

//3. RUTEO
app.get("/", async (request, response) => {

    //console.log(stripe) ...SE USA PARA COMPROBAR QUE STRIPE SE INTEGRÓ CORRECTAMENTE
    //1.- ESTABLECER LOS ID'S DE PRECIOS DE PRODUCTO DE STRIPE
    const productId = "price_1LPHfoJcEB7x6026Um8Z46un"
    
    //2. GENERAR UNA SESIÓN 
    //LA SESIÓN ES EL MOMENTO EN EL CUAL STRIPE SABE QUE EL USUARIO QUIERE COMPRAR (CHECKOUT), POR LO TANTO VA A EMITIR LA INFORMACIÓN REQUERIDA PARA LA COMPRA. 
    //ENTRE ESA INFO ESTA LA URL DE COMPRA
    const session = await stripe.checkout.sessions.create({ 
         
        line_items: [
            {
            //1. LINEA DE PRODUCTOS 
             price: productId, 
             quantity: 1    
            
            
            
            }], 
            payment_method_types: [ //2. MÉTODOS DE PAGO
                "card",
                "oxxo"
            ],
            mode: "payment",         //3. TIPO DE PAGO
            success_url: `http://localhost:3005/success`,
            cancel_url: `http://localhost:3005?cancelled=true`
    })


    //console.log (session)
     
    response.json ({
        stripe_info: session
    })

})

//4. SERVIDOR

app.listen(process.env.PORT, () => { 
     console.log("Servidor activo")   
    
})