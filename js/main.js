const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")


//capturando dados atravéz dos formularios
form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    criaElemento(nome.value, nome.value)

    //recebendo nome e quantidade vazio, todas as vezes que enviar o formulario
    nome.value = ""
    quantidade.value = ""
})

//Criando elemento

function criaElemento(nome, quantidade){

    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = quantidade

    novoItem.appendChild (numeroItem) //utilizando appendChild para adicionar o item
    novoItem.innerHTML += nome

    lista.appendChild(novoItem)

    //registrando no localStorage
    localStorage.setItem("nome", nome)
    localStorage.setItem("quantidade", quantidade)
}
