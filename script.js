const initialData = {
    jobs: [{ id: 'default', name: { uk: 'Загальна вакансія', en: 'General Job' } }],
    questions: [
        { id: 1, jobId: 'default', q: { uk: "Розкажіть про себе за 1 хвилину", en: "Tell about yourself in 1 minute" }, a: { uk: "Коротка історія досвіду...", en: "Brief history of your experience..." }, hint: { uk: "HR хоче почути про досягнення", en: "HR wants to hear about achievements" } },
        { id: 2, jobId: 'default', q: { uk: "Чому ви хочете працювати у нас?", en: "Why do you want to work with us?" }, a: { uk: "Мені подобається ваша компанія...", en: "I like your company..." }, hint: { uk: "Покажіть, що ви вивчили про компанію", en: "Show that you have researched the company" } },
        { id: 3, jobId: 'default', q: { uk: "Які ваші сильні сторони?", en: "What are your strengths?" }, a: { uk: "Я відповідальний та комунікабельний...", en: "I am responsible and communicative..." }, hint: { uk: "Підкріпіть прикладами", en: "Support with examples" } },
        { id: 4, jobId: 'default', q: { uk: "Які ваші слабкі сторони?", en: "What are your weaknesses?" }, a: { uk: "Іноді я надто перфекціоніст...", en: "Sometimes I am too much of a perfectionist..." }, hint: { uk: "Покажіть, що ви працюєте над ними", en: "Show that you are working on them" } },
        { id: 5, jobId: 'default', q: { uk: "Де ви бачите себе через 5 років?", en: "Where do you see yourself in 5 years?" }, a: { uk: "Я бачу себе в ролі...", en: "I see myself in the role of..." }, hint: { uk: "Покажіть амбіції та реалістичність", en: "Show ambition and realism" } },
        { id: 6, jobId: 'default', q: { uk: "Чому ми повинні вибрати вас?", en: "Why should we choose you?" }, a: { uk: "Я маю унікальний досвід...", en: "I have unique experience..." }, hint: { uk: "Підкресліть свої переваги", en: "Highlight your advantages" } },
        { id: 7, jobId: 'default', q: { uk: "Як ви справляєтесь зі стресом?", en: "How do you handle stress?" }, a: { uk: "Я використовую техніки релаксації...", en: "I use relaxation techniques..." }, hint: { uk: "Покажіть, що ви вмієте контролювати емоції", en: "Show that you can control your emotions" } },
        { id: 8, jobId: 'default', q: { uk: "Розкажіть про свій найбільший провал", en: "Tell about your biggest failure" }, a: { uk: "Мій найбільший провал був...", en: "My biggest failure was..." }, hint: { uk: "Покажіть, що ви вчитесь на помилках", en: "Show that you learn from mistakes" } },
        { id: 9, jobId: 'default', q: { uk: "Як ви працюєте в команді?", en: "How do you work in a team?" }, a: { uk: "Я вважаю, що командна робота важлива...", en: "I believe that teamwork is important..." }, hint: { uk: "Покажіть, що ви комунікабельний та відкритий", en: "Show that you are communicative and open" } },
        { id: 10, jobId: 'default', q: { uk: "Чи є у вас питання до нас?", en: "Do you have any questions for us?" }, a: { uk: "Так, я хотів би дізнатись більше про...", en: "Yes, I would like to know more about..." }, hint: { uk: "Задайте розумне питання про компанію або посаду", en: "Ask a smart question about the company or position" } }
    ]
};

let appData = JSON.parse(localStorage.getItem('hr_pwa_data')) || initialData;
let questionModal;

const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const langSwitcher = document.getElementById('langSwitcher');
const questionForm = document.getElementById('questionForm');

// --- ЛОКАЛИЗАЦИЯ ---
function t(key) {
    const lang = langSwitcher ? langSwitcher.value : 'uk';
    if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
        return translations[lang][key];
    }
    return key;
}

