// Check if user has been authenticated or has skipped login
if (!sessionStorage.getItem('userAuthenticated') && window.location.pathname.endsWith('index.html')) {
    window.location.href = 'welcome.html';
}

// Mobile menu toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('show');
});

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

// Login/Register modals
document.getElementById('loginBtn').addEventListener('click', function() {
    openModal('loginModal');
});

document.getElementById('registerBtn').addEventListener('click', function() {
    openModal('registerModal');
});

// Scroll to section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Package data
const packages = {
    'mtn': [
        {name: '1GB', price: 4.50},
        {name: '2GB', price: 9.00},
        {name: '3GB', price: 13.00},
        {name: '4GB', price: 17.80},
        {name: '5GB', price: 23.00},
        {name: '6GB', price: 26.50},
        {name: '8GB', price: 35.00},
        {name: '10GB', price: 40.00},
        {name: '12GB', price: 47.00},
        {name: '15GB', price: 60.00},
        {name: '20GB', price: 80.00},
        {name: '25GB', price: 98.00},
        {name: '30GB', price: 120.00},
        {name: '40GB', price: 162.00},
        {name: '50GB', price: 188.00},
        {name: '100GB', price: 370.00}
    ],
    'airteltigo-ishare': [
        {name: '1GB', price: 4.00},
        {name: '2GB', price: 8.00},
        {name: '3GB', price: 11.80},
        {name: '4GB', price: 15.60},
        {name: '5GB', price: 18.40},
        {name: '6GB', price: 22.80},
        {name: '8GB', price: 30.30},
        {name: '10GB', price: 38.00},
        {name: '15GB', price: 56.00},
        {name: '20GB', price: 73.00},
        {name: '25GB', price: 91.00},
        {name: '30GB', price: 110.00}
    ],
    'airteltigo-bigtime': [
        {name: '25GB', price: 60.00},
        {name: '30GB', price: 70.00},
        {name: '40GB', price: 85.00},
        {name: '50GB', price: 95.00},
        {name: '60GB', price: 105.00},
        {name: '70GB', price: 122.00},
        {name: '80GB', price: 138.00},
        {name: '100GB', price: 170.00},
        {name: '200GB', price: 342.00}
    ],
    'telecel': [
        {name: '5GB', price: 22.00},
        {name: '10GB', price: 38.00},
        {name: '15GB', price: 56.00},
        {name: '20GB', price: 75.00},
        {name: '25GB', price: 92.00},
        {name: '30GB', price: 110.00},
        {name: '40GB', price: 143.00},
        {name: '50GB', price: 185.00},
        {name: '100GB', price: 358.00}
    ],
    'afa': [
        {name: 'AFA Registration', price: 2.70}
    ],
    'waec': [
        {name: 'WAEC Checker (BECE)', price: 19.00},
        {name: 'WAEC Checker (WASSCE)', price: 19.00}
    ]
};

// Network selection change
document.getElementById('network').addEventListener('change', function() {
    const packagesContainer = document.getElementById('packageOptions');
    packagesContainer.innerHTML = '';
    const selectedPackages = packages[this.value] || [];
    if (selectedPackages.length > 0) {
        packagesContainer.classList.add('show');
        selectedPackages.forEach(pkg => {
            const option = document.createElement('div');
            option.className = 'package-option';
            option.innerHTML = `
                <div class="package-name">${pkg.name}</div>
                <div class="package-price">GHS ${pkg.price.toFixed(2)}</div>
            `;
            option.addEventListener('click', function() {
                document.querySelectorAll('.package-option').forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
            packagesContainer.appendChild(option);
        });
    } else {
        packagesContainer.classList.remove('show');
    }
});

// Purchase form
document.getElementById('purchaseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const network = document.getElementById('network').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const selectedPackage = document.querySelector('.package-option.active');

    if (!network) return alert('Please select a network');
    if (!phone) return alert('Please enter a phone number');
    if (!selectedPackage) return alert('Please select a package');
    if (!email) return alert('Please enter your email address');

    const packageName = selectedPackage.querySelector('.package-name').textContent;
    const packagePrice = selectedPackage.querySelector('.package-price').textContent;

    alert(`Order placed successfully!\n\nNetwork: ${network}\nPackage: ${packageName}\nPrice: ${packagePrice}\nPhone: ${phone}`);
    this.reset();
    document.getElementById('packageOptions').classList.remove('show');
    document.querySelectorAll('.package-option').forEach(opt => opt.classList.remove('active'));
});

// Bulk upload
document.getElementById('bulkUploadArea').addEventListener('click', function() {
    document.getElementById('bulkFileInput').click();
});

document.getElementById('bulkFileInput').addEventListener('change', function(e) {
    if (this.files.length > 0) {
        const fileName = this.files[0].name;
        document.querySelector('#bulkUploadArea h3').textContent = 'File Uploaded';
        document.querySelector('#bulkUploadArea p').textContent = fileName;
        setTimeout(() => {
            document.getElementById('bulkResults').style.display = 'block';
            document.getElementById('orderSummary').innerHTML = `
                <p>File processed successfully!</p>
                <p>Total orders: 5</p>
                <p>Total amount: GHS 150.00</p>
            `;
        }, 1500);
    }
});

const bulkUploadArea = document.getElementById('bulkUploadArea');
bulkUploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.style.borderColor = 'var(--primary)';
    this.style.backgroundColor = 'var(--light)';
});

