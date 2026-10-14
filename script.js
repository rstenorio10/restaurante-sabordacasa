
/* =========================================================
   SABOR DA CASA — CARDÁPIO + CARRINHO + PEDIDO WHATSAPP
   Substitua pelo WhatsApp real do restaurante.
   Use DDI + DDD + número, somente dígitos.
========================================================= */

const telefoneWhatsApp = "5511999999999";

const pratosDoDia = [
    {
        id: 1,
        nome: "Picadinho",
        descricao: "Carne com batata, arroz, feijão, batata frita ou salada fresca e farofa.",
        preco: 24.90,
        imagem: "https://i.pinimg.com/736x/a1/18/65/a118658e8ee04b76363da14fa848af97.jpg"
    },
    {
        id: 2,
        nome: "Calabresa",
        descricao: "Calabresa acebolada, arroz, feijão, batata frita ou salada fresca e farofa.",
        preco: 24.90,
        imagem: "https://img0.didiglobal.com/static/soda_public/img_e7fcbc244e299634cf96c4de9b296c49.png"
    },
    {
        id: 3,
        nome: "Frango ao molho",
        descricao: "Frango com batata, arroz, feijão, batata frita ou salada fresca e farofa.",
        preco: 24.90,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-oMEKPvF5_XUjLtwzyz9HMzKXHPUco34G9clk5W0gc_DEFk5YRTnW5pI&s=10"
    },
    {
        id: 4,
        nome: "Frango grelhado",
        descricao: "Frango grelhado, arroz, feijão, batata frita ou salada fresca e farofa.",
        preco: 24.90,
        imagem: "https://img.cdndsgni.com/preview/11492036.jpg"
    },
    {
        id: 5,
        nome: "Contra-filé",
        descricao: "Bife de contra-filé acebolado, arroz, feijão, batata frita ou salada fresca e farofa.",
        preco: 27.90,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzfSUVBWAvmy2Eq6VGwb9oiMBJTn4wgc9pOCvB4u-iO5gZ5BFGOcBwlDU&s=10"
    },
    {
        id: 6,
        nome: "Strogonoff de frango ou carne",
        descricao: "Strogonoff, arroz, batata palha, fritas ou salada fresca e farofa.",
        preco: 29.90,
        imagem: "https://receitaculinaria.com.br/storage/uploads/recipes/20260213_211629_e9bdfbfe4cefada9.webp"
    }
];

const pratosEspeciais = [
    {
        id: 7,
        nome: "Feijoada",
        descricao: "Feijoada brasileira, arroz, bisteca, couve, vinagrete, torresmo e molho de pimenta.",
        preco: 49.90,
        imagem: "https://static.itdg.com.br/images/640-400/4183f4a52eadb0d86eed283e54e0020c/355811-original.jpg"
    },
    {
        id: 8,
        nome: "Baião de dois",
        descricao: "Baião de dois com carne seca ou contra-filé, mandioca, feijão-fradinho, pimenta biquinho e farofa.",
        preco: 42.90,
        imagem: "https://upload.wikimedia.org/wikipedia/commons/4/44/Bai%C3%A3o_de_dois.jpg"
    },
    {
        id: 9,
        nome: "Parmegiana de carne",
        descricao: "Parmegiana de carne acompanhada de arroz e batata frita.",
        preco: 44.90,
        imagem: "https://vejasp.abril.com.br/wp-content/uploads/2016/12/gran-parmegiana_maremonti-hiperjpg.jpeg?crop=1&resize=1212,909"
    }
];

const bebidas = [
    {
        id: 1,
        nome: "Refrigerante lata",
        descricao: "Lata de 350 ml. Consulte os sabores disponíveis.",
        preco: 6.00,
        imagem: "https://sachefmio.blob.core.windows.net/fotos/refrigerante-lata-aa459a5f-7d8a-444b-b1f6-96feb58304bb.jpeg"
    },
    {
        id: 2,
        nome: "Suco natural",
        descricao: "Suco preparado na hora. Consulte os sabores disponíveis.",
        preco: 8.00,
        imagem: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 3,
        nome: "Água mineral",
        descricao: "Água mineral para acompanhar sua refeição.",
        preco: 3.50,
        imagem: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1000&q=85"
    }
];

