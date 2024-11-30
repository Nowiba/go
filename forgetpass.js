// Move focus to the next field when the current field is filled
function moveFocus(currentId, nextId) {
    const currentField = document.getElementById(currentId);
    const nextField = document.getElementById(nextId);
    if (currentField.value.length === currentField.maxLength) {
        nextField.focus();
    }
}

document.getElementById('forgot-password-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const year = document.getElementById('year').value.trim();
    const month = document.getElementById('month').value.trim();
    const day = document.getElementById('day').value.trim();
    const newPassword = document.getElementById('new-password').value.trim();
    const confirmNewPassword = document.getElementById('confirm-new-password').value.trim();
    const errorMessage = document.getElementById('error-message');

    // Reset the error message
    errorMessage.style.display = 'none';

    // Validate password confirmation
    if (newPassword !== confirmNewPassword) {
        errorMessage.innerText = 'Passwords do not match.';
        errorMessage.style.display = 'block';
        return;
    }

    // Validate birthdate format (YYYY-MM-DD)
    if (year.length !== 4 || month.length !== 2 || day.length !== 2) {
        errorMessage.innerText = 'Please enter a valid birthdate (YYYY-MM-DD).';
        errorMessage.style.display = 'block';
        return;
    }

    // Format the birthdate
    const formattedBirthdate = `${year}-${month}-${day}`;

    // Log entered data and users in localStorage (for debugging)
    console.log(`Entered Email: ${email}`);
    console.log(`Entered Birthdate: ${formattedBirthdate}`);

    // Fetch users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Users in localStorage:', users); // Log all users

    // Find user by email and birthdate
    const user = users.find(user => user.email === email && user.birthdate === formattedBirthdate);

    // If no matching user is found, show error message
    if (!user) {
        errorMessage.innerText = 'No matching account found with the provided email and birthdate.';
        errorMessage.style.display = 'block';
        return;
    }

    // Update the password for the found user
    user.password = newPassword;

    // Save the updated users array back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Redirect to the login page after successful password reset
    window.location.href = 'index.html';
});

// Auto-focus logic for the birthdate fields (on input)
document.getElementById('year').addEventListener('input', function() {
    moveFocus('year', 'month');
});
document.getElementById('month').addEventListener('input', function() {
    moveFocus('month', 'day');
});









// Language content for each language
const translations = {
    en: {
        title: 'Forgot Password',
        welcomeTitle: 'Welcome Back!',
        resetText: 'Reset your password to continue.',
        emailPlaceholder: 'Enter your email',
        yearPlaceholder: 'YYYY',
        monthPlaceholder: 'MM',
        dayPlaceholder: 'DD',
        newPasswordPlaceholder: 'Enter new password',
        confirmNewPasswordPlaceholder: 'Confirm new password',
        resetButton: 'Reset Password',
    },
    fr: {
        title: 'Mot de passe oublié',
        welcomeTitle: 'Bon retour!',
        resetText: 'Réinitialisez votre mot de passe pour continuer.',
        emailPlaceholder: 'Entrez votre email',
        yearPlaceholder: 'AAAA',
        monthPlaceholder: 'MM',
        dayPlaceholder: 'JJ',
        newPasswordPlaceholder: 'Entrez un nouveau mot de passe',
        confirmNewPasswordPlaceholder: 'Confirmer le nouveau mot de passe',
        resetButton: 'Réinitialiser le mot de passe',
    },
    ar: {
        title: 'نسيت كلمة المرور',
        welcomeTitle: 'مرحبًا بعودتك!',
        resetText: 'إعادة تعيين كلمة المرور للمتابعة.',
        emailPlaceholder: 'أدخل بريدك الإلكتروني',
        yearPlaceholder: 'سنة',
        monthPlaceholder: 'شهر',
        dayPlaceholder: 'يوم',
        newPasswordPlaceholder: 'أدخل كلمة مرور جديدة',
        confirmNewPasswordPlaceholder: 'تأكيد كلمة المرور الجديدة',
        resetButton: 'إعادة تعيين كلمة المرور',
    }
};

// Set the language on page load (default to English)
let currentLanguage = 'en';

// Function to change the content based on the selected language
function changeLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;

    // Update the page content with the selected language
    document.getElementById('forgot-password-title').innerText = translations[language].title;
    document.getElementById('welcome-title').innerText = translations[language].welcomeTitle;
    document.getElementById('reset-text').innerText = translations[language].resetText;
    document.getElementById('email').placeholder = translations[language].emailPlaceholder;
    document.getElementById('year').placeholder = translations[language].yearPlaceholder;
    document.getElementById('month').placeholder = translations[language].monthPlaceholder;
    document.getElementById('day').placeholder = translations[language].dayPlaceholder;
    document.getElementById('new-password').placeholder = translations[language].newPasswordPlaceholder;
    document.getElementById('confirm-new-password').placeholder = translations[language].confirmNewPasswordPlaceholder;
    document.getElementById('reset-password-button').innerText = translations[language].resetButton;
}

// Toggle the dropdown when the button is clicked
document.getElementById('lang-btn').addEventListener('click', function() {
    const dropdown = document.querySelector('.dropdown-content');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Handle language switch on click
document.getElementById('english-btn').addEventListener('click', function() {
    changeLanguage('en');
});

document.getElementById('french-btn').addEventListener('click', function() {
    changeLanguage('fr');
});

document.getElementById('arabic-btn').addEventListener('click', function() {
    changeLanguage('ar');
});

// Close the dropdown after selection
document.querySelector('.dropdown-content').addEventListener('click', function() {
    this.style.display = 'none';
});
