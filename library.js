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
