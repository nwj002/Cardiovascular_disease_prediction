# Cardiovascular Disease Risk Prediction Model

## Project Overview
This repository contains the machine learning model developed to predict the 10-year risk of cardiovascular disease (CVD) based on patient data. The project utilizes Python, FastAPI for the backend, React for the frontend, and integrates the Gemini API to enhance user interaction through an AI-driven chatbot.

### Technologies Used
- **Python**: For data processing and machine learning.
- **FastAPI**: Used to create a RESTful API for the model.
- **React**: For building the interactive user dashboard.
- **Jupyter Notebook**: For initial data exploration and analysis.
- **Gemini API**: Powers the AI chatbot for interactive user engagement and personalized health advice.

## Model Description
The model employs a Random Forest Classifier trained on the Framingham Heart Study dataset to predict the risk of developing CVD within the next 10 years. It considers various factors such as age, cholesterol levels, blood pressure, and smoking habits.

## Installation
To set up this project locally, follow these steps:

1. **Clone the Repository:**
   git clone https://github.com/nwj002/Cardiovascular_disease_prediction.git
   cd Cardiovascular_disease_prediction

2. **Install Dependencies:**
    pip install -r requirements.txt
    
3. **Run the API:**
    python -m uvicorn src.app.main:app --host 0.0.0.0 --port 3000 --reload

4. **Start the React Application:**
    npm install
    npm start

## Usuage
After starting the API and React application, navigate to http://localhost:3000 to access the web interface. Input the necessary patient data to receive the CVD risk prediction and interact with the AI-powered chatbot to get personalized health recommendations.

## Gemini API Integration
The Gemini API is utilized to power an AI chatbot within the React application, providing users with an interactive way to understand their CVD risk predictions better. The chatbot offers guidance, answers questions related to cardiovascular health, and supports user engagement with AI-generated responses.

## Contributing
Contributions to this project are welcome. Please fork the repository and submit a pull request with your updates.


