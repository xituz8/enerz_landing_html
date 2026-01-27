const quizData = [
    {
        question: "Qual é o seu principal objetivo?",
        options: [
            { text: "Perder gordura", icon: "🔥" },
            { text: "Ganhar massa muscular", icon: "💪" },
            { text: "Melhorar saúde e energia", icon: "⚡" },
            { text: "Manter o peso", icon: "⚖️" }
        ]
    },
    {
        question: "Qual é o seu sexo?",
        options: [
            { text: "Masculino", icon: "👨" },
            { text: "Feminino", icon: "👩" }
        ]
    },
    {
        question: "Qual é o seu nível de atividade física?",
        options: [
            { text: "Sedentário (Pouco ou nenhum exercício)", icon: "🛋️" },
            { text: "Leve (1-3 dias por semana)", icon: "🚶" },
            { text: "Moderado (3-5 dias por semana)", icon: "🏃" },
            { text: "Intenso (6-7 dias por semana)", icon: "🏋️" }
        ]
    },
    {
        question: "Você segue alguma restrição alimentar?",
        options: [
            { text: "Não, como de tudo", icon: "🥩" },
            { text: "Vegetariano / Vegano", icon: "🥗" },
            { text: "Intolerância à lactose / Glúten", icon: "🚫" },
            { text: "Dieta Low-carb / Leto", icon: "🥑" }
        ]
    },
    {
        question: "Qual sua idade?",
        options: [
            { text: "18-29 anos", icon: "🎓" },
            { text: "30-45 anos", icon: "💼" },
            { text: "46-60 anos", icon: "👓" },
            { text: "Mais de 60 anos", icon: "🌟" }
        ]
    },
    {
        question: "Como é a qualidade do seu sono?",
        options: [
            { text: "Durmo muito bem", icon: "😴" },
            { text: "Acordo cansado às vezes", icon: "🥱" },
            { text: "Tenho insônia frequente", icon: "😫" },
            { text: "Durmo pouco por falta de tempo", icon: "⏰" }
        ]
    },
    {
        question: "Quantos litros de água você bebe por dia?",
        options: [
            { text: "Menos de 1 litro", icon: "💧" },
            { text: "Entre 1 e 2 litros", icon: "🥤" },
            { text: "Mais de 2 litros", icon: "🌊" }
        ]
    },
    {
        question: "Quantas refeições você faz por dia?",
        options: [
            { text: "1-2 refeições", icon: "🍽️" },
            { text: "3 refeições (Café, Almoço, Jantar)", icon: "🥗" },
            { text: "4 ou mais refeições (incluindo lanches)", icon: "🍎" }
        ]
    },
    {
        question: "Qual seu nível de estresse diário?",
        options: [
            { text: "Baixo", icon: "😌" },
            { text: "Moderado", icon: "😐" },
            { text: "Alto", icon: "🤯" }
        ]
    },
    {
        question: "Quanto tempo você tem disponível para cozinhar?",
        options: [
            { text: "Tenho bastante tempo", icon: "👨‍🍳" },
            { text: "Consigo cozinhar o básico", icon: "🍳" },
            { text: "Quase nenhum tempo", icon: "🥡" }
        ]
    }
];

let currentStep = 0;
const quizCard = document.getElementById('quizCard');
const progressBar = document.getElementById('progressBar');

function updateProgress() {
    const progress = ((currentStep) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function renderQuestion() {
    if (currentStep >= quizData.length) {
        showCalculating();
        return;
    }

    const data = quizData[currentStep];

    let optionsHtml = '';
    data.options.forEach(option => {
        optionsHtml += `
            <button class="option-btn" onclick="handleOptionClick('${option.text}')">
                <span>${option.icon} ${option.text}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        `;
    });

    quizCard.innerHTML = `
        <h2 class="question-title animate-fade-up">${data.question}</h2>
        <div class="options-grid animate-fade-up delay-1">
            ${optionsHtml}
        </div>
    `;

    updateProgress();
}

function handleOptionClick(answer) {
    // Here we could store the answer if needed
    // For now, just move to next step
    currentStep++;
    renderQuestion();
}

function showCalculating() {
    progressBar.style.width = '100%';

    quizCard.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <h3>Computando seus resultados...</h3>
            <p style="color: var(--muted-foreground)">A IA está analisando seu perfil.</p>
        </div>
    `;

    // Simulate calculation delay
    setTimeout(() => {
        showResult();
    }, 2500);
}

function showResult() {
    quizCard.innerHTML = `
        <div class="result-content animate-fade-up">
            <div class="result-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            
            <h2 class="result-title">Tudo pronto!</h2>
            <p class="result-text">
                Seu plano personalizado foi gerado com sucesso.
            </p>

            <a href="/" class="btn btn-primary btn-lg" style="width: 100%; justify-content: center;">
                VER MEU PLANO
            </a>
        </div>
    `;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderQuestion();
});
