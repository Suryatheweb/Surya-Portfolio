# Monocular Distance & Depth Estimation

This project implements a real-time depth estimation system using a single standard webcam. It uses the MiDaS model from PyTorch Hub to predict relative depth and provides an interactive interface to estimate the distance of objects in the scene.

## 🚀 Features
- **Live Depth Mapping**: Converts webcam feed into a colored heatmap where red represents closer objects and blue represents distant ones.
- **Interactive Distance Estimation**: Click on any object in the "Depth Map" window to see a heuristic estimate of its distance in meters.
- **Lightweight Model**: Uses the `MiDaS_small` model for efficient performance on standard laptop hardware.

## 🛠️ Tech Stack
- **Python 3.x**
- **PyTorch**: For loading and running the MiDaS depth estimation model.
- **OpenCV**: For webcam stream handling, image processing, and visualization.
- **NumPy**: For numerical operations on depth maps.
- **Matplotlib**: For data visualization support.

## 📦 Installation

1. **Clone the project directory** (if applicable).
2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## 🏃 How to Run

Run the main script using Python:
```bash
python depth_estimation.py
```

## 🎮 Usage
- **Webcam Window**: Shows the raw input feed.
- **Depth Map Window**: Shows the depth heatmap.
- **Interaction**: 
    - **Click** anywhere on the "Depth Map" window to place a marker and estimate the distance to that object.
    - Press **'q'** to exit the application.

## ⚠️ Note on Distance Estimation
Monocular depth estimation provides **relative depth** (disparity), not absolute metric distance. The distance shown in this project is calculated using a simple inverse heuristic:
`Distance ≈ 5.0 / (DepthValue + 0.1)`
For real-world accuracy, the model would need to be calibrated using a known reference object at a fixed distance.