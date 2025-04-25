// Global Variables
let currentUser = {
    name: 'User Name',
    email: 'user@example.com',
    groups: ['roommates', 'friends', 'trip'],
    expenses: []
};

// Chart instances
let monthlyExpensesChart;
let expenseCategoriesChart;
let personalMonthlyChart;
let personalCategoriesChart;

// Loading state
let isUpdating = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    initNavigation();
    
    // Initialize charts with optimized settings
    initDashboardCharts();
    initPersonalCharts();
    
    // Initialize calculators
    initInstantSplitCalculator();
    
    // Initialize modals
    initModals();
    
    // Initialize Groups page
    initGroupsPage();
    
    // Initialize loading spinner
    initLoadingSpinner();
    
    // Initialize image downloads only
    initImageDownloads();
});

// Initialize loading spinner
function initLoadingSpinner() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    // Function to show the spinner
    window.showLoading = function() {
        loadingOverlay.classList.add('active');
        isUpdating = true;
    };
    
    // Function to hide the spinner
    window.hideLoading = function() {
        isUpdating = false;
        // Small delay to ensure rendering is complete
        setTimeout(() => {
            loadingOverlay.classList.remove('active');
        }, 500);
    };
}

// Navigation functionality
function initNavigation() {
    const navItems = document.querySelectorAll('nav ul li');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Check if it's a link to another page
            const linkUrl = this.getAttribute('data-link');
            if (linkUrl) {
                window.location.href = linkUrl;
                return;
            }
            
            // Get the selected page ID
            const pageId = this.getAttribute('data-page');
            
            // If already on the same page, don't do anything to prevent flickering
            if (this.classList.contains('active')) {
                return;
            }
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
        });
    });
}

// Dashboard charts initialization with optimized rendering
function initDashboardCharts() {
    // If charts already exist, destroy them to prevent memory leaks
    if (monthlyExpensesChart) {
        monthlyExpensesChart.destroy();
    }
    if (expenseCategoriesChart) {
        expenseCategoriesChart.destroy();
    }
    
    // Monthly expenses chart - optimize with low devicePixelRatio and animation disabling
    const monthlyExpensesCtx = document.getElementById('monthlyExpensesChart').getContext('2d');
    monthlyExpensesCtx.canvas.style.height = '250px';
    
    monthlyExpensesChart = new Chart(monthlyExpensesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Monthly Expenses',
                data: [4500, 3800, 5200, 6000, 4300, 5100],
                borderColor: '#5E81AC',
                backgroundColor: 'rgba(94, 129, 172, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 1, // Lower devicePixelRatio for better performance
            animation: {
                duration: 500 // Shorter animation duration
            },
            hover: {
                animationDuration: 0 // Disable hover animation
            },
            responsiveAnimationDuration: 0, // Disable responsive animation
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#b0b0b0'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#b0b0b0'
                    }
                }
            }
        }
    });
    
    // Expense categories chart - optimize performance
    const expenseCategoriesCtx = document.getElementById('expenseCategoriesChart').getContext('2d');
    expenseCategoriesCtx.canvas.style.height = '250px';
    
    expenseCategoriesChart = new Chart(expenseCategoriesCtx, {
        type: 'doughnut',
        data: {
            labels: ['Rent', 'Groceries', 'Utilities', 'Dining', 'Entertainment'],
            datasets: [{
                data: [9000, 3500, 1800, 2500, 1200],
                backgroundColor: [
                    '#5E81AC',
                    '#8FBCBB',
                    '#A3BE8C',
                    '#EBCB8B',
                    '#B48EAD'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 1, // Lower devicePixelRatio for better performance
            animation: {
                duration: 500 // Shorter animation duration
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#e0e0e0',
                        padding: 15,
                        boxWidth: 15 // Smaller legend boxes
                    }
                }
            }
        }
    });
}

// Personal charts initialization with optimized rendering
function initPersonalCharts() {
    // If charts already exist, destroy them to prevent memory leaks
    if (personalMonthlyChart) {
        personalMonthlyChart.destroy();
    }
    if (personalCategoriesChart) {
        personalCategoriesChart.destroy();
    }
    
    // Personal monthly chart - optimize performance
    const personalMonthlyCtx = document.getElementById('personalMonthlyChart').getContext('2d');
    personalMonthlyCtx.canvas.style.height = '250px';
    
    personalMonthlyChart = new Chart(personalMonthlyCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Your Expenses',
                data: [1500, 1200, 1800, 2100, 1400, 1600],
                backgroundColor: 'rgba(94, 129, 172, 0.7)',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 1, // Lower devicePixelRatio for better performance
            animation: {
                duration: 500 // Shorter animation duration
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#b0b0b0'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#b0b0b0'
                    }
                }
            }
        }
    });
    
    // Personal categories chart - optimize performance
    const personalCategoriesCtx = document.getElementById('personalCategoriesChart').getContext('2d');
    personalCategoriesCtx.canvas.style.height = '250px';
    
    personalCategoriesChart = new Chart(personalCategoriesCtx, {
        type: 'doughnut',
        data: {
            labels: ['Rent', 'Groceries', 'Utilities', 'Dining', 'Entertainment'],
            datasets: [{
                data: [2250, 1100, 450, 900, 500],
                backgroundColor: [
                    '#5E81AC',
                    '#8FBCBB',
                    '#A3BE8C',
                    '#EBCB8B',
                    '#B48EAD'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: 1, // Lower devicePixelRatio for better performance
            animation: {
                duration: 500 // Shorter animation duration
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#e0e0e0',
                        padding: 15,
                        boxWidth: 15 // Smaller legend boxes
                    }
                }
            }
        }
    });
}

