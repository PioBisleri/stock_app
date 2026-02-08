# 📈 Stock Manager & Visualizer [Beta]

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
![React](https://img.shields.io/badge/react-18.2-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688.svg)
![Vite](https://img.shields.io/badge/vite-5.0-646CFF.svg)

A modern, high-performance application for tracking, visualizing, and predicting stock market trends. Built with a robust **FastAPI** backend and a dynamic **React** frontend, this tool empowers users with real-time data analysis and predictive insights.

---

## 🚀 Features

- **Real-time Visualization**: Interactive charts and graphs powered by Recharts.
- **Stock Prediction**: Machine learning models (Scikit-learn) for trend analysis.
- **Portfolio Management**: Track your investments and monitor performance.
- **Modern UI**: sleek, responsive interface built with Tailwind CSS and Framer Motion.
- **Secure Backend**: Efficient API handling with FastAPI and SQLModel.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State/Icons**: Lucide React, Framer Motion
- **HTTP Client**: Axios

### Backend
- **Framework**: FastAPI
- **Language**: Python
- **Database**: SQLModel (SQLite)
- **Data Analysis**: Pandas, Scikit-learn
- **Server**: Uvicorn

---

## 📦 Installation & Setup

Follow these steps to get the project up and running on your local machine.

### Prerequisites
- **Node.js**: v18+
- **Python**: v3.10+

### 1. Clone the Repository
```bash
git clone https://github.com/PioBisleri/stock_app.git
cd stock_app
```

### 2. Backend Setup
Navigate to the backend directory and set up the Python environment.

```bash
cd backend
python -m venv venv

# Activate Virtual Environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install Dependencies
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory (if required) for your API keys (e.g., Alpha Vantage).

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies.

```bash
cd ../frontend
npm install
```

---

## ⚡ Quick Start

After setting up the prerequisites, you can run the entire application with a single command:

```bash
./run.sh
```

This script will:
1. Activate the backend virtual environment (or create it if missing).
2. Start the FastAPI backend server.
3. Start the React frontend development server.

---

## 🏃 Manual Usage

### Start the Backend
From the `backend` directory (with venv activated):

```bash
uvicorn main:app --reload
````
The API will be available at `http://localhost:8000`.
API Docs: `http://localhost:8000/docs`

### Start the Frontend
From the `frontend` directory:

```bash
npm run dev
```
The application will be running at `http://localhost:5173`.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by the PioBisleri
