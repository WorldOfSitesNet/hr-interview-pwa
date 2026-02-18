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

document.getElementById('langSwitcher').addEventListener('change', () => {
    renderQuestions();
});

const modalElement = document.getElementById('questionModal');
const questionModal = new bootstrap.Modal(modalElement);

document.getElementById('addQuestionBtn').addEventListener('click', () => {
    questionForm.reset();
    document.getElementById('editId').value = '';
    document.getElementById('modalTitle').innerText = 'Додати питання';
    questionModal.show();
});

window.editQuestion = function (id) {
    const q = appData.questions.find(item => item.id === id);
    if (!q) return;

    document.getElementById('editId').value = q.id;
    document.getElementById('q_uk').value = q.q.uk;
    document.getElementById('a_uk').value = q.a.uk;
    document.getElementById('hint_uk').value = q.hint.uk;

    document.getElementById('q_en').value = q.q.en;
    document.getElementById('a_en').value = q.a.en;
    document.getElementById('hint_en').value = q.hint.en;

    document.getElementById('modalTitle').innerText = 'Редагувати питання / Edit Question';
    questionModal.show();
};

document.getElementById('questionModal').addEventListener('hidden.bs.modal', () => {
    questionForm.reset();
    document.getElementById('editId').value = '';
    document.getElementById('modalTitle').innerText = 'Додати питання';
});

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
                        <button onclick="editQuestion(${item.id})" class="btn btn-sm btn-outline-primary">Редагувати</button>
                        <button onclick="deleteQuestion(${item.id})" class="btn btn-sm btn-outline-danger">Видалити</button>
                    </div>
                </div>
            </div>`;
    });
}

const questionForm = document.getElementById('questionForm');

questionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = document.getElementById('editId').value;
    const newQuestion = {
        id: id ? parseInt(id) : Date.now(),
        jobId: document.getElementById('jobSelect').value,
        q: { uk: document.getElementById('q_uk').value, en: document.getElementById('q_en').value },
        a: { uk: document.getElementById('a_uk').value, en: document.getElementById('a_en').value },
        hint: { uk: document.getElementById('hint_uk').value, en: document.getElementById('hint_en').value }
    };

    if (id) {
        const index = appData.questions.findIndex(q => q.id == id);
        appData.questions[index] = newQuestion;
    } else {
        appData.questions.push(newQuestion);
    }

    saveAndRender();
    questionModal.hide();
    questionForm.reset();
});

function saveAndRender() {
    localStorage.setItem('hr_pwa_data', JSON.stringify(appData));
    renderQuestions();
}

function deleteQuestion(id) {
    if (confirm('Видалити це питання?')) {
        appData.questions = appData.questions.filter(q => q.id !== id);
        saveAndRender();
    }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(reg => {
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        if (confirm('Доступна нова версія! Оновити сторінку?')) {
                            window.location.reload();
                        }
                    }
                });
            });
        });
    });
}

// --- ЭКСПОРТ ---
document.getElementById('exportBtn').addEventListener('click', () => {
    const dataStr = JSON.stringify(appData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `hr_cheat_sheet_${new Date().toISOString().slice(0, 10)}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
});

const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');

importBtn.addEventListener('click', () => importFile.click());

importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const importedData = JSON.parse(event.target.result);

            if (validateImportedData(importedData)) {
                if (confirm('Ви впевнені? Це замінить всі поточні питання новими даними.')) {
                    appData = sanitizeData(importedData);
                    saveAndRender();
                    alert('Дані успішно імпортовано!');
                }
            } else {
                alert('Помилка: Невірний формат файлу.');
            }
        } catch (err) {
            alert('Помилка при читанні файлу: ' + err.message);
        }
        importFile.value = '';
    };
    reader.readAsText(file);
});

function validateImportedData(data) {
    return data && Array.isArray(data.questions) && Array.isArray(data.jobs);
}

function sanitizeData(data) {
    const tempDiv = document.createElement('div');
    const cleanText = (str) => {
        tempDiv.textContent = str;
        return tempDiv.innerHTML;
    };

    data.questions = data.questions.map(q => ({
        id: q.id || Date.now(),
        jobId: q.jobId || 'default',
        q: { uk: cleanText(q.q.uk), en: cleanText(q.q.en) },
        a: { uk: cleanText(q.a.uk), en: cleanText(q.a.en) },
        hint: { uk: cleanText(q.hint.uk), en: cleanText(q.hint.en) }
    }));
    return data;
}