// Initialize the Instant Split Calculator
function initInstantSplitCalculator() {
    // DOM elements
    const numRoommatesInput = document.getElementById('numRoommates');
    const updateRoommatesBtn = document.getElementById('updateRoommatesBtn');
    const roommateEntries = document.getElementById('roommateEntries');
    const calculateSplitBtn = document.getElementById('calculateSplitBtn');
    const clearSplitBtn = document.getElementById('clearSplitBtn');
    const totalRentInput = document.getElementById('totalRent');
    const splitResultsDisplay = document.getElementById('splitResultsDisplay');
    
    // Update roommate entries
    updateRoommatesBtn.addEventListener('click', function() {
        createRoommateEntries();
    });
    
    // Calculate split
    calculateSplitBtn.addEventListener('click', function() {
        calculateRentSplit();
    });
    
    // Clear form
    clearSplitBtn.addEventListener('click', function() {
        clearCalculator();
    });
    
    // Initial roommate entries
    createRoommateEntries();
    
    // Create roommate entries based on number input
    function createRoommateEntries() {
        const numRoommates = parseInt(numRoommatesInput.value);
        
        if (isNaN(numRoommates) || numRoommates < 2) {
            alert('Number of roommates must be at least 2.');
            numRoommatesInput.value = 2;
            return;
        }
        
        if (numRoommates > 10) {
            alert('Number of roommates must be less than 10.');
            numRoommatesInput.value = 10;
            return;
        }
        
        // Clear existing entries
        roommateEntries.innerHTML = '';
        
        // Create entries for each roommate
        for (let i = 0; i < numRoommates; i++) {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'roommate-entry';
            
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.placeholder = `Roommate ${i + 1} Name`;
            nameInput.className = 'roommate-name';
            
            const expenseInput = document.createElement('input');
            expenseInput.type = 'number';
            expenseInput.placeholder = `Goods Expense ${i + 1}`;
            expenseInput.className = 'roommate-expense';
            
            entryDiv.appendChild(nameInput);
            entryDiv.appendChild(expenseInput);
            roommateEntries.appendChild(entryDiv);
        }
    }
    
    // Calculate the rent split based on expenses
    function calculateRentSplit() {
        const totalRent = parseFloat(totalRentInput.value);
        
        if (isNaN(totalRent) || totalRent <= 0) {
            alert('Please enter a valid total rent amount.');
            return;
        }
        
        const nameInputs = roommateEntries.querySelectorAll('.roommate-name');
        const expenseInputs = roommateEntries.querySelectorAll('.roommate-expense');
        
        const numRoommates = nameInputs.length;
        const names = [];
        const expenses = [];
        
        // Collect all expenses and names
        for (let i = 0; i < numRoommates; i++) {
            const name = nameInputs[i].value || `Roommate ${i + 1}`;
            const expense = parseFloat(expenseInputs[i].value) || 0;
            
            names.push(name);
            expenses.push(expense);
        }
        
        // Calculate total and average expenses
        const totalExpenses = expenses.reduce((sum, expense) => sum + expense, 0);
        const averageExpense = totalExpenses / numRoommates;
        const roomRentShare = totalRent / numRoommates;
        
        // Calculate individual amounts due
        const results = [];
        for (let i = 0; i < numRoommates; i++) {
            const difference = averageExpense - expenses[i];
            let amountDue;
            
            if (expenses[i] > averageExpense) {
                amountDue = roomRentShare - (expenses[i] - averageExpense);
            } else {
                amountDue = roomRentShare + (averageExpense - expenses[i]);
            }
            
            results.push(`${names[i]}: ₹ ${amountDue.toFixed(2)}`);
        }
        
        // Display results
        splitResultsDisplay.innerHTML = results.join('<br>');
        
        // Show download button
        const downloadSplitBtn = document.getElementById('downloadSplitBtn');
        if (downloadSplitBtn) {
            downloadSplitBtn.style.display = 'inline-block';
        }
    }
    
    // Clear the calculator
    function clearCalculator() {
        numRoommatesInput.value = 2;
        totalRentInput.value = 900;
        splitResultsDisplay.innerHTML = '';
        
        // Hide download button
        const downloadSplitBtn = document.getElementById('downloadSplitBtn');
        if (downloadSplitBtn) {
            downloadSplitBtn.style.display = 'none';
        }
        
        createRoommateEntries();
    }
}

