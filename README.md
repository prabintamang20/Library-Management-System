# 📚 Library Management System (HTML, CSS, JavaScript)

This project is a simple and interactive **Library Management System** developed using **HTML, CSS, and JavaScript**. It is a front-end based application designed to manage books efficiently without using any backend technologies or databases.

## 🚀 Features

* 📖 **View Books**: Display a list of available books in the library
* ➕ **Add Books**: Users can add new books with details like title, author, and category
* 🗑️ **Delete Books**: Remove books from the system
* 🔍 **Search Functionality**: Easily search for books by title or author
* 📊 **Dynamic UI**: Real-time updates without page reload using JavaScript
* 💾 **Local Storage Support**: Data is stored in the browser using localStorage

## 🛠️ Technologies Used

* **HTML** – Structure of the application
* **CSS** – Styling and layout design
* **JavaScript** – Functionality and interactivity

## 📂 Project Structure

* `index.html` – Main webpage structure
* `style.css` – Styling for UI components
* `script.js` – Logic for managing books and user interactions

## 🎯 Objective

The main objective of this project is to demonstrate how a basic library system can be built using only front-end technologies. It helps beginners understand DOM manipulation, event handling, and browser storage.

To reduce manual work in library management

To maintain accurate records of books and users

To provide a user-friendly interface for accessing library resources

To improve efficiency and transparency in book transactions

⚡ Benefits

Saves time and effort

Easy data management and retrieval

Minimizes human errors

Accessible anytime and anywhere

## ⚠️ Limitations

* No backend/database (data is not permanent across browsers/devices)
* Limited scalability
* Not suitable for large-scale library systems

## 📌 Conclusion

This project is ideal for beginners who want to practice front-end development skills. It showcases how JavaScript can be used to create dynamic and functional web applications without relying on external frameworks or backend services.

HTML CODE 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Library Management System</title>
    <link rel="stylesheet" href="library.css">
