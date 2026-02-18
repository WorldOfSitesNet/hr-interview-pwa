// Базовые данные (пример для начала)
const initialData = {
    jobs: [{ id: 'default', name: { uk: 'Загальна', en: 'General' } }],
    questions: [
        {
            id: 1,
            jobId: 'default',
            q: { uk: "Розкажіть про себе за 1 хвилину", en: "Tell about yourself in 1 minute" },
            a: { uk: "Коротка історія досвіду...", en: "Brief history of your experience..." },
            hint: { uk: "HR хоче почути про досягнення", en: "HR wants to hear about achievements" }
        },
        {
            id: 2,
            jobId: 'default',
            q: { uk: "Чому ви хочете працювати у нас?", en: "Why do you want to work with us?" },
            a: { uk: "Мені подобається ваша компанія...", en: "I like your company..." },
            hint: { uk: "Покажіть, що ви вивчили про компанію", en: "Show that you have researched the company" }
        },
        {
            id: 3,
            jobId: 'default',
            q: { uk: "Які ваші сильні сторони?", en: "What are your strengths?" },
            a: { uk: "Я відповідальний та комунікабельний...", en: "I am responsible and communicative..." },
            hint: { uk: "Підкріпіть прикладами", en: "Support with examples" }
        },
        {
            id: 4,
            jobId: 'default',
            q: { uk: "Які ваші слабкі сторони?", en: "What are your weaknesses?" },
            a: { uk: "Іноді я надто перфекціоніст...", en: "Sometimes I am too much of a perfectionist..." },
            hint: { uk: "Покажіть, що ви працюєте над ними", en: "Show that you are working on them" }
        },
        {
            id: 5,
            jobId: 'default',
            q: { uk: "Де ви бачите себе через 5 років?", en: "Where do you see yourself in 5 years?" },
            a: { uk: "Я бачу себе в ролі...", en: "I see myself in the role of..." },
            hint: { uk: "Покажіть амбіції та реалістичність", en: "Show ambition and realism" }
        },
        {
            id: 6,
            jobId: 'default',
            q: { uk: "Чому ми повинні вибрати вас?", en: "Why should we choose you?" },
            a: { uk: "Я маю унікальний досвід...", en: "I have unique experience..." },
            hint: { uk: "Підкресліть свої переваги", en: "Highlight your advantages" }
        },
        {
            id: 7,
            jobId: 'default',
            q: { uk: "Як ви справляєтесь зі стресом?", en: "How do you handle stress?" },
            a: { uk: "Я використовую техніки релаксації...", en: "I use relaxation techniques..." },
            hint: { uk: "Покажіть, що ви вмієте контролювати емоції", en: "Show that you can control your emotions" }
        },
        {
            id: 8,
            jobId: 'default',
            q: { uk: "Розкажіть про свій найбільший провал", en: "Tell about your biggest failure" },
            a: { uk: "Мій найбільший провал був...", en: "My biggest failure was..." },
            hint: { uk: "Покажіть, що ви вчитесь на помилках", en: "Show that you learn from mistakes" }
        },
        {
            id: 9,
            jobId: 'default',
            q: { uk: "Як ви працюєте в команді?", en: "How do you work in a team?" },
            a: { uk: "Я вважаю, що командна робота важлива...", en: "I believe that teamwork is important..." },
            hint: { uk: "Покажіть, що ви комунікабельний та відкритий", en: "Show that you are communicative and open" }
        },
        {
            id: 10,
            jobId: 'default',
            q: { uk: "Чи є у вас питання до нас?", en: "Do you have any questions for us?" },
            a: { uk: "Так, я хотів би дізнатись більше про...", en: "Yes, I would like to know more about..." },
            hint: { uk: "Задайте розумне питання про компанію або посаду", en: "Ask a smart question about the company or position" }
        }
    ]
};

let appData = JSON.parse(localStorage.getItem('hr_pwa_data')) || initialData;

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
}

window.onload = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-bs-theme', savedTheme);
    updateThemeIcon(savedTheme);
    renderQuestions();
};

function renderQuestions() {
    const list = document.getElementById('questionsList');
    const lang = document.getElementById('langSwitcher').value;
    list.innerHTML = '';

    appData.questions.forEach((item, index) => {
        list.innerHTML += `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q${index}">
                        ${item.q[lang]}
                    </button>
                </h2>
                <div id="q${index}" class="accordion-collapse collapse" data-bs-parent="#questionsList">
                    <div class="accordion-body">
                        <strong>Відповідь / Answer:</strong><br>
                        <p class="text-secondary">${item.a[lang]}</p>
                        <div class="alert alert-info py-2">
                            <small><i class="bi bi-info-circle"></i> ${item.hint[lang]}</small>
                        </div>
                    </div>
                </div>
            </div>`;
    });
}