function updateStaticLabels() {
    const lang = langSwitcher ? langSwitcher.value : 'uk';

    // Кнопки модалки
    const saveBtn = document.getElementById('btnSave');
    const cancelBtn = document.getElementById('btnCancel');
    if (saveBtn) saveBtn.innerText = t('btnSave');
    if (cancelBtn) cancelBtn.innerText = t('btnCancel');

    // Главная кнопка добавления (с сохранением иконки)
    const addBtn = document.getElementById('addQuestionBtn');
    if (addBtn) {
        addBtn.innerHTML = `<i class="bi bi-plus-lg"></i> ${t('btnAddQuestion')}`;
    }

    // Обновляем список вакансий в селекте
    renderJobSelect();
}

// Рендер выпадающего списка вакансий
function renderJobSelect() {
    const jobSelect = document.getElementById('jobSelect');
    if (!jobSelect) return;
    const lang = langSwitcher.value;
    const currentVal = jobSelect.value; // Сохраняем выбранное значение

    jobSelect.innerHTML = appData.jobs.map(job =>
        `<option value="${job.id}">${job.name[lang] || job.name['uk']}</option>`
    ).join('');

    if (currentVal) jobSelect.value = currentVal;
}

// --- СЕРВИСНЫЕ ФУНКЦИИ ---
function saveAndRender() {
    localStorage.setItem('hr_pwa_data', JSON.stringify(appData));
    renderQuestions();
}

function applyTheme(theme) {
    html.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    if (icon) icon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
}

function sanitizeData(data) {
    const tempDiv = document.createElement('div');
    const cleanText = (str) => {
        if (!str) return "";
        tempDiv.textContent = str;
        return tempDiv.innerHTML;
    };
    data.questions = data.questions.map(q => ({
        id: q.id || Date.now() + Math.random(),
        jobId: q.jobId || 'default',
        q: { uk: cleanText(q.q.uk), en: cleanText(q.q.en) },
        a: { uk: cleanText(q.a.uk), en: cleanText(q.a.en) },
        hint: { uk: cleanText(q.hint.uk), en: cleanText(q.hint.en) }
    }));
    return data;
}

// --- DRAG AND DROP ---
let draggedItemIndex = null;

function addDragEvents(element) {
    element.addEventListener('dragstart', (e) => {
        draggedItemIndex = e.currentTarget.dataset.index;
        e.currentTarget.classList.add('opacity-50');
    });
    element.addEventListener('dragend', (e) => {
        e.currentTarget.classList.remove('opacity-50');
        draggedItemIndex = null;
    });
    element.addEventListener('dragover', (e) => e.preventDefault());
    element.addEventListener('drop', (e) => {
        e.preventDefault();
        const targetItem = e.target.closest('.accordion-item');
        if (targetItem && draggedItemIndex !== null) {
            const targetIndex = parseInt(targetItem.dataset.index);
            const sourceIndex = parseInt(draggedItemIndex);
            if (sourceIndex !== targetIndex) {
                const movedItem = appData.questions.splice(sourceIndex, 1)[0];
                appData.questions.splice(targetIndex, 0, movedItem);
                saveAndRender();
            }
        }
    });
}

// --- РЕНДЕРИНГ ВОПРОСОВ ---
function renderQuestions() {
    const list = document.getElementById('questionsList');
    if (!list) return;
    const lang = langSwitcher.value;
    list.innerHTML = '';

    appData.questions.forEach((item, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'accordion-item';
        wrapper.draggable = true;
        wrapper.dataset.index = index;

        wrapper.innerHTML = `
            <h2 class="accordion-header d-flex align-items-center">
                <div class="px-2 text-secondary" style="cursor: grab;"><i class="bi bi-grip-vertical"></i></div>
                <button class="accordion-button collapsed p-2" type="button" data-bs-toggle="collapse" data-bs-target="#q${index}">
                    ${item.q[lang]}
                </button>
            </h2>
            <div id="q${index}" class="accordion-collapse collapse" data-bs-parent="#questionsList">
                <div class="accordion-body">
                    <strong>${t('labelAnswer')}</strong><br>
                    <p class="text-secondary">${item.a[lang]}</p>
                    <div class="alert alert-info py-2">
                        <small><i class="bi bi-info-circle"></i> <strong>${t('labelHint')}</strong> ${item.hint[lang]}</small>
                    </div>
                    <div class="d-flex gap-2">
                        <button onclick="editQuestion(${item.id})" class="btn btn-sm btn-outline-primary"><i class="bi bi-pencil"></i></button>
                        <button onclick="deleteQuestion(${item.id})" class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                    </div>
                </div>
            </div>`;
        addDragEvents(wrapper);
        list.appendChild(wrapper);
    });
}