</head>
<body>
    <div class="auth-shell active-auth" id="authShell">
        <div class="auth-card">
            <div id="loginPage" class="auth-page active">
                <div class="auth-header">
                    <p class="eyebrow">Welcome Back</p>
                    <h1>Login to Your Library</h1>
                    <p class="subtitle">Access the library dashboard and manage books in one place.</p>
                </div>
                <div class="auth-form">
                    <label>
                        Email
                        <input type="email" id="loginEmail" placeholder="you@example.com" required>
                    </label>
                    <label>
                        Password
                        <input type="password" id="loginPassword" placeholder="Enter password" required>
                    </label>
                    <div class="form-row">
                        <label class="remember-row">
                            <input type="checkbox" id="rememberMe">
                            Remember me
                        </label>
                        <button class="link-btn" id="gotoForgot" type="button">Forgot Password?</button>
                    </div>
                    <button class="btn btn-primary" id="loginButton">Login</button>
                    <p class="auth-footer">Don't have an account? <button class="link-btn" id="gotoSignup" type="button">Sign Up</button></p>
                </div>
            </div>
            <div id="forgotPage" class="auth-page">
                <div class="auth-header">
                    <p class="eyebrow">Recover Access</p>
                    <h1>Forgot Password</h1>
                    <p class="subtitle">Reset your password quickly and return to the library dashboard.</p>
                </div>
                <div class="auth-form">
                    <label>
                        Registered Email
                        <input type="email" id="forgotEmail" placeholder="you@example.com" required>
                    </label>
                    <label>
                        New Password
                        <input type="password" id="forgotPassword" placeholder="Enter new password" required>
                    </label>
                    <label>
                        Confirm Password
                        <input type="password" id="forgotConfirm" placeholder="Confirm new password" required>
                    </label>
                    <button class="btn btn-primary" id="resetButton">Reset Password</button>
                    <p class="auth-footer">Back to <button class="link-btn" id="gotoLoginFromForgot" type="button">Login</button></p>
                </div>
            </div>
            <div id="signupPage" class="auth-page">
                <div class="auth-header">
                    <p class="eyebrow">Create Account</p>
                    <h1>Register for Library Access</h1>
                    <p class="subtitle">Quickly set up an account to start managing your book inventory.</p>
                </div>
                <div class="auth-form">
                    <label>
                        Full Name
                        <input type="text" id="signupName" placeholder="John Doe" required>
                    </label>
                    <label>
                        Role
                        <select id="signupRole" required>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </label>
                    <label>
                        Position
                        <input type="text" id="signupPosition" placeholder="Class Representative / Science Teacher" required>
                    </label>
                    <label>
                        Email
                        <input type="email" id="signupEmail" placeholder="you@example.com" required>
                    </label>
                    <label>
                        Password
                        <input type="password" id="signupPassword" placeholder="Create a password" required>
                    </label>
                    <label>
                        Confirm Password
                        <input type="password" id="signupConfirm" placeholder="Confirm password" required>
                    </label>
                    <button class="btn btn-primary" id="signupButton">Sign Up</button>
                    <p class="auth-footer">Already have an account? <button class="link-btn" id="gotoLogin" type="button">Login</button></p>
                </div>
            </div>
            <p class="auth-note" id="authMessage"></p>
        </div>
    </div>

    <div class="page-shell" id="libraryShell" style="display:none;">
        <header class="topbar">
            <div>
                <p class="eyebrow">Library Management</p>
                <h1>Modern Library Dashboard</h1>
                <p class="subtitle">Track book inventory, members, and borrowing status with a clean professional UI.</p>
            </div>
            <div class="topbar-controls">
                <span class="user-chip" id="currentUserName">Guest</span>
                <button class="btn btn-secondary" id="openProfile">Profile</button>
                <button class="btn btn-secondary hidden" id="manageRequestsButton">Manage Requests</button>
                <button class="btn btn-primary hidden" id="sellBookButton">Sell Book</button>
                <button class="btn btn-primary hidden" id="newBookButton">+ Add New Book</button>
                <button class="btn btn-secondary" id="themeToggle">🌙 Dark Mode</button>
                <button class="btn btn-secondary" id="logoutButton">Logout</button>
            </div>
        </header>

        <section class="summary-grid">
            <article class="summary-card">
                <span class="summary-label">Total Books</span>
                <h2 id="totalBooks">0</h2>
            </article>
            <article class="summary-card">
                <span class="summary-label">Available</span>
                <h2 id="availableBooks">0</h2>
            </article>
            <article class="summary-card">
                <span class="summary-label">Borrowed</span>
                <h2 id="borrowedBooks">0</h2>
            </article>
            <article class="summary-card">
                <span class="summary-label" id="pendingRequestsLabel">Pending Requests</span>
                <h2 id="pendingRequests">0</h2>
            </article>
        </section>

        <section class="control-panel">
            <div class="search-box">
                <label for="searchInput">Search books</label>
                <input type="search" id="searchInput" placeholder="Search by title, author, or ISBN">
            </div>
            <div class="filters">
                <label for="genreFilter">Genre</label>
                <select id="genreFilter">
                    <option value="all">All genres</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Nonfiction">Nonfiction</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                    <option value="Technology">Technology</option>
                </select>
                <label for="statusFilter">Status</label>
                <select id="statusFilter">
                    <option value="all">All statuses</option>
                    <option value="available">Available</option>
                    <option value="borrowed">Borrowed</option>
                </select>
            </div>
        </section>

        <section class="table-panel">
            <div class="panel-header">
                <h2>Book Inventory</h2>
                <p>Maintain your catalog with quick edit and status controls.</p>
            </div>
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Year</th>
                            <th>ISBN</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="bookTableBody">
                        <tr><td colspan="8" class="empty-row">No books added yet. Use the button above to add a book.</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="request-panel hidden" id="requestPanel">
            <div class="panel-header">
                <h2>Requests Dashboard</h2>
                <p>Review and approve buy/sell requests from students and teachers.</p>
            </div>
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Request</th>
                            <th>User</th>
                            <th>Role</th>
                            <th>Book</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="requestTableBody">
                        <tr><td colspan="7" class="empty-row">No pending requests to review.</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <section class="transaction-panel hidden" id="transactionPanel">
            <div class="panel-header">
                <h2>Transaction History</h2>
                <p>Track your approved and rejected book requests.</p>
            </div>
            <div class="table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Request</th>
                            <th>Book</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="transactionTableBody">
                        <tr><td colspan="6" class="empty-row">No transaction history yet.</td></tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>

    <div class="modal-backdrop" id="bookModal">
        <div class="modal-card">
            <div class="modal-header">
                <div>
                    <p class="eyebrow">Catalog Entry</p>
                    <h2 id="modalTitle">Add New Book</h2>
                </div>
                <button class="icon-btn" id="closeModal">✕</button>
            </div>
            <div class="modal-body">
                <form id="bookForm">
                    <div class="form-grid">
                        <label>
                            Book Title
                            <input type="text" id="bookTitle" required placeholder="The Great Gatsby">
                        </label>
                        <label>
                            Author
                            <input type="text" id="bookAuthor" required placeholder="F. Scott Fitzgerald">
                        </label>
                        <label>
                            Genre
                            <select id="bookGenre" required>
                                <option value="Fiction">Fiction</option>
                                <option value="Nonfiction">Nonfiction</option>
                                <option value="Science">Science</option>
                                <option value="History">History</option>
                                <option value="Technology">Technology</option>
                            </select>
                        </label>
                        <label>
                            Publication Year
                            <input type="number" id="bookYear" min="1000" max="2100" required placeholder="2024">
                        </label>
                        <label>
                            ISBN
                            <input type="text" id="bookISBN" required placeholder="978-1234567890">
                        </label>
                        <label>
                            Quantity
                            <input type="number" id="bookQuantity" min="1" required value="1">
                        </label>
                        <label class="full-width">
                            Status
                            <select id="bookStatus" required>
                                <option value="available">Available</option>
                                <option value="borrowed">Borrowed</option>
                            </select>
                        </label>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn btn-ghost" id="cancelModal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Save Book</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal-backdrop" id="requestModal">
        <div class="modal-card">
            <div class="modal-header">
                <div>
                    <p class="eyebrow">Sell Request</p>
                    <h2 id="requestModalTitle">Request to Sell a Book</h2>
                </div>
                <button class="icon-btn" id="closeRequestModal">✕</button>
            </div>
            <div class="modal-body">
                <form id="requestForm">
                    <div class="form-grid">
                        <label>
                            Book Title
                            <input type="text" id="requestBookTitle" required placeholder="The Great Gatsby">
                        </label>
                        <label>
                            Author
                            <input type="text" id="requestBookAuthor" required placeholder="F. Scott Fitzgerald">
                        </label>
                        <label>
                            Genre
                            <select id="requestBookGenre" required>
                                <option value="Fiction">Fiction</option>
                                <option value="Nonfiction">Nonfiction</option>
                                <option value="Science">Science</option>
                                <option value="History">History</option>
                                <option value="Technology">Technology</option>
                            </select>
                        </label>
                        <label>
                            Publication Year
                            <input type="number" id="requestBookYear" min="1000" max="2100" required placeholder="2024">
                        </label>
                        <label>
                            ISBN
                            <input type="text" id="requestBookISBN" required placeholder="978-1234567890">
                        </label>
                        <label>
                            Quantity
                            <input type="number" id="requestBookQuantity" min="1" required value="1">
                        </label>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn btn-ghost" id="cancelRequestModal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Submit Request</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal-backdrop" id="profileModal">
        <div class="modal-card profile-modal-card">
            <div class="modal-header">
                <div>
                    <p class="eyebrow">Profile Settings</p>
                    <h2 id="profileModalTitle">My Profile</h2>
                </div>
                <button class="icon-btn" id="closeProfileModal">✕</button>
            </div>
            <div class="modal-body profile-modal-body">
                <div class="profile-grid">
                    <div class="profile-summary">
                        <div class="avatar-preview" id="avatarPreview">A</div>
                        <h3 id="profileName">Guest User</h3>
                        <p id="profilePosition">Position not set</p>
                        <p id="profileRole">Role: Visitor</p>
                        <p class="profile-email" id="profileEmail">Email will appear here</p>
                    </div>
                    <div class="profile-tabs">
                        <button class="tab-btn active" id="profileTabBtn">Profile</button>
                        <button class="tab-btn" id="passwordTabBtn">Change Password</button>
                        <button class="tab-btn" id="settingsTabBtn">Settings</button>
                    </div>
                    <div class="profile-tab active" id="profileTabContent">
                        <label>
                            Full Name
                            <input type="text" id="editName" placeholder="John Doe">
                        </label>
                        <label>
                            Position
                            <input type="text" id="editPosition" placeholder="Librarian / Manager">
                        </label>
                        <label>
                            Profile Picture
                            <input type="file" id="editAvatar" accept="image/*">
                        </label>
                        <button class="btn btn-primary" id="saveProfileButton">Save Profile</button>
                    </div>
                    <div class="profile-tab" id="passwordTabContent">
                        <label>
                            Current Password
                            <input type="password" id="currentPassword" placeholder="Current password">
                        </label>
                        <label>
                            New Password
                            <input type="password" id="newPassword" placeholder="New password">
                        </label>
                        <label>
                            Confirm New Password
                            <input type="password" id="confirmNewPassword" placeholder="Confirm new password">
                        </label>
                        <button class="btn btn-primary" id="changePasswordButton">Change Password</button>
                    </div>
                    <div class="profile-tab" id="settingsTabContent">
                        <label class="switch-row">
                            <span>Email Notifications</span>
                            <input type="checkbox" id="emailNotifications">
                        </label>
                        <label class="switch-row">
                            <span>Dark Mode Preferred</span>
                            <input type="checkbox" id="defaultDarkMode">
                        </label>
                        <button class="btn btn-primary" id="saveSettingsButton">Save Settings</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="library.js" defer></script>
</body>
</html>

CSS Code 

/* Global layout */
:root {
    color-scheme: light;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #2f3b52;
    background: #f4f7fb;
    accent-color: #4f46e5;
}

* {
    box-sizing: border-box;
}

html, body {
    margin: 0;
    min-height: 100%;
}

