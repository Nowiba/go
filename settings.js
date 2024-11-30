// Handle profile photo upload
document.getElementById('upload-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const photoInput = document.getElementById('photo-input');
    const file = photoInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const photoURL = e.target.result;
            document.getElementById('profile-preview').src = photoURL;

            // Save photo URL to localStorage
            localStorage.setItem('profilePhoto', photoURL);
        };

        reader.readAsDataURL(file);
    }

    // Save user name (mocked as an example)
    const userName = e.target.result; // Replace with actual logic for getting username
    localStorage.setItem('userName', userName);

    document.getElementById('user-name').textContent = userName;
    alert('Profile photo updated!');
});
