const translations = {
    uk: {
        infoModalTitle: "Інформація про проєкт",
        tabAbout: "Про проєкт",
        tabFAQ: "ЧаПи",
        tabInstall: "Встановлення",
        tabSupport: "Підтримка",

        // About Section
        aboutWhatTitle: "Що це за проєкт?",
        aboutWhatText: "<b>HR Cheat Sheet</b> — це ваш персональний менеджер знань для підготовки до співбесід. Ми зібрали зручний інструмент, де ви можете зберігати найпідступніші питання рекрутерів та готувати на них професійні відповіді двома мовами одночасно.",
        aboutWhoTitle: "Для кого цей застосунок?",
        aboutWhoText: "Для розробників, дизайнерів, менеджерів та будь-яких спеціалістів, які хочуть структурувати свій досвід і не губитися під час HR-інтерв'ю. Це особливо корисно, якщо ви готуєтеся до співбесід у міжнародні компанії.",
        aboutPrivacyTitle: "Повна приватність",
        aboutPrivacyText: "Ваші дані — це ваша власність. Застосунок працює локально: всі питання та відповіді зберігаються у сховищі вашого браузера (LocalStorage). Ми не зберігаємо ніяку інформацію на наших серверах, не збираємо ваші дані та не відстежуємо ваші дії.",

        // FAQ Section
        faqQ1: "Чи зникнуть дані після закриття вкладки?",
        faqA1: "Ні, дані зберігаються автоматично. Однак, якщо ви очистите кеш браузера, вони можуть видалитися. Радимо регулярно робити <b>Експорт</b>.",
        faqQ2: "Як перенести дані на інший пристрій?",
        faqA2: "Натисніть на шестерню, виберіть <b>Експорт (JSON)</b>. Перенесіть файл на новий пристрій і натисніть <b>Імпорт</b>.",
        faqQ3: "Навіщо потрібні дві мови?",
        faqA3: "Це допомагає тренувати відповіді для міжнародних компаній. Ви бачите питання та відповідь одночасно рідною мовою та англійською.",
        faqQ4: "Чи можу я використовувати застосунок офлайн?",
        faqA4: "Так! Після встановлення як PWA застосунок працює навіть без доступу до інтернету.",
        faqQ5: "Чи є обмеження на кількість питань?",
        faqA5: "Обмежень немає, все залежить тільки від вільного місця у пам'яті вашого браузера.",

        // Install Section
        installIos: "Натисніть кнопку <b>'Поділитися' (Share)</b> внизу екрана Safari, потім виберіть пункт <b>'Додати на початковий екран' (Add to Home Screen)</b>. Застосунок з'явиться як звичайна програма.",
        installAndroid: "Натисніть на три крапки в кутку Chrome і виберіть <b>'Встановити застосунок' (Install app)</b>. Тепер ви зможете відкривати його з головного екрана навіть без інтернету.",

        // Кнопки управления данными
        themeToggleLabel: "Змінити тему",
        btnExport: "Експорт (JSON)",
        btnImport: "Імпорт (JSON)",
        confirmImport: "Імпортувати дані? Поточні дані будуть замінені.",
        importSuccess: "Успішно імпортовано!",
        importError: "Невірний формат файлу!",
        importReadError: "Помилка при читанні: ",

        // Основной интерфейс
        btnAddQuestion: "Додати питання",
        btnManageJobs: "Категорії",
        jobLabel: "Вакансія:",
        updateAvailable: "Доступна нова версія!",
        confirmDelete: "Ви впевнені, що хочете видалити цей елемент?",

        // Модальное окно вопроса (Поля и плейсхолдеры)
        modalTitleAdd: "Нове питання",
        modalTitleEdit: "Редагувати питання",
        labelUkVersion: "Українська версія",
        labelEnVersion: "English Version",
        phQuestion: "Питання",
        phAnswer: "Приклад відповіді",
        phHint: "Порада (що хоче HR)",
        btnSave: "Зберегти",
        btnCancel: "Скасувати",

        // Модальное окно категорий
        modalJobsTitle: "Керування категоріями",
        btnAddCategory: "Додати категорію",

        // Аккордеон (Список)
        labelAnswer: "Відповідь:",
        labelHint: "Порада:",

        // Модальное окно Info
        infoModalTitle: "Інформація",
        tabAbout: "Про проєкт",
        tabHelp: "Допомога",
        tabSupport: "Підтримка",
        aboutText: "<b>HR Cheat Sheet</b> — це інструмент для структурування вашого досвіду. Створюйте власні списки питань, тренуйте відповіді та будьте готові до будь-яких викликів на співбесіді.",
        aboutPrivacy: "🔒 Конфіденційність: дані залишаються тільки у вашому браузері (LocalStorage). Жодних серверів або відстеження.",
        helpBackup: "<b>Резервне копіювання:</b> радимо робити експорт після значних змін, щоб не втратити дані при очищенні кешу браузера.",
        helpImport: "<b>Важливо:</b> імпорт файлу видаляє поточні записи та замінює їх новими.",
        helpPwa: "<b>Офлайн доступ:</b> додаток працює без інтернету після першого завантаження.",

        // Support Section (Розширений)
        supportText: "<b>HR Cheat Sheet</b> — це відкритий проєкт (Open Source). Ми віримо, що найкращі інструменти створюються спільнотою.",
        supportInviteTitle: "🤝 Приєднуйтесь до розробки",
        supportInviteText: "Маєте ідею нової функції? Знайшли помилку? Ви можете зробити свій внесок: створіть 'Issue' або надішліть 'Pull Request' на нашому GitHub. Ми раді будь-якій допомозі — від виправлення тексту до написання коду!",
        supportCoffee: "Ви також можете підтримати автора чашкою кави, щоб проєкт розвивався далі.",
    },
    en: {
        infoModalTitle: "Project Information",
        tabAbout: "About",
        tabFAQ: "FAQ",
        tabInstall: "Install",
        tabSupport: "Support",

        aboutWhatTitle: "What is this project?",
        aboutWhatText: "<b>HR Cheat Sheet</b> is your personal knowledge manager for interview preparation. It's a handy tool where you can store tricky recruiter questions and prepare professional answers in two languages simultaneously.",
        aboutWhoTitle: "Who is it for?",
        aboutWhoText: "For developers, designers, managers, and any specialists who want to structure their experience and stay confident during HR interviews. Especially useful for international company prep.",
        aboutPrivacyTitle: "Total Privacy",
        aboutPrivacyText: "Your data is yours alone. The app works locally: all questions and answers are stored in your browser's LocalStorage. We do not store any information on our servers, do not collect your data, and do not track your activities.",

        faqQ1: "Will data disappear after closing the tab?",
        faqA1: "No, data is saved automatically. However, if you clear your browser cache, it may be deleted. We recommend regular <b>Exports</b>.",
        faqQ2: "How to transfer data to another device?",
        faqA2: "Click the gear icon, choose <b>Export (JSON)</b>. Move the file to your new device and click <b>Import</b>.",
        faqQ3: "Why two languages?",
        faqA3: "This helps you practice for international interviews. You see the question and answer in your native language and English at the same time.",
        faqQ4: "Can I use the app offline?",
        faqA4: "Yes! Once installed as a PWA, the app works even without an internet connection.",
        faqQ5: "Are there any question limits?",
        faqA5: "There are no limits; it only depends on the available storage in your browser.",

        installIos: "Tap the <b>'Share'</b> button at the bottom of Safari, then select <b>'Add to Home Screen'</b>. The app will appear on your screen like a native application.",
        installAndroid: "Tap the three dots in Chrome's corner and select <b>'Install app'</b>. Now you can open it from your home screen even offline.",

        // Data management buttons
        themeToggleLabel: "Toggle theme",
        btnExport: "Export (JSON)",
        btnImport: "Import (JSON)",
        confirmImport: "Import data? Current data will be replaced.",
        importSuccess: "Imported successfully!",
        importError: "Invalid file format!",
        importReadError: "Error reading file: ",

        // Main interface
        btnAddQuestion: "Add Question",
        btnManageJobs: "Categories",
        jobLabel: "Job:",
        updateAvailable: "New version available!",
        confirmDelete: "Are you sure you want to delete this item?",

        // Question modal (Fields & Placeholders)
        modalTitleAdd: "New Question",
        modalTitleEdit: "Edit Question",
        labelUkVersion: "Ukrainian Version",
        labelEnVersion: "English Version",
        phQuestion: "Question",
        phAnswer: "Sample Answer",
        phHint: "Hint (What HR wants)",
        btnSave: "Save",
        btnCancel: "Cancel",

        // Jobs modal
        modalJobsTitle: "Manage Categories",
        btnAddCategory: "Add Category",

        // Accordion (List)
        labelAnswer: "Answer:",
        labelHint: "Hint:",

        // Info Modal
        infoModalTitle: "Information",
        tabAbout: "About",
        tabHelp: "Help",
        tabSupport: "Support",
        aboutText: "<b>HR Cheat Sheet</b> is a tool for structuring your experience. Create your own lists of questions, practice answers, and be ready for any interview challenges.",
        aboutPrivacy: "🔒 Privacy: your data stays only in your browser (LocalStorage). No servers or tracking.",
        helpBackup: "<b>Backup:</b> we recommend exporting your data after significant changes to avoid loss when clearing browser cache.",
        helpImport: "<b>Important:</b> importing a file will delete current records and replace them with new ones.",
        helpPwa: "<b>Offline Access:</b> the app works without an internet connection after the first load.",
        supportText: "<b>HR Cheat Sheet</b> is an Open Source project. We believe the best tools are built by the community.",
        supportInviteTitle: "🤝 Join the Development",
        supportInviteText: "Have a feature idea? Found a bug? You can contribute: create an 'Issue' or send a 'Pull Request' on our GitHub. We welcome any help — from fixing typos to writing code!",
        supportCoffee: "You can also support the author by buying a coffee to keep the project growing.",
    }
};
