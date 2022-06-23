var nome=undefined;
var envioNome=undefined;

function entrada(){

    nome = prompt("Insira seu nome(máximo 10 caracteres):");
    console.log("Ordem de execução: 1 - Inserir nome");
    for(let i=0;i<nome.length;i++){
        if(i>9)
            {
                alert(`O nome inserido tem mais de 10 caracteres. Por gentileza, inserir outro nome.`);
                i=nome.length;
                entrada();
            }
    }

    envioNome={
        name:`${nome}`
    }

    let promise=axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", envioNome);
   // promise.then(quandoSucesso);

   promise.then(sucesso);
    promise.catch(erro);    
}

function sucesso(){
    if(sucesso.status === 200){
        console.log("deu bom");
       }
}
function erro(){

    console.log("Status code: " + erro.response.status); // Ex: 404
	console.log("Mensagem de erro: " + erro.response.data); // Ex: Not Found
}

function manterOnline(){
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", envioNome);
}

entrada();
setInterval(manterOnline,5000);