import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.preprocessing import StandardScaler
import numpy as np

class CropDemandModel(nn.Module):
    def __init__(self, input_size):
        super(CropDemandModel, self).__init__()
        self.fc1 = nn.Linear(input_size, 64)
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, 1)
        self.relu = nn.ReLU()

    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.relu(self.fc2(x))
        x = self.fc3(x)
        return x

# Load data
X = np.load('X.npy')
y = np.load('y.npy')
crop_encodings = np.load('crop_encodings.npy', allow_pickle=True).item()

# Filter for Rice, Wheat, and Corn
selected_crops = ['Rice', 'Wheat', 'Corn']
selected_crop_indices = [crop_encodings[crop] for crop in selected_crops]
mask = np.isin(X[:, 1], selected_crop_indices)
X = X[mask]
y = y[mask]

print("X shape after filtering:", X.shape)
print("y shape after filtering:", y.shape)

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Convert to PyTorch tensors
X_tensor = torch.FloatTensor(X_scaled)
y_tensor = torch.FloatTensor(y).reshape(-1, 1)

# Initialize model, loss function, and optimizer
model = CropDemandModel(X.shape[1])
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
num_epochs = 500
batch_size = 1

for epoch in range(num_epochs):
    for i in range(0, len(X_tensor), batch_size):
        batch_X = X_tensor[i:i+batch_size]
        batch_y = y_tensor[i:i+batch_size]
        
        optimizer.zero_grad()
        outputs = model(batch_X)
        loss = criterion(outputs, batch_y)
        loss.backward()
        optimizer.step()
    
    if (epoch + 1) % 10 == 0:
        print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}')

# Save model
torch.save(model.state_dict(), 'crop_demand_model.pth')
torch.save(scaler, 'scaler.pth')

def predict_next_year(model, scaler, X, crops, latest_year):
    next_year = latest_year + 1
    next_year_data = []
    
    for crop in crops:
        crop_data = X[X[:, 1] == crop_encodings[crop]][-1]  # Get the latest data for this crop
        next_year_data.append([next_year] + list(crop_data[1:]))  # Replace year with next_year
    
    next_year_data = np.array(next_year_data)
    next_year_scaled = scaler.transform(next_year_data)
    next_year_tensor = torch.FloatTensor(next_year_scaled)
    
    model.eval()
    with torch.no_grad():
        predictions = model(next_year_tensor)
    
    return predictions.numpy().flatten()

# Predict for next year
latest_year = np.load('latest_year.npy')
next_year_predictions = predict_next_year(model, scaler, X, selected_crops, latest_year)

print("Next year predictions:")
for crop, prediction in zip(selected_crops, next_year_predictions):
    print(f"{crop}: {prediction:.2f}")

# Save predictions
np.save('next_year_predictions.npy', next_year_predictions)
np.save('selected_crops.npy', selected_crops)
np.save('latest_year.npy', latest_year)