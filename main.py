# import numpy as np
# import tensorflow as tf
# import matplotlib.cm as cm
# from fastapi import FastAPI, File, UploadFile
# from fastapi.responses import JSONResponse
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from PIL import Image
# import io
# import base64

# app = FastAPI(title="Knee Arthrosis Analysis API")

# # Add CORS middleware to allow cross-origin requests
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Specify your frontend origin in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load the model at startup
# @app.on_event("startup")
# async def startup_event():
#     global model, grad_model, class_names, target_size
    
#     class_names = ["Healthy", "Doubtful", "Minimal", "Moderate", "Severe"]
#     target_size = (224, 224)
    
#     # Load the trained model
#     model = tf.keras.models.load_model("./model_Xception_ft.hdf5")
    
#     # Create Grad-CAM model
#     grad_model = tf.keras.models.clone_model(model)
#     grad_model.set_weights(model.get_weights())
#     grad_model.layers[-1].activation = None
#     grad_model = tf.keras.models.Model(
#         inputs=[grad_model.inputs],
#         outputs=[
#             grad_model.get_layer("global_average_pooling2d_1").input,
#             grad_model.output,
#         ],
#     )

# def make_gradcam_heatmap(grad_model, img_array, pred_index=None):
#     with tf.GradientTape() as tape:
#         last_conv_layer_output, preds = grad_model(img_array)
#         if pred_index is None:
#             pred_index = tf.argmax(preds[0])
#         class_channel = preds[:, pred_index]

#     grads = tape.gradient(class_channel, last_conv_layer_output)
#     pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
#     last_conv_layer_output = last_conv_layer_output[0]
#     heatmap = last_conv_layer_output @ pooled_grads[..., tf.newaxis]
#     heatmap = tf.squeeze(heatmap)
#     heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
    
#     return heatmap.numpy()

# def generate_gradcam_image(img, heatmap, alpha=0.4):
#     heatmap = np.uint8(255 * heatmap)
    
#     jet = cm.get_cmap("jet")
#     jet_colors = jet(np.arange(256))[:, :3]
#     jet_heatmap = jet_colors[heatmap]
    
#     jet_heatmap = tf.keras.preprocessing.image.array_to_img(jet_heatmap)
#     jet_heatmap = jet_heatmap.resize((img.shape[1], img.shape[0]))
#     jet_heatmap = tf.keras.preprocessing.image.img_to_array(jet_heatmap)
    
#     superimposed_img = jet_heatmap * alpha + img
#     superimposed_img = tf.keras.preprocessing.image.array_to_img(superimposed_img)
    
#     # Convert the PIL image to a base64 string
#     buffered = io.BytesIO()
#     superimposed_img.save(buffered, format="PNG")
#     img_str = base64.b64encode(buffered.getvalue()).decode()
    
#     return img_str

# class PredictionResponse(BaseModel):
#     prediction: str
#     confidence: float
#     class_probabilities: dict
#     gradcam_image: str

# @app.post("/predict", response_model=PredictionResponse)
# async def predict(file: UploadFile = File(...)):
#     # Read and process the image
#     contents = await file.read()
#     image = Image.open(io.BytesIO(contents))
    
#     # Resize and preprocess the image
#     image = image.resize(target_size)
#     img_array = tf.keras.preprocessing.image.img_to_array(image)
#     img_original = img_array.copy()
    
#     # Preprocess for model input
#     img_array = np.expand_dims(img_array, axis=0)
#     img_array = np.float32(img_array)
#     img_array = tf.keras.applications.xception.preprocess_input(img_array)
    
#     # Make prediction
#     predictions = model.predict(img_array)
#     probabilities = 100 * predictions[0]
    
#     # Get the highest probability class
#     max_prob = np.amax(probabilities)
#     max_index = np.argmax(probabilities)
#     predicted_class = class_names[max_index]
    
#     # Generate Grad-CAM heatmap
#     heatmap = make_gradcam_heatmap(grad_model, img_array, max_index)
#     gradcam_image = generate_gradcam_image(img_original, heatmap)
    
#     # Create dict of class probabilities
#     class_probs = {class_name: float(prob) for class_name, prob in zip(class_names, probabilities)}
    
#     return {
#         "prediction": predicted_class,
#         "confidence": float(max_prob),
#         "class_probabilities": class_probs,
#         "gradcam_image": gradcam_image
#     }

# @app.get("/health")
# async def health_check():
#     return {"status": "healthy"}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)

