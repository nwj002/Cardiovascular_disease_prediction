from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import joblib
import numpy as np
import os
import traceback
import pandas as pd
import uvicorn

app = FastAPI(title="CVD Risk Prediction API")

# Serve static files (e.g., HTML, CSS, JS) from the "src/frontend" directory
app.mount("/static", StaticFiles(directory="src/frontend"), name="static")

# Define the input data schema using Pydantic
class UserData(BaseModel):
    male: int
    age: int
    education: int
    currentSmoker: int
    cigsPerDay: float
    BPMeds: float
    prevalentStroke: float
    prevalentHyp: float
    diabetes: float
    totChol: float
    sysBP: float
    diaBP: float
    BMI: float
    heartRate: float
    glucose: float

# Paths to your saved models and preprocessor
model_dir = os.path.abspath('D:/healthcare_analytics_project/models/')
best_model_path = os.path.join(model_dir, 'best_model.pkl')
final_model_path = os.path.join(model_dir, 'final_model.pkl')
preprocessor_path = os.path.join(model_dir, 'final_preprocessor.pkl')

# Attempt to load the models and preprocessor
try:
    best_model = joblib.load(best_model_path)
    final_model = joblib.load(final_model_path)
    preprocessor = joblib.load(preprocessor_path)
    print("✅ Models and preprocessor loaded successfully")
except Exception as e:
    print(f"❌ Error loading models: {str(e)}")
    traceback.print_exc()

@app.get("/")
async def main():
    """
    Serves the main frontend (index.html).
    """
    return FileResponse('src/frontend/index.html')

@app.post("/predict/")
def predict_cvd_risk(data: UserData):
    try:
        # Convert the incoming data to a dictionary, then to a DataFrame
        data_dict = data.dict()
        input_df = pd.DataFrame([data_dict])

        print("✅ Received input data as DataFrame:")
        print(input_df)

        # Transform input using the same preprocessor used during training
        input_data_transformed = preprocessor.transform(input_df)

        # Get probability predictions from both models (inverting probabilities)
        best_prediction = 1 - best_model.predict_proba(input_data_transformed)[0, 1]
        final_prediction = 1 - final_model.predict_proba(input_data_transformed)[0, 1]

        # Multiply probabilities by 100 to convert to percentage
        best_prediction_percent = best_prediction * 100
        final_prediction_percent = final_prediction * 100
        average_prediction_percent = (best_prediction_percent + final_prediction_percent) / 2

        print(f"✅ Best Model Probability (CVD risk): {best_prediction_percent:.2f}%, "
              f"Final Model Probability (CVD risk): {final_prediction_percent:.2f}%, "
              f"Average: {average_prediction_percent:.2f}%")

        # Return probabilities as percentages
        return {
            "best_model_probability": float(best_prediction_percent),
            "final_model_probability": float(final_prediction_percent),
            "average_probability": float(average_prediction_percent)
        }

    except Exception as e:
        print("❌ Prediction Error:", str(e))
        traceback.print_exc()
        return {"error": f"Prediction processing failed: {str(e)}"}

# (Optional) Print feature importances to verify model interpretability
try:
    print("\nFeature Importances (Best Model):")
    print(best_model.feature_importances_)
    print("\nFeature Importances (Final Model):")
    print(final_model.feature_importances_)
except AttributeError:
    print("\n❌ One of the loaded models does not have 'feature_importances_'. "
          "This is normal for some model types (e.g., LogisticRegression).")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3000, reload=True)