// Initialize all modals
function initModals() {
    // Get all modals
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Create Group button
    const createGroupBtn = document.getElementById('createGroupBtn');
    const createGroupModal = document.getElementById('createGroupModal');
    
    createGroupBtn.addEventListener('click', function() {
        openModal(createGroupModal);
    });
    
    // View Group buttons
    const viewGroupBtns = document.querySelectorAll('.view-group-btn');
    const groupDetailModal = document.getElementById('groupDetailModal');
    const modalGroupName = document.getElementById('modalGroupName');
    
    viewGroupBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const groupName = this.closest('.group-card').querySelector('h3').textContent;
            modalGroupName.textContent = groupName;
            populateGroupDetails(this.getAttribute('data-group'));
            openModal(groupDetailModal);
        });
    });
    
    // Add Expense button in group detail
    const addExpenseBtn = document.getElementById('addExpenseBtn');
    const addExpenseModal = document.getElementById('addExpenseModal');
    
    addExpenseBtn.addEventListener('click', function() {
        openModal(addExpenseModal);
        populateExpenseModalDropdowns();
    });
    
    // Split Rent button in group detail
    const splitRentBtn = document.getElementById('splitRentBtn');
    const splitRentModal = document.getElementById('splitRentModal');
    
    splitRentBtn.addEventListener('click', function() {
        openModal(splitRentModal);
        populateRentSplitEntries();
    });
    
    // Close all modals with close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeAllModals();
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                closeAllModals();
            }
        });
    });
    
    // Group detail population function
    function populateGroupDetails(groupId) {
        const groupMembersList = document.getElementById('groupMembersList');
        const groupExpensesList = document.getElementById('groupExpensesList');
        
        // Clear existing data
        groupMembersList.innerHTML = '';
        groupExpensesList.innerHTML = '';
        
        // Add sample members
        const sampleMembers = [
            { name: 'You', email: 'user@example.com', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
            { name: 'Rahul', email: 'rahul@example.com', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
            { name: 'Priya', email: 'priya@example.com', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
            { name: 'Ajay', email: 'ajay@example.com', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' }
        ];
        
        sampleMembers.forEach(member => {
            const memberItem = document.createElement('div');
            memberItem.className = 'member-item';
            memberItem.innerHTML = `
                <img src="${member.avatar}" class="member-avatar">
                <div class="member-info">
                    <h4>${member.name}</h4>
                    <p>${member.email}</p>
                </div>
            `;
            groupMembersList.appendChild(memberItem);
        });
        
        // Add sample expenses
        const sampleExpenses = [
            { title: 'Grocery Shopping', category: 'groceries', amount: 1200, date: 'May 21, 2023', payer: 'Rahul' },
            { title: 'Internet Bill', category: 'utility', amount: 800, date: 'May 15, 2023', payer: 'You' },
            { title: 'Rent', category: 'rent', amount: 9000, date: 'May 1, 2023', payer: 'You' }
        ];
        
        const icons = {
            groceries: 'fas fa-shopping-basket',
            utility: 'fas fa-wifi',
            rent: 'fas fa-home',
            food: 'fas fa-utensils',
            entertainment: 'fas fa-film'
        };
        
        // Container for summary info
        const summaryContainer = document.createElement('div');
        summaryContainer.className = 'expense-summary';
        summaryContainer.innerHTML = `
            <h3>Group Summary</h3>
            <div class="summary-content">
                <p>Total Expenses: ₹ <span id="total-expense-amount">0</span></p>
                <p>Your Share: ₹ <span id="your-share-amount">0</span></p>
                <hr>
                <div id="balance-summary" class="balance-summary"></div>
                <button id="downloadGroupBalancesBtn" class="btn download-btn" style="margin-top: 1rem;">
                    <i class="fas fa-download"></i> Download Summary
                </button>
            </div>
        `;
        groupExpensesList.appendChild(summaryContainer);
        
        // Add expenses to the list
        sampleExpenses.forEach(expense => {
            const expenseItem = document.createElement('div');
            expenseItem.className = 'expense-item';
            expenseItem.innerHTML = `
                <div class="expense-icon">
                    <i class="${icons[expense.category] || 'fas fa-receipt'}"></i>
                </div>
                <div class="expense-details">
                    <h4>${expense.title}</h4>
                    <p>Paid by ${expense.payer}</p>
                </div>
                <div class="expense-date">
                    <p>${expense.date}</p>
                </div>
                <div class="expense-amount">
                    <p>₹ ${expense.amount}</p>
                </div>
            `;
            groupExpensesList.appendChild(expenseItem);
        });
        
        // Calculate the totals and balances
        calculateGroupBalances(sampleMembers, sampleExpenses);
    }
    
    // Calculate the group balances
    function calculateGroupBalances(members, expenses) {
        // Calculate total expenses
        const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        
        // Calculate each person's share
        const perPersonShare = totalExpense / members.length;
        
        // Calculate balances
        const balances = {};
        
        // Initialize balances for each member
        members.forEach(member => {
            balances[member.name] = 0;
        });
        
        // Add paid amounts to balances (positive means they paid more than their share)
        expenses.forEach(expense => {
            balances[expense.payer] += expense.amount;
        });
        
        // Subtract fair share from balance
        Object.keys(balances).forEach(name => {
            balances[name] -= perPersonShare;
        });
        
        // Update summary display
        document.getElementById('total-expense-amount').textContent = totalExpense.toLocaleString();
        document.getElementById('your-share-amount').textContent = perPersonShare.toLocaleString();
        
        // Create balance summary
        const balanceSummary = document.getElementById('balance-summary');
        balanceSummary.innerHTML = '';
        
        // Add balance info for each member
        Object.keys(balances).forEach(name => {
            const amount = balances[name];
            const balanceItem = document.createElement('div');
            balanceItem.className = 'balance-item';
            
            if (name === 'You') {
                if (amount > 0) {
                    balanceItem.innerHTML = `<span class="member-name you">You</span> are owed <span class="amount positive">₹ ${amount.toFixed(2)}</span>`;
                } else if (amount < 0) {
                    balanceItem.innerHTML = `<span class="member-name you">You</span> owe <span class="amount negative">₹ ${Math.abs(amount).toFixed(2)}</span>`;
                } else {
                    balanceItem.innerHTML = `<span class="member-name you">You</span> are settled up`;
                }
            } else {
                if (amount > 0) {
                    balanceItem.innerHTML = `<span class="member-name">${name}</span> is owed <span class="amount positive">₹ ${amount.toFixed(2)}</span>`;
                } else if (amount < 0) {
                    balanceItem.innerHTML = `<span class="member-name">${name}</span> owes <span class="amount negative">₹ ${Math.abs(amount).toFixed(2)}</span>`;
                } else {
                    balanceItem.innerHTML = `<span class="member-name">${name}</span> is settled up`;
                }
            }
            
            balanceSummary.appendChild(balanceItem);
        });
    }
    
    // Populate expense modal dropdowns
    function populateExpenseModalDropdowns() {
        const expensePayer = document.getElementById('expensePayer');
        expensePayer.innerHTML = '<option value="you">You</option>';
        
        const sampleMembers = ['Rahul', 'Priya', 'Ajay'];
        sampleMembers.forEach(member => {
            const option = document.createElement('option');
            option.value = member.toLowerCase();
            option.textContent = member;
            expensePayer.appendChild(option);
        });
        
        // Set today's date
        const expenseDate = document.getElementById('expenseDate');
        const today = new Date();
        expenseDate.value = today.toISOString().split('T')[0];
        
        // Show/hide custom split based on split method
        const splitEqual = document.getElementById('splitEqual');
        const splitUnequal = document.getElementById('splitUnequal');
        const customSplitContainer = document.getElementById('customSplitContainer');
        
        splitEqual.addEventListener('change', function() {
            if (this.checked) {
                customSplitContainer.style.display = 'none';
            }
        });
        
        splitUnequal.addEventListener('change', function() {
            if (this.checked) {
                customSplitContainer.style.display = 'block';
                populateCustomSplitInputs();
            }
        });
    }
    
    // Populate custom split inputs
    function populateCustomSplitInputs() {
        const customSplitContainer = document.getElementById('customSplitContainer');
        customSplitContainer.innerHTML = '';
        
        const sampleMembers = ['You', 'Rahul', 'Priya', 'Ajay'];
        sampleMembers.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.className = 'custom-split-item';
            memberDiv.innerHTML = `
                <label>${member}:</label>
                <input type="number" placeholder="Percentage" value="25">
            `;
            customSplitContainer.appendChild(memberDiv);
        });
    }
    
    // Populate rent split entries
    function populateRentSplitEntries() {
        const rentSplitEntries = document.getElementById('rentSplitEntries');
        rentSplitEntries.innerHTML = '';
        
        const sampleMembers = ['You', 'Rahul', 'Priya', 'Ajay'];
        sampleMembers.forEach((member, index) => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'roommate-entry';
            
            const nameLabel = document.createElement('div');
            nameLabel.className = 'entry-label';
            nameLabel.textContent = member;
            
            const expenseInput = document.createElement('input');
            expenseInput.type = 'number';
            expenseInput.placeholder = `Goods Expense for ${member}`;
            expenseInput.className = 'roommate-expense';
            
            entryDiv.appendChild(nameLabel);
            entryDiv.appendChild(expenseInput);
            rentSplitEntries.appendChild(entryDiv);
        });
        
        // Calculate group split button
        const calculateGroupSplitBtn = document.getElementById('calculateGroupSplitBtn');
        calculateGroupSplitBtn.addEventListener('click', function() {
            calculateGroupRentSplit();
        });
    }
    
    // Calculate the group rent split
    function calculateGroupRentSplit() {
        const totalRentAmount = document.getElementById('totalRentAmount');
        const groupSplitResultsDisplay = document.getElementById('groupSplitResultsDisplay');
        const rentSplitEntries = document.getElementById('rentSplitEntries');
        const expenseInputs = rentSplitEntries.querySelectorAll('.roommate-expense');
        
        const totalRent = parseFloat(totalRentAmount.value);
        
        if (isNaN(totalRent) || totalRent <= 0) {
            alert('Please enter a valid total rent amount.');
            return;
        }
        
        const numRoommates = expenseInputs.length;
        const sampleMembers = ['You', 'Rahul', 'Priya', 'Ajay'];
        const expenses = [];
        
        // Collect all expenses
        for (let i = 0; i < numRoommates; i++) {
            const expense = parseFloat(expenseInputs[i].value) || 0;
            expenses.push(expense);
        }
        
        // Calculate total and average expenses
        const totalExpenses = expenses.reduce((sum, expense) => sum + expense, 0);
        const averageExpense = totalExpenses / numRoommates;
        const roomRentShare = totalRent / numRoommates;
        
        // Calculate individual amounts due (using the same formula as in Python)
        const results = [];
        for (let i = 0; i < numRoommates; i++) {
            const difference = averageExpense - expenses[i];
            let amountDue;
            
            if (expenses[i] > averageExpense) {
                amountDue = roomRentShare - (expenses[i] - averageExpense);
            } else {
                amountDue = roomRentShare + (averageExpense - expenses[i]);
            }
            
            results.push(`${sampleMembers[i]}: ₹ ${amountDue.toFixed(2)}`);
        }
        
        // Display results
        groupSplitResultsDisplay.innerHTML = results.join('<br>');
        
        // Show download button
        const downloadGroupSplitBtn = document.getElementById('downloadGroupSplitBtn');
        if (downloadGroupSplitBtn) {
            downloadGroupSplitBtn.style.display = 'inline-block';
        }
    }
    
    // Helper functions for modals
    function openModal(modal) {
        closeAllModals(); // Close any open modals first
        modal.style.display = 'flex';
    }
    
    function closeAllModals() {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
}

// Initialize Groups page functionality
function initGroupsPage() {
    // Add Member button in the create group modal
    const addInitialMemberBtn = document.getElementById('addInitialMemberBtn');
    const initialMembers = document.getElementById('initialMembers');
    
    addInitialMemberBtn.addEventListener('click', function() {
        const memberInput = document.createElement('div');
        memberInput.className = 'member-input';
        memberInput.innerHTML = `
            <input type="text" placeholder="Member name">
            <input type="email" placeholder="Email address">
            <button class="remove-member-btn"><i class="fas fa-times"></i></button>
        `;
        initialMembers.appendChild(memberInput);
        
        // Add event listener to remove button
        const removeBtn = memberInput.querySelector('.remove-member-btn');
        removeBtn.addEventListener('click', function() {
            memberInput.remove();
        });
    });
    
    // Add event listeners to existing remove buttons
    const removeButtons = document.querySelectorAll('.remove-member-btn');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.member-input').remove();
        });
    });
    
    // Save Group button with chart update functionality
    const saveGroupBtn = document.getElementById('saveGroupBtn');
    saveGroupBtn.addEventListener('click', function() {
        const groupName = document.getElementById('groupName').value;
        const groupType = document.getElementById('groupType').value;
        const shouldUpdateDashboard = document.getElementById('updateDashboardGroup').checked;
        
        if (!groupName) {
            alert('Please enter a group name.');
            return;
        }
        
        // Add the new group to the user's groups
        currentUser.groups.push(groupName.toLowerCase());
        
        // Update the dashboard stats
        if (shouldUpdateDashboard) {
            showLoading();
            
            // Simulate network delay for visual feedback
            setTimeout(() => {
                updateDashboardStats();
                hideLoading();
            }, 800);
        }
        
        // Here you would typically send data to a server
        // For demo purposes, we'll just show an alert
        alert(`Group "${groupName}" created successfully!`);
        
        // Close the modal
        document.getElementById('createGroupModal').style.display = 'none';
    });
    
    // Save Expense button with chart update functionality
    const saveExpenseBtn = document.getElementById('saveExpenseBtn');
    saveExpenseBtn.addEventListener('click', function() {
        const title = document.getElementById('expenseTitle').value;
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const category = document.getElementById('expenseCategory').value;
        const date = document.getElementById('expenseDate').value;
        const payer = document.getElementById('expensePayer').value;
        const shouldUpdateDashboard = document.getElementById('updateDashboard').checked;
        
        if (!title || !amount) {
            alert('Please enter both title and amount.');
            return;
        }
        
        // Create a new expense object
        const newExpense = {
            title,
            amount,
            category,
            date,
            payer,
            group: document.getElementById('modalGroupName').textContent
        };
        
        // Add the expense to the user's expenses
        currentUser.expenses.push(newExpense);
        
        // Update dashboard with new expense data
        if (shouldUpdateDashboard) {
            showLoading();
            
            // Simulate network delay for visual feedback
            setTimeout(() => {
                updateDashboardWithNewExpense(newExpense);
                hideLoading();
            }, 800);
        }
        
        // Add the expense to the group expenses list
        const groupExpensesList = document.getElementById('groupExpensesList');
        const icons = {
            'groceries': 'fas fa-shopping-basket',
            'utility': 'fas fa-wifi',
            'rent': 'fas fa-home',
            'food': 'fas fa-utensils',
            'entertainment': 'fas fa-film'
        };
        
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.innerHTML = `
            <div class="expense-icon">
                <i class="${icons[category] || 'fas fa-receipt'}"></i>
            </div>
            <div class="expense-details">
                <h4>${title}</h4>
                <p>Paid by ${payer === 'you' ? 'You' : payer}</p>
            </div>
            <div class="expense-date">
                <p>${new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div class="expense-amount">
                <p>₹ ${amount}</p>
            </div>
        `;
        
        // Insert at the top below the summary
        const summaryElement = groupExpensesList.querySelector('.expense-summary');
        if (summaryElement && summaryElement.nextSibling) {
            groupExpensesList.insertBefore(expenseItem, summaryElement.nextSibling);
        } else {
            groupExpensesList.appendChild(expenseItem);
        }
        
        // Get current expenses and members
        const sampleMembers = [
            { name: 'You', email: 'user@example.com', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
            { name: 'Rahul', email: 'rahul@example.com', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
            { name: 'Priya', email: 'priya@example.com', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
            { name: 'Ajay', email: 'ajay@example.com', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' }
        ];
        
        // Get all expense items and reconstruct the expenses array
        const expenseItems = groupExpensesList.querySelectorAll('.expense-item');
        const expenses = Array.from(expenseItems).map(item => {
            const title = item.querySelector('.expense-details h4').textContent;
            const payerText = item.querySelector('.expense-details p').textContent;
            const payer = payerText.replace('Paid by ', '');
            const amount = parseFloat(item.querySelector('.expense-amount p').textContent.replace('₹ ', '').replace(',', ''));
            const date = item.querySelector('.expense-date p').textContent;
            const iconClass = item.querySelector('.expense-icon i').className;
            
            // Determine category from icon
            let category = 'other';
            Object.keys(icons).forEach(key => {
                if (iconClass.includes(icons[key].replace('fas ', ''))) {
                    category = key;
                }
            });
            
            return { title, category, amount, date, payer };
        });
        
        // Recalculate balances
        calculateGroupBalances(sampleMembers, expenses);
        
        // Here you would typically send data to a server
        // For demo purposes, we'll just show an alert
        alert(`Expense "${title}" saved successfully!`);
        
        // Close the modal
        document.getElementById('addExpenseModal').style.display = 'none';
    });
}

// Function to update dashboard stats when a new group is added
function updateDashboardStats() {
    // Update total groups count
    const groupCountElement = document.querySelector('.stats-container .stat-card:first-child .stat-info p');
    groupCountElement.textContent = currentUser.groups.length;
    
    // Get the chart cards
    const monthlyCard = document.getElementById('monthlyExpensesCard');
    const categoriesCard = document.getElementById('expenseCategoriesCard');
    
    // Animate the cards
    monthlyCard.classList.add('chart-update-animation');
    categoriesCard.classList.add('chart-update-animation');
    
    // Animate the group card
    const groupCard = document.querySelector('.stats-container .stat-card:first-child');
    groupCard.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    groupCard.style.transform = 'scale(1.05)';
    groupCard.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.7)';
    
    setTimeout(() => {
        // Remove animation classes
        monthlyCard.classList.remove('chart-update-animation');
        categoriesCard.classList.remove('chart-update-animation');
        
        // Reset group card
        groupCard.style.transform = 'translateY(-5px)';
        groupCard.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.6)';
    }, 500);
    
    // Force chart layout reflow for best performance
    monthlyExpensesChart.resize();
    expenseCategoriesChart.resize();
}

// Function to update dashboard with new expense data
function updateDashboardWithNewExpense(expense) {
    // Get the current data
    const monthlyData = monthlyExpensesChart.data.datasets[0].data;
    const categoriesData = expenseCategoriesChart.data.datasets[0].data;
    const personalMonthlyData = personalMonthlyChart.data.datasets[0].data;
    const personalCategoriesData = personalCategoriesChart.data.datasets[0].data;
    
    // Get the chart cards
    const monthlyCard = document.getElementById('monthlyExpensesCard');
    const categoriesCard = document.getElementById('expenseCategoriesCard');
    
    // Animate the cards
    monthlyCard.classList.add('chart-update-animation');
    categoriesCard.classList.add('chart-update-animation');
    
    // Determine which month to update (for this demo we'll use the current month)
    const currentMonth = new Date().getMonth(); // 0-based (0 = Jan, 1 = Feb, etc.)
    
    // Update the monthly expenses data with optimization
    // Use a single update at the end rather than updating multiple times
    monthlyData[currentMonth] += expense.amount;
    personalMonthlyData[currentMonth] += expense.amount;
    
    // Update the categories data based on the expense category
    const categoryIndex = {
        'rent': 0,
        'groceries': 1,
        'utility': 2,
        'food': 3,
        'entertainment': 4
    }[expense.category] || 1; // Default to groceries if category not found
    
    categoriesData[categoryIndex] += expense.amount;
    personalCategoriesData[categoryIndex] += expense.amount / 4; // Divide by number of group members for personal share
    
    // Update total expenses stat
    const totalExpensesElement = document.querySelector('.stats-container .stat-card:nth-child(2) .stat-info p');
    const currentTotal = parseFloat(totalExpensesElement.textContent.replace('₹ ', '').replace(',', ''));
    totalExpensesElement.textContent = `₹ ${(currentTotal + expense.amount).toLocaleString()}`;
    
    // Animate the expenses card
    const expensesCard = document.querySelector('.stats-container .stat-card:nth-child(2)');
    expensesCard.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    expensesCard.style.transform = 'scale(1.05)';
    expensesCard.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.7)';
    
    setTimeout(() => {
        // Remove animation classes
        monthlyCard.classList.remove('chart-update-animation');
        categoriesCard.classList.remove('chart-update-animation');
        
        // Reset expenses card
        expensesCard.style.transform = 'translateY(-5px)';
        expensesCard.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.6)';
        
        // Force chart layout reflow for best performance
        monthlyExpensesChart.resize();
        expenseCategoriesChart.resize();
        personalMonthlyChart.resize();
        personalCategoriesChart.resize();
    }, 500);
    
    // Batch update all charts at once
    monthlyExpensesChart.update('none'); // Use 'none' mode for faster updates
    expenseCategoriesChart.update('none');
    personalMonthlyChart.update('none');
    personalCategoriesChart.update('none');
    
    // Add the new expense to recent activity
    addExpenseToRecentActivity(expense);
}