# import numpy as np
# import tensorflow as tf
# import matplotlib.cm as cm
# from fastapi import FastAPI, File, UploadFile
# from fastapi.responses import JSONResponse
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from PIL import Image
# import io
# import base64
# import os

# app = FastAPI(title="Knee Arthrosis Analysis API")

# # Add CORS middleware to allow cross-origin requests
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Specify your frontend origin in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load the model at startup
# @app.on_event("startup")
# async def startup_event():
#     global model, grad_model, class_names, target_size
    
#     print(f"TensorFlow version: {tf.__version__}")
#     class_names = ["Healthy", "Doubtful", "Minimal", "Moderate", "Severe"]
#     target_size = (224, 224)
    
#     # Create a completely new model with the Xception architecture
#     print("Creating new Xception model...")
#     base_model = tf.keras.applications.Xception(
#         weights=None,
#         include_top=False,
#         input_shape=(224, 224, 3)
#     )
    
#     # Add classification layers
#     x = base_model.output
#     x = tf.keras.layers.GlobalAveragePooling2D()(x)
#     predictions = tf.keras.layers.Dense(len(class_names), activation='softmax')(x)
    
#     # Create the model
#     model = tf.keras.Model(inputs=base_model.input, outputs=predictions)
    
#     # Check if saved weights exist and attempt to load them
#     model_path = "./model_Xception_ft.hdf5"
#     if os.path.exists(model_path):
#         print(f"Attempting to load weights from {model_path}...")
#         try:
#             # Try loading just the weights
#             model.load_weights(model_path, by_name=True, skip_mismatch=True)
#             print("Weights loaded successfully with by_name=True and skip_mismatch=True")
#         except Exception as e:
#             print(f"Failed to load weights: {e}")
#             print("WARNING: Using untrained model, predictions will be random!")
#     else:
#         print(f"Model file {model_path} not found! Using untrained model!")
    
#     # Create Grad-CAM model using the last convolutional layer
#     grad_model = tf.keras.models.Model(
#         inputs=[model.inputs],
#         outputs=[
#             base_model.get_layer("block14_sepconv2").output,  # Last conv layer in Xception
#             model.output
#         ]
#     )
#     print("Grad-CAM model created successfully")

# def make_gradcam_heatmap(grad_model, img_array, pred_index=None):
#     with tf.GradientTape() as tape:
#         last_conv_layer_output, preds = grad_model(img_array)
#         if pred_index is None:
#             pred_index = tf.argmax(preds[0])
#         class_channel = preds[:, pred_index]

#     grads = tape.gradient(class_channel, last_conv_layer_output)
#     pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
#     last_conv_layer_output = last_conv_layer_output[0]
#     heatmap = last_conv_layer_output @ pooled_grads[..., tf.newaxis]
#     heatmap = tf.squeeze(heatmap)
#     heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
    
#     return heatmap.numpy()

# def generate_gradcam_image(img, heatmap, alpha=0.4):
#     heatmap = np.uint8(255 * heatmap)
    
#     jet = cm.get_cmap("jet")
#     jet_colors = jet(np.arange(256))[:, :3]
#     jet_heatmap = jet_colors[heatmap]
    
#     jet_heatmap = tf.keras.preprocessing.image.array_to_img(jet_heatmap)
#     jet_heatmap = jet_heatmap.resize((img.shape[1], img.shape[0]))
#     jet_heatmap = tf.keras.preprocessing.image.img_to_array(jet_heatmap)
    
#     superimposed_img = jet_heatmap * alpha + img
#     superimposed_img = tf.keras.preprocessing.image.array_to_img(superimposed_img)
    
#     # Convert the PIL image to a base64 string
#     buffered = io.BytesIO()
#     superimposed_img.save(buffered, format="PNG")
#     img_str = base64.b64encode(buffered.getvalue()).decode()
    
#     return img_str

# class PredictionResponse(BaseModel):
#     prediction: str
#     confidence: float
#     class_probabilities: dict
#     gradcam_image: str

# @app.post("/predict", response_model=PredictionResponse)
# async def predict(file: UploadFile = File(...)):
#     # Read and process the image
#     contents = await file.read()
#     image = Image.open(io.BytesIO(contents))
    
#     # Resize and preprocess the image
#     image = image.resize(target_size)
#     img_array = tf.keras.preprocessing.image.img_to_array(image)
#     img_original = img_array.copy()
    
