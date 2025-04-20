# 🚮 Garbage Detection Project 🗑️📸

This project detects roadside garbage using **MobileNetV2** and sends **notifications** when garbage is detected. The system stores images in **MongoDB**, processes them using a trained model, and triggers **email alerts** if garbage is found. 📩⚡

---

## 🛠 Setup Instructions 🚀

### 1️⃣ Install Dependencies 📦
Run the following command to install required packages:

```bash
pip install -r requirements.txt
```

### 2️⃣ Configure Environment Variables 🔧
Create a `.env` file in the project root and add the following details:

```ini
# 📧 Email Notification Configuration  
FROM_EMAIL=your-email@gmail.com  
EMAIL_PASSWORD=your-email-password  
TO_EMAIL=receiver-email@gmail.com  

# 🧠 Model Configuration
MODEL_PATH=yourModelPath

# 🏠 Street Information
STREET_NAME=yourStreetName
```

---

## 🏗️ Project Workflow 🔄

1️⃣ **Camera** captures an image 🎥  
2️⃣ Sends the image to your **backend** via API 🌐  
3️⃣ Backend processes the image and runs the **MobileNetV2 model** 🧠  
4️⃣ If classified as **Garbage**, trigger a **notification** 📲🚨  

---

## ✨ Features ✨

✅ **Real-time garbage detection** 🏙️  
✅ **Email alerts when garbage is found** 📧  
✅ **Geolocation tracking of detected garbage** 📍  
✅ **Easy setup & deployment** 🚀  

---

## 🚀 Running the Project

### Backend

#### Start Node.js server:
```bash
cd backend/node-app
npm start
```

#### Start Python ML API:
```bash
cd backend/python-ml-api
uvicorn main:app --reload --port 8000
```

### Frontend
Start the React development server:
```bash
cd frontend
npm start
```
 
---

## 🤝 Contributing 🤝

Feel free to submit issues or pull requests! Let's make this project better together. 💡✨

1. Fork the repository 🍴  
2. Create your feature branch (`git checkout -b feature/AmazingFeature`) 🌿  
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`) 💾  
4. Push to the branch (`git push origin feature/AmazingFeature`) 🚀  
5. Open a Pull Request 📥  

---

## 🙏 Acknowledgments

- **OpenStreetMap** for geolocation services 🌍  
- **TensorFlow** for the MobileNetV2 model 🧠  
- **Google SMTP** for email notifications 📧  

---
