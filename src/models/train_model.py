import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (accuracy_score, classification_report,
                             confusion_matrix)
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load the preprocessed datasets
framingham_data = pd.read_csv('D:/healthcare_analytics_project/data/processed/framingham_preprocessed.csv')

# Define features and target variable
features = ['age', 'education', 'currentsmoker', 'cigsperday', 'bpmeds', 'prevalentstroke', 
            'prevalenthyp', 'diabetes', 'totchol', 'sysbp', 'diabp', 'bmi', 'heartrate', 'glucose']
target = 'tenyearchd'

# Split the data into features and target
X = framingham_data[features]
y = framingham_data[target]

# Split the data into training and testing sets (80% training, 20% testing)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Feature scaling (Standardization)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Initialize and train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test_scaled)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.4f}")
print("Classification Report:")
print(classification_report(y_test, y_pred))
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Save the trained model and scaler for future use
joblib.dump(model, 'D:/healthcare_analytics_project/models/trained_model.pkl')
joblib.dump(scaler, 'D:/healthcare_analytics_project/models/scaler.pkl')
