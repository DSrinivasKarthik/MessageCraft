# MessageCraft

A modern web application that uses AI to generate emails and messages based on user-provided context, tone, and details. Built with Next.js and integrated with the Groq API for powerful language generation.

![Screenshot of MessageCraft](screenshot.png)

## Table of Contents

*   [Features](#features)
*   [Technologies Used](#technologies-used)
*   [Getting Started](#getting-started)
*   [Usage](#usage)
*   [Development](#development)
*   [Project Status & Checklist](#project-status--checklist)
*   [Deployment](#deployment)

## Features

*   **AI-Powered Message Generation:** Generates emails and messages using the Groq API.
*   **Customizable Tone:** Users can select the desired tone (formal, informal, friendly, urgent).
*   **Context and Details Input:** Allows users to provide context and key details to guide the message generation.
*   **Modern User Interface:** Clean and intuitive user interface with smooth animations and transitions.
*   **Dark Mode Support:** Automatic dark mode detection with manual toggle option.
*   **Responsive Design:** Fully responsive layout that works on all devices.
*   **Error Handling:** Robust error handling with user-friendly error messages.
*   **Loading States:** Beautiful loading animations and transitions.
*   **Accessibility:** Built with accessibility in mind, following WCAG guidelines.

## Technologies Used

*   [Next.js](https://nextjs.org/): React framework for building server-rendered and statically generated web applications.
*   [React](https://reactjs.org/): JavaScript library for building user interfaces.
*   [Groq API](https://console.groq.com/docs/): Powerful API for language generation.
*   [TypeScript](https://www.typescriptlang.org/): Superset of JavaScript that adds static typing.
*   [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework.
*   [Framer Motion](https://www.framer.com/motion/): Production-ready motion library for React.
*   [Netlify](https://www.netlify.com/): Platform for deploying and hosting web applications.
*   [Git](https://git-scm.com/): Version control system.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
*   [Git](https://git-scm.com/)
*   A Groq API key (You'll need a Groq account to obtain one)

### Installation

1.  Clone the repository:
    ```bash
    git clone [repository-url]
    ```

2.  Navigate to the project directory:
    ```bash
    cd messagecraft
    ```

3.  Install dependencies:
    ```bash
    npm install  # or yarn install
    ```

### Environment Variables

Create a `.env.local` file in the root of your project and add your Groq API key:

```
GROQ_API_KEY=your_actual_groq_api_key
```

**Important:** Do not commit `.env.local` to your Git repository. It's already included in the `.gitignore` file.

## Usage

1.  Start the development server:
    ```bash
    npm run dev  # or yarn dev
    ```

2.  Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Development

*   **Branching:** Use feature branches for new features or bug fixes: `git checkout -b feature/new-feature`
*   **Committing:** Use clear and concise commit messages following the Conventional Commits standard.
*   **Pull Requests:** Create pull requests for code reviews before merging changes into the `main` branch.

## Project Status & Checklist

### Current Status
- ✅ Basic Next.js setup with TypeScript
- ✅ Groq API integration
- ✅ Modern UI implementation with animations
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Loading states and transitions
- ✅ Error handling
- ✅ Environment configuration

### Development Checklist

#### Core Features
- [ ] Implement message history storage
- [ ] Add message templates feature
- [ ] Implement message categories
- [ ] Add support for multiple languages
- [ ] Implement message length control
- [ ] Add message preview functionality

#### UI/UX Improvements
- [x] Add dark mode support
- [x] Implement responsive design for mobile devices
- [x] Add loading animations
- [x] Improve error message display
- [x] Add success notifications
- [ ] Implement keyboard shortcuts

#### Technical Improvements
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Implement proper logging
- [ ] Add performance monitoring
- [x] Implement proper TypeScript types
- [ ] Add API rate limiting
- [ ] Implement proper caching strategy

#### Documentation
- [x] Add API documentation
- [ ] Create user guide
- [x] Add contribution guidelines
- [ ] Create architecture documentation
- [x] Add deployment documentation

#### Security
- [ ] Implement proper input validation
- [ ] Add rate limiting
- [x] Implement proper error handling
- [ ] Add security headers
- [ ] Implement proper API key management

#### Performance
- [ ] Optimize bundle size
- [ ] Implement proper code splitting
- [ ] Add performance monitoring
- [ ] Optimize API calls
- [ ] Implement proper caching

## Deployment

The frontend of this application is designed to be deployed on Netlify.

1.  Create a Netlify account and link it to your GitHub repository.
2.  Netlify will automatically deploy your site on pushes to the `main` branch.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
