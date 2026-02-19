const APP_CONFIG = {
    version: "1.3.0",
    siteUrl: "https://worldofsites.net",
    repoUrl: "https://github.com/WorldOfSitesNet/hr-interview-pwa"
};

const initialData = {
    jobs: [{ id: 'default', name: { uk: 'Загальна вакансія', en: 'General Job' } }],
    questions: [
        { id: 1, jobId: 'default', q: { uk: "Розкажіть про себе за 1 хвилину", en: "Tell about yourself in 1 minute" }, a: { uk: "Коротка історія досвіду...", en: "Brief history of your experience..." }, hint: { uk: "HR хоче почути про досягнення", en: "HR wants to hear about achievements" } },
        { id: 2, jobId: 'default', q: { uk: "Чому ви хочете працювати у нас?", en: "Why do you want to work with us?" }, a: { uk: "Мені подобається ваша компанія...", en: "I like your company..." }, hint: { uk: "Покажіть, що вы вивчили про компанію", en: "Show that you have researched the company" } },
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
let questionModal, jobModal, infoModal;
let draggedItemIndex = null;

const html = document.documentElement;
const langSwitcher = document.getElementById('langSwitcher');
const questionForm = document.getElementById('questionForm');
const jobSelect = document.getElementById('jobSelect');

// --- LOCALIZATION ---
function t(key) {
    const lang = langSwitcher ? langSwitcher.value : 'uk';
    if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
        return translations[lang][key];
    }
    return key;
}

function updateStaticLabels() {
    const lang = langSwitcher ? langSwitcher.value : 'uk';

    document.querySelectorAll('.app-version-display').forEach(el => {
        el.innerText = `v${APP_CONFIG.version}`;
    });

    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        const translation = t(key);
        const icon = el.querySelector('i');

        if (icon) {
            const iconHtml = icon.outerHTML;
            el.innerHTML = `${iconHtml} <span>${translation}</span>`;
        } else {
            el.innerHTML = translation;
        }
    });

    document.querySelectorAll('[data-t-placeholder]').forEach(el => {
        const key = el.getAttribute('data-t-placeholder');
        el.placeholder = t(key);
    });

    renderJobSelect();
}

// --- JOBS MANAGEMENT ---
function renderJobSelect() {
    if (!jobSelect) return;
    const lang = langSwitcher.value;
    const currentVal = jobSelect.value;
    jobSelect.innerHTML = appData.jobs.map(job =>
        `<option value="${job.id}">${job.name[lang] || job.name['uk']}</option>`
    ).join('');
    if (currentVal && appData.jobs.some(j => j.id === currentVal)) jobSelect.value = currentVal;
    else jobSelect.value = 'default';
}

function renderJobsList() {
    const container = document.getElementById('jobsListContainer');
    if (!container) return;
    container.innerHTML = appData.jobs.map(job => `
        <div class="card mb-2 shadow-sm border-0 bg-light text-dark">
            <div class="card-body p-2">
                <div class="row g-2 align-items-center">
                    <div class="col">
                        <input type="text" class="form-control form-control-sm mb-1" value="${job.name.uk}" 
                               onchange="updateJobName('${job.id}', 'uk', this.value)" placeholder="Назва (UA)">
                        <input type="text" class="form-control form-control-sm" value="${job.name.en}" 
                               onchange="updateJobName('${job.id}', 'en', this.value)" placeholder="Name (EN)">
                    </div>
                    <div class="col-auto">
                        ${job.id !== 'default' ? `<button class="btn btn-outline-danger btn-sm border-0" onclick="deleteJob('${job.id}')"><i class="bi bi-trash"></i></button>` : `<span class="badge bg-white text-secondary border"><i class="bi bi-lock"></i></span>`}
                    </div>
                </div>
            </div>
        </div>`).join('');
}

window.updateJobName = function (id, lang, value) {
    const job = appData.jobs.find(j => j.id === id);
    if (job) { job.name[lang] = value; saveData(); renderJobSelect(); }
};

window.addCategory = function () {
    const newId = 'job_' + Date.now();
    appData.jobs.push({ id: newId, name: { uk: 'Нова категорія', en: 'New Category' } });
    saveData(); renderJobsList(); renderJobSelect();
};

window.deleteJob = function (id) {
    if (confirm(t('confirmDelete'))) {
        appData.questions.forEach(q => { if (q.jobId === id) q.jobId = 'default'; });
        appData.jobs = appData.jobs.filter(j => j.id !== id);
        saveAndRender();
        renderJobsList();
        renderJobSelect();
    }
};

// --- DRAG AND DROP LOGIC ---
function addDragEvents(element) {
    element.addEventListener('dragstart', (e) => {
        draggedItemIndex = parseInt(e.currentTarget.dataset.fullIndex);
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
            const targetIndex = parseInt(targetItem.dataset.fullIndex);
            if (draggedItemIndex !== targetIndex) {
                const movedItem = appData.questions.splice(draggedItemIndex, 1)[0];
                appData.questions.splice(targetIndex, 0, movedItem);
                saveAndRender();
            }
        }
    });
}

