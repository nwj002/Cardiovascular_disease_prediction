import unittest

import pandas as pd
from sklearn.model_selection import train_test_split

from data.data_preprocessing import preprocess_data
from models.train_model import train_model


class TestModelTraining(unittest.TestCase):
    
    def test_data_preprocessing(self):
        # Test data preprocessing function
        df = pd.read_csv('data/processed/framingham.csv')
        processed_df = preprocess_data(df)
        self.assertEqual(processed_df.isnull().sum().sum(), 0)  # No missing values
    
    def test_model_training(self):
        # Test model training
        df = pd.read_csv('data/processed/framingham.csv')
        X = df.drop('tenyearchd', axis=1)
        y = df['tenyearchd']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        model = train_model(X_train, y_train)
        self.assertIsNotNone(model)  # Model should not be None

    def test_model_prediction(self):
        # Test model prediction
        df = pd.read_csv('data/processed/framingham.csv')
        X = df.drop('tenyearchd', axis=1)
        y = df['tenyearchd']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        model = train_model(X_train, y_train)
        predictions = model.predict(X_test)
        self.assertEqual(len(predictions), len(y_test))  # Predictions should match the test set size

if __name__ == '__main__':
    unittest.main()