// Function to add a new expense to recent activity
function addExpenseToRecentActivity(expense) {
    const activityList = document.querySelector('.activity-list');
    
    // Create new activity item
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item activity-item-new';
    
    // Determine icon based on category
    const icons = {
        'groceries': 'fas fa-shopping-basket',
        'utility': 'fas fa-wifi',
        'rent': 'fas fa-home',
        'food': 'fas fa-utensils',
        'entertainment': 'fas fa-film'
    };
    
    const icon = icons[expense.category] || 'fas fa-receipt';
    
    activityItem.innerHTML = `
        <div class="activity-icon">
            <i class="${icon}"></i>
        </div>
        <div class="activity-details">
            <h4>${expense.title}</h4>
            <p>${expense.group} • Added by ${expense.payer === 'you' ? 'You' : expense.payer}</p>
        </div>
        <div class="activity-amount">
            <p>₹ ${expense.amount.toLocaleString()}</p>
            <span>Just now</span>
        </div>
    `;
    
    // Insert at the top of the list
    activityList.insertBefore(activityItem, activityList.firstChild);
    
    // Remove the 'new' class after animation completes
    setTimeout(() => {
        activityItem.classList.remove('activity-item-new');
    }, 1000);
    
    // Remove the last item if there are more than 5 items
    if (activityList.children.length > 5) {
        activityList.removeChild(activityList.lastChild);
    }
}

