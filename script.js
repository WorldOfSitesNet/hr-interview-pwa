const APP_CONFIG = {
    version: "1.1.0",
    siteUrl: "https://worldofsites.net",
    repoUrl: "https://github.com/WorldOfSitesNet/hr-interview-pwa"
};

const initialData = {
    jobs: [{ id: 'default', name: { uk: 'Загальна вакансія', en: 'General Job' } }],
    questions: [
        { id: 1, jobId: 'default', q: { uk: "Розкажіть про себе за 1 хвилину", en: "Tell about yourself in 1 minute" }, a: { uk: "Коротка історія досвіду...", en: "Brief history of your experience..." }, hint: { uk: "HR хоче почути про досягнення", en: "HR wants to hear about achievements" } },
        { id: 2, jobId: 'default', q: { uk: "Чому ви хочете працювати у нас?", en: "Why do you want to work with us?" }, a: { uk: "Мені подобається ваша компанія...", en: "I like your company..." }, hint: { uk: "Покажіть, что ви вивчили про компанію", en: "Show that you have researched the company" } }
    ]
};

let appData = JSON.parse(localStorage.getItem('hr_pwa_data')) || initialData;
let questionModal, jobModal;

const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
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
    document.querySelectorAll('.app-version-display').forEach(el => el.innerText = `v${APP_CONFIG.version}`);

    if (document.getElementById('modalJobsTitle')) document.getElementById('modalJobsTitle').innerText = t('modalJobsTitle');
    if (document.getElementById('btnAddCategory')) document.getElementById('btnAddCategory').innerText = t('btnAddCategory');
    if (document.getElementById('btnSave')) document.getElementById('btnSave').innerText = t('btnSave');
    if (document.getElementById('btnCancel')) document.getElementById('btnCancel').innerText = t('btnCancel');

    const manageJobsBtn = document.getElementById('btnManageJobs');
    if (manageJobsBtn) manageJobsBtn.innerHTML = `<i class="bi bi-tags me-1"></i> ${t('btnManageJobs')}`;

    const addBtn = document.getElementById('addQuestionBtn');
    if (addBtn) addBtn.innerHTML = `<i class="bi bi-plus-lg me-1"></i> ${t('btnAddQuestion')}`;

    const expBtn = document.getElementById('exportBtn');
    if (expBtn) expBtn.innerHTML = `<i class="bi bi-download me-1"></i> ${t('btnExport')}`;

    const impBtn = document.getElementById('importBtn');
    if (impBtn) impBtn.innerHTML = `<i class="bi bi-upload me-1"></i> ${t('btnImport')}`;

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
    const lang = langSwitcher.value;
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
        saveData(); renderJobsList(); renderJobSelect(); renderQuestions();
        if (jobSelect.value === id) { jobSelect.value = 'default'; renderQuestions(); }
    }
};

// --- DRAG AND DROP ---
let draggedItemIndex = null;

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
        list.innerHTML = `<div class="text-center p-5 text-secondary opacity-50"><i class="bi bi-inbox fs-1"></i><p class="mt-2">${lang === 'uk' ? 'Питань поки немає' : 'No questions yet'}</p></div>`;
    }
}

// --- SERVICE FUNCTIONS ---
function saveData() { localStorage.setItem('hr_pwa_data', JSON.stringify(appData)); }
function saveAndRender() { saveData(); renderQuestions(); }

function applyTheme(theme) {
    html.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    if (icon) icon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
}

function sanitizeData(data) {
    if (!data.jobs) data.jobs = initialData.jobs;
    data.questions = (data.questions || []).map(q => ({
        id: q.id || Date.now() + Math.random(),
        jobId: q.jobId || 'default',
        q: { uk: q.q.uk || "", en: q.q.en || "" },
        a: { uk: q.a.uk || "", en: q.a.en || "" },
        hint: { uk: q.hint.uk || "", en: q.hint.en || "" }
    }));
    return data;
}

// --- MODAL UTILS (FIX ARIA ERRORS) ---
function safeModalHide(modalObj, modalEl) {
    if (modalEl.contains(document.activeElement)) {
        document.activeElement.blur();
    }
    modalObj.hide();
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
    const qModalEl = document.getElementById('questionModal');
    const jModalEl = document.getElementById('jobModal');
    
    questionModal = new bootstrap.Modal(qModalEl, { focus: false });
    jobModal = new bootstrap.Modal(jModalEl, { focus: false });
    
    [qModalEl, jModalEl].forEach(el => {
        el.addEventListener('hide.bs.modal', () => {
            el.setAttribute('inert', '');
        });
        el.addEventListener('hidden.bs.modal', () => {
            if (document.activeElement) document.activeElement.blur();
        });
        el.addEventListener('show.bs.modal', () => {
            el.removeAttribute('inert');
        });
    });

    langSwitcher.addEventListener('change', () => {
        localStorage.setItem('app_lang', langSwitcher.value);
        updateStaticLabels(); renderQuestions();
    });

    themeToggle.addEventListener('click', () => applyTheme(html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark'));
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
        safeModalHide(questionModal, qModalEl);
    });

    document.getElementById('btnManageJobs').addEventListener('click', () => { renderJobsList(); jobModal.show(); });

    document.getElementById('addQuestionBtn').addEventListener('click', () => {
        questionForm.reset();
        document.getElementById('editId').value = '';
        document.getElementById('modalTitle').innerText = t('modalTitleAdd');
        questionModal.show();
    });

    document.getElementById('exportBtn').addEventListener('click', () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ appData }, null, 2));
        const link = document.createElement('a');
        link.href = dataStr;
        link.download = `hr_cheat_sheet_v${APP_CONFIG.version}.json`;
        link.click();
    });

    document.getElementById('importBtn').addEventListener('click', () => document.getElementById('importFile').click());
    document.getElementById('importFile').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const imported = JSON.parse(ev.target.result);
                appData = sanitizeData(imported.appData || imported);
                saveAndRender(); updateStaticLabels(); alert(t('importSuccess'));
            } catch (err) { alert(t('importReadError') + err.message); }
        };
        reader.readAsText(file);
    });

    applyTheme(localStorage.getItem('theme') || 'light');
    langSwitcher.value = localStorage.getItem('app_lang') || 'uk';
    updateStaticLabels(); renderQuestions();
};