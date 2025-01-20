from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class PredictionRequest(BaseModel):
    age: int
    gender: str
    cholesterol: float
    systolicBP: float
    diastolicBP: float
    smoker: bool

@router.post("/predict")
async def predict_risk(request: PredictionRequest):
    # Replace this with your actual model prediction logic
    prediction = 0.75  # Example risk score
    return {"prediction": prediction}
