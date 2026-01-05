// FoodLink AI - Advanced Food Donation Platform
// Application State Management
class FoodLinkApp {
    constructor() {
        this.currentUser = null;
        this.currentView = 'landing';
        this.activityFeedTimer = null;
        this.chatbotOpen = false;
        this.donations = [];
        this.ngos = [];
        this.drivers = [];
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.startRealTimeUpdates();
        this.initCharts();
        this.showLandingPage();
    }

    loadSampleData() {
        // Sample donations data
        this.donations = [
            {
                id: 1,
                donor: "Green Leaf Restaurant",
                foodType: "Cooked Rice & Curry",
                quantity: "50 servings",
                expiry: "2025-10-14 18:00",
                location: "Sector 15, Gurgaon",
                status: "Available",
                image: "rice_curry.jpg",
                safetyScore: 94,
                shelfLife: "6 hours"
            },
            {
                id: 2,
                donor: "Fresh Mart Supermarket",
                foodType: "Fresh Vegetables",
                quantity: "25 kg",
                expiry: "2025-10-16 12:00",
                location: "MG Road, Bangalore",
                status: "Claimed",
                image: "vegetables.jpg",
                safetyScore: 96,
                shelfLife: "48 hours"
            },
            {
                id: 3,
                donor: "Sunrise Bakery",
                foodType: "Bread & Pastries",
                quantity: "30 items",
                expiry: "2025-10-14 20:00",
                location: "CP, New Delhi",
                status: "Available",
                image: "bread.jpg",
                safetyScore: 92,
                shelfLife: "8 hours"
            }
        ];

        // Sample NGOs data
        this.ngos = [
            {
                name: "Hope Foundation",
                location: "Gurgaon",
                capacity: "100 people/day",
                specialty: "Hot meals",
                verified: true,
                distance: "2.3 km",
                matchScore: 94
            },
            {
                name: "Care India NGO",
                location: "Bangalore",
                capacity: "200 people/day",
                specialty: "Food distribution",
                verified: true,
                distance: "4.1 km",
                matchScore: 78
            },
            {
                name: "Feeding Delhi",
                location: "New Delhi",
                capacity: "150 people/day",
                specialty: "Evening meals",
                verified: true,
                distance: "1.5 km",
                matchScore: 87
            }
        ];

        // Sample activities for real-time feed
        this.recentActivities = [
            {
                action: "New donation added",
                user: "Spice Garden Restaurant",
                details: "50 servings of Dal & Rice",
                time: "2 minutes ago",
                icon: "plus",
                type: "donation"
            },
            {
                action: "Donation claimed",
                user: "Hope Foundation",
                details: "Bread & Pastries from Sunrise Bakery",
                time: "5 minutes ago",
                icon: "check",
                type: "claimed"
            },
            {
                action: "Delivery completed",
                user: "Driver #47",
                details: "Vegetables delivered to Care India NGO",
                time: "12 minutes ago",
                icon: "truck",
                type: "completed"
            },
            {
                action: "New NGO registered",
                user: "Meals for All",
                details: "Verified NGO serving 80 people daily",
                time: "15 minutes ago",
                icon: "heart",
                type: "registration"
            },
            {
                action: "Route optimized",
                user: "AI System",
                details: "Reduced delivery time by 25 minutes",
                time: "18 minutes ago",
                icon: "route",
                type: "optimization"
            }
        ];

        // Chatbot responses
        this.chatResponses = {
            "how do i donate": "I'd be happy to help you donate food! Simply click 'Add Donation', take a photo of your food, and I'll help identify it and find nearby NGOs.",
            "is food safe": "Based on the photo analysis, your food appears fresh and safe for donation. The estimated shelf life is 8-12 hours. I've found 3 NGOs within 5km who can collect it today.",
            "find ngos": "I can help you find the best NGO matches! Based on your location and food type, I recommend Hope Foundation (94% match, 2.3km away) and Care India NGO (78% match, 4.1km away).",
            "track delivery": "Your delivery is currently in transit. Driver #47 is 15 minutes away from Hope Foundation. You'll receive a notification once delivery is completed.",
            "carbon footprint": "Great question! Your last donation saved approximately 12kg of CO2 emissions. Food waste contributes significantly to greenhouse gases, so every donation makes a real environmental impact.",
            "food safety": "Our AI analyzes food freshness, expiry dates, and safety indicators. We only recommend donations with 85%+ safety scores. Always ensure proper storage and avoid expired items."
        };
    }

