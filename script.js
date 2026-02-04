let pedidoAtivo = true;
let total = 0;
let quantidade = 0;
let itens = {}; // AGORA É OBJETO (correto)
let desconto = 0;


/* ADICIONAR ITEM */
function adicionarItem(nome, preco) {
    if (!pedidoAtivo) return;

    if (itens[nome]) {
        itens[nome].qtd++;
    } else {
        itens[nome] = {
            preco: preco,
            qtd: 1
        };
    }

    quantidade++;
    total += preco;

    atualizarTela();
}

/* AUMENTAR ITEM */
function aumentarItem(nome) {
    if (!pedidoAtivo) return;

    itens[nome].qtd++;
    quantidade++;
    total += itens[nome].preco;

    atualizarTela();
}

/* DIMINUIR ITEM */
function diminuirItem(nome) {
    if (!pedidoAtivo) return;

    itens[nome].qtd--;
    quantidade--;
    total -= itens[nome].preco;

    if (itens[nome].qtd === 0) {
        delete itens[nome];
    }

    atualizarTela();
}

/* REMOVER ITEM */
function removerItem(nome) {
    if (!pedidoAtivo) return;

    quantidade -= itens[nome].qtd;
    total -= itens[nome].preco * itens[nome].qtd;

    delete itens[nome];

    atualizarTela();
}

/* ATUALIZAR TELA (COM WHILE) */
function atualizarTela() {
    let lista = document.getElementById("listaPedido");
    lista.innerHTML = "";

    let nomes = Object.keys(itens);
    let i = 0;

    while (i < nomes.length) {
        let nome = nomes[i];
        let item = itens[nome];

        let li = document.createElement("li");

        let texto = document.createElement("span");
        texto.textContent = `${item.qtd}x ${nome} - R$ ${(item.preco * item.qtd).toFixed(2)}`;

        let btnMais = document.createElement("button");
        btnMais.textContent = "+";
        btnMais.onclick = () => aumentarItem(nome);

        let btnMenos = document.createElement("button");
        btnMenos.textContent = "−";
        btnMenos.onclick = () => diminuirItem(nome);

        let btnRemover = document.createElement("button");
        btnRemover.textContent = "❌";
        btnRemover.onclick = () => removerItem(nome);

        li.appendChild(texto);
        li.appendChild(btnMais);
        li.appendChild(btnMenos);
        li.appendChild(btnRemover);

        lista.appendChild(li);
        i++;
    }

    document.getElementById("qtd").textContent = quantidade;
    document.getElementById("total").textContent = total.toFixed(2);
}
/* NOVO PEDIDO */
function reiniciarPedido() {
    pedidoAtivo = true;

    itens = {};
    quantidade = 0;
    total = 0;

    document.getElementById("listaPedido").innerHTML = "";
    document.getElementById("qtd").textContent = "0";
    document.getElementById("total").textContent = "0.00";

    document.getElementById("endereco").value = "";
    document.getElementById("pagamento").value = "";

    document.getElementById("mensagemFinal").style.display = "none";
    document.getElementById("mensagemFinal").innerHTML = "";

    document.getElementById("finalizar").style.display = "block";
    document.getElementById("novoPedido").style.display = "none";
}

function aplicarCupom() {
    const codigo = document.getElementById("cupom").value.toUpperCase();
    const msg = document.getElementById("msgCupom");

    if (codigo === "LULUFIT") {
        desconto = 0.10; // 10% de desconto
        msg.innerText = "✅ Cupom aplicado! 10% de desconto.";
        msg.style.color = "green";
    } 
    else if (codigo === "lulu15") {
        desconto = 0.20; // 20% de desconto
        msg.innerText = "✅ Cupom aplicado! 20% de desconto.";
        msg.style.color = "green";
    } 
    else {
        desconto = 0;
        msg.innerText = "❌ Cupom inválido.";
        msg.style.color = "red";
    }

    atualizarTotal();

     }

function atualizarTotal() {
    let valorFinal = total - (total * desconto);
    document.getElementById("total").innerText = valorFinal.toFixed(2);
}



 
function finalizarPedido() {
    let endereco = document.getElementById("endereco").value;
    let pagamento = document.getElementById("pagamento").value;

    if (endereco === "" || pagamento === "") {
        alert("⚠️ Preencha o endereço e a forma de pagamento");
        return;
    }

    pedidoAtivo = false;
    document.getElementById("finalizar").style.display = "none";

    let mensagem = document.getElementById("mensagemFinal");
    mensagem.style.display = "block";

    mensagem.innerHTML = `
        <h3>✅ Pedido Finalizado!</h3>
        <p>📍 Endereço: <strong>${endereco}</strong></p>
        <p>💳 Pagamento: <strong>${pagamento}</strong></p>
        <p>🛒 Total de itens: <strong>${quantidade}</strong></p>
        <p>💰 Valor total: <strong>R$ ${total.toFixed(2)}</strong></p>
        <p>🚚 Seu pedido saiu para entrega</p>
        <p>🙏 Obrigado por escolher a <strong>Fit & Força</strong></p>
        <p>💚 Volte sempre!</p>

        <button class="novo-pedido" onclick="reiniciarPedido()">
            Fazer Novo Pedido
        </button>
      
    `;
    document.getElementById("novoPedido").style.display = "block";
}



