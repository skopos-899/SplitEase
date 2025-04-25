# SplitEase
Simple Expense Sharing Made Beautiful

SplitEase is a web-based dashboard application for managing shared expenses among roommates, friends, or any group. The application features a modern metallic UI design with comprehensive expense tracking and a fair rent splitting algorithm.

## Features

- **Dashboard Overview**: Visual representation of expenses with charts and recent activity logs
- **Instant Split**: Quick expense splitting calculator for immediate use
- **Personal Data**: Track your individual expenses across different groups
- **Groups Management**: Create and manage expense groups with multiple members

### Split Rent Algorithm

The application uses a sophisticated algorithm for fair rent splitting based on individuals' contributions:

1. Calculates the average contribution of all members
2. Determines individual rent shares based on the deviation from average contribution
3. Members who contributed more than average pay less rent, while those who contributed less pay more

## Usage

### Getting Started

1. Clone this repository to your local machine
2. Open `index.html` in any modern web browser
3. No server setup required - the application runs entirely in the browser

### Dashboard

The dashboard displays:
- Key financial metrics (total groups, expenses, amounts owed)
- Monthly expense trends
- Expense categorization
- Recent transactions

### Instant Split

1. Enter the number of roommates
2. Specify the total rent amount
3. Add individual names and their contributions (goods expenses)
4. Click "Calculate Split" to see the fair distribution based on expenses

### Groups

1. Create a new group by clicking "Create New Group"
2. Add members with their email addresses
3. Add expenses and specify who paid
4. Use the "Split Rent" feature to calculate fair rent distribution based on other expenses

## Technical Details

This project is built using:
- HTML5
- CSS3 with custom properties and flexbox/grid layouts
- Vanilla JavaScript for interactive functionality
- Chart.js for data visualization

## Customization

You can customize the application by:
- Modifying color schemes in the CSS variables (`:root` section in `styles.css`)
- Adjusting layout dimensions and responsive breakpoints
- Adding new features or modifying existing calculations

## Future Enhancements

Planned future enhancements include:
- Backend integration with data persistence
- User authentication and profiles
- Email notifications for expense reminders
- Mobile application version

## License

This project is available for personal and educational use. 