    setupEventListeners() {
        // Navigation
        document.getElementById('loginBtn')?.addEventListener('click', () => this.showAuthModal());
        document.getElementById('getDonorStarted')?.addEventListener('click', () => this.showAuthModal('donor'));
        document.getElementById('getNGOStarted')?.addEventListener('click', () => this.showAuthModal('ngo'));
        document.getElementById('getDriverStarted')?.addEventListener('click', () => this.showAuthModal('driver'));

        // Auth modal
        document.getElementById('closeAuth')?.addEventListener('click', () => this.hideAuthModal());
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchAuthTab(e.target.dataset.tab));
        });

        // Forms
        document.getElementById('loginForm')?.addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('registerForm')?.addEventListener('submit', (e) => this.handleRegister(e));

        // Logout buttons
        document.getElementById('logoutBtn')?.addEventListener('click', () => this.logout());
        document.getElementById('ngoLogoutBtn')?.addEventListener('click', () => this.logout());
        document.getElementById('driverLogoutBtn')?.addEventListener('click', () => this.logout());

        // Donation form
        document.getElementById('photoUpload')?.addEventListener('click', () => {
            document.getElementById('foodPhoto')?.click();
        });
        document.getElementById('foodPhoto')?.addEventListener('change', (e) => this.handlePhotoUpload(e));
        document.getElementById('submitDonation')?.addEventListener('click', () => this.submitDonation());

        // NGO selection
        document.querySelectorAll('[data-ngo]').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectNGO(e.target.dataset.ngo));
        });

        // Donation management
        document.querySelectorAll('[data-donation]').forEach(btn => {
            if (btn.textContent.includes('Claim')) {
                btn.addEventListener('click', (e) => this.claimDonation(e.target.dataset.donation));
            }
        });

        // Chatbot
        document.getElementById('chatbotToggle')?.addEventListener('click', () => this.toggleChatbot());
        document.getElementById('sendMessage')?.addEventListener('click', () => this.sendChatMessage());
        document.getElementById('chatInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendChatMessage();
        });

        // Leaderboard
        document.getElementById('closeLeaderboard')?.addEventListener('click', () => this.hideLeaderboard());

        // Modal close on outside click
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        // Mobile navigation
        document.getElementById('navToggle')?.addEventListener('click', () => this.toggleMobileNav());
    }

    showLandingPage() {
        document.getElementById('landingPage').style.display = 'block';
        document.getElementById('donorDashboard').classList.add('hidden');
        document.getElementById('ngoDashboard').classList.add('hidden');
        document.getElementById('driverDashboard').classList.add('hidden');
        this.currentView = 'landing';
    }

    showAuthModal(defaultRole = null) {
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'flex';
            
            if (defaultRole) {
                document.getElementById('userRole').value = defaultRole;
                document.getElementById('registerRole').value = defaultRole;
            }
        }
    }

    hideAuthModal() {
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
        }
    }

    switchAuthTab(tab) {
        // Switch tab buttons
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

        // Switch tab content
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        document.getElementById(`${tab}Tab`).classList.add('active');

        // Update modal title
        const title = tab === 'login' ? 'Sign In to FoodLink' : 'Create FoodLink Account';
        document.getElementById('authTitle').textContent = title;
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const role = document.getElementById('userRole').value;

        if (!email || !role) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        // Simulate login process
        this.showToast('Logging in...', 'info');
        
        setTimeout(() => {
            this.currentUser = {
                email: email,
                role: role,
                name: this.generateNameFromEmail(email)
            };
            
            this.hideAuthModal();
            this.showDashboard(role);
            this.showToast(`Welcome back, ${this.currentUser.name}!`, 'success');
        }, 1500);
    }

    handleRegister(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const role = document.getElementById('registerRole').value;
        const password = document.getElementById('registerPassword').value;
        const enable2FA = document.getElementById('enable2FA').checked;

        if (!name || !email || !phone || !role || !password) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        // Simulate registration process
        this.showToast('Creating account...', 'info');
        
        setTimeout(() => {
            this.currentUser = {
                name: name,
                email: email,
                phone: phone,
                role: role,
                twoFactorEnabled: enable2FA
            };
            
            this.hideAuthModal();
            this.showDashboard(role);
            this.showToast(`Welcome to FoodLink, ${name}!`, 'success');
        }, 2000);
    }

    generateNameFromEmail(email) {
        const username = email.split('@')[0];
        return username.charAt(0).toUpperCase() + username.slice(1).replace(/[._]/g, ' ');
    }

    showDashboard(role) {
        // Hide landing page
        document.getElementById('landingPage').style.display = 'none';
        
        // Hide all dashboards
        document.getElementById('donorDashboard').classList.add('hidden');
        document.getElementById('ngoDashboard').classList.add('hidden');
        document.getElementById('driverDashboard').classList.add('hidden');

        // Show appropriate dashboard
        const dashboardId = `${role}Dashboard`;
        const dashboard = document.getElementById(dashboardId);
        if (dashboard) {
            dashboard.classList.remove('hidden');
            this.currentView = role;
            
            // Update user name in dashboard
            const nameElement = document.getElementById(`${role}Name`);
            if (nameElement) {
                nameElement.textContent = this.currentUser.name;
            }
        }

        // Update navigation
        document.getElementById('loginBtn').textContent = 'Dashboard';
        document.getElementById('loginBtn').onclick = () => this.showDashboard(role);
    }

    logout() {
        this.currentUser = null;
        this.currentView = 'landing';
        document.getElementById('loginBtn').textContent = 'Login';
        document.getElementById('loginBtn').onclick = () => this.showAuthModal();
        this.showLandingPage();
        this.showToast('Logged out successfully', 'info');
    }

    handlePhotoUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const preview = document.getElementById('photoPreview');
            const image = document.getElementById('previewImage');
            
            image.src = event.target.result;
            preview.classList.remove('hidden');
            
            // Simulate AI analysis
            this.simulateAIAnalysis(file.name);
        };
        reader.readAsDataURL(file);
    }

    simulateAIAnalysis(fileName) {
        this.showToast('Analyzing food with AI...', 'info');
        
        setTimeout(() => {
            // Simulate AI results
            const foodTypes = ['Rice & Curry', 'Fresh Vegetables', 'Bread & Pastries', 'Cooked Dal', 'Fresh Fruits', 'Sandwiches'];
            const randomFood = foodTypes[Math.floor(Math.random() * foodTypes.length)];
            const randomServings = Math.floor(Math.random() * 100) + 10;
            const randomShelfLife = Math.floor(Math.random() * 24) + 4;
            const randomSafety = Math.floor(Math.random() * 10) + 90;

            document.getElementById('detectedFood').textContent = randomFood;
            document.getElementById('estimatedQuantity').textContent = `${randomServings} servings`;
            document.getElementById('shelfLife').textContent = `${randomShelfLife} hours`;
            document.getElementById('safetyScore').textContent = `${randomSafety}% Safe`;
            
            // Update form fields
            document.getElementById('foodType').value = randomFood;
            document.getElementById('quantity').value = `${randomServings} servings`;
            
            this.showToast('AI analysis complete!', 'success');
        }, 2000);
    }

    submitDonation() {
        const foodType = document.getElementById('foodType').value;
        const quantity = document.getElementById('quantity').value;
        const location = document.getElementById('location').value || 'Current Location';
        const availableUntil = document.getElementById('availableUntil').value;

        if (!foodType || !quantity) {
            this.showToast('Please fill in food details', 'error');
            return;
        }

        this.showToast('Finding nearby NGOs...', 'info');
        
        setTimeout(() => {
            const newDonation = {
                id: this.donations.length + 1,
                donor: this.currentUser.name,
                foodType: foodType,
                quantity: quantity,
                location: location,
                availableUntil: availableUntil,
                status: 'Available',
                timestamp: new Date().toISOString()
            };
            
            this.donations.unshift(newDonation);
            this.showToast('Donation posted! 3 NGOs found nearby.', 'success');
            this.updateNGOList();
        }, 1500);
    }

    updateNGOList() {
        const ngoList = document.getElementById('nearbyNGOsList');
        if (!ngoList) return;

        ngoList.innerHTML = this.ngos.map(ngo => `
            <div class="ngo-item">
                <div class="ngo-info">
                    <div class="ngo-name">
                        <strong>${ngo.name}</strong>
                        ${ngo.verified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>' : ''}
                    </div>
                    <div class="ngo-details">
                        <span><i class="fas fa-map-marker-alt"></i> ${ngo.location} (${ngo.distance})</span>
                        <span><i class="fas fa-users"></i> ${ngo.capacity}</span>
                        <span><i class="fas fa-utensils"></i> ${ngo.specialty}</span>
                    </div>
                    <div class="ngo-match">Match Score: <span class="match-score ${ngo.matchScore >= 90 ? 'high' : ngo.matchScore >= 70 ? 'medium' : 'low'}">${ngo.matchScore}%</span></div>
                </div>
                <button class="btn ${ngo.matchScore >= 90 ? 'btn--primary' : 'btn--outline'} btn--sm" onclick="app.selectNGO('${ngo.name.toLowerCase().replace(/ /g, '-')}')">Select NGO</button>
            </div>
        `).join('');
    }

    selectNGO(ngoSlug) {
        const ngo = this.ngos.find(n => n.name.toLowerCase().replace(/ /g, '-') === ngoSlug);
        if (ngo) {
            this.showToast(`Selected ${ngo.name}! Driver will be assigned shortly.`, 'success');
            
            setTimeout(() => {
                this.showToast('Driver #47 assigned! ETA: 25 minutes', 'info');
            }, 2000);
        }
    }

    claimDonation(donationId) {
        const donation = this.donations.find(d => d.id == donationId);
        if (donation) {
            donation.status = 'Claimed';
            this.showToast(`Claimed donation: ${donation.foodType}`, 'success');
            this.updateAvailableDonations();
        }
    }

    updateAvailableDonations() {
        const donationsList = document.getElementById('availableDonationsList');
        if (!donationsList) return;

        const availableDonations = this.donations.filter(d => d.status === 'Available');
        
        donationsList.innerHTML = availableDonations.map(donation => `
            <div class="donation-card available">
                <div class="donation-image">
                    <i class="fas fa-${this.getFoodIcon(donation.foodType)}"></i>
                </div>
                <div class="donation-details">
                    <h4>${donation.foodType}</h4>
                    <p><strong>${donation.donor}</strong></p>
                    <div class="donation-meta">
                        <span><i class="fas fa-users"></i> ${donation.quantity}</span>
                        <span><i class="fas fa-clock"></i> ${this.getTimeRemaining(donation.expiry)} left</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${this.getRandomDistance()} away</span>
                    </div>
                    <div class="ai-insights">
                        <span class="insight-tag safety">Food Safety: ${donation.safetyScore || Math.floor(Math.random() * 10) + 90}%</span>
                        <span class="insight-tag match">Match: ${Math.floor(Math.random() * 20) + 80}%</span>
                    </div>
                </div>
                <div class="donation-actions">
                    <button class="btn btn--primary btn--sm" onclick="app.claimDonation(${donation.id})">Claim Donation</button>
                    <button class="btn btn--outline btn--sm">View Details</button>
                </div>
            </div>
        `).join('');
    }

    getFoodIcon(foodType) {
        const icons = {
            'rice': 'utensils',
            'curry': 'utensils',
            'vegetable': 'carrot',
            'bread': 'bread-slice',
            'pastries': 'bread-slice',
            'dal': 'utensils',
            'fruit': 'apple-alt'
        };
        
        const lowercaseType = foodType.toLowerCase();
        for (let key in icons) {
            if (lowercaseType.includes(key)) {
                return icons[key];
            }
        }
        return 'utensils';
    }

    getTimeRemaining(expiry) {
        if (!expiry) return '6 hours';
        
        const now = new Date();
        const expiryDate = new Date(expiry);
        const diff = expiryDate - now;
        
        if (diff <= 0) return 'Expired';
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        return hours > 0 ? `${hours} hours` : 'Less than 1 hour';
    }

    getRandomDistance() {
        const distances = ['1.2 km', '2.5 km', '3.8 km', '4.1 km', '5.7 km'];
        return distances[Math.floor(Math.random() * distances.length)];
    }

    toggleChatbot() {
        const chatbotBody = document.getElementById('chatbotBody');
        this.chatbotOpen = !this.chatbotOpen;
        
        if (this.chatbotOpen) {
            chatbotBody.classList.add('show');
            chatbotBody.style.display = 'flex';
        } else {
            chatbotBody.classList.remove('show');
            chatbotBody.style.display = 'none';
        }
    }

    sendChatMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addChatMessage(message, 'user');
        input.value = '';
        
        // Simulate typing indicator
        setTimeout(() => {
            const response = this.generateChatResponse(message);
            this.addChatMessage(response, 'bot');
        }, 1000);
    }

    addChatMessage(message, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}`;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageElement.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${sender === 'bot' ? 'robot' : 'user'}"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateChatResponse(message) {
        const lowercaseMessage = message.toLowerCase();
        
        // Check for specific keywords
        for (let keyword in this.chatResponses) {
            if (lowercaseMessage.includes(keyword)) {
                return this.chatResponses[keyword];
            }
        }
        
        // Default responses based on context
        if (this.currentUser) {
            if (this.currentUser.role === 'donor') {
                return "I can help you with food donations! Try asking about 'how to donate', 'finding NGOs', or 'food safety'. What would you like to know?";
            } else if (this.currentUser.role === 'ngo') {
                return "As an NGO, I can assist you with claiming donations, managing inventory, and coordinating pickups. What do you need help with?";
            } else if (this.currentUser.role === 'driver') {
                return "I can help you with delivery routes, tracking orders, and optimizing your schedule. What would you like to know?";
            }
        }
        
        return "I'm here to help with all things related to food donation! You can ask me about donating food, finding NGOs, food safety, delivery tracking, or environmental impact. What would you like to know?";
    }

    startRealTimeUpdates() {
        this.updateActivityFeed();
        
        // Update activity feed every 30 seconds
        this.activityFeedTimer = setInterval(() => {
            this.updateActivityFeed();
        }, 30000);
    }

    updateActivityFeed() {
        const activityFeed = document.getElementById('activityFeed');
        if (!activityFeed) return;

        // Shuffle activities to simulate real-time updates
        const shuffledActivities = [...this.recentActivities].sort(() => Math.random() - 0.5);
        
        activityFeed.innerHTML = shuffledActivities.slice(0, 3).map(activity => `
            <div class="activity-item slide-in">
                <div class="activity-icon ${activity.type}">
                    <i class="fas fa-${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <strong>${activity.user}</strong> ${activity.details}
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }

    initCharts() {
        // Initialize charts when dashboard is shown
        setTimeout(() => {
            this.initDemandChart();
            this.initEarningsChart();
        }, 1000);
    }

    initDemandChart() {
        const demandCanvas = document.getElementById('demandChart');
        if (!demandCanvas) return;

        const ctx = demandCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
                datasets: [{
                    label: 'Food Demand',
                    data: [20, 35, 60, 45, 85, 40],
                    borderColor: '#32A2AD',
                    backgroundColor: 'rgba(50, 162, 173, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    initEarningsChart() {
        const earningsCanvas = document.getElementById('earningsChart');
        if (!earningsCanvas) return;

        const ctx = earningsCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Daily Earnings',
                    data: [320, 450, 380, 520, 410, 380, 290],
                    backgroundColor: '#32A2AD',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    showToast(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-left: 4px solid var(--color-${type === 'success' ? 'success' : type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'info'});
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 3000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 300px;
            font-size: 14px;
        `;
        
        toast.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    showLeaderboard() {
        const modal = document.getElementById('leaderboardModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    hideLeaderboard() {
        const modal = document.getElementById('leaderboardModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    toggleMobileNav() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('mobile-open');
    }

    // Geolocation functions
    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    this.updateLocationField(lat, lng);
                },
                (error) => {
                    this.showToast('Could not get your location', 'warning');
                }
            );
        }
    }

    updateLocationField(lat, lng) {
        // Simulate reverse geocoding
        const locations = ['Sector 15, Gurgaon', 'MG Road, Bangalore', 'CP, New Delhi', 'Koramangala, Bangalore', 'Connaught Place, Delhi'];
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        document.getElementById('location').value = randomLocation;
    }

    // Analytics functions
    trackDonation(donationData) {
        // Track donation for analytics
        console.log('Donation tracked:', donationData);
    }

    trackUserInteraction(action, details) {
        // Track user interactions for improving UX
        console.log('User interaction:', { action, details, timestamp: new Date() });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new FoodLinkApp();
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Enhanced features for production
class AIFeatures {
    static async analyzeFood(imageData) {
        // Simulate AI food recognition
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    foodType: 'Rice & Curry',
                    confidence: 0.94,
                    servings: 50,
                    shelfLife: 6,
                    safetyScore: 94,
                    nutrition: {
                        calories: 250,
                        protein: 12,
                        carbs: 45,
                        fat: 8
                    }
                });
            }, 2000);
        });
    }

    static optimizeRoute(stops) {
        // Simulate route optimization
        return {
            distance: '12.3 km',
            duration: '35 minutes',
            fuelCost: '₹87',
            optimizedOrder: stops
        };
    }

    static predictDemand(historicalData) {
        // Simulate demand forecasting
        return {
            peakHour: '19:00',
            expectedDemand: 85,
            recommendedActions: ['Claim cooked food donations', 'Prepare for evening distribution']
        };
    }
}

// Blockchain integration simulation
class BlockchainTracker {
    static async recordDonation(donationData) {
        // Simulate blockchain recording
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    transactionHash: '0x' + Math.random().toString(36).substr(2, 64),
                    blockNumber: Math.floor(Math.random() * 1000000),
                    gasUsed: '21000',
                    verified: true
                });
            }, 3000);
        });
    }

    static async trackDelivery(deliveryId) {
        // Simulate delivery tracking on blockchain
        return {
            status: 'In Transit',
            location: 'En route to Hope Foundation',
            eta: '25 minutes',
            driverVerified: true
        };
    }
}

// Weather integration for logistics
class WeatherService {
    static async getWeatherForRoute(route) {
        // Simulate weather API call
        return {
            condition: 'Clear',
            temperature: 28,
            humidity: 65,
            windSpeed: 12,
            recommendation: 'Good conditions for delivery'
        };
    }
}

// Export classes for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FoodLinkApp, AIFeatures, BlockchainTracker, WeatherService };
}