body {
    background: radial-gradient(circle at top left, #e0ebff 0%, #f4f7fb 45%, #eef2ff 100%);
    padding: 24px;
}

button, input, select {
    font: inherit;
}

.page-shell {
    max-width: 1180px;
    margin: 0 auto;
}

.auth-shell {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 24px;
    background: radial-gradient(circle at top left, rgba(79,70,229,0.14) 0%, rgba(99,102,241,0.08) 45%, #f4f7fb 100%);
}

.auth-card {
    width: 100%;
    max-width: 470px;
    background: white;
    border-radius: 32px;
    padding: 32px 32px 28px;
    box-shadow: 0 30px 80px rgba(47,59,82,0.14);
}

.auth-header {
    margin-bottom: 26px;
}

.auth-header h1 {
    font-size: 2.1rem;
    margin: 0 0 10px;
}

.auth-page {
    display: none;
}

.auth-page.active {
    display: block;
}

.auth-form {
    display: grid;
    gap: 16px;
}

.auth-form label {
    display: grid;
    gap: 8px;
    color: #475569;
    font-size: 0.95rem;
}

.auth-form input:not([type="checkbox"]) {
    width: 100%;
    border: 1px solid #d6dce9;
    border-radius: 16px;
    padding: 14px 16px;
    background: #f8fafc;
    color: #102a43;
}

.auth-form input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #4f46e5;
    border-radius: 4px;
    border: 1px solid #cbd5e1;
    margin: 0;
}

.auth-form input:focus:not([type="checkbox"]) {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 4px rgba(79,70,229,0.12);
}

.form-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    border-radius: 20px;
    background: #f8faff;
    border: 1px solid #dbeafe;
    flex-wrap: nowrap;
}

.auth-form label.remember-row {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #475569;
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.2;
    flex: 1;
    white-space: nowrap;
}

.auth-form label.remember-row input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #4f46e5;
    border-radius: 4px;
    border: 1px solid #cbd5e1;
    margin: 0;
    vertical-align: middle;
}

.link-btn {
    background: none;
    border: none;
    color: #4f46e5;
    cursor: pointer;
    font-weight: 700;
    text-decoration: underline;
    padding: 0;
    white-space: nowrap;
}

.auth-form .btn {
    width: 100%;
    border-radius: 14px;
    font-size: 1rem;
    padding: 14px 16px;
}

.auth-footer {
    margin: 0;
    text-align: center;
    color: #64748b;
    font-size: 0.95rem;
}

.link-btn {
    background: none;
    border: none;
    color: #4f46e5;
    cursor: pointer;
    font-weight: 700;
    text-decoration: underline;
    padding: 0;
}

.auth-note {
    margin-top: 16px;
    min-height: 22px;
    color: #192d46;
    font-weight: 600;
}

.auth-shell.active-auth {
    display: grid;
}

.topbar {
    display: grid;
    grid-template-columns: 1.5fr 0.9fr;
    gap: 18px;
    align-items: center;
    padding: 24px 28px;
    border-radius: 28px;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(18px);
    box-shadow: 0 20px 60px rgba(47,59,82,0.14);
    margin-bottom: 28px;
}

.eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #687195;
    font-size: 0.75rem;
    margin-bottom: 10px;
}

h1 {
    font-size: clamp(2rem, 2.4vw, 2.8rem);
    margin: 0;
    line-height: 1.05;
}

.subtitle {
    color: #5b677e;
    max-width: 620px;
    margin-top: 14px;
    line-height: 1.7;
}

.topbar-controls {
    display: flex;
    justify-content: end;
    gap: 14px;
    flex-wrap: wrap;
    align-items: center;
}

.user-chip {
    display: inline-flex;
    align-items: center;
    padding: 10px 16px;
    border-radius: 999px;
    background: #eef2ff;
    color: #334155;
    font-weight: 600;
    white-space: nowrap;
}

.btn {
    border: none;
    border-radius: 16px;
    padding: 14px 20px;
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
}

.btn:hover {
    transform: translateY(-1px);
}

.btn-primary {
    background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
    color: white;
    box-shadow: 0 16px 35px rgba(79,70,229,0.2);
}

.btn-secondary {
    background: white;
    color: #4f46e5;
    border: 1px solid rgba(79,70,229,0.18);
}

.btn-ghost {
    background: transparent;
    color: #4f46e5;
    border: 1px solid rgba(79,70,229,0.16);
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 18px;
    margin-bottom: 24px;
}

.summary-card {
    background: white;
    border-radius: 22px;
    padding: 22px 24px;
    box-shadow: 0 16px 40px rgba(47,59,82,0.08);
}

.summary-label {
    display: block;
    color: #667085;
    font-size: 0.85rem;
    margin-bottom: 8px;
}

.summary-card h2 {
    font-size: 2.2rem;
    margin: 0;
    color: #1f2937;
}

.control-panel {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 18px;
    align-items: end;
    margin-bottom: 18px;
}

.search-box,
.filters {
    background: white;
    border-radius: 24px;
    padding: 18px 22px;
    box-shadow: 0 12px 30px rgba(47,59,82,0.07);
}

.search-box label,
.filters label {
    display: block;
    margin-bottom: 8px;
    color: #475569;
    font-weight: 600;
}

.search-box input,
.filters select {
    width: 100%;
    border: 1px solid #d6dce9;
    border-radius: 16px;
    padding: 12px 14px;
    color: #1f2937;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-box input:focus,
.filters select:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79,70,229,0.12);
}

.filters {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
}

.table-panel {
    background: white;
    border-radius: 30px;
    padding: 26px;
    box-shadow: 0 16px 50px rgba(47,59,82,0.10);
}

.panel-header h2 {
    margin: 0;
    font-size: 1.5rem;
}

.panel-header p {
    margin: 8px 0 0;
    color: #556987;
}

.table-wrapper {
    margin-top: 22px;
    overflow-x: auto;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 880px;
}

.data-table th,
.data-table td {
    padding: 18px 16px;
    text-align: left;
    white-space: nowrap;
}

.data-table thead th {
    background: #eef2ff;
    color: #334155;
    font-weight: 600;
    font-size: 0.95rem;
}

.data-table tbody tr {
    border-bottom: 1px solid #e2e8f0;
}

.data-table tbody tr:last-child {
    border-bottom: none;
}

.data-table td {
    color: #475569;
    font-size: 0.95rem;
}

.status-pill {
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 600;
}

.status-available {
    background: #e0f2fe;
    color: #0369a1;
}

.status-borrowed {
    background: #fbe7e7;
    color: #b91c1c;
}

.action-bar {
    display: flex;
    gap: 10px;
}

.action-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    color: #4f46e5;
    font-size: 0.96rem;
    padding: 8px 10px;
    border-radius: 12px;
    transition: background-color 0.2s ease;
}

.action-btn:hover {
    background: rgba(79,70,229,0.08);
}

.empty-row {
    text-align: center;
    color: #94a3b8;
    padding: 44px 0;
}

.modal-backdrop {
    position: fixed;
    inset: 0;
    display: none;
    justify-content: center;
    align-items: center;
    background: rgba(17, 24, 39, 0.55);
    padding: 24px;
    z-index: 50;
}

.modal-backdrop.active {
    display: flex;
}

