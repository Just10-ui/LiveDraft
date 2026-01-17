const submit = document.getElementById('signup');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

submit.addEventListener('click', handleSignup);

async function handleSignup() {
  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch('http://localhost:8080/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    });
    const data = await response.json();
    window.alert(data.message);

    usernameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}