// Force chart layout reflow for best performance
monthlyExpensesChart.resize();
expenseCategoriesChart.resize();

// Force chart layout reflow for best performance
// Use a timeout to ensure the layout is fully rendered before resizing charts
setTimeout(() => {
    monthlyExpensesChart.resize();
    expenseCategoriesChart.resize();
}, 50);

// Function to initialize download functionality
function initDownloadFunctionality() {
    // Instant Split Calculator Download
    const downloadSplitBtn = document.getElementById('downloadSplitBtn');
    if (downloadSplitBtn) {
        downloadSplitBtn.addEventListener('click', function() {
            const splitResultsDisplay = document.getElementById('splitResultsDisplay');
            const results = splitResultsDisplay.innerHTML.split('<br>');
            
            // Create CSV content
            let csvContent = "Name,Amount Due (₹)\n";
            results.forEach(result => {
                if (result) {
                    // Split by the colon and remove the ₹ symbol
                    const parts = result.split(':');
                    const name = parts[0].trim();
                    const amount = parts[1].trim().replace('₹ ', '');
                    csvContent += `${name},${amount}\n`;
                }
            });
            
            // Download the CSV file
            downloadCSV(csvContent, 'rent_split_results.csv');
        });
    }
    
    // Group Split Calculator Download
    const downloadGroupSplitBtn = document.getElementById('downloadGroupSplitBtn');
    if (downloadGroupSplitBtn) {
        downloadGroupSplitBtn.addEventListener('click', function() {
            const groupSplitResultsDisplay = document.getElementById('groupSplitResultsDisplay');
            const results = groupSplitResultsDisplay.innerHTML.split('<br>');
            
            // Create CSV content
            let csvContent = "Name,Amount Due (₹)\n";
            results.forEach(result => {
                if (result) {
                    // Split by the colon and remove the ₹ symbol
                    const parts = result.split(':');
                    const name = parts[0].trim();
                    const amount = parts[1].trim().replace('₹ ', '');
                    csvContent += `${name},${amount}\n`;
                }
            });
            
            // Download the CSV file
            downloadCSV(csvContent, 'group_rent_split_results.csv');
        });
    }
    
    // Handle click events for the download group balances button
    document.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'downloadGroupBalancesBtn') {
            const groupName = document.getElementById('modalGroupName').textContent;
            const totalExpense = document.getElementById('total-expense-amount').textContent;
            const yourShare = document.getElementById('your-share-amount').textContent;
            const balanceSummary = document.getElementById('balance-summary');
            const balanceItems = balanceSummary.querySelectorAll('.balance-item');
            
            // Create CSV content
            let csvContent = "Group Name: " + groupName + "\n";
            csvContent += "Total Expenses: ₹" + totalExpense + "\n";
            csvContent += "Per Person Share: ₹" + yourShare + "\n\n";
            csvContent += "Balance Summary:\n";
            csvContent += "Name,Status,Amount (₹)\n";
            
            balanceItems.forEach(item => {
                const text = item.textContent.trim();
                let name, status, amount;
                
                if (text.includes(" are owed ")) {
                    const parts = text.split(" are owed ");
                    name = parts[0].trim();
                    status = "Owed";
                    amount = parts[1].replace("₹ ", "");
                } else if (text.includes(" owe ")) {
                    const parts = text.split(" owe ");
                    name = parts[0].trim();
                    status = "Owes";
                    amount = parts[1].replace("₹ ", "");
                } else {
                    const parts = text.split(" are ");
                    name = parts[0].trim();
                    status = "Settled";
                    amount = "0.00";
                }
                
                csvContent += `${name},${status},${amount}\n`;
            });
            
            // Add expenses details
            csvContent += "\nExpenses Details:\n";
            csvContent += "Description,Category,Amount (₹),Date,Paid By\n";
            
            const expenseItems = document.querySelectorAll('#groupExpensesList .expense-item');
            expenseItems.forEach(item => {
                const title = item.querySelector('.expense-details h4').textContent;
                const payerText = item.querySelector('.expense-details p').textContent;
                const payer = payerText.replace('Paid by ', '');
                const amount = item.querySelector('.expense-amount p').textContent.replace('₹ ', '');
                const date = item.querySelector('.expense-date p').textContent;
                const iconClass = item.querySelector('.expense-icon i').className;
                
                // Determine category from icon
                let category = 'Other';
                if (iconClass.includes('fa-shopping-basket')) category = 'Groceries';
                if (iconClass.includes('fa-wifi')) category = 'Utility';
                if (iconClass.includes('fa-home')) category = 'Rent';
                if (iconClass.includes('fa-utensils')) category = 'Food';
                if (iconClass.includes('fa-film')) category = 'Entertainment';
                
                csvContent += `${title},${category},${amount},${date},${payer}\n`;
            });
            
            // Download the CSV file
            downloadCSV(csvContent, `${groupName.toLowerCase()}_expenses_summary.csv`);
        }
    });
}