/* =========================================================
   1. VARIÁVEIS E ELEMENTOS
========================================================= */

let pratoSelecionado = null;
let categoriaSelecionada = "";
let quantidadeSelecionada = 1;
let carrinho = [];
let modalAnterior = null;

const $ = (id) => document.getElementById(id);

const modalPrato = $("modalPrato");
const modalPedido = $("modalPedido");
const modalCarrinho = $("modalCarrinho");

const detalheImagem = $("detalheImagem");
const detalheNome = $("detalheNome");
const detalheDescricao = $("detalheDescricao");
const detalheCategoria = $("detalheCategoria");
const detalhePreco = $("detalhePreco");
const detalheTotal = $("detalheTotal");
const quantidadePrato = $("quantidadePrato");

const formPedido = $("formPedido");
const pagamentoCliente = $("pagamentoCliente");
const campoTroco = $("campoTroco");
const trocoCliente = $("trocoCliente");

/* =========================================================
   2. FORMATAÇÃO DE PREÇOS
========================================================= */

function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

/* =========================================================
   3. ABRIR E FECHAR JANELAS
========================================================= */

function abrirModal(modal) {
    if (!modal) return;

    modalAnterior = document.activeElement;

    modal.classList.add("aberto");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-aberto");

    const primeiroElemento = modal.querySelector(
        "button, input, textarea, select"
    );

    if (primeiroElemento) {
        primeiroElemento.focus();
    }
}

function fecharModal(modal) {
    if (!modal) return;

    modal.classList.remove("aberto");
    modal.setAttribute("aria-hidden", "true");

    if (!document.querySelector(".modal.aberto")) {
        document.body.classList.remove("modal-aberto");
    }

    if (modalAnterior && modalAnterior.isConnected) {
        modalAnterior.focus();
    }
}

document.querySelectorAll("[data-fechar]").forEach((botao) => {
    botao.addEventListener("click", () => {
        fecharModal($(botao.dataset.fechar));
    });
});

document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) {
            fecharModal(modal);
        }
    });
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
        const modalAberto = document.querySelector(".modal.aberto");

        if (modalAberto) {
            fecharModal(modalAberto);
        }
    }
});

/* =========================================================
   4. DETALHES E QUANTIDADE DO PRATO
========================================================= */

function atualizarDetalhes() {
    if (!pratoSelecionado) return;

    quantidadePrato.textContent = quantidadeSelecionada;

    detalhePreco.textContent = formatarPreco(
        pratoSelecionado.preco
    );

    detalheTotal.textContent = formatarPreco(
        pratoSelecionado.preco * quantidadeSelecionada
    );
}

$("diminuirQuantidade").addEventListener("click", () => {
    if (quantidadeSelecionada > 1) {
        quantidadeSelecionada--;
        atualizarDetalhes();
    }
});

$("aumentarQuantidade").addEventListener("click", () => {
    if (quantidadeSelecionada < 99) {
        quantidadeSelecionada++;
        atualizarDetalhes();
    }
});

function mostrarDetalhes(prato, categoria) {
    pratoSelecionado = prato;
    categoriaSelecionada = categoria;
    quantidadeSelecionada = 1;

    detalheImagem.src = prato.imagem;
    detalheImagem.alt = prato.nome;
    detalheNome.textContent = prato.nome;
    detalheDescricao.textContent = prato.descricao;
    detalheCategoria.textContent = categoria.toUpperCase();

    atualizarDetalhes();
    abrirModal(modalPrato);
}

/* =========================================================
   5. CRIAÇÃO DOS CARDS DO CARDÁPIO
========================================================= */

