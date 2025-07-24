# Brainly - Your Second Brain 🧠

A full-stack web application that serves as your personal content aggregation hub, allowing you to collect, organize, and share content from Twitter and YouTube in one centralized location.

## 🌟 Features

- **Multi-Platform Content Aggregation**: Seamlessly collect and store content from Twitter and YouTube
- **Smart Organization**: Filter and organize content by platform type
- **Instant Sharing**: Generate shareable links to collaborate with others
- **Responsive Design**: Beautiful, modern UI that works across all devices
- **Real-time Content Management**: Add, view, and delete content with instant updates
- **Secure Authentication**: JWT-based user authentication and authorization

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons
- **Framer Motion** for animations

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Zod** for input validation
- **CORS** enabled

## 📱 Screenshots & Demo

The application features:
- Modern gradient-based landing page
- Intuitive dashboard with sidebar navigation
- Card-based content display with embedded previews
- Modal-based content addition
- Public sharing functionality

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- npm or yarn package manager

### Backend Setup
1. Clone the repository
```bash
git clone <repository-url>
cd brainly/backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env file
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the backend server
```bash
npm run dev
```

### Frontend Setup
1. Navigate to frontend directory
```bash
cd ../frontend
```

2. Install dependencies
```bash
npm install
```

3. Update configuration
```bash
# Update src/config.ts with your backend URL
export const BACKEND_URL = "http://localhost:3000/api/v1";
```

4. Start the development server
```bash
npm run dev
```

## 📡 API Endpoints

### Authentication
- `POST /api/v1/signup` - User registration
- `POST /api/v1/signin` - User login

### Content Management
- `POST /api/v1/content` - Add new content
- `GET /api/v1/get-content` - Retrieve user's content
- `DELETE /api/v1/delete-content` - Delete specific content

### Sharing
- `POST /api/v1/brain/share` - Enable/disable brain sharing
- `GET /api/v1/brain/:shareLink` - Access shared brain

## 🗄️ Database Schema

### User Schema
```javascript
{
  username: String (required, unique),
  password: String (required)
}
```

### Content Schema
```javascript
{
  link: String,
  type: String (twitter/youtube),
  title: String,
  tags: [ObjectId],
  userId: ObjectId (required)
}
```

### Link Schema (for sharing)
```javascript
{
  hash: String (required),
  userId: ObjectId (required, unique)
}
```

## 🎯 Usage

1. **Sign Up/Sign In**: Create an account or log in
2. **Add Content**: Click "Add Content" and paste Twitter or YouTube links
3. **Organize**: Use sidebar filters to view content by platform
4. **Share**: Enable sharing to generate a public link for your collection
5. **Collaborate**: Share your brain link with others for easy access

## 🔧 Key Features Implementation

- **Content Embedding**: Automatic Twitter tweet and YouTube video embedding
- **Responsive Sidebar**: Collapsible navigation with mobile support
- **Real-time Updates**: Immediate UI updates after content operations
- **Copy to Clipboard**: Easy link copying functionality
- **Error Handling**: Comprehensive error handling and user feedback

## 📦 Project Structure

```
brainly/
├── backend/
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth middleware
│   │   ├── db.ts          # Database models
│   │   └── index.ts       # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   └── icons/         # SVG icons
│   └── package.json
└── README.md
```

## 🚧 Future Enhancements

- [ ] Tag-based content organization
- [ ] Advanced search functionality
- [ ] Content analytics and insights
- [ ] Additional platform integrations
- [ ] Collaborative editing features
- [ ] Content backup and export



## 👨‍💻 Author

Built with ❤️ using React, TypeScript, and Tailwind CSS

---

**⭐ If you found this project helpful, please give it a star!**