bulkUploadArea.addEventListener('dragleave', function() {
    this.style.borderColor = 'var(--gray)';
    this.style.backgroundColor = 'transparent';
});

bulkUploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    this.style.borderColor = 'var(--gray)';
    this.style.backgroundColor = 'transparent';
    if (e.dataTransfer.files.length > 0) {
        document.getElementById('bulkFileInput').files = e.dataTransfer.files;
        const event = new Event('change');
        document.getElementById('bulkFileInput').dispatchEvent(event);
    }
});

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyB1U-YSC_b1O98OKhwUiQYodj0p9rdUvkw",
    authDomain: "gg-service-17abb.firebaseapp.com",
    projectId: "gg-service-17abb",
    storageBucket: "gg-service-17abb.firebasestorage.app",
    messagingSenderId: "772450209296",
    appId: "1:772450209296:web:4b99f2543e57d8db0f8495"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Register with Firebase + Save Name
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }
    
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Save user profile in Firestore
        await db.collection("users").doc(user.uid).set({
            name,
            email,
            phone
        });

        alert(`✅ User registered: ${name}`);
        closeModal('registerModal');
        
        // Set session storage and redirect
        sessionStorage.setItem('userAuthenticated', 'true');
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('userName', name);
        
    } catch (error) {
        alert(`❌ Error: ${error.message}`);
    }
});

// Login with Firebase
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.querySelector('#loginForm input[type="email"]').value;
    const password = document.querySelector('#loginForm input[type="password"]').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        closeModal('loginModal');
        
        // Set session storage
        sessionStorage.setItem('userAuthenticated', 'true');
        sessionStorage.setItem('userEmail', email);
        
    } catch (error) {
        alert(`❌ Error: ${error.message}`);
    }
});

// Track login state & update navbar
auth.onAuthStateChanged(async user => {
    const navLinks = document.querySelector('nav ul'); 
    if (user) {
        // Fetch user profile
        const doc = await db.collection("users").doc(user.uid).get();
        const userName = doc.exists ? doc.data().name : user.email;

        navLinks.innerHTML = `
            <li><a href="#home">Home</a></li>
            <li><a href="#purchase">Buy Data</a></li>
            <li><a href="#bulk">Bulk Purchase</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#">Welcome, ${userName}</a></li>
            <li><a href="#" id="logoutBtn">Logout</a></li>
        `;
        
        document.getElementById('logoutBtn').addEventListener('click', async () => {
            await auth.signOut();
            sessionStorage.removeItem('userAuthenticated');
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('userName');
            window.location.reload();
        });
        
    } else {
        navLinks.innerHTML = `
            <li><a href="#home">Home</a></li>
            <li><a href="#purchase">Buy Data</a></li>
            <li><a href="#bulk">Bulk Purchase</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#" id="loginBtnNav">Login</a></li>
            <li><a href="#" id="registerBtnNav">Register</a></li>
        `;
        
        document.getElementById('loginBtnNav').addEventListener('click', function() {
            openModal('loginModal');
        });
        
        document.getElementById('registerBtnNav').addEventListener('click', function() {
            openModal('registerModal');
        });
    }
});