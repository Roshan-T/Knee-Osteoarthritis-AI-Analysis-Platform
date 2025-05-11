# 🦵 Knee Osteoarthritis AI Analysis Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-EE4C2C?style=flat-square&logo=pytorch)](https://pytorch.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)

An advanced web platform for diagnosing and analyzing knee osteoarthritis (OA) severity using deep learning. This project combines a React-based frontend with a PyTorch-powered AI backend to provide accurate grading of knee X-rays.

![image](https://github.com/user-attachments/assets/cade93bc-0612-4cc7-a921-4d33840c8b05)


## ✨ Features

### 🔬 AI-Powered X-Ray Analysis

- Real-time analysis of knee X-rays
- Classification into 5 severity grades (0-4)
- GradCAM visualization highlighting regions of interest
- Confidence scores for all potential classifications

### 📊 Educational Resources

- Comprehensive knee OA information
- Detailed explanations of OA grades
- Treatment options based on severity
- Interactive 3D knee model visualization

### 👩‍⚕️ Medical Collaboration

- Doctor contribution portal
- Secure authentication for medical professionals
- Dataset expansion through verified contributions
- Community of expert contributors

### 👨‍💻 Admin Tools

- Analysis verification system
- Dataset management
- User management
- Performance analytics

## 🧠 AI Model Architecture

The platform uses a custom-designed deep learning model:

- **Base Network**: EfficientNet-B0 backbone
- **Attention Mechanisms**: Dual spatial and channel attention
- **Feature Fusion**: Multi-scale feature extraction and combination
- **Explainability**: GradCAM integration for transparency
- **Image Enhancement**: CLAHE preprocessing for improved feature extraction

## 🛠️ Technology Stack

### Frontend

- **React & TypeScript**: Component-based UI
- **Framer Motion**: Smooth animations
- **TailwindCSS**: Responsive design
- **React Router**: Client-side routing

### Backend

- **FastAPI**: High-performance API framework
- **PyTorch**: Deep learning framework
- **Albumentations**: Image transformation
- **OpenCV**: Image processing

### Deployment

- **Vite**: Frontend bundling
- **Uvicorn**: ASGI server

## 📋 Requirements

- Node.js 16+
- Python 3.9+
- PyTorch 2.0+
- 4GB RAM (8GB+ recommended for model training)

## 🚀 Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/knee-oa-analysis.git
   cd knee-oa-analysis
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Install backend dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Download the pre-trained model (if available):
   ```bash
   # Place model.pth in the root directory
   ```

### Running the Application

1. Start the backend server:

   ```bash
   python main.py
   ```

2. In a separate terminal, start the frontend:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## 📸 Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
<img width="1256" alt="image" src="https://github.com/user-attachments/assets/b5958235-4879-48fd-b8b6-575307574bc1" />

![localhost_5173_](https://github.com/user-attachments/assets/fc687aca-bb05-45b8-8158-22a829f74254)


</div>

## 🔍 How It Works

1. **Upload**: User uploads a knee X-ray image
2. **Preprocessing**: Image is enhanced using CLAHE
3. **Analysis**: Deep learning model classifies the OA severity
4. **Visualization**: GradCAM highlights areas influencing the decision
5. **Results**: User receives grade, confidence score, and recommendations

## 📚 Educational Components

The platform includes comprehensive educational resources:

- Detailed information about knee OA pathophysiology
- Visual guides to understanding different OA grades
- Treatment recommendations based on severity
- Interactive elements for patient education


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


