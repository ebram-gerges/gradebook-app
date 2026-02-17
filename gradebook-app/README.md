# Gradebook App

## Overview
The Gradebook App is a React application designed to facilitate live grading sessions for educators. It allows teachers to manage student scores in real-time, providing a seamless experience for both instructors and students.

## Features
- **Live Session Mode**: Start a live session to track student scores in real-time.
- **Record Past Session**: Option to record and review past sessions.
- **Student Score Management**: Add, subtract, and customize scores for each student.
- **Session Controls**: End sessions and manage student lists easily.

## Project Structure
```
gradebook-app
├── src
│   ├── components
│   │   ├── LiveSession
│   │   │   ├── LiveSessionMode.tsx
│   │   │   ├── LiveDashboard.tsx
│   │   │   ├── StudentScoreCard.tsx
│   │   │   ├── SessionControls.tsx
│   │   │   ├── GradeInput.tsx
│   │   │   └── SessionStatus.tsx
│   │   ├── Common
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   └── App.tsx
│   ├── pages
│   │   ├── Dashboard.tsx
│   │   ├── GradeBook.tsx
│   │   └── LiveSession.tsx
│   ├── types
│   │   ├── index.ts
│   │   └── student.ts
│   ├── hooks
│   │   ├── useLiveSession.ts
│   │   └── useGrades.ts
│   ├── utils
│   │   ├── gradeCalculations.ts
│   │   └── helpers.ts
│   ├── styles
│   │   └── index.css
│   ├── index.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Installation
To get started with the Gradebook App, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd gradebook-app
npm install
```

## Usage
To run the application, use the following command:

```bash
npm start
```

This will start the development server and open the app in your default web browser.

## Components
### LiveSessionMode
- Allows users to choose between starting a live session or recording a past session.

### LiveDashboard
- Displays a grid of `StudentScoreCard` components, showing individual student scores and session controls.

### StudentScoreCard
- Represents each student, allowing score adjustments and displaying current scores.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.