function criarCard(prato, categoria) {
    const card = document.createElement("article");
    card.className = "card-prato";

    const botaoImagem = document.createElement("button");
    botaoImagem.type = "button";
    botaoImagem.className = "card-imagem-botao";
    botaoImagem.setAttribute(
        "aria-label",
        "Ver detalhes de " + prato.nome
    );

    const imagem = document.createElement("img");
    imagem.src = prato.imagem;
    imagem.alt = prato.nome;
    imagem.loading = "lazy";

    imagem.addEventListener("error", () => {
        imagem.style.visibility = "hidden";
    });

    botaoImagem.appendChild(imagem);

    botaoImagem.addEventListener("click", () => {
        mostrarDetalhes(prato, categoria);
    });

    const conteudo = document.createElement("div");
    conteudo.className = "card-conteudo";

    const titulo = document.createElement("h3");
    titulo.textContent = prato.nome;

    const descricao = document.createElement("p");
    descricao.textContent = prato.descricao;

    const rodape = document.createElement("div");
    rodape.className = "card-rodape";

    const preco = document.createElement("span");
    preco.className = "preco";
    preco.textContent = formatarPreco(prato.preco);

    const botaoPedir = document.createElement("button");
    botaoPedir.type = "button";
    botaoPedir.className = "botao-pedir";
    botaoPedir.textContent = "Ver e adicionar";

    botaoPedir.addEventListener("click", () => {
        mostrarDetalhes(prato, categoria);
    });

    const dica = document.createElement("div");
    dica.className = "texto-ver-detalhes";
    dica.textContent = "Veja os detalhes e adicione à sacola";

    rodape.append(preco, botaoPedir);
    conteudo.append(titulo, descricao, rodape, dica);
    card.append(botaoImagem, conteudo);

    return card;
}

function carregarCardapio(id, lista, categoria) {
    const container = $(id);

    if (!container) return;

    container.replaceChildren();

    lista.forEach((prato) => {
        container.appendChild(criarCard(prato, categoria));
    });
}

carregarCardapio(
    "listaPratosDia",
    pratosDoDia,
    "Prato do dia"
);

carregarCardapio(
    "listaEspeciais",
    pratosEspeciais,
    "Prato especial"
);

carregarCardapio(
    "listaBebidas",
    bebidas,
    "Bebida"
);

/* =========================================================
   6. ADICIONAR PRODUTOS AO CARRINHO
========================================================= */

$("botaoPedirPrato").textContent = "Adicionar ao carrinho";

$("botaoPedirPrato").addEventListener("click", () => {
    if (!pratoSelecionado) return;

    adicionarAoCarrinho(
        pratoSelecionado,
        categoriaSelecionada,
        quantidadeSelecionada
    );

    fecharModal(modalPrato);
});

function chaveItem(prato, categoria) {
    return `${categoria}-${prato.id}-${prato.nome}`;
}

function adicionarAoCarrinho(prato, categoria, quantidade) {
    const chave = chaveItem(prato, categoria);

    const itemExistente = carrinho.find(
        (item) => item.chave === chave
    );

    if (itemExistente) {
        itemExistente.quantidade = Math.min(
            99,
            itemExistente.quantidade + quantidade
        );
    } else {
        carrinho.push({
            chave,
            id: prato.id,
            nome: prato.nome,
            categoria,
            preco: prato.preco,
            imagem: prato.imagem,
            quantidade
        });
    }

    atualizarCarrinho();
    abrirCarrinho();
}

function totalItens() {
    return carrinho.reduce(
        (soma, item) => soma + item.quantidade,
        0
    );
}

function totalCarrinho() {
    return carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );
}

/* =========================================================
   7. ATUALIZAR A SACOLA
========================================================= */

