document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submit-btn');
    if (!submitBtn) {
        console.error('Submit button not found!');
        return;
    }

    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const profileImageInput = document.getElementById('input-file');

    submitBtn.addEventListener('click', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const username = usernameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const profileImageFile = profileImageInput.files[0];

        let profileImageBase64 = null;
        if (profileImageFile) {
            profileImageBase64 = await convertToBase64(profileImageFile);
        }

        // Save data to localStorage
        localStorage.setItem('userData', JSON.stringify({
            username,
            email,
            password,
            profileImage: profileImageBase64
        }));

        // Optionally, redirect to quiz page or show a success message
        window.location.href = '/Quiz/Quiz.html';
    });

    // Function to convert image to Base64
    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
});
