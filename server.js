const express = require('express')
const app = express()

const MercadoPago =  require('mercadopago')

require('dotenv/config')

MercadoPago.configure({
    sandbox:true,
    access_token:process.env.ACCESS_TOKEN
})

app.get("/", (req,res) => {
    res.send("Teste")
})

app.get("/pagar", async (req,res) => {

    // importante persistir pagamentos num caso real

    var id = `${Date.now()}`;
    var email = "cristianodaniel95@gmail.com";

    var dados = {
        items: [
            item = {
                id: id,
                title: "titulo",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)// float
            }
        ],
        payer: {
            email: email
        },
        external_reference: id
    }

    try{

        var payment = await MercadoPago.preferences.create(dados);
        console.log(payment);
        return res.redirect(payment.body.init_point);

    }catch(err){

        console.log(err);

    }


})

app.listen(8080, ()=> {
    console.log("Rodando")
})