import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler


def preprocess_data(raw_data_path, processed_data_path):
    # Load the raw data
    framingham_data = pd.read_csv(raw_data_path + 'framingham.csv')
    
    # Strip any leading/trailing spaces from column names
    framingham_data.columns = framingham_data.columns.str.strip()

    # Check the column names to ensure they're as expected
    print("Column Names in the Dataset:")
    print(framingham_data.columns)

    # Handle Missing Values: Drop rows with missing values
    framingham_data = framingham_data.dropna()
    
    # Feature Engineering: Create Age Group
    framingham_data['age_group'] = pd.cut(
        framingham_data['age'], bins=[0, 30, 40, 50, 60, 100], labels=['0-30', '30-40', '40-50', '50-60', '60+']
    )
    
    # Encode Categorical Variables (education)
    label_encoder = LabelEncoder()
    framingham_data['education'] = label_encoder.fit_transform(framingham_data['education'])
    
    # Feature Scaling: Standardize the Numerical Features
    numerical_features = ['age', 'cigsPerDay', 'BPMeds', 'prevalentStroke', 'prevalentHyp', 'diabetes', 
                          'totChol', 'sysBP', 'diaBP', 'BMI', 'heartRate', 'glucose']
    
    # Check if all columns exist in the DataFrame
    missing_columns = [col for col in numerical_features if col not in framingham_data.columns]
    if missing_columns:
        print(f"Missing columns: {missing_columns}")
        return
    
    # Apply scaling only to the available numerical features
    scaler = StandardScaler()
    framingham_data[numerical_features] = scaler.fit_transform(framingham_data[numerical_features])
    
    # Save the preprocessed data
    framingham_data.to_csv(processed_data_path + 'framingham_preprocessed.csv', index=False)
    print(f"Preprocessed data saved to {processed_data_path}framingham_preprocessed.csv")

if __name__ == "__main__":
    raw_data_path = 'D:/healthcare_analytics_project/data/raw/'
    processed_data_path = 'D:/healthcare_analytics_project/data/processed/'
    preprocess_data(raw_data_path, processed_data_path)
