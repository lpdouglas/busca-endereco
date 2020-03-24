const express = require("express")
const app = express();
const fetch = require("node-fetch")
const port = 8000;
const { URLSearchParams } = require('url');
 

app.listen(port, () => {console.log(`ouvindo na porta ${port}`)});

app.post("/", controller)
app.use("/headers", function(req, res){
    res.send(req.headers)
})


async function controller(req, res){    
    
    let respostaCorreios = await buscaEndereco(req.query.cep, !!req.query.teste, req.headers);
    res.send(respostaCorreios)
}


async function buscaEndereco(cep, teste = false, headers){

    
    const params = new URLSearchParams();
    params.append('CEP', cep);

    console.log(headers)
    
    let url = "http://www.buscacep.correios.com.br/sistemas/buscacep/BuscaEndereco.cfm"
    if (teste)
         url = "http://localhost:8000/headers"

         


    let retorno = await fetch(url, {
        headers: headers,
        method: "POST",
        body: params
    })

    let html = await  retorno.text()
    //console.log(html)
    
    //console.log(retorno.body)
    
    return html
}