// --- ГЛОБАЛЬНЫЕ ФУНКЦИИ ---
window.editQuestion = function (id) {
    const q = appData.questions.find(item => item.id === id);
    if (!q) return;
    document.getElementById('editId').value = q.id;
    document.getElementById('jobSelect').value = q.jobId; // Выбираем вакансию вопроса
    document.getElementById('q_uk').value = q.q.uk; document.getElementById('a_uk').value = q.a.uk; document.getElementById('hint_uk').value = q.hint.uk;
    document.getElementById('q_en').value = q.q.en; document.getElementById('a_en').value = q.a.en; document.getElementById('hint_en').value = q.hint.en;
    document.getElementById('modalTitle').innerText = t('modalTitleEdit');
    updateStaticLabels();
    questionModal.show();
};

window.deleteQuestion = function (id) {
    if (confirm(t('confirmDelete'))) {
        appData.questions = appData.questions.filter(q => q.id !== id);
        saveAndRender();
    }
};

// --- ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ---
window.onload = () => {
    const modalElement = document.getElementById('questionModal');
    if (modalElement) {
        modalElement.removeAttribute('aria-hidden');
        questionModal = new bootstrap.Modal(modalElement);

        modalElement.addEventListener('hide.bs.modal', () => {
            if (document.activeElement) document.activeElement.blur();
        });
        modalElement.addEventListener('show.bs.modal', () => {
            modalElement.removeAttribute('aria-hidden');
        });
    }

    if (langSwitcher) {
        langSwitcher.addEventListener('change', () => {
            localStorage.setItem('app_lang', langSwitcher.value);
            renderQuestions();
            updateStaticLabels(); // Здесь обновится и селект, и кнопка "Add Question"
        });
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    if (questionForm) {
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
                if (index !== -1) appData.questions[index] = newQuestion;
            } else {
                appData.questions.push(newQuestion);
            }
            saveAndRender();
            questionModal.hide();
        });
    }

    const addBtn = document.getElementById('addQuestionBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            questionForm.reset();
            document.getElementById('editId').value = '';
            document.getElementById('modalTitle').innerText = t('modalTitleAdd');
            updateStaticLabels();
            questionModal.show();
        });
    }

    // Экспорт / Импорт остаются без изменений...
    const expBtn = document.getElementById('exportBtn');
    if (expBtn) {
        expBtn.addEventListener('click', () => {
            const exportData = {
                appData: appData,
                settings: { theme: html.getAttribute('data-bs-theme'), lang: langSwitcher.value }
            };
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
            const link = document.createElement('a');
            link.href = dataStr;
            link.download = `hr_cheat_sheet_${new Date().toISOString().slice(0, 10)}.json`;
            link.click();
        });
    }

    const impBtn = document.getElementById('importBtn');
    const impFile = document.getElementById('importFile');
    if (impBtn && impFile) {
        impBtn.addEventListener('click', () => impFile.click());
        impFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);
                    const dataToProcess = imported.appData ? imported.appData : imported;
                    if (dataToProcess && Array.isArray(dataToProcess.questions)) {
                        if (confirm(t('confirmImport'))) {
                            appData = sanitizeData(dataToProcess);
                            if (imported.settings) {
                                applyTheme(imported.settings.theme);
                                langSwitcher.value = imported.settings.lang;
                            }
                            saveAndRender();
                            alert(t('importSuccess'));
                        }
                    } else { alert(t('importError')); }
                } catch (err) { alert(t('importReadError') + err.message); }
                e.target.value = '';
            };
            reader.readAsText(file);
        });
    }

    // Финальная настройка при загрузке
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLang = localStorage.getItem('app_lang') || 'uk';

    if (langSwitcher) langSwitcher.value = savedLang;
    applyTheme(savedTheme);
    renderQuestions();
    updateStaticLabels();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(() => { });
    }
};