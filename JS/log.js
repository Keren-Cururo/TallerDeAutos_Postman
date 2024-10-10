document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    try {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            throw new Error('Both fields are required.');
        }

        // Aquí puedes agregar más validaciones según tus necesidades

        alert('Login successful!');
    } catch (error) {
        alert(error.message);
    }
});