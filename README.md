# ElectAI

ElectAI is a Machine Learning-powered web application that predicts voter turnout across U.S. states based on demographic and historical data. It features an interactive React frontend and a Flask backend integrated with a Scikit-learn linear regression model. Here are the inputs:
- Year
- Percent with Bachelors Degree or higher
- Average Income
- Percent of Population that is White
- Average Age
  
<img width="1710" alt="electai" src="https://github.com/user-attachments/assets/310f420b-ea14-4daa-89d5-e6814e6f38ed" />

## Prerequisites

To run the project locally, you need:

- **Python 3.8+** installed on your machine
- **Node.js 14+** and **npm** (or **yarn**) installed
- A Python virtual environment (optional but recommended)

## Instructions

### Backend Setup

1. **Navigate to the Backend Directory**:
   ```bash
   cd <repository-folder>/backend
   ```

2. **Create a Virtual Environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate the Virtual Environment**:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the Flask Server**:
   ```bash
   python server.py
   ```
   The backend will start on `http://127.0.0.1:5000` by default.

### Frontend Setup

1. **Navigate to the Frontend Directory**:
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   Or, if you're using yarn:
   ```bash
   yarn install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Or, if you're using yarn:
   ```bash
   yarn run dev
   ```
   The frontend will start on `http://localhost:3000` by default.

### Connecting Frontend and Backend

Ensure the Flask backend is running before starting the React frontend. The React app is configured to send API requests to the Flask server at `http://127.0.0.1:5000`.

### Testing the Application

1. Open your browser and navigate to `http://localhost:3000`.
2. Interact with the inputs and observe predictions generated by the Flask backend.