function atualizarCarrinho() {
    const lista = $("itensCarrinho");
    const contador = $("contadorCarrinho");
    const total = $("totalCarrinho");
    const botaoFinalizar = $("irFinalizarPedido");

    if (!lista || !contador || !total || !botaoFinalizar) {
        return;
    }

    contador.textContent = totalItens();
    contador.setAttribute(
        "aria-label",
        `${totalItens()} itens no carrinho`
    );

    total.textContent = formatarPreco(totalCarrinho());
    lista.replaceChildren();

    if (carrinho.length === 0) {
        const vazio = document.createElement("p");
        vazio.className = "carrinho-vazio";
        vazio.textContent =
            "Sua sacola está vazia. Escolha seus pratos favoritos!";

        lista.appendChild(vazio);
        botaoFinalizar.disabled = true;
        return;
    }

    botaoFinalizar.disabled = false;

    carrinho.forEach((item) => {
        const linha = document.createElement("article");
        linha.className = "item-carrinho";

        const foto = document.createElement("img");
        foto.src = item.imagem;
        foto.alt = "";
        foto.loading = "lazy";

        foto.addEventListener("error", () => {
            foto.style.visibility = "hidden";
        });

        const info = document.createElement("div");
        info.className = "item-carrinho-info";

        const nome = document.createElement("strong");
        nome.textContent = item.nome;

        const unitario = document.createElement("span");
        unitario.textContent =
            `${formatarPreco(item.preco)} cada`;

        const subtotal = document.createElement("b");
        subtotal.textContent = formatarPreco(
            item.preco * item.quantidade
        );

        info.append(nome, unitario, subtotal);

        const controles = document.createElement("div");
        controles.className = "item-carrinho-controles";

        const menos = document.createElement("button");
        menos.type = "button";
        menos.textContent = "−";
        menos.setAttribute(
            "aria-label",
            `Diminuir ${item.nome}`
        );

        menos.addEventListener("click", () => {
            alterarQuantidade(item.chave, -1);
        });

        const quantidade = document.createElement("span");
        quantidade.textContent = item.quantidade;

        const mais = document.createElement("button");
        mais.type = "button";
        mais.textContent = "+";
        mais.setAttribute(
            "aria-label",
            `Aumentar ${item.nome}`
        );

        mais.addEventListener("click", () => {
            alterarQuantidade(item.chave, 1);
        });

        const remover = document.createElement("button");
        remover.type = "button";
        remover.className = "remover-item";
        remover.textContent = "Remover";

        remover.addEventListener("click", () => {
            removerDoCarrinho(item.chave);
        });

        controles.append(menos, quantidade, mais, remover);
        linha.append(foto, info, controles);
        lista.appendChild(linha);
    });
}

function alterarQuantidade(chave, variacao) {
    const item = carrinho.find(
        (produto) => produto.chave === chave
    );

    if (!item) return;

    const novaQuantidade = item.quantidade + variacao;

    if (novaQuantidade <= 0) {
        removerDoCarrinho(chave);
        return;
    }

    item.quantidade = Math.min(99, novaQuantidade);
    atualizarCarrinho();
}

function removerDoCarrinho(chave) {
    carrinho = carrinho.filter(
        (item) => item.chave !== chave
    );

    atualizarCarrinho();
}

/* =========================================================
   8. ABRIR SACOLA E CONTINUAR COMPRANDO
========================================================= */

function abrirCarrinho() {
    if (modalCarrinho) {
        abrirModal(modalCarrinho);
    }
}

$("abrirCarrinho").addEventListener("click", abrirCarrinho);

$("continuarComprando").addEventListener("click", () => {
    fecharModal(modalCarrinho);
});

$("irFinalizarPedido").addEventListener("click", () => {
    if (carrinho.length === 0) return;

    atualizarResumoPedido();
    fecharModal(modalCarrinho);
    abrirModal(modalPedido);
});

/* =========================================================
   9. RESUMO PARA FINALIZAÇÃO
========================================================= */

function atualizarResumoPedido() {
    const nomes = carrinho
        .map((item) => `${item.quantidade}x ${item.nome}`)
        .join(", ");

    $("resumoNome").textContent = nomes;

    $("resumoQuantidade").textContent =
        `${totalItens()} unidade(s) no carrinho`;

    $("resumoTotal").textContent =
        formatarPreco(totalCarrinho());
}

