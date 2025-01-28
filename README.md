# Splitwise Clone

A React Native mobile application that helps users split expenses with friends and manage group finances. Built with Expo and TypeScript.

## Features

- 👤 User Authentication
  - Login and Registration
  - Persistent sessions
  - Protected routes

- 💰 Expense Management
  - Add and track expenses
  - Multiple expense categories
  - Split expenses equally or custom amounts

- 👥 Group Management
  - Create and manage groups
  - Add/remove group members
  - View group balances

- 💳 Settlement
  - View who owes whom
  - Settle up functionality
  - Transaction history

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **State Management**: React Context
- **Storage**: AsyncStorage
- **UI Components**: Custom components with React Native elements
- **Icons**: FontAwesome

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/splitwise-clone.git
cd splitwise-clone
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

## Project Structure

```
splitwise/
├── app/                    # App screens and navigation
│   ├── (tabs)/            # Tab-based screens
│   ├── auth/              # Authentication screens
│   └── _layout.tsx        # Root layout
├── assets/                # Static assets
├── components/            # Reusable components
│   ├── common/           # Common UI components
│   └── navigation/       # Navigation components
├── constants/             # App constants
├── context/               # React Context providers
├── services/             # API services
└── types/                # TypeScript types
```

## Development

### Test Credentials
For development purposes, use these test credentials:
- Email: test@example.com
- Password: password123

### Running the App

1. Start the development server:
```bash
npx expo start
```

2. Press:
- `a` for Android
- `i` for iOS
- `w` for web

### Building for Production

1. For Android:
```bash
eas build -p android
```

2. For iOS:
```bash
eas build -p ios
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Firebase Integration
- [ ] Push Notifications
- [ ] Expense Analytics
- [ ] Currency Conversion
- [ ] Image Attachments for Expenses
- [ ] Export Statements
- [ ] Dark Mode Support

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [Splitwise](https://www.splitwise.com/)
- Built with [Expo](https://expo.dev/)
- UI components from [React Native](https://reactnative.dev/)