.modal-card {
    width: min(720px, 100%);
    border-radius: 28px;
    background: white;
    padding: 0;
    box-shadow: 0 30px 80px rgba(15, 23, 42, 0.25);
    max-height: calc(100vh - 80px);
    overflow: hidden;
}

.modal-body {
    padding: 28px;
    overflow-y: auto;
    max-height: calc(100vh - 180px);
}

.profile-modal-card {
    width: min(860px, 100%);
}

.profile-modal-body {
    padding: 32px;
}

.profile-grid {
    display: grid;
    grid-template-columns: 280px minmax(0, 1fr);
    gap: 24px;
}

.profile-summary {
    padding: 24px;
    border-radius: 24px;
    background: #fafbff;
    display: grid;
    gap: 16px;
    text-align: center;
    align-items: center;
}

.avatar-preview {
    width: 110px;
    height: 110px;
    margin: 0 auto;
    border-radius: 50%;
    background: linear-gradient(135deg, #c7d2fe 0%, #e0e7ff 100%);
    display: grid;
    place-items: center;
    font-size: 2.3rem;
    color: #334155;
    background-size: cover;
}

.profile-summary h3 {
    margin: 0;
    font-size: 1.4rem;
}

.profile-summary p {
    margin: 0;
    color: #475569;
}

.profile-email {
    font-size: 0.95rem;
    color: #64748b;
}

.profile-tabs {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 18px;
}

.profile-tab {
    display: none;
    gap: 18px;
}

.profile-tab.active {
    display: grid;
}

.tab-btn {
    border: 1px solid #dbeafe;
    border-radius: 16px;
    background: #f8fafc;
    color: #334155;
    padding: 12px 18px;
    cursor: pointer;
    transition: background-color 0.25s ease, color 0.25s ease;
}

.tab-btn.active {
    background: #4f46e5;
    color: white;
    border-color: transparent;
}

.switch-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 18px;
    border-radius: 18px;
    background: #f8faff;
    border: 1px solid #dbeafe;
}

.switch-row span {
    color: #334155;
    font-weight: 600;
}

.profile-modal-body .btn {
    width: auto;
    padding: 14px 22px;
    max-width: 220px;
}

@media (max-width: 900px) {
    .profile-grid {
        grid-template-columns: 1fr;
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 22px;
}

.modal-header h2 {
    margin: 0;
    font-size: 1.6rem;
}

.icon-btn {
    width: 44px;
    height: 44px;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    background: white;
    color: #334155;
    cursor: pointer;
    font-size: 1.1rem;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
}

.form-grid label {
    display: grid;
    gap: 8px;
    color: #334155;
    font-size: 0.95rem;
}

.form-grid input,
.form-grid select {
    width: 100%;
    border: 1px solid #d2d6dc;
    border-radius: 16px;
    padding: 14px 16px;
    background: #f8fafc;
    color: #102a43;
}

.form-grid input:focus,
.form-grid select:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 4px rgba(79,70,229,0.12);
}

.full-width {
    grid-column: 1 / -1;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 14px;
    margin-top: 20px;
}

@media (max-width: 980px) {
    .topbar,
    .control-panel,
    .form-grid {
        grid-template-columns: 1fr;
    }

    .topbar-controls,
    .modal-actions {
        justify-content: stretch;
    }
}

.hidden {
    display: none !important;
}

.request-panel,
.transaction-panel {
    background: white;
    border-radius: 30px;
    padding: 26px;
    box-shadow: 0 16px 50px rgba(47,59,82,0.10);
    margin-top: 24px;
}

.request-panel .panel-header,
.transaction-panel .panel-header {
    margin-bottom: 18px;
}

@media (max-width: 680px) {
    .topbar {
        padding: 20px;
    }

    .summary-card {
        padding: 18px;
    }

    .data-table th,
    .data-table td {
        padding: 14px 12px;
    }
}

body.dark-mode {
    color-scheme: dark;
    background: #0b1120;
}

body.dark-mode .topbar,
body.dark-mode .summary-card,
body.dark-mode .search-box,
body.dark-mode .filters,
body.dark-mode .table-panel,
body.dark-mode .modal-card {
    background: #111827;
}

body.dark-mode .topbar {
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}

body.dark-mode h1,
body.dark-mode .summary-card h2,
body.dark-mode .panel-header h2,
body.dark-mode .subtitle {
    color: #e2e8f0;
}

body.dark-mode .eyebrow,
body.dark-mode .summary-label,
body.dark-mode .panel-header p,
body.dark-mode .data-table td,
body.dark-mode .data-table th {
    color: #cbd5e1;
}

body.dark-mode .data-table thead th {
    background: #1f2937;
}

body.dark-mode .data-table tbody tr {
    border-color: #334155;
}

body.dark-mode .data-table tbody tr:hover {
    background: rgba(148,163,184,0.08);
}

body.dark-mode .search-box input,
body.dark-mode .filters select,
body.dark-mode .form-grid input,
body.dark-mode .form-grid select {
    background: #111827;
    border-color: #374151;
    color: #e2e8f0;
}

body.dark-mode .btn-secondary,
body.dark-mode .btn-ghost,
body.dark-mode .icon-btn {
    background: #111827;
    color: #e2e8f0;
    border-color: #334155;
}

body.dark-mode .btn-primary {
    background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
}

body.dark-mode .status-available {
    background: rgba(6,182,212,0.16);
    color: #7dd3fc;
}

body.dark-mode .status-borrowed {
    background: rgba(248,113,113,0.16);
    color: #fecaca;
}

JavaScript Code