#     # Preprocess for model input
#     img_array = np.expand_dims(img_array, axis=0)
#     img_array = np.float32(img_array)
#     img_array = tf.keras.applications.xception.preprocess_input(img_array)
    
#     # Make prediction
#     predictions = model.predict(img_array)
#     probabilities = 100 * predictions[0]
    
#     # Get the highest probability class
#     max_prob = np.amax(probabilities)
#     max_index = np.argmax(probabilities)
#     predicted_class = class_names[max_index]
    
#     # Generate Grad-CAM heatmap
#     heatmap = make_gradcam_heatmap(grad_model, img_array, max_index)
#     gradcam_image = generate_gradcam_image(img_original, heatmap)
    
#     # Create dict of class probabilities
#     class_probs = {class_name: float(prob) for class_name, prob in zip(class_names, probabilities)}
    
#     return {
#         "prediction": predicted_class,
#         "confidence": float(max_prob),
#         "class_probabilities": class_probs,
#         "gradcam_image": gradcam_image
#     }

# @app.get("/health")
# async def health_check():
#     return {"status": "healthy"}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)



import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import models
import numpy as np
import cv2
import matplotlib.pyplot as plt
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import io
import base64
import os
import albumentations as A
from albumentations.pytorch import ToTensorV2

app = FastAPI(title="Knee Arthrosis Analysis API")

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Specify your frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set global variables
IMAGE_SIZE = 224
NUM_CLASSES = 5
class_names = ["Grade 0", "Grade 1", "Grade 2", "Grade 3", "Grade 4"]
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = None

