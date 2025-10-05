# 🛡️ Password Manager System

## A secure and efficient password management system designed to store and manage credentials locally or through MongoDB.
### This repository contains two implementations of the project — one using LocalStorage (for offline use) and one using MongoDB (for backend integration).

# 📁 Project Structure
```
password-manager-system/
│
├── passop-localstorage/   # Frontend version using browser LocalStorage
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── README.md
│
├── passop-mongodb/        # Full-stack version using Node.js and MongoDB
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   ├── models/
│   └── README.md
│
└── README.md              # Main project description
```
# ⚙️ Features

- 🔐 Secure password storage (LocalStorage or MongoDB)

- 🧾 Add, view, and delete passwords

- 🔑 Copy password functionality

- 🌐 Modern UI built with HTML, CSS, and JS

- ⚡ Backend (for MongoDB version) using Node.js, Express, and Mongoose

# 🚀 Setup Instructions
## 🔸 For LocalStorage Version

- Navigate to the folder:
```
cd passop-localstorage
```

- Open index.html in your browser.

- Start managing passwords locally!

## 🔸 For MongoDB Version

- Navigate to the folder:
```
cd passop-mongodb
```

- Install dependencies:
```
npm install
```

- Create a .env file and add your MongoDB connection string:
```
MONGO_URI=your_mongodb_connection_url
PORT=5000
```

- Run the server:
```
node server.js
```

- Open your browser and visit:
```
http://localhost:5000
```
# 🧰 Tech Stack
| Layer | Technology |
|--------|-------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express |
| Database | MongoDB (for passop-mongodb) |
| Local Storage | Browser LocalStorage (for passop-localstorage) |

# 📸 Screenshots

<img width="1920" height="1080" alt="Screenshot (39)" src="https://github.com/user-attachments/assets/c2b34a9f-cdb9-4e7e-910b-f7ae42c9e86f" />


# 👨‍💻 Author

## Harsh
## 📍 India
## 💬 GitHub: [harsh31tkd](https://github.com/harsh31tkd)

# 📝 License

## This project is licensed under the MIT License — feel free to use and modify it.