const bookTableBody = document.getElementById('bookTableBody');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const statusFilter = document.getElementById('statusFilter');
const bookModal = document.getElementById('bookModal');
const newBookButton = document.getElementById('newBookButton');
const closeModalButton = document.getElementById('closeModal');
const cancelModalButton = document.getElementById('cancelModal');
const bookForm = document.getElementById('bookForm');
const modalTitle = document.getElementById('modalTitle');
const themeToggle = document.getElementById('themeToggle');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const signupName = document.getElementById('signupName');
const signupPosition = document.getElementById('signupPosition');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');
const signupConfirm = document.getElementById('signupConfirm');
const forgotEmail = document.getElementById('forgotEmail');
const forgotPassword = document.getElementById('forgotPassword');
const forgotConfirm = document.getElementById('forgotConfirm');
const rememberMe = document.getElementById('rememberMe');
const signupRole = document.getElementById('signupRole');
const logoutButton = document.getElementById('logoutButton');
const currentUserName = document.getElementById('currentUserName');
const pendingRequests = document.getElementById('pendingRequests');
const pendingRequestsLabel = document.getElementById('pendingRequestsLabel');
const manageRequestsButton = document.getElementById('manageRequestsButton');
const sellBookButton = document.getElementById('sellBookButton');
const requestPanel = document.getElementById('requestPanel');
const transactionPanel = document.getElementById('transactionPanel');
const requestTableBody = document.getElementById('requestTableBody');
const transactionTableBody = document.getElementById('transactionTableBody');
const requestModal = document.getElementById('requestModal');
const requestForm = document.getElementById('requestForm');
const requestModalTitle = document.getElementById('requestModalTitle');
const requestBookTitle = document.getElementById('requestBookTitle');
const requestBookAuthor = document.getElementById('requestBookAuthor');
const requestBookGenre = document.getElementById('requestBookGenre');
const requestBookYear = document.getElementById('requestBookYear');
const requestBookISBN = document.getElementById('requestBookISBN');
const requestBookQuantity = document.getElementById('requestBookQuantity');
const closeRequestModalButton = document.getElementById('closeRequestModal');
const cancelRequestModalButton = document.getElementById('cancelRequestModal');
const authShell = document.getElementById('authShell');
const libraryShell = document.getElementById('libraryShell');
const loginPage = document.getElementById('loginPage');
const signupPage = document.getElementById('signupPage');
const forgotPage = document.getElementById('forgotPage');
const authMessage = document.getElementById('authMessage');
const loginButton = document.getElementById('loginButton');
const signupButton = document.getElementById('signupButton');
const resetButton = document.getElementById('resetButton');
const gotoSignup = document.getElementById('gotoSignup');
const gotoForgot = document.getElementById('gotoForgot');
const gotoLogin = document.getElementById('gotoLogin');
const gotoLoginFromForgot = document.getElementById('gotoLoginFromForgot');
const openProfileButton = document.getElementById('openProfile');
const profileModal = document.getElementById('profileModal');
const closeProfileModalButton = document.getElementById('closeProfileModal');
const profileName = document.getElementById('profileName');
const profilePosition = document.getElementById('profilePosition');
const profileEmail = document.getElementById('profileEmail');
const avatarPreview = document.getElementById('avatarPreview');
const profileTabBtn = document.getElementById('profileTabBtn');
const passwordTabBtn = document.getElementById('passwordTabBtn');
const settingsTabBtn = document.getElementById('settingsTabBtn');
const profileTabContent = document.getElementById('profileTabContent');
const passwordTabContent = document.getElementById('passwordTabContent');
const settingsTabContent = document.getElementById('settingsTabContent');
const editName = document.getElementById('editName');
const editPosition = document.getElementById('editPosition');
const editAvatar = document.getElementById('editAvatar');
const saveProfileButton = document.getElementById('saveProfileButton');
const currentPassword = document.getElementById('currentPassword');
const newPassword = document.getElementById('newPassword');
const confirmNewPassword = document.getElementById('confirmNewPassword');
const changePasswordButton = document.getElementById('changePasswordButton');
const emailNotifications = document.getElementById('emailNotifications');
const defaultDarkMode = document.getElementById('defaultDarkMode');
const saveSettingsButton = document.getElementById('saveSettingsButton');

const totalBooks = document.getElementById('totalBooks');
const availableBooks = document.getElementById('availableBooks');
const borrowedBooks = document.getElementById('borrowedBooks');
const genreCount = document.getElementById('genreCount');

let books = [];
let requests = [];
let editBookId = null;
let currentUser = null;

function loadBooks() {
    const stored = localStorage.getItem('libraryBooks');
    books = stored ? JSON.parse(stored) : [];
}

function saveBooks() {
    localStorage.setItem('libraryBooks', JSON.stringify(books));
}

function loadRequests() {
    const stored = localStorage.getItem('libraryRequests');
    requests = stored ? JSON.parse(stored) : [];
}

function saveRequests() {
    localStorage.setItem('libraryRequests', JSON.stringify(requests));
}

function getUsers() {
    return JSON.parse(localStorage.getItem('libraryUsers') || '[]');
}

function saveUsers(users) {
    localStorage.setItem('libraryUsers', JSON.stringify(users));
}

function seedDefaultAdmin() {
    const users = getUsers();
    const hasAdmin = users.some(user => user.role === 'admin');
    if (!hasAdmin) {
        users.push({
            name: 'Admin User',
            position: 'Administrator',
            email: 'admin@library.com',
            password: 'admin123',
            role: 'admin',
            profilePicture: '',
            settings: { emailNotifications: true, defaultDarkMode: false }
        });
        saveUsers(users);
    }
}

function setAuthMessage(message, type = 'success') {
    authMessage.textContent = message;
    authMessage.style.color = type === 'error' ? '#b91c1c' : '#047857';
}

function showAuthSection(section) {
    loginPage.classList.toggle('active', section === 'login');
    signupPage.classList.toggle('active', section === 'signup');
    forgotPage.classList.toggle('active', section === 'forgot');
    setAuthMessage('');
}

function showLibrary() {
    authShell.style.display = 'none';
    libraryShell.style.display = 'block';
    logoutButton.style.display = 'inline-flex';
    if (currentUser) {
        currentUserName.textContent = `Hi, ${currentUser.name}`;
    }
    configureRoleAccess();
}

function showAuth() {
    authShell.style.display = 'grid';
    libraryShell.style.display = 'none';
    logoutButton.style.display = 'none';
    currentUserName.textContent = 'Guest';
}

function configureRoleAccess() {
    const isAdmin = currentUser?.role === 'admin';
    const isMember = currentUser && !isAdmin;

    newBookButton.classList.toggle('hidden', !isAdmin);
    manageRequestsButton.classList.toggle('hidden', !isAdmin);
    sellBookButton.classList.toggle('hidden', !isMember);
    requestPanel.classList.toggle('hidden', !isAdmin);
    transactionPanel.classList.remove('hidden');
    pendingRequestsLabel.textContent = isAdmin ? 'Pending Requests' : 'My Transactions';
    updateSummary();
    renderRequests();
    renderTable();
}

function setCurrentUser(user) {
    currentUser = user;
    localStorage.setItem('currentLibraryUser', JSON.stringify(user));
    updateTopbarUser();
    loadUserSettings(user);
    showLibrary();
}

function clearCurrentUser() {
    localStorage.removeItem('currentLibraryUser');
    currentUser = null;
}

function checkAuthState() {
    seedDefaultAdmin();
    loadRequests();

    const storedUser = localStorage.getItem('currentLibraryUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        updateTopbarUser();
        loadUserSettings(currentUser);
        showLibrary();
    } else {
        const remembered = localStorage.getItem('rememberedLibraryEmail');
        if (remembered) {
            loginEmail.value = remembered;
            rememberMe.checked = true;
        }
        showAuth();
        showAuthSection('login');
    }
}

function handleLogin(event) {
    event?.preventDefault();
    const email = loginEmail.value.trim().toLowerCase();
    const password = loginPassword.value;

    if (!email || !password) {
        setAuthMessage('Please complete both fields.', 'error');
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        setAuthMessage('Invalid email or password.', 'error');
        return;
    }

    if (rememberMe.checked) {
        localStorage.setItem('rememberedLibraryEmail', email);
    } else {
        localStorage.removeItem('rememberedLibraryEmail');
    }

    setCurrentUser({
        name: user.name,
        email: user.email,
        position: user.position || '',
        role: user.role || 'student',
        profilePicture: user.profilePicture || '',
        settings: user.settings || {}
    });
    loginEmail.value = '';
    loginPassword.value = '';
    rememberMe.checked = false;
    renderTable();
    updateSummary();
}

