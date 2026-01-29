/**
 * ENERZ Calculator Page - JavaScript
 * Health calculators: TMB, IMC, Protein, TDEE
 */

(function () {
    'use strict';

    // ====================================
    // TAB NAVIGATION
    // ====================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const calculatorPanels = document.querySelectorAll('.calculator-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update active panel
            calculatorPanels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(targetTab).classList.add('active');

            // Update URL hash without scrolling
            history.replaceState(null, null, `#${targetTab}`);
        });
    });

    // Handle initial hash in URL
    function handleInitialHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetButton = document.querySelector(`[data-tab="${hash}"]`);
            if (targetButton) {
                targetButton.click();
            }
        }
    }

    handleInitialHash();

    // ====================================
    // TMB CALCULATOR
    // ====================================
    const tmbForm = document.getElementById('tmbForm');
    const tmbResult = document.getElementById('tmbResult');
    const tmbValue = document.getElementById('tmbValue');

    tmbForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const weight = parseFloat(document.getElementById('tmb-weight').value);
        const height = parseFloat(document.getElementById('tmb-height').value);
        const age = parseInt(document.getElementById('tmb-age').value);
        const gender = document.getElementById('tmb-gender').value;

        if (!weight || !height || !age || !gender) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Mifflin-St Jeor Equation
        let tmb;
        if (gender === 'male') {
            tmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            tmb = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        tmbValue.textContent = Math.round(tmb);
        tmbResult.classList.remove('hidden');

        // Smooth scroll to result
        setTimeout(() => {
            tmbResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    });

    // ====================================
    // IMC CALCULATOR
    // ====================================
    const imcForm = document.getElementById('imcForm');
    const imcResult = document.getElementById('imcResult');
    const imcValue = document.getElementById('imcValue');
    const imcClassification = document.getElementById('imcClassification');

    imcForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const weight = parseFloat(document.getElementById('imc-weight').value);
        const height = parseFloat(document.getElementById('imc-height').value) / 100; // Convert cm to m

        if (!weight || !height) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const imc = weight / (height * height);
        const imcRounded = imc.toFixed(1);

        // Classification
        let classification = '';
        let classificationKey = '';

        if (imc < 18.5) {
            classification = 'Abaixo do peso';
            classificationKey = 'underweight';
        } else if (imc < 25) {
            classification = 'Peso normal';
            classificationKey = 'normal';
        } else if (imc < 30) {
            classification = 'Sobrepeso';
            classificationKey = 'overweight';
        } else {
            classification = 'Obesidade';
            classificationKey = 'obese';
        }

        imcValue.textContent = imcRounded;
        imcClassification.textContent = classification;
        imcResult.setAttribute('data-classification', classificationKey);
        imcResult.classList.remove('hidden');

        setTimeout(() => {
            imcResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    });

    // ====================================
    // PROTEIN CALCULATOR
    // ====================================
    const proteinForm = document.getElementById('proteinForm');
    const proteinResult = document.getElementById('proteinResult');
    const proteinValue = document.getElementById('proteinValue');

    const proteinFactors = {
        sedentary: 0.8,
        light: 1.2,
        moderate: 1.6,
        active: 2.0,
        athlete: 2.2
    };

    proteinForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const weight = parseFloat(document.getElementById('protein-weight').value);
        const activity = document.getElementById('protein-activity').value;

        if (!weight || !activity) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const proteinFactor = proteinFactors[activity];
        const protein = weight * proteinFactor;

        proteinValue.textContent = Math.round(protein);
        proteinResult.classList.remove('hidden');

        setTimeout(() => {
            proteinResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    });

    // ====================================
    // TDEE CALCULATOR
    // ====================================
    const tdeeForm = document.getElementById('tdeeForm');
    const tdeeResult = document.getElementById('tdeeResult');
    const tdeeValue = document.getElementById('tdeeValue');

    tdeeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const weight = parseFloat(document.getElementById('tdee-weight').value);
        const height = parseFloat(document.getElementById('tdee-height').value);
        const age = parseInt(document.getElementById('tdee-age').value);
        const gender = document.getElementById('tdee-gender').value;
        const activityFactor = parseFloat(document.getElementById('tdee-activity').value);

        if (!weight || !height || !age || !gender || !activityFactor) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Calculate TMB first (Mifflin-St Jeor)
        let tmb;
        if (gender === 'male') {
            tmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            tmb = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        // Calculate TDEE
        const tdee = tmb * activityFactor;

        tdeeValue.textContent = Math.round(tdee);
        tdeeResult.classList.remove('hidden');

        setTimeout(() => {
            tdeeResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    });

    // ====================================
    // FORM RESET ON TAB CHANGE
    // ====================================
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hide all results when switching tabs
            document.querySelectorAll('.result-card').forEach(result => {
                result.classList.add('hidden');
            });
        });
    });

})();
