// Máquina de escrever para múltiplos quotes
const quotes = document.querySelectorAll(".typewriter-quote");
quotes.forEach((q, index) => {
  q.style.animationDelay = `${index * 5}s`;
});

// Animação ao rolar para a linha do tempo
const linhaTempo = document.querySelector("#linha-tempo");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      linhaTempo.classList.add("fade-in");
    }
  });
}, { threshold: 0.3 });

observer.observe(linhaTempo);



// Quiz
const perguntas = [
  { texto: "O AI-5 ampliou a liberdade de imprensa.", resposta: false },
  { texto: "Mary Ann Evans escreveu como George Eliot.", resposta: true },
  { texto: "A censura acabou totalmente após 1988 no Brasil.", resposta: false },
  { texto: "A imprensa foi livre durante o regime militar.", resposta: false },
  { texto: "Nísia Floresta foi uma escritora feminista brasileira.", resposta: true }
];

let indice = 0, pontos = 0;
const perguntaEl = document.getElementById("pergunta");
const placarEl = document.getElementById("placar");
const btnV = document.getElementById("verdadeiro");
const btnF = document.getElementById("falso");

function mostrarPergunta() {
  if (indice >= perguntas.length) {
    perguntaEl.textContent = `Você acertou ${pontos}/${perguntas.length}`;
    btnV.textContent = "Jogar Novamente";
    btnF.classList.add("hidden");
    btnV.onclick = () => location.reload();
    confete();
  } else {
    perguntaEl.textContent = perguntas[indice].texto;
    btnV.disabled = false;
    btnF.disabled = false;
  }
}
function responder(valor) {
  const certa = perguntas[indice].resposta === valor;
  if (certa) {
    pontos++;
    marcar(btnV, btnF, valor, true);
  } else {
    marcar(btnV, btnF, valor, false);
  }
  indice++;
  setTimeout(() => {
    btnV.classList.remove("correct", "incorrect");
    btnF.classList.remove("correct", "incorrect");
    mostrarPergunta();
  }, 2000);
}
function marcar(bv, bf, valor, certo) {
  const botao = valor ? bv : bf;
  botao.classList.add(certo ? "correct" : "incorrect");
  bv.disabled = true;
  bf.disabled = true;
}

btnV.onclick = () => responder(true);
btnF.onclick = () => responder(false);
mostrarPergunta();
function reiniciarQuiz() {
  indice = 0;
  pontos = 0;
  btnF.classList.remove("hidden");
  btnV.textContent = "Verdadeiro";
  btnF.textContent = "Falso";
  btnV.onclick = () => responder(true);
  btnF.onclick = () => responder(false);
  mostrarPergunta();
}



// Linha do tempo
const eventos = {
  1964:"Golpe militar que iniciou a ditadura no Brasil. O Golpe Militar de 1964 depôs o presidente João Goulart e instaurou uma ditadura militar no Brasil, que durou até 1985. Justificado como uma medida contra o perigo comunista, o golpe resultou em censura, repressão e violação dos direitos humanos, com tortura e desaparecimentos forçados de opositores..",
  1968: "AI-5 decreta censura total à imprensa. A ditadura militar no Brasil se intensificou, impondo censura total à imprensa e suspendendo direitos políticos. Ele deu ao governo poderes absolutos, permitindo a prisão e tortura de opositores sem julgamento, e marcou o período mais repressivo do regime.",
  1985: "Fim da ditadura e início da redemocratização. A eleição indireta de Tancredo Neves marcou o primeiro passo, mas ele faleceu antes de assumir, e José Sarney tornou-se presidente. Esse período foi marcado por reformas políticas e sociais",
  1988: "Nova Constituição garante liberdade de imprensa. A Nova Constituição de 1988, também conhecida como Constituição Cidadã, garantiu a liberdade de imprensa como um direito fundamental. No seu artigo 220, a Constituição assegura que a manifestação do pensamento, a criação, a expressão e a informação são livres, e que nenhum tipo de censura ou restrição pode ser imposto aos meios de comunicação. Essa garantia foi um marco importante na redemocratização do Brasil, após anos de censura durante a ditadura militar.",
  2024: "Casos de censura digital preocupam organizações. Casos de censura digital têm preocupado organizações como Anistia Internacional e Repórteres Sem Fronteiras. Governos têm restringido o acesso à informação, bloqueado sites e monitorado redes sociais, ameaçando a liberdade de expressão. Essas medidas são usadas, muitas vezes, para silenciar opositores e jornalistas, prejudicando a democracia."
};

  
  document.querySelectorAll(".timeline button").forEach(btn => {
    btn.addEventListener("click", () => {
      // Remover a classe 'ativo' de todos os botões
      document.querySelectorAll(".timeline button").forEach(b => b.classList.remove("ativo"));
  
      // Adicionar a classe 'ativo' ao botão clicado
      btn.classList.add("ativo");
  
      // Mostrar o texto do evento
      document.getElementById("evento").textContent = eventos[btn.dataset.ano];
    });
  });
  



function confete() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 }
    });
  } else if (window.confetti && typeof window.confetti.create === "function") {
    const canvas = document.createElement("canvas");
    canvas.className = "confetti";
    document.body.appendChild(canvas);
    const myConfetti = window.confetti.create(canvas, { resize: true, useWorker: true });
    myConfetti({ particleCount: 150, spread: 100 });
    setTimeout(() => canvas.remove(), 5000);
  }
}
