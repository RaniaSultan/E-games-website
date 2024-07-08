document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm();
});

function validateForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    const usernamePattern = /^[A-Za-z][A-Za-z0-9]*$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$])[A-Za-z\d@$]{1,10}$/;

    if (!usernamePattern.test(username)) {
        errorMessage.textContent = 'Username must start with a character and contain only characters and numbers.';
        return;
    }

    if (!passwordPattern.test(password)) {
        errorMessage.textContent = 'Password must be a maximum of 10 characters long and include a combination of numbers, @, $, and characters.';
        return;
    }

    errorMessage.textContent = '';
    
    // Optionally, submit the form here using:
    document.getElementById('myForm').submit();
}