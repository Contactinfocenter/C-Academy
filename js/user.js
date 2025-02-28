const userNameElement = document.getElementById('userName');
const signOutBtn = document.getElementById('signOutBtn');

// Load logged-in user data
async function loadUser() {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    window.location.href = 'login.html'; // Redirect to login if no user is logged in
    return;
  }

  const userId = JSON.parse(loggedInUser).id;
  const userDoc = await db.collection('Users').doc(userId).get();

  if (!userDoc.exists) {
    window.location.href = 'login.html'; // Redirect to login if user data not found
    return;
  }

  const userData = userDoc.data();
  userNameElement.textContent = userData.name;
}

// Sign out
signOutBtn.addEventListener('click', async () => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  if (!loggedInUser) return;

  const userId = JSON.parse(loggedInUser).id;

  try {
    await db.collection('Users').doc(userId).update({
      isLoggedIn: false,
    });
    sessionStorage.removeItem('loggedInUser');
    window.location.href = 'login.html'; // Redirect to login page
  } catch (error) {
    console.error('Error during sign-out:', error.message);
    alert('Error signing out. Please try again.');
  }
});

// Load user data on page load
loadUser();
