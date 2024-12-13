const steps = document.querySelectorAll(".step");
const inviteImage = document.getElementById("inviteImage");

// Objeto para armazenar as respostas
const userResponses = {};

// Número do WhatsApp (inclua o DDD no formato internacional, sem o "+")
const whatsappNumber = "5543999898143";

// Etapa inicial: clique no convite
inviteImage.addEventListener("click", () => {
  document.getElementById("step-0").style.display = "none";
  showStep(1);
});

// Função para exibir uma etapa específica
function showStep(stepNumber) {
  steps.forEach((step, index) => {
    step.style.display = index === stepNumber - 1 ? "block" : "none";
  });
}

// Etapa 1: Responder à primeira pergunta
document.getElementById("form-step-1").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  userResponses.invite = formData.get("invite");
  showStep(2);
});

// Etapa 2: Responder à segunda pergunta
document.getElementById("form-step-2").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  userResponses.location = formData.get("location");
  showStep(3);
});

// Etapa 3: Responder à terceira pergunta e redirecionar para o WhatsApp
document.getElementById("form-step-3").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  userResponses.date = formData.get("date");

  // Formatar a mensagem para o WhatsApp
  const message = `
    Olá! Aqui estão as respostas para o convite:
    - Convite: ${userResponses.invite}
    - Local: ${userResponses.location}
    - Data: ${userResponses.date}
  `;

  // Redirecionar para o WhatsApp
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.location.href = whatsappUrl;
});

document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("date-input");

  // Função para bloquear o dia 22/12
  dateInput.addEventListener("input", function (event) {
    const selectedDate = new Date(event.target.value);
    const blockedDate = new Date("2025-12-22"); // Ajuste o ano conforme necessário

    // Comparando a data selecionada com a data bloqueada
    if (
      selectedDate.getFullYear() === blockedDate.getFullYear() &&
      selectedDate.getMonth() === blockedDate.getMonth() &&
      selectedDate.getDate() === blockedDate.getDate()
    ) {
      alert("O dia 22/12 está bloqueado! Escolha outra data.");
      event.target.value = ""; // Limpa a data selecionada
    }
  });

  // Definindo a data mínima e máxima para garantir que o usuário não selecione datas fora de um intervalo desejado
  const today = new Date().toISOString().split("T")[0]; // Obtém a data de hoje no formato YYYY-MM-DD
  dateInput.setAttribute("min", today); // Define a data mínima como a data atual
});
