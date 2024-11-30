// Function to switch languages
function switchLanguage() {
    const language = document.getElementById('language-select').value;

    // Define translations for each element
    const translations = {
        'login-title': {
            en: 'Log In To Your Account',
            fr: 'Connectez-vous à votre compte',
            ar: 'تسجيل الدخول إلى حسابك'
        },
        'email': {
            en: 'Email or phone number',
            fr: 'E-mail ou numéro de téléphone',
            ar: 'البريد الإلكتروني أو رقم الهاتف'
        },
        'password': {
            en: 'Password',
            fr: 'Mot de passe',
            ar: 'كلمة المرور'
        },
        'login-button': {
            en: 'Log In',
            fr: 'Se connecter',
            ar: 'تسجيل الدخول'
        },
        'create-account-button': {
            en: 'Create New Account',
            fr: 'Créer un nouveau compte',
            ar: 'إنشاء حساب جديد'
        },
        'forgot-password-button': {
            en: 'Forgot Password',
            fr: 'Mot de passe oublié',
            ar: 'نسيت كلمة المرور'
        },
        'language-label': {
            en: 'Language:',
            fr: 'Langue:',
            ar: 'اللغة:'
        },
        'toggle-password': {
            en: 'Show',
            fr: 'Afficher',
            ar: 'إظهار'
        }
    };

    // Update text content based on language selection
    Object.keys(translations).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (element.tagName === 'BUTTON') {
                // For buttons, update text
                element.innerText = translations[id][language] || translations[id].en;
            } else {
                // For other text elements (like h2, labels), update text content
                element.innerText = translations[id][language] || translations[id].en;
            }
        }
    });

    // Update placeholders for email and password
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    emailInput.placeholder = translations['email'][language] || translations['email'].en;
    passwordInput.placeholder = translations['password'][language] || translations['password'].en;

    // Update show password button text
    const togglePasswordButton = document.getElementById('togglePassword');
    togglePasswordButton.innerText = translations['toggle-password'][language] || translations['toggle-password'].en;
}

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const loginError = document.getElementById('login-error');

    // Reset error message
    loginError.style.display = 'none';

    // Fetch users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email);

    // Validate email and password
    if (user && user.password === password) {
        window.location.href = 'mainpage.html'; // Redirect to main page
    } else {
        loginError.innerText = 'Wrong email or password.';
        loginError.style.display = 'block';
    }
});

// Password toggle functionality
document.getElementById('togglePassword').addEventListener('click', () => {
    const passwordField = document.getElementById('password');
    const toggleButton = document.getElementById('togglePassword');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.innerText = 'Hide';
    } else {
        passwordField.type = 'password';
        toggleButton.innerText = 'Show';
    }
});

// Language switcher event listener
document.getElementById('language-select').addEventListener('change', switchLanguage);

// Initialize language settings when page loads
document.addEventListener('DOMContentLoaded', switchLanguage);
