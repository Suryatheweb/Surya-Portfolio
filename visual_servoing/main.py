import cv2
import numpy as np
import time
from pid import PID

# ----------------------------- Configuration ----------------------------- #

# Target Color (Green ball)
# Lower and Upper bounds in HSV
COLOR_LOWER = np.array([35, 100, 100]) 
COLOR_UPPER = np.array([85, 255, 255])

# PID Gains (Tune these for smoothness)
# Kp: Proportional gain - determines how aggressively the robot reacts
# Ki: Integral gain - eliminates steady-state error
# Kd: Derivative gain - dampens oscillationred
KP = 0.15
KI = 0.01
KD = 0.05

# Camera Settings
CAMERA_ID = 0

def main():
    # Initialize camera
    cap = cv2.VideoCapture(CAMERA_ID)
    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return

    # Initialize PID controllers for X and Y axes
    pid_x = PID(KP, KI, KD)
    pid_y = PID(KP, KI, KD)

    prev_time = time.time()

    print("Visual Servoing Started. Press 'q' to quit.")
    print("Tracking target: Green Color")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # 1. Pre-processing
        # Flip frame for intuitive control (mirror effect)
        frame = cv2.flip(frame, 1)
        height, width, _ = frame.shape
        center_x, center_y = width // 2, height // 2

        # Convert BGR to HSV
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

        # 2. Object Tracking
        # Create a mask for the target color
        mask = cv2.inRange(hsv, COLOR_LOWER, COLOR_UPPER)
        
        # Noise reduction (Morphological operations)
        mask = cv2.erode(mask, None, iterations=2)
        mask = cv2.dilate(mask, None, iterations=2)

        # Find contours
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        vx, vy = 0.0, 0.0  # Default velocity commands

        if contours:
            # Find the largest contour (assumed to be the target object)
            largest_contour = max(contours, key=cv2.contourArea)
            if cv2.contourArea(largest_contour) > 500: # Min area threshold
                # Get bounding box
                x, y, w, h = cv2.boundingRect(largest_contour)
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

                # Calculate centroid
                cx = x + w // 2
                cy = y + h // 2
                cv2.circle(frame, (cx, cy), 5, (0, 0, 255), -1)

                # 3. Control Logic (Visual Servoing)
                # Error = Target (center) - Current Position
                error_x = center_x - cx
                error_y = center_y - cy

                # Update time delta
                current_time = time.time()
                dt = current_time - prev_time
                prev_time = current_time

                # Calculate PID output (Simulated velocity commands)
                vx = pid_x.update(error_x, dt)
                vy = pid_y.update(error_y, dt)

                # Visualize Error Lines
                cv2.line(frame, (cx, cy), (center_x, center_y), (255, 0, 0), 1)

        else:
            prev_time = time.time() # Reset timer when target lost

        # 4. UI Overlay
        # Draw target center
        cv2.circle(frame, (center_x, center_y), 10, (255, 255, 255), 1)
        
        # Display velocity commands
        cv2.putText(frame, f"Cmd Vx: {vx:.2f}", (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
        cv2.putText(frame, f"Cmd Vy: {vy:.2f}", (20, 70), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
        cv2.putText(frame, "Target: Green Object", (20, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 1)
        cv2.putText(frame, "Press 'q' to exit", (20, height - 20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 1)

        cv2.imshow("Visual Servoing Simulator", frame)
        # cv2.imshow("Mask", mask) # Uncomment to see the binary mask

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()