// Function to switch languages
function switchLanguage() {
    const language = document.getElementById('language-select').value;

    // Save language to localStorage
    localStorage.setItem('language', language);

    // Define translations
    const translations = {
        'create-title': { en: 'Create New Account', fr: 'Créer un nouveau compte', ar: 'إنشاء حساب جديد' },
        'firstName': { en: 'First Name', fr: 'Prénom', ar: 'الاسم الأول' },
        'lastName': { en: 'Last Name', fr: 'Nom de famille', ar: 'الاسم الأخير' },
        'year': { en: 'YYYY', fr: 'AAAA', ar: 'سنة' },
        'month': { en: 'MM', fr: 'MM', ar: 'شهر' },
        'day': { en: 'DD', fr: 'JJ', ar: 'يوم' },
        'email': { en: 'Email', fr: 'Email', ar: 'البريد الإلكتروني' },
        'password': { en: 'Password', fr: 'Mot de passe', ar: 'كلمة المرور' },
        'confirmPassword': { en: 'Confirm Password', fr: 'Confirmer le mot de passe', ar: 'تأكيد كلمة المرور' },
        'register-button': { en: 'Register', fr: 'S’inscrire', ar: 'تسجيل' }
    };

    // Update placeholders and buttons text
    Object.keys(translations).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (element.tagName === "BUTTON") {
                element.innerText = translations[id][language] || translations[id].en;
            } else {
                element.placeholder = translations[id][language] || translations[id].en;
            }
        }
    });
}

// Set language on page load from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    document.getElementById('language-select').value = savedLanguage;
    switchLanguage();
});

// Function to move focus to next input on typing date parts (Year -> Month -> Day)
function moveFocus(currentField, nextField) {
    const currentInput = document.getElementById(currentField);
    const nextInput = document.getElementById(nextField);

    // Move focus to next field when current field reaches its max length
    if (currentInput.value.length === currentInput.maxLength) {
        nextInput.focus();
    }
}

// Handle form submission for registration
document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const year = document.getElementById('year').value.trim();
    const month = document.getElementById('month').value.trim();
    const day = document.getElementById('day').value.trim();

    const registerMessage = document.getElementById('register-message');

    // Clear previous messages
    registerMessage.style.display = 'none';

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        registerMessage.innerText = 'Passwords do not match.';
        registerMessage.style.display = 'block';
        return;
    }

    // Check if user already exists
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        registerMessage.innerText = 'User with this email already exists.';
        registerMessage.style.display = 'block';
        return;
    }

    // Validate date of birth input (Year, Month, Day)
    if (!year || !month || !day) {
        registerMessage.innerText = 'Please enter a valid birthdate.';
        registerMessage.style.display = 'block';
        return;
    }

    // Create new user
    const birthdate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const newUser = { firstName, lastName, email, password, birthdate };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Redirect to login page after successful registration
    window.location.href = 'index.html';
});