// --- RENDER QUESTIONS ---
function renderQuestions() {
    const list = document.getElementById('questionsList');
    if (!list) return;
    const lang = langSwitcher.value;
    const currentJobId = jobSelect.value;
    list.innerHTML = '';

    appData.questions.forEach((item, index) => {
        if (item.jobId !== currentJobId) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'accordion-item';
        wrapper.draggable = true;
        wrapper.dataset.fullIndex = index;
        wrapper.innerHTML = `
            <h2 class="accordion-header d-flex align-items-center">
                <div class="px-2 text-secondary" style="cursor: grab;"><i class="bi bi-grip-vertical"></i></div>
                <button class="accordion-button collapsed p-3" type="button" data-bs-toggle="collapse" data-bs-target="#q_id_${item.id}">
                    ${item.q[lang] || '...'}
                </button>
            </h2>
            <div id="q_id_${item.id}" class="accordion-collapse collapse" data-bs-parent="#questionsList">
                <div class="accordion-body bg-body-tertiary">
                    <div class="mb-3">
                        <label class="badge bg-primary mb-2">${t('labelAnswer')}</label>
                        <p class="ms-1 text-body">${item.a[lang] || '...'}</p>
                    </div>
                    <div class="alert alert-info py-2 mb-3">
                        <small><i class="bi bi-lightbulb"></i> <strong>${t('labelHint')}</strong> ${item.hint[lang] || '...'}</small>
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

    if (list.innerHTML === '') {
        const emptyMsg = lang === 'uk' ? 'Питань поки немає' : 'No questions yet';
        list.innerHTML = `<div class="text-center p-5 text-secondary opacity-50"><i class="bi bi-inbox fs-1"></i><p class="mt-2">${emptyMsg}</p></div>`;
    }
}

// --- CORE FUNCTIONS ---
function saveData() { localStorage.setItem('hr_pwa_data', JSON.stringify(appData)); }
function saveAndRender() { saveData(); renderQuestions(); }

function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    const icons = document.querySelectorAll('#themeToggle i, #themeToggleMobile i');
    icons.forEach(icon => {
        icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
    });
}

function handleExport() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData, null, 2));
    const link = document.createElement('a');
    link.href = dataStr;
    link.download = `hr_cheat_sheet_v${APP_CONFIG.version}.json`;
    link.click();
}

function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const importedData = JSON.parse(event.target.result);
            if (confirm(t('confirmImport'))) {
                appData = importedData;
                saveAndRender();
                location.reload();
            }
        } catch (err) { alert(t('importError')); }
    };
    reader.readAsText(file);
}

// --- ACTIONS ---
window.editQuestion = function (id) {
    const q = appData.questions.find(item => item.id === id);
    if (!q) return;
    document.getElementById('editId').value = q.id;
    document.getElementById('q_uk').value = q.q.uk; document.getElementById('a_uk').value = q.a.uk; document.getElementById('hint_uk').value = q.hint.uk;
    document.getElementById('q_en').value = q.q.en; document.getElementById('a_en').value = q.a.en; document.getElementById('hint_en').value = q.hint.en;
    document.getElementById('modalTitle').innerText = t('modalTitleEdit');
    questionModal.show();
};

window.deleteQuestion = function (id) {
    if (confirm(t('confirmDelete'))) {
        appData.questions = appData.questions.filter(q => q.id !== id);
        saveAndRender();
    }
};

// --- INITIALIZATION ---
window.onload = () => {
    // Инициализация модалок
    const qModalEl = document.getElementById('questionModal');
    const jModalEl = document.getElementById('jobModal');
    const iModalEl = document.getElementById('infoModal');

    questionModal = new bootstrap.Modal(qModalEl, { focus: false });
    jobModal = new bootstrap.Modal(jModalEl, { focus: false });
    infoModal = new bootstrap.Modal(iModalEl, { focus: false });

    // FIX ARIA-HIDDEN / FOCUS ERROR
    [qModalEl, jModalEl, iModalEl].forEach(modalEl => {
        // Перед тем как модалка начнет закрываться - убираем фокус
        modalEl.addEventListener('hide.bs.modal', () => {
            if (document.activeElement && modalEl.contains(document.activeElement)) {
                document.activeElement.blur();
            }
        });
        // После закрытия - добавляем inert для безопасности
        modalEl.addEventListener('hidden.bs.modal', () => {
            modalEl.setAttribute('inert', '');
        });
        // При открытии - удаляем inert
        modalEl.addEventListener('show.bs.modal', () => {
            modalEl.removeAttribute('inert');
        });
    });

    langSwitcher.addEventListener('change', () => {
        localStorage.setItem('app_lang', langSwitcher.value);
        updateStaticLabels();
        renderQuestions();
    });

    document.querySelectorAll('#themeToggle, #themeToggleMobile').forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    });

    jobSelect.addEventListener('change', () => renderQuestions());

    questionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('editId').value;
        const newQuestion = {
            id: id ? parseInt(id) : Date.now(),
            jobId: jobSelect.value,
            q: { uk: document.getElementById('q_uk').value, en: document.getElementById('q_en').value },
            a: { uk: document.getElementById('a_uk').value, en: document.getElementById('a_en').value },
            hint: { uk: document.getElementById('hint_uk').value, en: document.getElementById('hint_en').value }
        };
        if (id) {
            const idx = appData.questions.findIndex(q => q.id == id);
            if (idx !== -1) appData.questions[idx] = newQuestion;
        } else {
            appData.questions.push(newQuestion);
        }
        saveAndRender();
        questionModal.hide();
    });

    document.getElementById('btnManageJobs').addEventListener('click', () => { renderJobsList(); jobModal.show(); });
    document.getElementById('addQuestionBtn').addEventListener('click', () => {
        questionForm.reset();
        document.getElementById('editId').value = '';
        document.getElementById('modalTitle').innerText = t('modalTitleAdd');
        questionModal.show();
    });

    document.querySelectorAll('#exportBtn').forEach(btn => btn.addEventListener('click', handleExport));
    document.querySelectorAll('#importBtn').forEach(btn => btn.addEventListener('click', () => document.getElementById('importFile').click()));

    const fileInput = document.getElementById('importFile');
    if (fileInput) {
        fileInput.addEventListener('change', handleImport);
    }

    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);
    langSwitcher.value = localStorage.getItem('app_lang') || 'uk';
    updateStaticLabels();
    renderQuestions();
};