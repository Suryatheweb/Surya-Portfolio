# Visual Servoing Simulator (Eye-in-Hand Camera Control)

This project implements a simulation of a **Visual Servoing** system, a technique used in robotics to control the motion of a robot (like a robotic arm or drone) using feedback from a camera.

## 🚀 Project Overview

In a real-world scenario, an "Eye-in-Hand" configuration means the camera is mounted on the end-effector of the robot. The goal of this system is to keep a target object centered in the camera's field of view by calculating the necessary motor velocities.

### Key Objectives:
- **Object Tracking**: Real-time detection of a specific colored object using OpenCV.
- **Error Calculation**: Determining the distance between the object's centroid and the center of the image.
- **PID Control**: Using a Proportional-Integral-Derivative (PID) controller to convert the pixel error into smooth velocity commands.

## 🛠️ Tech Stack
- **Python 3.x**
- **OpenCV**: Image processing and computer vision.
- **NumPy**: Numerical computations for color masking and centroids.

## 📐 How it Works

### 1. Color Masking (HSV Space)
The system converts the BGR webcam feed to **HSV (Hue, Saturation, Value)**. HSV is used instead of RGB because it is more robust to lighting changes. A mask is created to isolate only the target color (Green by default).

### 2. Centroid Extraction
The system finds the largest contour in the masked image and calculates its **centroid** $(cx, cy)$.

### 3. Control Loop (Visual Servoing)
The error is defined as:
$e_x = \text{center}_x - cx$
$e_y = \text{center}_y - cy$

These errors are fed into a **PID Controller**, which calculates the velocity commands ($V_x, V_y$):
$$V(t) = K_p e(t) + K_i \int e(t) dt + K_d \frac{de(t)}{dt}$$

- **$K_p$ (Proportional)**: Reacts to the current error. Higher values make the robot faster but can cause overshoot.
- **$K_i$ (Integral)**: Corrects steady-state errors.
- **$K_d$ (Derivative)**: Predicts future error and dampens oscillations for smoother movement.

## 🏃 How to Run

1. **Install Dependencies**:
   ```bash
   pip install opencv-python numpy
   ```

2. **Execute the script**:
   ```bash
   python visual_servoing/main.py
   ```

3. **Usage**:
   - Hold a **green object** in front of your webcam.
   - The system will draw a bounding box around the object and display the simulated velocity commands (`Cmd Vx`, `Cmd Vy`) on the screen.
   - Press `'q'` to exit.

## ⚙️ Tuning
You can adjust the PID gains in `main.py` to change the behavior:
- Increase `KP` for faster response.
- Increase `KD` if the tracking "jitters" or oscillates.
- Adjust `COLOR_LOWER` and `COLOR_UPPER` to track different colored objects.