function handleSignup(event) {
    event?.preventDefault();
    const name = signupName.value.trim();
    const role = signupRole.value;
    const position = signupPosition.value.trim();
    const email = signupEmail.value.trim().toLowerCase();
    const password = signupPassword.value;
    const confirmPassword = signupConfirm.value;

    if (!name || !role || !position || !email || !password || !confirmPassword) {
        setAuthMessage('Fill in every field to continue.', 'error');
        return;
    }

    if (password.length < 6) {
        setAuthMessage('Password must be at least 6 characters.', 'error');
        return;
    }

    if (password !== confirmPassword) {
        setAuthMessage('Passwords do not match.', 'error');
        return;
    }

    const users = getUsers();
    if (users.some(user => user.email === email)) {
        setAuthMessage('This email is already registered.', 'error');
        return;
    }

    users.push({
        name,
        role,
        position,
        email,
        password,
        profilePicture: '',
        settings: { emailNotifications: false, defaultDarkMode: false }
    });
    saveUsers(users);
    signupName.value = '';
    signupRole.value = 'student';
    signupEmail.value = '';
    signupPassword.value = '';
    signupConfirm.value = '';
    signupPosition.value = '';
    setAuthMessage('Account created successfully! Please log in.');
    showAuthSection('login');
}

function applySettings(settings) {
    if (settings?.defaultDarkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙 Dark Mode';
    }

    emailNotifications.checked = !!settings?.emailNotifications;
    defaultDarkMode.checked = !!settings?.defaultDarkMode;
}

function loadUserSettings(user) {
    if (user?.settings) {
        applySettings(user.settings);
    }
}

function updateTopbarUser() {
    if (!currentUser) return;
    currentUserName.textContent = `Hi, ${currentUser.name}`;
}

function showProfileModal() {
    if (!currentUser) return;
    profileModal.classList.add('active');
    showProfileTab('profile');
    populateProfileModal();
}

function closeProfileModal() {
    profileModal.classList.remove('active');
}

function showProfileTab(tabName) {
    const tabs = [profileTabContent, passwordTabContent, settingsTabContent];
    tabName === 'profile' ? profileTabBtn.classList.add('active') : profileTabBtn.classList.remove('active');
    tabName === 'password' ? passwordTabBtn.classList.add('active') : passwordTabBtn.classList.remove('active');
    tabName === 'settings' ? settingsTabBtn.classList.add('active') : settingsTabBtn.classList.remove('active');
    profileTabContent.classList.toggle('active', tabName === 'profile');
    passwordTabContent.classList.toggle('active', tabName === 'password');
    settingsTabContent.classList.toggle('active', tabName === 'settings');
}

function populateProfileModal() {
    const storedUser = getUsers().find(u => u.email === currentUser.email);
    if (!storedUser) return;
    profileName.textContent = storedUser.name;
    profilePosition.textContent = storedUser.position || 'Position not set';
    profileRole.textContent = `Role: ${getRoleLabel(storedUser.role)}`;
    profileEmail.textContent = storedUser.email;
    avatarPreview.textContent = storedUser.profilePicture ? '' : storedUser.name.charAt(0).toUpperCase();
    avatarPreview.style.backgroundImage = storedUser.profilePicture ? `url('${storedUser.profilePicture}')` : 'none';
    editName.value = storedUser.name;
    editPosition.value = storedUser.position || '';
    emailNotifications.checked = !!storedUser.settings?.emailNotifications;
    defaultDarkMode.checked = !!storedUser.settings?.defaultDarkMode;
}

function saveProfile() {
    const users = getUsers();
    const user = users.find(u => u.email === currentUser.email);
    if (!user) return;

    user.name = editName.value.trim() || user.name;
    user.position = editPosition.value.trim() || user.position;
    if (user.profilePicture && avatarPreview.style.backgroundImage) {
        // keep existing picture if already set
    }
    if (profileImageDataUrl) {
        user.profilePicture = profileImageDataUrl;
        avatarPreview.style.backgroundImage = `url('${profileImageDataUrl}')`;
    }

    user.settings = {
        emailNotifications: emailNotifications.checked,
        defaultDarkMode: defaultDarkMode.checked
    };
    saveUsers(users);
    currentUser.name = user.name;
    currentUser.position = user.position;
    setCurrentUser(currentUser);
    updateTopbarUser();
    populateProfileModal();
    setAuthMessage('Profile updated successfully.');
}

let profileImageDataUrl = '';

function handleAvatarChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        profileImageDataUrl = e.target.result;
        avatarPreview.style.backgroundImage = `url('${profileImageDataUrl}')`;
        avatarPreview.textContent = '';
    };
    reader.readAsDataURL(file);
}

function handleChangePassword() {
    const currentPass = currentPassword.value;
    const nextPass = newPassword.value;
    const confirmPass = confirmNewPassword.value;
    if (!currentPass || !nextPass || !confirmPass) {
        setAuthMessage('Please complete all password fields.', 'error');
        return;
    }
    const users = getUsers();
    const user = users.find(u => u.email === currentUser.email);
    if (!user || user.password !== currentPass) {
        setAuthMessage('Current password is incorrect.', 'error');
        return;
    }
    if (nextPass.length < 6) {
        setAuthMessage('New password must be at least 6 characters.', 'error');
        return;
    }
    if (nextPass !== confirmPass) {
        setAuthMessage('Passwords do not match.', 'error');
        return;
    }
    user.password = nextPass;
    saveUsers(users);
    currentPassword.value = '';
    newPassword.value = '';
    confirmNewPassword.value = '';
    setAuthMessage('Password updated successfully.');
}

function handleSaveSettings() {
    const users = getUsers();
    const user = users.find(u => u.email === currentUser.email);
    if (!user) return;
    user.settings = {
        emailNotifications: emailNotifications.checked,
        defaultDarkMode: defaultDarkMode.checked
    };
    saveUsers(users);
    applySettings(user.settings);
    setAuthMessage('Settings saved successfully.');
}

function handleLogout() {
    clearCurrentUser();
    showAuth();
    showAuthSection('login');
}

function handleForgotPassword(event) {
    event?.preventDefault();
    const email = forgotEmail.value.trim().toLowerCase();
    const newPassword = forgotPassword.value;
    const confirmPassword = forgotConfirm.value;

    if (!email || !newPassword || !confirmPassword) {
        setAuthMessage('Please complete all reset fields.', 'error');
        return;
    }

    if (newPassword.length < 6) {
        setAuthMessage('Password must be at least 6 characters.', 'error');
        return;
    }

    if (newPassword !== confirmPassword) {
        setAuthMessage('Passwords do not match.', 'error');
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
        setAuthMessage('No account found with that email.', 'error');
        return;
    }

    user.password = newPassword;
    saveUsers(users);
    forgotEmail.value = '';
    forgotPassword.value = '';
    forgotConfirm.value = '';

    setAuthMessage('Password reset successfully. Please login with your new password.');
    showAuthSection('login');
}

function openModal(editMode = false) {
    bookModal.classList.add('active');
    if (editMode) {
        modalTitle.textContent = 'Edit Book';
    } else {
        modalTitle.textContent = 'Add New Book';
        bookForm.reset();
        document.getElementById('bookStatus').value = 'available';
        editBookId = null;
    }
    document.getElementById('bookTitle').focus();
}

