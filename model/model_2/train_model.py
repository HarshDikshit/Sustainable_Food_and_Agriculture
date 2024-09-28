import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib


data = pd.read_csv('Fertilizer.csv')

X = data[['Temperature', 'Humidity', 'Moisture', 'Soil', 'Crop', 'Nitrogen', 'Potassium', 'Phosphorous']]
y = data['Fertilizer']

#categorical variables
le_soil = LabelEncoder()
le_crop = LabelEncoder()
X['Soil'] = le_soil.fit_transform(X['Soil'])
X['Crop'] = le_crop.fit_transform(X['Crop'])


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)


model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)


y_pred = model.predict(X_test_scaled)


accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

joblib.dump(model, 'fertilizer_model.joblib')
joblib.dump(scaler, 'scaler.joblib')
joblib.dump(le_soil, 'le_soil.joblib')
joblib.dump(le_crop, 'le_crop.joblib')