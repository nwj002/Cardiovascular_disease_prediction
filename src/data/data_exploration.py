import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns


def explore_data(processed_data_path):
    # Load the preprocessed data
    framingham_data = pd.read_csv(processed_data_path + 'framingham_preprocessed.csv')

    # Display basic information about the dataset
    print("Basic Information about the Dataset:")
    print(framingham_data.info())

    # Display the first few rows of the dataset
    print("\nFirst few rows of the dataset:")
    print(framingham_data.head())

    # Descriptive statistics for numerical features
    print("\nDescriptive Statistics:")
    print(framingham_data.describe())

    # Distribution of the target variable (TenYearCHD)
    plt.figure(figsize=(6, 4))
    sns.countplot(x='TenYearCHD', data=framingham_data)
    plt.title('Distribution of TenYearCHD')
    plt.xlabel('TenYearCHD')
    plt.ylabel('Count')
    plt.show()

    # Correlation heatmap for numerical features
    plt.figure(figsize=(12, 8))
    correlation_matrix = framingham_data.corr()
    sns.heatmap(correlation_matrix, annot=True, fmt='.2f', cmap='coolwarm', cbar=True)
    plt.title('Correlation Heatmap')
    plt.show()

    # Pairplot for selected features
    selected_features = ['age', 'cigsPerDay', 'BPMeds', 'totChol', 'sysBP', 'BMI', 'heartRate', 'glucose', 'TenYearCHD']
    sns.pairplot(framingham_data[selected_features], hue='TenYearCHD', palette='coolwarm')
    plt.suptitle('Pairplot of Selected Features', y=1.02)
    plt.show()

if __name__ == "__main__":
    processed_data_path = 'D:/healthcare_analytics_project/data/processed/'
    explore_data(processed_data_path)