function closeModal() {
    bookModal.classList.remove('active');
}

function updateSummary() {
    totalBooks.textContent = books.length;
    availableBooks.textContent = books.filter(book => book.status === 'available').length;
    borrowedBooks.textContent = books.filter(book => book.status === 'borrowed').length;
    genreCount.textContent = new Set(books.map(book => book.genre)).size;
    if (currentUser) {
        const count = currentUser.role === 'admin'
            ? requests.filter(request => request.status === 'pending').length
            : requests.filter(request => request.userEmail === currentUser.email).length;
        pendingRequests.textContent = count;
    } else {
        pendingRequests.textContent = '0';
    }
}

function getRoleLabel(role) {
    if (role === 'admin') return 'Administrator';
    if (role === 'teacher') return 'Teacher';
    return 'Student';
}

function formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString();
}

function renderRequests() {
    if (currentUser?.role !== 'admin') return;
    const pending = requests.filter(request => request.status === 'pending');
    requestTableBody.innerHTML = '';
    if (pending.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="7" class="empty-row">No pending requests to review.</td>';
        requestTableBody.appendChild(row);
        return;
    }

    pending.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${request.type === 'buy' ? 'Buy Request' : 'Sell Request'}</td>
            <td>${request.userName}</td>
            <td>${getRoleLabel(request.role)}</td>
            <td>${request.bookTitle}</td>
            <td>${request.quantity}</td>
            <td>${request.status.charAt(0).toUpperCase() + request.status.slice(1)}</td>
            <td class="action-bar"></td>
        `;

        const approveBtn = document.createElement('button');
        approveBtn.className = 'action-btn';
        approveBtn.textContent = 'Approve';
        approveBtn.addEventListener('click', () => processRequest(request.id, 'approve'));

        const rejectBtn = document.createElement('button');
        rejectBtn.className = 'action-btn';
        rejectBtn.textContent = 'Reject';
        rejectBtn.addEventListener('click', () => processRequest(request.id, 'reject'));

        row.children[6].append(approveBtn, rejectBtn);
        requestTableBody.appendChild(row);
    });
}

function getTransactionLabel(request) {
    if (request.type === 'buy') return 'Buy Request';
    if (request.type === 'sell') return 'Sell Request';
    if (request.type === 'addition') return 'Book Added';
    return 'Transaction';
}

function editTransaction(recordId) {
    const record = requests.find(entry => entry.id === recordId);
    if (!record) return;

    const title = prompt('Edit book title:', record.bookTitle);
    if (title === null) return;
    const quantityInput = prompt('Edit quantity:', record.quantity);
    if (quantityInput === null) return;
    const quantity = Number(quantityInput);
    if (!title.trim() || !Number.isFinite(quantity) || quantity <= 0) {
        setAuthMessage('Transaction update failed. Use valid title and quantity.', 'error');
        return;
    }

    record.bookTitle = title.trim();
    record.quantity = quantity;
    if (record.type === 'sell') {
        record.bookAuthor = record.bookAuthor || record.bookAuthor;
    }
    saveRequests();
    renderTransactions();
    setAuthMessage('Transaction history entry updated successfully.');
}

function deleteTransaction(recordId) {
    if (!confirm('Remove this transaction history entry?')) return;
    requests = requests.filter(entry => entry.id !== recordId);
    saveRequests();
    renderTransactions();
    updateSummary();
    setAuthMessage('Transaction history entry deleted.');
}

function renderTransactions() {
    if (!currentUser) return;
    const userTransactions = requests
        .filter(request => request.userEmail === currentUser.email)
        .sort((a, b) => b.createdAt - a.createdAt);

    transactionTableBody.innerHTML = '';
    if (userTransactions.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="6" class="empty-row">No transaction history yet.</td>';
        transactionTableBody.appendChild(row);
        return;
    }

    userTransactions.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatTimestamp(request.createdAt)}</td>
            <td>${getTransactionLabel(request)}</td>
            <td>${request.bookTitle}</td>
            <td>${request.quantity}</td>
            <td>${request.status.charAt(0).toUpperCase() + request.status.slice(1)}</td>
            <td class="action-bar"></td>
        `;

        const editBtn = document.createElement('button');
        editBtn.className = 'action-btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => editTransaction(request.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'action-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTransaction(request.id));

        row.children[5].append(editBtn, deleteBtn);
        transactionTableBody.appendChild(row);
    });
}

function processRequest(requestId, action) {
    const request = requests.find(entry => entry.id === requestId);
    if (!request) return;

    if (action === 'approve') {
        if (request.type === 'buy') {
            const book = books.find(item => item.id === request.bookId);
            if (!book || book.quantity < request.quantity) {
                request.status = 'rejected';
                request.reason = 'Book not available';
            } else {
                book.quantity -= request.quantity;
                if (book.quantity === 0) {
                    book.status = 'borrowed';
                }
                request.status = 'approved';
            }
        } else if (request.type === 'sell') {
            books.push({
                id: Date.now().toString(),
                title: request.bookTitle,
                author: request.bookAuthor,
                genre: request.bookGenre,
                year: request.bookYear,
                isbn: request.bookISBN,
                quantity: request.quantity,
                status: 'available'
            });
            request.status = 'approved';
        }
    } else {
        request.status = 'rejected';
    }

    request.processedAt = Date.now();
    saveRequests();
    saveBooks();
    renderTable();
    renderRequests();
    renderTransactions();
    updateSummary();
}

function hasPendingBuyRequest(bookId) {
    return requests.some(request =>
        request.type === 'buy' &&
        request.bookId === bookId &&
        request.userEmail === currentUser.email &&
        request.status === 'pending'
    );
}

function handleBuyRequest(bookId) {
    if (!currentUser) return;
    const book = books.find(item => item.id === bookId);
    if (!book || book.quantity < 1) {
        setAuthMessage('This book is not currently available.', 'error');
        return;
    }

    if (hasPendingBuyRequest(bookId)) {
        setAuthMessage('You already have a pending request for this book.', 'error');
        return;
    }

    requests.push({
        id: Date.now().toString(),
        type: 'buy',
        userName: currentUser.name,
        role: currentUser.role,
        userEmail: currentUser.email,
        bookId: book.id,
        bookTitle: book.title,
        quantity: 1,
        status: 'pending',
        createdAt: Date.now()
    });
    saveRequests();
    renderRequests();
    renderTransactions();
    updateSummary();
    setAuthMessage('Buy request submitted. Admin will review it shortly.');
}

function openRequestModal() {
    requestModal.classList.add('active');
    requestForm.reset();
    requestModalTitle.textContent = 'Request to Sell a Book';
    requestBookGenre.value = 'Fiction';
}

function closeRequestModal() {
    requestModal.classList.remove('active');
}

