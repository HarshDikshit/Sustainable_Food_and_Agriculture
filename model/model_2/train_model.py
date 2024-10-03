import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import make_pipeline
from sklearn.metrics import accuracy_score, confusion_matrix
from imblearn.over_sampling import SMOTE
from collections import Counter
import pickle

# Load your data here
data = pd.read_csv('Fertilizer.csv')

continuous_data_cols = ["Temperature", "Humidity", "Moisture", "Nitrogen", "Phosphorous"]
categorical_data_cols = ["Soil", "Crop"]

# Encode categorical variables
soil_type_label_encoder = LabelEncoder()
data["Soil"] = soil_type_label_encoder.fit_transform(data["Soil"])

crop_type_label_encoder = LabelEncoder()
data["Crop"] = crop_type_label_encoder.fit_transform(data["Crop"])

fertname_label_encoder = LabelEncoder()
data["Fertilizer"] = fertname_label_encoder.fit_transform(data["Fertilizer"])

# Create dictionaries for later use
croptype_dict = {i: crop_type_label_encoder.inverse_transform([i])[0] for i in range(len(data["Crop"].unique()))}
soiltype_dict = {i: soil_type_label_encoder.inverse_transform([i])[0] for i in range(len(data["Soil"].unique()))}
fertname_dict = {i: fertname_label_encoder.inverse_transform([i])[0] for i in range(len(data["Fertilizer"].unique()))}

# Prepare features and target
X = data[data.columns[:-1]]
y = data[data.columns[-1]]

# Apply SMOTE for class balancing
upsample = SMOTE()
X, y = upsample.fit_resample(X, y)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X.values, y, test_size=0.2, random_state=0)

# Create and train the model
rf_pipeline = make_pipeline(StandardScaler(), RandomForestClassifier(random_state=18))
rf_pipeline.fit(X_train, y_train)

# Evaluate the model
train_predictions = rf_pipeline.predict(X_train)
test_predictions = rf_pipeline.predict(X_test)

print(f"Train Accuracy: {accuracy_score(y_train, train_predictions)*100:.2f}%")
print(f"Test Accuracy: {accuracy_score(y_test, test_predictions)*100:.2f}%")

# Save the model and encoders
pickle.dump(rf_pipeline, open("rf_pipeline.pkl", "wb"))
pickle.dump(soil_type_label_encoder, open("soil_type_encoder.pkl", "wb"))
pickle.dump(crop_type_label_encoder, open("crop_type_encoder.pkl", "wb"))
pickle.dump(fertname_label_encoder, open("fertname_encoder.pkl", "wb"))
pickle.dump(croptype_dict, open("croptype_dict.pkl", "wb"))
pickle.dump(soiltype_dict, open("soiltype_dict.pkl", "wb"))
pickle.dump(fertname_dict, open("fertname_dict.pkl", "wb"))