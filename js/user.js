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

// Role-based content visibility using class selectors
document.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');

  if (!loggedInUser) {
    alert('You must log in to access this page.');
    window.location.href = 'login.html';
    return;
  }

  const { role } = JSON.parse(loggedInUser);

  // Prevent non-admin users from accessing admin.html
  if (window.location.pathname.includes('admin.html') && role !== 'Admin') {
    alert('Access denied! Only Admins can view this page.');
    window.location.href = 'index.html';
    return;
  }

  // Role-based content visibility
  const roleAccess = {
    adminOnly: ['Admin'],
    salesOnly: ['Admin', 'Sales'],
    contactOnly: ['Admin', 'Contact'],
    auditOnly: ['Audit'],
    salesAndContact: ['Admin', 'Sales', 'Contact'],
    salesContactAudit: ['Admin', 'Sales', 'Contact', 'Audit'],
  };

  Object.keys(roleAccess).forEach((className) => {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach((element) => {
      if (!roleAccess[className].includes(role)) {
        element.style.display = 'none'; // Hide content for unauthorized roles
      }
    });
  });
});