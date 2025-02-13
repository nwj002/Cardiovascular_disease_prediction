import React, { useState } from 'react';
import './cvdrisk.css'; // Optional: import a CSS file for styling

const CVDRisk = () => {
    // State variables for each input field
    const [male, setMale] = useState(0);
    const [age, setAge] = useState('');
    const [education, setEducation] = useState('');
    const [currentSmoker, setCurrentSmoker] = useState(0);
    const [cigsPerDay, setCigsPerDay] = useState('');
    const [BPMeds, setBPMeds] = useState('');
    const [prevalentStroke, setPrevalentStroke] = useState(0);
    const [prevalentHyp, setPrevalentHyp] = useState(0);
    const [diabetes, setDiabetes] = useState(0);
    const [totChol, setTotChol] = useState('');
    const [sysBP, setSysBP] = useState('');
    const [diaBP, setDiaBP] = useState('');
    const [BMI, setBMI] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [glucose, setGlucose] = useState('');

    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Construct the data payload
        const data = {
            male: parseInt(male),
            age: parseInt(age),
            education: parseInt(education),
            currentSmoker: parseInt(currentSmoker),
            cigsPerDay: parseFloat(cigsPerDay),
            BPMeds: parseFloat(BPMeds),
            prevalentStroke: parseFloat(prevalentStroke),
            prevalentHyp: parseFloat(prevalentHyp),
            diabetes: parseFloat(diabetes),
            totChol: parseFloat(totChol),
            sysBP: parseFloat(sysBP),
            diaBP: parseFloat(diaBP),
            BMI: parseFloat(BMI),
            heartRate: parseFloat(heartRate),
            glucose: parseFloat(glucose)
        };

        try {
            const response = await fetch('http://localhost:3000/predict/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok) {
                setPrediction(result);
                setError(null);
            } else {
                setError(result.error);
                setPrediction(null);
            }
        } catch (err) {
            setError("Prediction error: " + err.message);
            setPrediction(null);
        }
    };

    return (
        <div className="dashboard">
            <h1>CVD Risk Prediction Dashboard</h1>
            <form onSubmit={handleSubmit} className="cvd-form">
                <div className="form-group">
                    <label>Male (1 for male, 0 for female):</label>
                    <input type="number" value={male} onChange={(e) => setMale(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Education:</label>
                    <input type="number" value={education} onChange={(e) => setEducation(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Current Smoker (1 for yes, 0 for no):</label>
                    <input type="number" value={currentSmoker} onChange={(e) => setCurrentSmoker(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Cigs Per Day:</label>
                    <input type="number" step="0.1" value={cigsPerDay} onChange={(e) => setCigsPerDay(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>BPMeds:</label>
                    <input type="number" step="0.1" value={BPMeds} onChange={(e) => setBPMeds(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Prevalent Stroke (1 for yes, 0 for no):</label>
                    <input type="number" value={prevalentStroke} onChange={(e) => setPrevalentStroke(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Prevalent Hypertension (1 for yes, 0 for no):</label>
                    <input type="number" value={prevalentHyp} onChange={(e) => setPrevalentHyp(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Diabetes (1 for yes, 0 for no):</label>
                    <input type="number" value={diabetes} onChange={(e) => setDiabetes(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Total Cholesterol:</label>
                    <input type="number" step="0.1" value={totChol} onChange={(e) => setTotChol(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Systolic BP:</label>
                    <input type="number" step="0.1" value={sysBP} onChange={(e) => setSysBP(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Diastolic BP:</label>
                    <input type="number" step="0.1" value={diaBP} onChange={(e) => setDiaBP(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>BMI:</label>
                    <input type="number" step="0.1" value={BMI} onChange={(e) => setBMI(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Heart Rate:</label>
                    <input type="number" step="0.1" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Glucose:</label>
                    <input type="number" step="0.1" value={glucose} onChange={(e) => setGlucose(e.target.value)} required />
                </div>
                <button type="submit" className="submit-button">Predict CVD Risk</button>
            </form>

            {prediction && (
                <div className="prediction-results">
                    <h2>Prediction Results</h2>
                    <p>Best Model Probability: {prediction.best_model_probability.toFixed(2)}%</p>
                    <p>Final Model Probability: {prediction.final_model_probability.toFixed(2)}%</p>
                    <p>Average Probability: {prediction.average_probability.toFixed(2)}%</p>
                </div>
            )}

            {error && (
                <div className="error">
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default CVDRisk;
