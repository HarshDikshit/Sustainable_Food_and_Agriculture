import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib


data = pd.read_csv('Crop_recommendation.csv')


X = data.drop('crop', axis=1)
y = data['crop']


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

#scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

#train
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)


y_pred = model.predict(X_test_scaled)

#Evaluate
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy}")
print(classification_report(y_test, y_pred))

#important features
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

print("Feature Importances:")
print(feature_importance)


joblib.dump(model, 'crop_prediction_model.joblib')
joblib.dump(scaler, 'scaler.joblib')


def predict_crops(nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall, top_n=5):
    input_data = np.array([[nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall]])
    input_data_scaled = scaler.transform(input_data)
    
    # Get probability estimates for all crops
    probabilities = model.predict_proba(input_data_scaled)[0]
    
    #names
    crop_names = model.classes_
    
    
    crop_probabilities = list(zip(crop_names, probabilities))
    
    #list in descending order
    crop_probabilities.sort(key=lambda x: x[1], reverse=True)
    
    
    return crop_probabilities[:top_n]

#ex
if __name__ == "__main__":
    
    nitrogen = 90
    phosphorus = 42
    potassium = 43
    temperature = 20.87
    humidity = 82.00
    ph = 6.5
    rainfall = 202.935

    top_crops = predict_crops(nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall)
    print("\nTop 5 predicted crops:")
    for crop, probability in top_crops:
        print(f"{crop}: {probability:.2%}")