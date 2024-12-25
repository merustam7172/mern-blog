A full-featured blogging platform built using the MERN (MongoDB, Express.js, React.js, Node.js) stack with image upload capabilities using Multer and Cloudinary integration.
✨ Features

User authentication and authorization
Create, read, update, and delete blog posts
Image upload functionality
Responsive design using Flowbite components
Rich text editor for blog content
Comment system
User profiles

🚀 Quick Start
Prerequisites

Node.js (v18 or higher)
MongoDB installed and running
Cloudinary account
npm or yarn package manager

Frontend Setup
bashCopy# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
```npm run dev```
Backend Setup
bashCopy# From the root directory
```npm install```

# Start the server
npm run dev
🔧 Environment Variables
Create .env files in both the root directory (for backend) and client directory (for frontend):
Backend (.env)
```
CopyMONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Frontend (.env)
CopyVITE_API_URL=http://localhost:5000
```
🏗
💻 Tech Stack

Frontend:

React.js with Vite
Flowbite UI components
React Router for navigation
Axios for API requests


Backend:

Node.js & Express.js
MongoDB with Mongoose
Multer for file upload
Cloudinary for imae storage
JWT for authentication



📝 API Endpoints

Auth:

POST /api/auth/register - Register new user
POST /api/auth/login - Login user


Blog:

GET /api/posts - Get all posts
GET /api/posts/:id - Get single post
POST /api/posts - Create new post
PUT /api/posts/:id - Update post
DELETE /api/posts/:id - Delete post



🔒 Security

Password hashing
JWT authentication
Protected routes
Input validation
File upload restrictions

🤝 Contributing

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
👥 Authors

Your Name - Mohammad Rustam

🙏 Acknowledgments

React Documentation
MongoDB Documentation
Express.js Documentation
Flowbite Documentation
Cloudinary Documentation
