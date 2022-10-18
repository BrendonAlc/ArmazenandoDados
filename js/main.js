//Operador lógico que retorna com dados salvos, string vazia, localStorage.getItem, modificando o valor de `string` com JSON.parse
const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []


//loop com array para que seja mantido os itens da lista após atualizar a página
itens.forEach( (elemento) => {
    criaElemento(elemento)
})

//Refatorando o addEventListener para receber as funções extras da função criaElemento

//capturando dados atravéz dos formularios
form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    //Variaveis para acessar valores enviados
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    //const criada para verificar se existe o mesmo nome no array itens
    const existe = itens.find(elemento =>  elemento.nome === nome.value)
    
    //Criando um objeto para transformar valores em string
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    //Condicional para conferir o id
    if(existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? itens[length-1].id + 1: 0;

        //Para o formulário ficar vazio após envio dos itens
        criaElemento(itemAtual)
        
        //Inserindo iten no array
        itens.push(itemAtual)
    }
 
    localStorage.setItem("itens", JSON.stringify(itens))

    //recebendo nome e quantidade vazio, todas as vezes que enviar o formulario
    nome.value = ""
    quantidade.value = ""
})

//Função criaElemento
function criaElemento(item){

    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id //Utilizando dataset para buscar id via Javascript
    novoItem.appendChild(numeroItem) //utilizando appendChild para adicionar o item

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

//Atualiza elemento
function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id){
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    //remover um item do array e depois escrever no localStorage
    localStorage.setItem("itens", JSON.stringify(itens))
}