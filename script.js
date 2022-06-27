var nome=undefined; //nome do usuário
var envioNome=undefined; //envio do objeto

function enviarNome(){

    nome = document.querySelector("input").value;

    envioNome={
        name:`${nome}`
    }

    //Envio de requisição com nome do usuário para o servidor
    let promise=axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", envioNome)
    promise.then(sucesso);
    promise.catch(erro);
}

//Função para mostrar no console que a requisição foi enviada e validada com sucesso
function sucesso(){
    var tela = document.querySelector(".telaInicial");
    tela.classList.add("hidden");
    var tela2 = document.querySelector(".telaChat");
    tela2.classList.remove('hidden');
    }

//Função para identificação e tratamento de erros
function erro(error){
    alert("Já existe um usuário com este nome!");
    console.log("Erro: "+ error.response.status);
}

//Função que envia uma requisição para o servidor em conjunto com a função setInterval a cada 5s para manter o usuario online
function manterOnline(){
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", envioNome);
}

//Envia uma requisição para o servidor para receber as mensagens
function buscarMensagens(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(exibirMensagens);
    promise.catch(erro);
}

//Recebe o argumento da função buscar mensagens, puxa do servidor os dados conforme o tamanho e escreve no HTML dinamicamente.Conforme o tipo
//de ação, entra em cada if/else.
function exibirMensagens(sucesso){

    let adicionarMensagem="";

    for(let i=0; i<sucesso.data.length;i++){
        if(sucesso.data[i].type ==="status"){
        adicionarMensagem += 
        `<div class = "status mensagem" data-identifier="message">
             <span class="horario">  (${sucesso.data[i].time})     </span>
             <span class="de">    ${sucesso.data[i].from}      </span>
             <span class="texto">    ${sucesso.data[i].text}      </span>
        </div>`
        }
        else if(sucesso.data[i].type==="message"){
            adicionarMensagem += 
            `<div class = "message mensagem">
                 <span class="horario">  (${sucesso.data[i].time})    </span>
                 <span class="de">    ${sucesso.data[i].from}      </span>
                 para
                 <span class="de">    ${sucesso.data[i].to}:    </span>
                 <span class="texto">    ${sucesso.data[i].text}      </span>
            </div>`
        }

        else if(sucesso.data[i].type==="private_message"){
            adicionarMensagem += 
            `<div class = "private_message mensagem">
                 <span class="horario">  (${sucesso.data[i].time})     </span>
                 <span class="de">    ${sucesso.data[i].from}      </span>
                 reservadamente para
                 <span class="tp">    ${sucesso.data[i].to}:      </span>
                 <span class="texto">    ${sucesso.data[i].text}      </span>
            </div>`
        }
    }

    const mensagens = document.querySelector(".areaChat")
    mensagens.innerHTML = adicionarMensagem;

    const novaMsg = document.querySelectorAll('.mensagem');
    novaMsg[novaMsg.length-1].scrollIntoView();
}

function enviarMensagem(){
    const mensagem = document.querySelector("#campo").value;

    const objetoMensagem ={
        from: nome,
        to: "todos",
        text: mensagem,
        type: "message"
    }

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", objetoMensagem);

    promise.then(buscarMensagens);

    limparCampo();
}

function limparCampo(){
    document.getElementById('campo').value='';
}
//Chama a função que pergunta e envia o nome de usuário para o servidor
//entrada();

//Chama a função que avisa o servidor a cada 5s que o usuário está online
setInterval(manterOnline,5000);

//Atualiza o feed de mensagens chamando a função a cada 3s.
setInterval(buscarMensagens,3000);