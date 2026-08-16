import cv2
import torch
import numpy as np
import matplotlib.pyplot as plt

# Load the MiDaS model from PyTorch Hub
# Using 'MiDaS_small' for better real-time performance on laptop CPUs/GPUs
model_type = "MiDaS_small"
midas = torch.hub.load("intel-isl/MiDaS", model_type)

# Move model to GPU if available
device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
midas.to(device)
midas.eval()

# Load transforms to resize and normalize the image before passing it to the model
midas_transforms = torch.hub.load("intel-isl/MiDaS", "transforms")
transform = midas_transforms.small_transform if model_type == "MiDaS_small" else midas_transforms.dpt_transform

# Global variables for interaction
clicked_point = None
estimated_distance = 0

def mouse_callback(event, x, y, flags, param):
    global clicked_point, estimated_distance
    if event == cv2.EVENT_LBUTTONDOWN:
        clicked_point = (x, y)
        # Get the depth value at the clicked pixel
        # depth_map is accessible via the param passed to the callback
        depth_map = param
        if 0 <= y < depth_map.shape[0] and 0 <= x < depth_map.shape[1]:
            depth_val = depth_map[y, x]
            # Monocular depth is relative. We map it to a rough metric estimation
            # Note: This is a heuristic. In real scenarios, you'd calibrate with a known distance.
            # MiDaS outputs inverse depth (disparity). Higher value = closer.
            # A simple inverse mapping for demonstration:
            estimated_distance = 10.0 / (depth_val + 1e-6) 

def main():
    global clicked_point, estimated_distance
    
    # Initialize webcam
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return

    print("Starting Monocular Depth Estimation...")
    print("Controls: Click on an object to estimate distance. Press 'q' to exit.")

    # We need a way to pass the current depth map to the mouse callback
    # Since the callback is set once, we'll use a shared object or update a global
    current_depth_map = np.zeros((480, 640))
    cv2.namedWindow("Depth Map")
    
    # Use a lambda or a wrapper to pass current_depth_map if needed, 
    # but since depth_map changes per frame, we'll update a global reference
    def update_callback_param(frame_depth):
        global current_depth_map
        current_depth_map = frame_depth

    # Custom callback that uses the global current_depth_map
    def custom_mouse_callback(event, x, y, flags, param):
        global clicked_point, estimated_distance, current_depth_map
        if event == cv2.EVENT_LBUTTONDOWN:
            clicked_point = (x, y)
            if 0 <= y < current_depth_map.shape[0] and 0 <= x < current_depth_map.shape[1]:
                depth_val = current_depth_map[y, x]
                # Simple heuristic for demonstration
                estimated_distance = 5.0 / (depth_val + 0.1)

    cv2.setMouseCallback("Depth Map", custom_mouse_callback)

    while True:
        success, frame = cap.read()
        if not success:
            break

        # Convert BGR to RGB
        img = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Apply transforms
        img_input = transform(img).to(device)

        # Predict depth
        with torch.no_grad():
            prediction = midas(img_input)
            prediction = torch.nn.functional.interpolate(
                prediction.unsqueeze(1),
                size=frame.shape[:2],
                mode="bicubic",
                align_corners=False,
            ).squeeze()

        depth_map = prediction.cpu().numpy()
        
        # Update the global depth map for the mouse callback
        current_depth_map = depth_map

        # Normalize for visualization (0-255)
        depth_min = depth_map.min()
        depth_max = depth_map.max()
        normalized_depth = (255 * (depth_map - depth_min) / (depth_max - depth_min)).astype(np.uint8)

        # Apply colormap (COLORMAP_MAGMA: Red = Close, Blue = Far)
        depth_color = cv2.applyColorMap(normalized_depth, cv2.COLORMAP_MAGMA)

        # Draw clicked point and distance label
        if clicked_point:
            cv2.circle(depth_color, clicked_point, 5, (0, 255, 0), -1)
            text = f"Est. Distance: {estimated_distance:.2f}m"
            cv2.putText(depth_color, text, (clicked_point[0] + 10, clicked_point[1] - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

        # Display the results
        cv2.imshow("Depth Map", depth_color)
        cv2.imshow("Webcam", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()