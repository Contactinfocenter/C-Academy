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
      adminOnly: ['Admin'], // Admin-only content
      salesOnly: ['Admin', 'Sales'], // Sales-only content
      contactOnly: ['Admin','Contact'], // Contact-only content
      auditOnly: ['Audit'], // Audit-only content
      salesAndContact: ['Admin', 'Sales', 'Contact'], // Shared content for Sales and Contact
      salesContactAudit: ['Admin', 'Sales', 'Contact', 'Audit'], // Shared content for Sales, Contact, and Audit
    };

    Object.keys(roleAccess).forEach((contentId) => {
      const contentElement = document.getElementById(contentId);
      if (contentElement && !roleAccess[contentId].includes(role)) {
        contentElement.style.display = 'none'; // Hide content for unauthorized roles
      }
    });
  });
