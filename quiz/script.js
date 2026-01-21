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
            { text: "Dieta Low-carb / Kato", icon: "🥑" }
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
            <h3>Analisando suas respostas...</h3>
            <p style="color: var(--muted-foreground)">A IA está montando seu plano ideal.</p>
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
            
            <h2 class="result-title">Seu Plano está Pronto!</h2>
            <p class="result-text">
                Com base nas suas respostas, a ENERZ identificou a estratégia perfeita para você atingir seus objetivos de forma rápida e saudável.
            </p>

            <div class="plan-highlight">
                <h3>Plano Recomendado: ENERZ PRO</h3>
                <p>Acesso completo a todas as ferramentas de IA + Suporte humano.</p>
            </div>

            <a href="https://pay.hub.la/azRo1diUh1n6VGO5CqEj" class="btn btn-primary btn-lg" style="width: 100%; justify-content: center;">
                GARANTIR MEU PLANO AGORA
            </a>
            
            <p class="guarantee">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px; vertical-align:middle;">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                7 dias de garantia incondicional
            </p>
        </div>
    `;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderQuestion();
});
