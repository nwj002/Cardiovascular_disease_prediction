// src/App.js
import React, { useState } from 'react';
import ChatBot from './ChatBot';
import Footer from './Footer';

function App() {
  // State variables for inputs
  const [male, setMale] = useState("1"); // "1"=Male, "0"=Female
  const [age, setAge] = useState('');
  const [education, setEducation] = useState("");
  const [currentSmoker, setCurrentSmoker] = useState("0");
  const [cigsPerDay, setCigsPerDay] = useState('');
  const [BPMeds, setBPMeds] = useState("0");
  const [prevalentStroke, setPrevalentStroke] = useState("0");
  const [prevalentHyp, setPrevalentHyp] = useState("0");
  const [diabetes, setDiabetes] = useState("0");
  const [totChol, setTotChol] = useState('');
  const [sysBP, setSysBP] = useState('');
  const [diaBP, setDiaBP] = useState('');
  const [BMI, setBMI] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [glucose, setGlucose] = useState('');

  // State for prediction results and errors
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // Input validation to prevent negative values
  const handleNumberInput = (e, setter) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && !isNaN(value))) {
      setter(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // If current smoker = No, automatically set cigsPerDay to 0
    const cigs = currentSmoker === "1" ? parseFloat(cigsPerDay) : 0;

    const data = {
      male: parseInt(male),
      age: parseInt(age),
      education: parseInt(education),
      currentSmoker: parseInt(currentSmoker),
      cigsPerDay: cigs,
      BPMeds: parseFloat(BPMeds),
      prevalentStroke: parseFloat(prevalentStroke),
      prevalentHyp: parseFloat(prevalentHyp),
      diabetes: parseFloat(diabetes),
      totChol: parseFloat(totChol),
      sysBP: parseFloat(sysBP),
      diaBP: parseFloat(diaBP),
      BMI: parseFloat(BMI),
      heartRate: parseFloat(heartRate),
      glucose: parseFloat(glucose),
    };

    try {
      const response = await fetch('http://localhost:3000/predict/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
    <div style={styles.appContainer}>
      {/* Heading */}
      <header style={styles.header}>
        <h1 style={styles.headerText}>CVD Risk Prediction</h1>
      </header>

      {/* Main content: Two columns */}
      <div style={styles.mainContent}>
        {/* Left Column: User Health Data Form */}
        <section style={styles.leftColumn}>
          <h2 style={styles.formTitle}>User Health Data</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Row 1: Gender & Age */}
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>What is your gender?</label>
                <div style={styles.radioGroup}>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="gender"
                      value="1"
                      checked={male === "1"}
                      onChange={(e) => setMale(e.target.value)}
                    />{" "}
                    Male
                  </label>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="gender"
                      value="0"
                      checked={male === "0"}
                      onChange={(e) => setMale(e.target.value)}
                    />{" "}
                    Female
                  </label>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>What is your age?</label>
                <input
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => handleNumberInput(e, setAge)}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            {/* Row 2: Education & Current Smoker */}
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>What is your highest education level?</label>
                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  style={styles.select}
                  required
                >
                  <option value="" disabled>Select your education</option>
                  <option value="0">No Education</option>
                  <option value="1">Primary</option>
                  <option value="2">Secondary</option>
                  <option value="3">Higher</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Are you a current smoker?</label>
                <div style={styles.radioGroup}>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="currentSmoker"
                      value="1"
                      checked={currentSmoker === "1"}
                      onChange={(e) => setCurrentSmoker(e.target.value)}
                    />{" "}
                    Yes
                  </label>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="currentSmoker"
                      value="0"
                      checked={currentSmoker === "0"}
                      onChange={(e) => setCurrentSmoker(e.target.value)}
                    />{" "}
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* Conditionally show cigsPerDay if user is a current smoker */}
            {currentSmoker === "1" && (
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>How many cigarettes do you smoke per day?</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Enter cigs per day"
                    value={cigsPerDay}
                    onChange={(e) => handleNumberInput(e, setCigsPerDay)}
                    style={styles.input}
                    required
                  />
                </div>
              </div>
            )}

            {/* Row 3: BPMeds & Stroke */}
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Are you on blood pressure medication?</label>
                <div style={styles.radioGroup}>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="BPMeds"
                      value="1"
                      checked={BPMeds === "1"}
                      onChange={(e) => setBPMeds(e.target.value)}
                    />{" "}
                    Yes
                  </label>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="BPMeds"
                      value="0"
                      checked={BPMeds === "0"}
                      onChange={(e) => setBPMeds(e.target.value)}
                    />{" "}
                    No
                  </label>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Have you ever had a stroke?</label>
                <div style={styles.radioGroup}>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="stroke"
                      value="1"
                      checked={prevalentStroke === "1"}
                      onChange={(e) => setPrevalentStroke(e.target.value)}
                    />{" "}
                    Yes
                  </label>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="stroke"
                      value="0"
                      checked={prevalentStroke === "0"}
                      onChange={(e) => setPrevalentStroke(e.target.value)}
                    />{" "}
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* Row 4: Hypertension & Diabetes */}
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Do you have hypertension?</label>
                <div style={styles.radioGroup}>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="prevalentHyp"
                      value="1"
                      checked={prevalentHyp === "1"}
                      onChange={(e) => setPrevalentHyp(e.target.value)}
                    />{" "}
                    Yes
                  </label>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="prevalentHyp"
                      value="0"
                      checked={prevalentHyp === "0"}
                      onChange={(e) => setPrevalentHyp(e.target.value)}
                    />{" "}
                    No
                  </label>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Do you have diabetes?</label>
                <div style={styles.radioGroup}>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="diabetes"
                      value="1"
                      checked={diabetes === "1"}
                      onChange={(e) => setDiabetes(e.target.value)}
                    />{" "}
                    Yes
                  </label>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="diabetes"
                      value="0"
                      checked={diabetes === "0"}
                      onChange={(e) => setDiabetes(e.target.value)}
                    />{" "}
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* Row 5: TotChol & SysBP */}
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>What is your total cholesterol?</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Enter your cholesterol"
                  value={totChol}
                  onChange={(e) => handleNumberInput(e, setTotChol)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>What is your systolic BP?</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Enter systolic BP"
                  value={sysBP}
                  onChange={(e) => handleNumberInput(e, setSysBP)}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            {/* Row 6: DiaBP & BMI */}
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>What is your diastolic BP?</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Enter diastolic BP"
                  value={diaBP}
                  onChange={(e) => handleNumberInput(e, setDiaBP)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>What is your BMI?</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Enter your BMI"
                  value={BMI}
                  // onChange={(e) => setBMI(e.target.value)}
                  onChange={(e) => handleNumberInput(e, setBMI)}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            {/* Row 7: HeartRate & Glucose */}
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>What is your heart rate?</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Enter your heart rate"
                  value={heartRate}
                  // onChange={(e) => setHeartRate(e.target.value)}
                  onChange={(e) => handleNumberInput(e, setHeartRate)}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>What is your glucose level?</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="Enter your glucose level"
                  value={glucose}
                  // onChange={(e) => setGlucose(e.target.value)}
                  onChange={(e) => handleNumberInput(e, setGlucose)}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" style={styles.submitButton}>
              Predict CVD Risk
            </button>
          </form>
        </section>

        {/* Right Column: Results & ChatBot */}
        <section style={styles.rightColumn}>
          <div style={styles.resultsContainer}>
            <h2 style={styles.sectionTitle}>Results</h2>
            {prediction ? (
              <div>
                <p>
                  The chances of getting Cardio Vascular disease risk in 10 years is{" "}
                  {prediction.average_probability.toFixed(2)}%
                </p>
              </div>
            ) : (
              <p style={styles.placeholderText}>No results yet. Please fill out the form.</p>
            )}
            {error && (
              <div style={styles.errorBox}>
                <h3>Error</h3>
                <p>{error}</p>
              </div>
            )}
          </div>
          {/* Pass the average prediction to ChatBot for context */}
          <ChatBot riskPrediction={prediction ? prediction.average_probability.toFixed(2) : 0} />
        </section>


      </div>
      <Footer />

    </div>
  );
}

const styles = {
  appContainer: {
    backgroundColor: '#F8F6F0', // Light neutral
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#13361C',
    padding: '1rem',
  },
  headerText: {
    margin: 0,
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: '1.7rem',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 1.5fr',
    gap: '1rem',
    padding: '1rem',
    flex: 1,
  },
  leftColumn: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formTitle: {
    marginTop: 0,
    color: '#13361C',
    marginBottom: '1rem',
    fontSize: '1.2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: '600',
    marginBottom: '0.4rem',
    color: '#13361C',
  },
  radioGroup: {
    display: 'flex',
    gap: '1rem',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    color: '#13361C',
  },
  input: {
    padding: '0.6rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
  },
  select: {
    padding: '0.6rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  submitButton: {
    marginTop: '0.5rem',
    padding: '0.8rem',
    backgroundColor: '#CC9A48',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  resultsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    padding: '1rem',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    marginTop: 0,
    color: '#13361C',
  },
  placeholderText: {
    color: '#555',
  },
  errorBox: {
    marginTop: '1rem',
    backgroundColor: '#ffecec',
    borderRadius: '4px',
    padding: '0.8rem',
    color: '#d8000c',
  },
};

export default App;
