# Supply Chain Management System - Backend API

![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)
![Express.js](https://img.shields.io/badge/Express.js-4.21+-lightgrey.svg)

A comprehensive RESTful API backend for a modern supply chain management system built with Node.js, TypeScript, and MongoDB. This system provides complete functionality for managing products, orders, users, and inventory with role-based access control.

## 📋 Table of Contents

- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication & Authorization](#-authentication--authorization)
- [Error Handling](#-error-handling)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features

### Core Functionality
- **User Management**: Complete user registration, authentication, and profile management
- **Product Management**: CRUD operations for products with category management
- **Order Management**: Order creation, tracking, and status management
- **Inventory Management**: Stock tracking and inventory control
- **Admin Dashboard**: Administrative controls and system oversight

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control (RBAC)**: Admin, Supplier, and Consumer roles
- **Password Hashing**: Bcrypt password encryption
- **OTP Verification**: Email-based verification system
- **Input Validation**: Comprehensive request validation with Joi

### Advanced Features
- **Email Integration**: Nodemailer with Handlebars templates
- **File Upload**: Cloudinary integration for image management
- **Geolocation Services**: Google Maps integration for directions and nearby places
- **Real-time Logging**: Pino logger for comprehensive system monitoring
- **Error Handling**: Centralized error management system

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (Next.js)     │◄──►│   (Express.js)  │◄──►│   (MongoDB)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                       ┌────────▼────────┐
                       │  External APIs  │
                       │ - Cloudinary    │
                       │ - NodeMailer    │
                       │ - Google Maps   │
                       └─────────────────┘
```

### Layer Architecture
- **Routes Layer**: API endpoint definitions
- **Controllers Layer**: Request handling and response formatting
- **Services Layer**: Business logic implementation
- **Models Layer**: Database schemas and data validation
- **Middleware Layer**: Authentication, validation, and error handling
- **Utils Layer**: Helper functions and utilities

## 💻 Technology Stack

### Core Technologies
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js 4.21+
- **Language**: TypeScript 5.0+
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs

### Development Tools
- **Build Tool**: TypeScript Compiler
- **Development Server**: Nodemon
- **Linting**: ESLint with Prettier
- **Testing**: Jest (planned)
- **API Documentation**: Swagger/OpenAPI (planned)

### External Services
- **File Storage**: Cloudinary
- **Email Service**: Nodemailer
- **Maps Integration**: Google Maps API
- **Logging**: Pino Logger

### Dependencies Overview
```json
{
  "express": "^4.21.0",
  "mongoose": "^8.6.3",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "joi": "^17.13.3",
  "cloudinary": "^2.5.0",
  "nodemailer": "^6.9.15",
  "pino": "^9.6.0"
}
```

## 📋 Prerequisites

- **Node.js**: Version 18.0 or higher
- **MongoDB**: Version 6.0 or higher (local or MongoDB Atlas)
- **npm/yarn**: Package manager
- **Git**: Version control

### Development Environment
- **Code Editor**: VS Code (recommended)
- **API Testing**: Postman or Insomnia
- **Database GUI**: MongoDB Compass (optional)

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/aquilawest/project.git
cd supplychainmanagementsystem/project
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables
Copy the environment template:
```bash
cp .env.example .env
```

### 4. Configure Database
Ensure MongoDB is running:
```bash
# For local MongoDB
sudo service mongod start

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env file
```

## ⚙️ Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/supply_chain_db
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/supply_chain_db

# JWT Configuration
JWT_SECRET_KEY=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Email Configuration (NodeMailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_FROM=noreply@supplychainapp.com

# Cloudinary Configuration (Image Upload)
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google Maps API (Optional - for location features)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Application URLs
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:5000
```

### Development Setup
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | User registration | No |
| POST | `/auth/login` | User login | No |
| POST | `/auth/verify` | Email verification | No |
| POST | `/auth/forgotpassword` | Request password reset | No |
| POST | `/auth/resetpassword` | Reset password | No |
| PATCH | `/auth/updatepassword` | Update password | Yes |

### Product Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/product/all-products` | Get all products | Yes | All |
| GET | `/product/one-product/:id` | Get single product | Yes | All |
| GET | `/product/supplier-products/:id` | Get products by supplier | Yes | All |
| POST | `/product/create-product` | Create new product | Yes | Supplier/Admin |
| PATCH | `/product/update-product/:id` | Update product | Yes | Supplier/Admin |
| DELETE | `/product/delete-product/:id` | Delete product | Yes | Supplier/Admin |

### Order Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/order/all-orders` | Get user orders | Yes | All |
| GET | `/order/one-order/:id` | Get single order | Yes | All |
| POST | `/order/create-order` | Create new order | Yes | Consumer |
| PATCH | `/order/update-order/:id` | Update order status | Yes | Supplier/Admin |
| DELETE | `/order/delete-order/:id` | Delete order | Yes | Consumer/Admin |
| POST | `/order/directions` | Get directions | Yes | All |
| POST | `/order/nearby-places` | Find nearby places | Yes | All |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/admin/get-users` | Get all users | Yes | Admin |
| GET | `/admin/get-orders` | Get all orders | Yes | Admin |
| GET | `/admin/one-user/:id` | Get single user | Yes | Admin |
| POST | `/admin/create-user` | Create new user | Yes | Admin |
| PATCH | `/admin/update-user/:id` | Update user | Yes | Admin |
| DELETE | `/admin/delete-user/:id` | Delete user | Yes | Admin |

### User Profile Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/profile/get-profile` | Get user profile | Yes |
| PATCH | `/profile/set-profile` | Update profile | Yes |
| DELETE | `/profile/delete-profile` | Delete profile | Yes |

### Inventory Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/inventory/all-inventories` | Get all inventories | Yes | Supplier/Admin |
| POST | `/inventory/add-inventory` | Add inventory | Yes | Supplier/Admin |
| DELETE | `/inventory/delete-inventory/:id` | Delete inventory | Yes | Supplier/Admin |

## 🗄️ Database Schema

### User Model
```typescript
interface IUser {
  _id: ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  password: string; // hashed
  userType: 'admin' | 'supplier' | 'consumer';
  isActive: boolean;
  image?: string;
  gender?: string;
  product: ObjectId[]; // Reference to Product
  order: ObjectId[]; // Reference to Order
  inventory: ObjectId[]; // Reference to Inventory
  otp: {
    code: number;
    expiresAt: Date;
  };
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
}
```

### Product Model
```typescript
interface IProduct {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  status: 'in_stock' | 'out_of_stock' | 'discontinued';
  _user: ObjectId; // Reference to User (supplier)
  createdAt: Date;
  updatedAt: Date;
}
```

### Order Model
```typescript
interface IOrder {
  _id: ObjectId;
  products: {
    productId: ObjectId; // Reference to Product
    quantity: number;
    unitPrice: number;
  }[];
  _orderedBy: ObjectId; // Reference to User (consumer)
  supplier: string;
  deliveryAddress: string;
  paymentMethod: string;
  status: 'pending' | 'approved' | 'shipped' | 'delivered' | 'cancelled';
  note?: string;
  deliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Inventory Model
```typescript
interface IInventory {
  _id: ObjectId;
  product: ObjectId; // Reference to Product
  quantity: number;
  threshold: number; // Minimum stock level
  location: string;
  _user: ObjectId; // Reference to User (supplier)
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔐 Authentication & Authorization

### JWT Token Structure
```json
{
  "_id": "user_id",
  "userType": "admin|supplier|consumer",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Role-Based Permissions

| Resource | Admin | Supplier | Consumer |
|----------|-------|----------|----------|
| Users | CRUD | Read (own) | Read (own) |
| Products | CRUD | CRUD (own) | Read |
| Orders | CRUD | Update (received) | CRUD (own) |
| Inventory | Read | CRUD (own) | None |

### Request Headers
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## ⚠️ Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400,
  "stack": "Error stack (development only)"
}
```

### HTTP Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **500**: Internal Server Error

## 🧪 Testing

### Unit Tests (Planned)
```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### API Testing with Postman
1. Import the Postman collection (available in `/docs/postman/`)
2. Set up environment variables
3. Run authentication flow to get JWT token
4. Test all endpoints

## 🚀 Deployment

### Production Build
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Configuration
- Set `NODE_ENV=production`
- Use secure JWT secrets
- Configure proper CORS settings
- Set up SSL/TLS certificates
- Use MongoDB Atlas for database
- Configure proper logging

### Docker Deployment (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist/ ./dist/
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Add tests for new functionality
5. Run linting: `npm run lint`
6. Commit your changes: `git commit -m "feat: add new feature"`
7. Push to the branch: `git push origin feature/your-feature`
8. Open a Pull Request

### Code Standards
- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful commit messages
- Add JSDoc comments for functions
- Maintain test coverage

### Commit Convention
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions or changes
- `chore:` Build process or auxiliary tool changes

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 📞 Support

- **Maintainer**: Aquila Onojah
- **Email**: [aquilaonoja@gmail.com](mailto:aquilaonoja@gmail.com)
- **GitHub**: [@aquilawest](https://github.com/aquilawest)

## 📝 Changelog

### v1.0.0 (Current)
- Initial release
- Complete CRUD operations for all entities
- JWT authentication and authorization
- Role-based access control
- Email verification system
- File upload functionality
- Comprehensive error handling

---

**Made with ❤️ for efficient supply chain management**
