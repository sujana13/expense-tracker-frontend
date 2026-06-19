# Expense Tracker Frontend

A React-based frontend application for managing and tracking expenses with analytics dashboards and visual reports.

## Features

* User Login
* Expense Management
* Dashboard Summary
* Category Analytics
* Expense Search
* Expense Filters
* CSV Export
* Responsive UI
* Material UI Components
* Docker Support

## Tech Stack

* React
* Vite
* Material UI
* Axios
* Recharts
* Docker

## Project Structure

```text
src/
├── components/
├── pages/
├── services/
├── hooks/
├── layouts/
└── App.jsx
```

## Install Dependencies

```bash
npm install
```

## Run Application

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Docker Setup

Build and run:

```bash
docker compose up --build
```

Frontend URL:

```text
http://localhost:5173
```

## Available Features

### Authentication

* User Login
* JWT Token Management

### Expense Management

* Create Expense
* Edit Expense
* Delete Expense
* View Expense List

### Analytics

* Dashboard Summary Cards
* Category Distribution Chart
* Recent Expenses

### Search & Filter

* Search by Description
* Filter by Category
* Filter by Date Range

### Reports

* CSV Export

## Author

Sujana Nagaraj



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