// Helper function to download CSV
function downloadCSV(content, filename) {
    const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + content);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Helper function to download as image
function downloadAsImage(element, filename) {
    // Create styled container with consistent styling for the export
    const container = document.createElement('div');
    container.style.backgroundColor = '#2c2c2c';
    container.style.color = '#e0e0e0';
    container.style.padding = '20px';
    container.style.borderRadius = '10px';
    container.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
    container.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
    container.style.width = '500px';
    container.style.position = 'absolute';
    container.style.left = '-9999px'; // Position off-screen
    
    // Add ExpenseSplit logo/header
    const header = document.createElement('div');
    header.style.borderBottom = '1px solid #4a4a4a';
    header.style.paddingBottom = '10px';
    header.style.marginBottom = '15px';
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.innerHTML = `
        <div style="font-size: 24px; font-weight: bold; background: linear-gradient(90deg, #5E81AC, #8FBCBB); -webkit-background-clip: text; background-clip: text; color: transparent;">
            ExpenseSplit
        </div>
    `;
    container.appendChild(header);
    
    // Clone the content
    const content = element.cloneNode(true);
    content.style.padding = '0';
    content.style.margin = '0';
    container.appendChild(content);
    
    // Add timestamp
    const footer = document.createElement('div');
    footer.style.borderTop = '1px solid #4a4a4a';
    footer.style.paddingTop = '10px';
    footer.style.marginTop = '15px';
    footer.style.fontSize = '12px';
    footer.style.color = '#b0b0b0';
    footer.style.textAlign = 'right';
    footer.innerHTML = `Generated on ${new Date().toLocaleString()}`;
    container.appendChild(footer);
    
    // Append to document temporarily
    document.body.appendChild(container);
    
    // Use html2canvas to convert to image
    html2canvas(container, {
        backgroundColor: '#2c2c2c',
        scale: 2, // Higher resolution
        logging: false,
        useCORS: true
    }).then(canvas => {
        // Convert canvas to image URL
        const imgData = canvas.toDataURL('image/png');
        
        // Create download link
        const link = document.createElement('a');
        link.href = imgData;
        link.download = filename;
        link.click();
        
        // Clean up
        document.body.removeChild(container);
    });
}

// Initialize image download functionality
function initImageDownloads() {
    // Instant Split Calculator Download
    const downloadSplitBtn = document.getElementById('downloadSplitBtn');
    if (downloadSplitBtn) {
        downloadSplitBtn.addEventListener('click', function() {
            const splitResultsContainer = document.querySelector('.split-results');
            // Download as image
            downloadAsImage(splitResultsContainer, 'rent_split_results.png');
        });
    }
    
    // Group Split Calculator Download
    const downloadGroupSplitBtn = document.getElementById('downloadGroupSplitBtn');
    if (downloadGroupSplitBtn) {
        downloadGroupSplitBtn.addEventListener('click', function() {
            const groupSplitResultsContainer = document.querySelector('#splitRentModal .split-results');
            // Download as image
            downloadAsImage(groupSplitResultsContainer, 'group_rent_split_results.png');
        });
    }
    
    // Group Balances Download
    document.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'downloadGroupBalancesBtn') {
            const groupName = document.getElementById('modalGroupName').textContent;
            const expenseSummary = document.querySelector('.expense-summary');
            
            // Download as image
            downloadAsImage(expenseSummary, `${groupName.toLowerCase()}_expenses_summary.png`);
        }
    });
} 