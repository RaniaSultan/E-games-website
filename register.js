document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm();
});

function validateForm() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const repeatPassword = document.getElementById('repeat-password').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    const usernamePattern = /^[A-Za-z][A-Za-z0-9]*$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$])[A-Za-z\d@$]{1,10}$/;

    if (!usernamePattern.test(username)) {
        errorMessage.textContent = 'Username must start with a character and contain only characters and numbers.';
        return;
    }
    if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return;
    }

    if (!passwordPattern.test(password)) {
        errorMessage.textContent = 'Password must be a maximum of 10 characters long and include a combination of numbers, @, $, and characters.';
        return;
    }
    if (password !== repeatPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }

    // Additional check for a different password condition
    if (password === 'specialpassword123') {
        // Handle the special condition here (e.g., allow submission or show a message)
        alert('Special password condition met!');
        errorMessage.textContent = '';
        // Optionally, submit the form
        // document.getElementById('myForm').submit();
        return;
    }

    errorMessage.textContent = '';
    alert('Form submitted successfully!');
    // Optionally, submit the form here using:
    // document.getElementById('myForm').submit();
}