/* =========================================================
   10. PAGAMENTO E CAMPO DE TROCO
========================================================= */

pagamentoCliente.addEventListener("change", () => {
    const pagamentoEmDinheiro =
        pagamentoCliente.value === "Dinheiro";

    campoTroco.hidden = !pagamentoEmDinheiro;
    trocoCliente.required = pagamentoEmDinheiro;

    if (!pagamentoEmDinheiro) {
        trocoCliente.value = "";
    }
});

/* =========================================================
   11. ENVIAR PEDIDO COMPLETO PELO WHATSAPP
========================================================= */

formPedido.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (carrinho.length === 0) {
        alert("Sua sacola está vazia. Adicione pelo menos um produto.");
        return;
    }

    if (!formPedido.reportValidity()) {
        return;
    }

    const telefone = telefoneWhatsApp.replace(/\D/g, "");

    if (
        !/^\d{12,13}$/.test(telefone) ||
        /^55(\d)\1{9}$/.test(telefone)
    ) {
        alert(
            "Configure o número verdadeiro do WhatsApp do restaurante " +
            "na variável telefoneWhatsApp, no início do script.js."
        );
        return;
    }

    const nome = $("nomeCliente").value.trim();
    const telefoneCliente = $("telefoneCliente").value.trim();
    const endereco = $("enderecoCliente").value.trim();
    const pagamento = pagamentoCliente.value;

    if (!nome || !telefoneCliente || !endereco || !pagamento) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    const total = totalCarrinho();
    let informacaoTroco = "";

    if (pagamento === "Dinheiro") {
        const valorTroco = Number(trocoCliente.value);

        if (
            trocoCliente.value.trim() === "" ||
            !Number.isFinite(valorTroco) ||
            valorTroco < total
        ) {
            alert(
                "Informe um valor para troco igual ou maior " +
                "que o total dos itens do pedido."
            );

            trocoCliente.focus();
            return;
        }

        informacaoTroco =
            `\nTroco para: ${formatarPreco(valorTroco)}` +
            `\nTroco estimado: ${formatarPreco(valorTroco - total)}`;
    }

    const itensMensagem = carrinho.map((item) => {
        const subtotal = item.preco * item.quantidade;

        return (
            `• ${item.quantidade}x ${item.nome} — ` +
            `${formatarPreco(item.preco)} cada = ` +
            `${formatarPreco(subtotal)}`
        );
    }).join("\n");

    const mensagem =
        "🍽️ *NOVO PEDIDO — SABOR DA CASA*\n\n" +

        "*DADOS DO CLIENTE*\n" +
        `Nome: ${nome}\n` +
        `Telefone: ${telefoneCliente}\n` +
        `Endereço de entrega: ${endereco}\n\n` +

        "*ITENS DO PEDIDO*\n" +
        itensMensagem + "\n\n" +

        `*Quantidade total:* ${totalItens()} unidade(s)\n` +
        `*TOTAL DOS ITENS:* ${formatarPreco(total)}\n\n` +

        "*FORMA DE PAGAMENTO*\n" +
        pagamento +
        informacaoTroco + "\n\n" +

        "Por favor, confirme a disponibilidade, o valor da " +
        "entrega e o prazo estimado. Obrigado!";

    const url =
        `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank", "noopener,noreferrer");
});

/* =========================================================
   12. MENU PARA CELULARES
========================================================= */

const menuToggle = $("menuToggle");
const navegacao = $("navegacao");

menuToggle.addEventListener("click", () => {
    const aberto = navegacao.classList.toggle("ativo");

    menuToggle.setAttribute(
        "aria-expanded",
        String(aberto)
    );

    menuToggle.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.textContent = aberto ? "✕" : "☰";
});

navegacao.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navegacao.classList.remove("ativo");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    });
});

/* =========================================================
   13. ANO AUTOMÁTICO E INICIALIZAÇÃO
========================================================= */

$("anoAtual").textContent = new Date().getFullYear();
atualizarCarrinho();