# Define model architecture
class KneeOAClassifier(nn.Module):
    def __init__(self, num_classes=5, pretrained=True):
        super(KneeOAClassifier, self).__init__()
        
        self.efficientnet = models.efficientnet_b0(pretrained=pretrained)
        
        num_features_intermediate = 80 
        num_features_final = 1280      
        
        # Adjust spatial and channel attention modules for 1536 channels
        self.spatial_attention = nn.Sequential(
            nn.Conv2d(num_features_final, num_features_final // 8, kernel_size=1),
            nn.BatchNorm2d(num_features_final // 8),
            nn.ReLU(),
            nn.Conv2d(num_features_final // 8, 1, kernel_size=1),
            nn.Sigmoid()
        )
        
        self.channel_attention = nn.Sequential(
            nn.Linear(num_features_final, num_features_final // 8),
            nn.BatchNorm1d(num_features_final // 8),
            nn.ReLU(),
            nn.Linear(num_features_final // 8, num_features_final),
            nn.Sigmoid()
        )
        
        # Multi-scale feature fusion with updated dimensions
        self.fusion_conv1 = nn.Conv2d(num_features_intermediate, 128, 1)  # Updated for B3 intermediate features
        self.fusion_conv2 = nn.Conv2d(num_features_final, 128, 1)
        
        # Classification head with updated input size
        self.classifier = nn.Sequential(
            nn.Linear(128 + 128, 512),  # Adjusted to match concatenated output of fusion layers
            nn.BatchNorm1d(512),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(512, 256),
            nn.BatchNorm1d(256),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(256, num_classes)
        )
        
        self.aux_classifier = nn.Sequential(
            nn.Linear(num_features_final, num_classes),
            nn.Dropout(0.2)
        )

    def forward(self, x):
        for i, layer in enumerate(self.efficientnet.features):
            x = layer(x)
            if i == 4:
                intermediate_features = x  # Capture layer 4 features for EfficientNet-B3
        
        spatial_att = self.spatial_attention(x)
        x_spatial = x * spatial_att
        
        b, c, h, w = x.size()
        avg_pool = F.adaptive_avg_pool2d(x, (1, 1)).view(b, c)
        channel_att = self.channel_attention(avg_pool).view(b, c, 1, 1)
        x_channel = x * channel_att
        
        intermediate_features = self.fusion_conv1(intermediate_features)
        high_level_features = self.fusion_conv2(x_spatial + x_channel)
        
        gap_intermediate = F.adaptive_avg_pool2d(intermediate_features, (1, 1)).view(b, -1)
        gap_high = F.adaptive_avg_pool2d(high_level_features, (1, 1)).view(b, -1)
        
        combined_features = torch.cat([gap_intermediate, gap_high], dim=1)
        
        aux_output = self.aux_classifier(avg_pool)
        main_output = self.classifier(combined_features)
        
        if self.training:
            return main_output, aux_output
        return main_output

# GradCAM implementation
class GradCAM:
    def __init__(self, model, target_layer):
        self.model = model
        self.target_layer = target_layer
        self.gradients = None
        self.activations = None
        
        # Register hooks
        def forward_hook(module, input, output):
            self.activations = output
            
        def backward_hook(module, grad_input, grad_output):
            self.gradients = grad_output[0]
        
        # Register the hooks
        self.target_layer.register_forward_hook(forward_hook)
        self.target_layer.register_full_backward_hook(backward_hook)
    
    def __call__(self, x, class_idx=None):
        # Forward pass
        self.model.eval()
        outputs = self.model(x)
        
        # If no class_idx is specified, use the predicted class
        if class_idx is None:
            pred_class = outputs.argmax(dim=1).item()
            class_idx = pred_class
        else:
            pred_class = class_idx
        
        # Clear previous gradients
        self.model.zero_grad()
        
        # Backpropagate the gradient only for the target class
        one_hot = torch.zeros_like(outputs)
        one_hot[0, class_idx] = 1
        outputs.backward(gradient=one_hot, retain_graph=True)
        
        # Get gradients and activations
        gradients = self.gradients.detach().cpu()
        activations = self.activations.detach().cpu()
        
        # Calculate weights
        weights = torch.mean(gradients, dim=(2, 3), keepdim=True)
        
        # Weighted sum of activation maps
        cam = torch.sum(weights * activations, dim=1).squeeze()
        
        # ReLU
        cam = F.relu(cam)
        
        # Normalize
        if torch.max(cam) > 0:
            cam = cam / torch.max(cam)
        
        # Convert to numpy and resize
        cam = cam.numpy()
        cam = cv2.resize(cam, (IMAGE_SIZE, IMAGE_SIZE))
        
        return cam, pred_class

# Helper function for CLAHE
def apply_clahe(image, clip_limit=2.0, grid_size=(8, 8)):
    """Apply CLAHE (Contrast Limited Adaptive Histogram Equalization)"""
    # Convert to LAB color space
    lab = cv2.cvtColor(image, cv2.COLOR_RGB2LAB)
    
    # Split channels
    l, a, b = cv2.split(lab)
    
    # Apply CLAHE to L channel
    clahe = cv2.createCLAHE(clipLimit=clip_limit, tileGridSize=grid_size)
    l_clahe = clahe.apply(l)
    
    # Merge channels
    lab_clahe = cv2.merge((l_clahe, a, b))
    
    # Convert back to RGB
    rgb_clahe = cv2.cvtColor(lab_clahe, cv2.COLOR_LAB2RGB)
    
    return rgb_clahe

# Load and preprocess image
def load_and_preprocess_image(image_data):
    """Load and preprocess an image for inference"""
    # Convert image data to PIL Image if it's not already
    if not isinstance(image_data, Image.Image):
        image = Image.open(io.BytesIO(image_data))
    else:
        image = image_data
    
    # Convert to numpy array
    image_np = np.array(image)
    
    # Convert to RGB if needed
    if len(image_np.shape) == 2 or image_np.shape[2] == 1:
        # Convert grayscale to RGB
        image_np = cv2.cvtColor(image_np, cv2.COLOR_GRAY2RGB)
    elif image_np.shape[2] == 4:  # RGBA
        # Convert RGBA to RGB
        image_np = cv2.cvtColor(image_np, cv2.COLOR_RGBA2RGB)
    elif image_np.shape[2] == 3 and not np.array_equal(image_np[:,:,0], image_np[:,:,2]):
        # Check if it might be BGR (OpenCV default)
        image_np = cv2.cvtColor(image_np, cv2.COLOR_BGR2RGB)
    
    # Store original for visualization
    original_image = image_np.copy()
    
    # Apply CLAHE
    try:
        enhanced_image = apply_clahe(image_np, clip_limit=2.5, grid_size=(6, 6))
    except Exception as e:
        print(f"Error applying CLAHE: {e}")
        enhanced_image = image_np
    
    # Apply transforms for inference
    transform = A.Compose([
        A.Resize(IMAGE_SIZE, IMAGE_SIZE),
        A.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ToTensorV2()
    ])
    
    # Apply transforms
    transformed = transform(image=enhanced_image)
    tensor_image = transformed["image"]
    
    return tensor_image, original_image, enhanced_image

# Apply GradCAM
def apply_gradcam(model, image_tensor, target_class=None):
    """Apply GradCAM to the image"""
    # Find a suitable target layer for GradCAM
    # For EfficientNet, the last convolutional layer
    target_layer = model.efficientnet.features[-1]
    
    # Initialize GradCAM
    grad_cam = GradCAM(model, target_layer)
    
    # Get heatmap
    image_tensor = image_tensor.unsqueeze(0).to(device)
    heatmap, pred_class = grad_cam(image_tensor, target_class)
    
    return heatmap, pred_class

# Overlay heatmap on original image
def overlay_heatmap(original_image, heatmap, alpha=0.5):
    """Overlay heatmap on original image"""
    # Resize original image if needed
    original_image = cv2.resize(original_image, (IMAGE_SIZE, IMAGE_SIZE))
    
    # Convert heatmap to uint8 and apply colormap
    heatmap_colored = cv2.applyColorMap(np.uint8(255 * heatmap), cv2.COLORMAP_JET)
    
    # Convert back to RGB if necessary
    if len(heatmap_colored.shape) == 2 or heatmap_colored.shape[2] == 1:
        heatmap_colored = cv2.cvtColor(heatmap_colored, cv2.COLOR_GRAY2RGB)
    else:
        heatmap_colored = cv2.cvtColor(heatmap_colored, cv2.COLOR_BGR2RGB)
    
    # Overlay heatmap on original image
    overlayed = cv2.addWeighted(original_image, 1 - alpha, heatmap_colored, alpha, 0)
    
    return overlayed

# Convert image to base64 string
def image_to_base64(image_array):
    """Convert numpy image array to base64 string"""
    pil_image = Image.fromarray(np.uint8(image_array))
    buffered = io.BytesIO()
    pil_image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode()

class PredictionResponse(BaseModel):
    prediction: str
    confidence: float
    class_probabilities: dict
    gradcam_image: str
    all_class_heatmaps: dict

# Load model at startup
@app.on_event("startup")
async def startup_event():
    global model, device
    
    print(f"Using device: {device}")
    
    # Initialize model
    model = KneeOAClassifier(num_classes=NUM_CLASSES, pretrained=False)
    
    # Load model weights if available
    model_path = "./model.pth"
    if os.path.exists(model_path):
        print(f"Loading model from {model_path}")
        model.load_state_dict(torch.load(model_path, map_location=device))
    else:
        print(f"WARNING: Model file {model_path} not found! Using untrained model!")
    
    model.to(device)
    model.eval()
    print("Model loaded successfully")

@app.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    # Read image file
    contents = await file.read()
    
    # Preprocess image
    tensor_image, original_image, enhanced_image = load_and_preprocess_image(contents)
    
    # Move to device and get predictions
    tensor_image_batch = tensor_image.unsqueeze(0).to(device)
    with torch.no_grad():
        outputs = model(tensor_image_batch)
    
    # Get probabilities
    probabilities = F.softmax(outputs, dim=1)[0]
    predicted_idx = probabilities.argmax().item()
    predicted_class = class_names[predicted_idx]
    confidence = probabilities[predicted_idx].item() * 100
    
    print(f"Predicted class: {predicted_class} (Confidence: {confidence:.2f}%)")
    
    # Generate GradCAM for predicted class
    heatmap, _ = apply_gradcam(model, tensor_image, predicted_idx)
    
    # Create overlay
    overlay = overlay_heatmap(enhanced_image, heatmap)
    
    # Convert to base64
    gradcam_image = image_to_base64(overlay)
    
    # Generate heatmaps for all classes
    all_class_heatmaps = {}
    for i, class_name in enumerate(class_names):
        class_heatmap, _ = apply_gradcam(model, tensor_image, i)
        class_overlay = overlay_heatmap(enhanced_image, class_heatmap)
        class_base64 = image_to_base64(class_overlay)
        
        # Get probability for this class
        class_prob = probabilities[i].item() * 100
        
        all_class_heatmaps[class_name] = {
            "image": class_base64,
            "probability": float(class_prob)
        }
    
    # Create dict of class probabilities
    class_probs = {class_name: float(prob * 100) for class_name, prob in zip(class_names, probabilities.cpu().numpy())}
    
    return {
        "prediction": predicted_class,
        "confidence": float(confidence),
        "class_probabilities": class_probs,
        "gradcam_image": gradcam_image,
        "all_class_heatmaps": all_class_heatmaps
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)