function handleSellRequest(event) {
    event.preventDefault();
    if (!currentUser) return;
    const title = requestBookTitle.value.trim();
    const author = requestBookAuthor.value.trim();
    const genre = requestBookGenre.value;
    const year = Number(requestBookYear.value);
    const isbn = requestBookISBN.value.trim();
    const quantity = Number(requestBookQuantity.value);

    if (!title || !author || !genre || !year || !isbn || !quantity) {
        setAuthMessage('Please complete every field to submit your sell request.', 'error');
        return;
    }

    requests.push({
        id: Date.now().toString(),
        type: 'sell',
        userName: currentUser.name,
        role: currentUser.role,
        userEmail: currentUser.email,
        bookTitle: title,
        bookAuthor: author,
        bookGenre: genre,
        bookYear: year,
        bookISBN: isbn,
        quantity,
        status: 'pending',
        createdAt: Date.now()
    });
    saveRequests();
    closeRequestModal();
    renderRequests();
    renderTransactions();
    updateSummary();
    setAuthMessage('Sell request submitted. Admin will review and approve the listing.');
}

function createStatusBadge(status) {
    const span = document.createElement('span');
    span.className = `status-pill status-${status}`;
    span.textContent = status === 'available' ? 'Available' : 'Borrowed';
    return span;
}

function renderTable() {
    const query = searchInput.value.trim().toLowerCase();
    const genreValue = genreFilter.value;
    const statusValue = statusFilter.value;

    const filteredBooks = books.filter(book => {
        const matchesSearch = [book.title, book.author, book.isbn].some(field => field.toLowerCase().includes(query));
        const matchesGenre = genreValue === 'all' || book.genre === genreValue;
        const matchesStatus = statusValue === 'all' || book.status === statusValue;
        return matchesSearch && matchesGenre && matchesStatus;
    });

    bookTableBody.innerHTML = '';

    if (filteredBooks.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="8" class="empty-row">No books match the current filter or search.</td>';
        bookTableBody.appendChild(row);
        return;
    }

    filteredBooks.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.year}</td>
            <td>${book.isbn}</td>
            <td>${book.quantity}</td>
            <td></td>
            <td class="action-bar"></td>
        `;

        row.children[6].appendChild(createStatusBadge(book.status));

        const actionCell = row.children[7];
        if (currentUser?.role === 'admin') {
            const editButton = document.createElement('button');
            editButton.className = 'action-btn';
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => fillFormForEdit(book.id));

            const deleteButton = document.createElement('button');
            deleteButton.className = 'action-btn';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => removeBook(book.id));

            actionCell.append(editButton, deleteButton);
        } else {
            if (book.status === 'available') {
                const buyButton = document.createElement('button');
                buyButton.className = 'action-btn';
                buyButton.textContent = hasPendingBuyRequest(book.id) ? 'Pending Request' : 'Request Buy';
                buyButton.disabled = hasPendingBuyRequest(book.id);
                buyButton.addEventListener('click', () => handleBuyRequest(book.id));
                actionCell.append(buyButton);
            } else {
                actionCell.textContent = 'Not available';
            }
        }
        bookTableBody.appendChild(row);
    });
}

function fillFormForEdit(bookId) {
    const book = books.find(item => item.id === bookId);
    if (!book) return;

    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthor').value = book.author;
    document.getElementById('bookGenre').value = book.genre;
    document.getElementById('bookYear').value = book.year;
    document.getElementById('bookISBN').value = book.isbn;
    document.getElementById('bookQuantity').value = book.quantity;
    document.getElementById('bookStatus').value = book.status;
    editBookId = bookId;
    openModal(true);
}

function removeBook(bookId) {
    const book = books.find(item => item.id === bookId);
    if (!book) return;

    if (confirm(`Remove “${book.title}” from the library?`)) {
        books = books.filter(item => item.id !== bookId);
        saveBooks();
        renderTable();
        updateSummary();
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const genre = document.getElementById('bookGenre').value;
    const year = Number(document.getElementById('bookYear').value);
    const isbn = document.getElementById('bookISBN').value.trim();
    const quantity = Number(document.getElementById('bookQuantity').value);
    const status = document.getElementById('bookStatus').value;

    if (!title || !author || !isbn || !year || !quantity) {
        return;
    }

    if (editBookId) {
        const current = books.find(book => book.id === editBookId);
        if (current) {
            current.title = title;
            current.author = author;
            current.genre = genre;
            current.year = year;
            current.isbn = isbn;
            current.quantity = quantity;
            current.status = status;
        }
    } else {
        books.push({
            id: Date.now().toString(),
            title,
            author,
            genre,
            year,
            isbn,
            quantity,
            status
        });
        if (currentUser) {
            requests.push({
                id: Date.now().toString() + '-addition',
                type: 'addition',
                userName: currentUser.name,
                role: currentUser.role,
                userEmail: currentUser.email,
                bookTitle: title,
                quantity,
                status: 'approved',
                createdAt: Date.now()
            });
            saveRequests();
        }
    }

    saveBooks();
    renderTable();
    updateSummary();
    closeModal();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}

newBookButton.addEventListener('click', () => openModal(false));
closeModalButton.addEventListener('click', closeModal);
cancelModalButton.addEventListener('click', closeModal);
bookForm.addEventListener('submit', handleFormSubmit);
searchInput.addEventListener('input', renderTable);
genreFilter.addEventListener('change', renderTable);
statusFilter.addEventListener('change', renderTable);
bookModal.addEventListener('click', event => {
    if (event.target === bookModal) {
        closeModal();
    }
});
themeToggle.addEventListener('click', toggleTheme);
gotoSignup.addEventListener('click', () => showAuthSection('signup'));
gotoForgot.addEventListener('click', () => showAuthSection('forgot'));
gotoLogin.addEventListener('click', () => showAuthSection('login'));
gotoLoginFromForgot.addEventListener('click', () => showAuthSection('login'));
openProfileButton.addEventListener('click', showProfileModal);
closeProfileModalButton.addEventListener('click', closeProfileModal);
profileModal.addEventListener('click', event => {
    if (event.target === profileModal) {
        closeProfileModal();
    }
});
profileTabBtn.addEventListener('click', () => showProfileTab('profile'));
passwordTabBtn.addEventListener('click', () => showProfileTab('password'));
settingsTabBtn.addEventListener('click', () => showProfileTab('settings'));
editAvatar.addEventListener('change', handleAvatarChange);
saveProfileButton.addEventListener('click', saveProfile);
changePasswordButton.addEventListener('click', handleChangePassword);
saveSettingsButton.addEventListener('click', handleSaveSettings);
loginButton.addEventListener('click', handleLogin);
signupButton.addEventListener('click', handleSignup);
resetButton.addEventListener('click', handleForgotPassword);
logoutButton.addEventListener('click', handleLogout);
manageRequestsButton.addEventListener('click', () => requestPanel.scrollIntoView({ behavior: 'smooth' }));
sellBookButton.addEventListener('click', openRequestModal);
closeRequestModalButton.addEventListener('click', closeRequestModal);
cancelRequestModalButton.addEventListener('click', closeRequestModal);
requestForm.addEventListener('submit', handleSellRequest);
requestModal.addEventListener('click', event => {
    if (event.target === requestModal) {
        closeRequestModal();
    }
});

loadBooks();
loadRequests();
checkAuthState();
renderTable();
updateSummary();

you also accesss this code easily 
