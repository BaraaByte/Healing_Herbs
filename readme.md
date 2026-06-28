# HealingHerbs Frontend
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/BaraaByte/HealingHerbs-Frontend)

This repository contains the frontend for HealingHerbs, a medical platform providing reliable information on natural herbal remedies, the benefits of medicinal plants, and best practices for improving health and quality of life. The application is built with React and Vite, featuring a bilingual interface supporting Arabic and English.

## Key Features

*   **User Dashboard**: A personalized space for users to manage their profile, appointments, and medical tests. It includes health statistics tracking for sugar levels and blood pressure.
*   **Herbal Library**: An extensive database of herbs with detailed information on their uses, benefits, and potential side effects.
*   **Community Hub**: An interactive section where users can share and discover recipes, and ask or answer questions related to herbal medicine.
*   **AI Chatbot**: An intelligent assistant to answer user queries and provide guidance on herbal remedies.
*   **Heritage Stories**: A collection of traditional stories related to the historical use of herbs.
*   **Authentication**: Secure user registration and login system with JWT-based authentication.
*   **Bilingual Support**: Fully internationalized UI supporting both Arabic (RTL) and English (LTR), with language preference saved locally.
*   **Health Reporting**: Generate and view a comprehensive health report based on user data.

## Tech Stack

*   **Framework**: React 19
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS
*   **Routing**: React Router
*   **State Management**: React Context API
*   **HTTP Client**: Axios
*   **Form Management**: Formik & Yup
*   **Internationalization**: i18next & react-i18next
*   **Data Visualization**: Recharts
*   **Linting**: ESLint

## Project Structure

The project follows a component-based architecture organized by features.

```
src
├── assets/         # Static assets (images, logos)
├── components/     # Reusable and feature-specific React components
│   ├── Auth/       # Login, Register, Protected Routes
│   ├── Community/  # Recipes and Questions sections
│   ├── Dashboard/  # User profile, stats, and management
│   ├── Library/    # Herb browsing and details
│   └── ...         # Other feature components
├── context/        # React context providers for global state
├── i18n/           # Internationalization configuration and locales
└── utils/          # Utility functions, including Axios instance
```

## Environment Setup

To run this project, you need to set up environment variables. Create a `.env.development` file in the root directory and add the following variables, adjusting the values as needed for your local setup.

```
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=Healing Herbs
VITE_DEFAULT_LANGUAGE=ar
```

## Getting Started

Follow these steps to get the development environment running on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/baraabyte/healingherbs-frontend.git
    cd healingherbs-frontend
    ```

2.  **Install dependencies:**
    This project uses `pnpm`, but you can use `npm` or `yarn`.
    ```bash
    # Using npm
    npm install

    # Using pnpm
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.development` file by copying `.env.example` and fill in the required API endpoint.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Available Scripts

The following scripts are available in the `package.json`:

*   `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
*   `npm run build`: Bundles the application for production into the `dist/` directory.
*   `npm run lint`: Lints the project files using ESLint.
*   `npm run preview`: Serves the production build locally for testing.
*   `npm run deploy`: Deploys the `dist` directory to GitHub Pages.
