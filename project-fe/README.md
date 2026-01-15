# Supply Chain Management System - Frontend Application

![Next.js](https://img.shields.io/badge/Next.js-15.3+-black.svg)
![React](https://img.shields.io/badge/React-19.0+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-2.2+-06B6D4.svg)

A modern, responsive web application for supply chain management built with Next.js 15, React 19, and TypeScript. This application provides a comprehensive interface for managing products, orders, users, and inventory with role-based dashboards.

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Development](#-development)
- [Project Structure](#-project-structure)
- [User Roles & Features](#-user-roles--features)
- [State Management](#-state-management)
- [API Integration](#-api-integration)
- [UI Components](#-ui-components)
- [Authentication Flow](#-authentication-flow)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features

### Core Functionality
- **Multi-Role Dashboard**: Separate interfaces for Admin, Supplier, and Consumer
- **Product Management**: Complete CRUD operations with image upload
- **Order Management**: Order placement, tracking, and status updates
- **User Management**: Registration, authentication, and profile management
- **Inventory Tracking**: Real-time stock management and monitoring
- **Geographic Integration**: Google Maps for location services

### User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Optimistic UI updates with React Query
- **Interactive Tables**: Advanced data tables with sorting and filtering
- **Confirmation Modals**: User-friendly confirmation dialogs
- **Loading States**: Comprehensive loading indicators
- **Error Handling**: User-friendly error messages and recovery

### Advanced Features
- **State Persistence**: Redux Persist for session management
- **Form Validation**: React Hook Form with validation
- **Image Upload**: Drag-and-drop image upload interface
- **Data Visualization**: Charts and analytics (planned)
- **Export Functionality**: Data export capabilities (planned)
- **Real-time Notifications**: Toast notifications for user feedback

## 💻 Technology Stack

### Core Framework
- **Next.js 15.3+**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript 5**: Type-safe development

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Framer Motion**: Animation library
- **TailwindCSS Animate**: Additional animations

### State Management
- **Redux Toolkit**: Modern Redux pattern
- **Redux Persist**: State persistence
- **TanStack React Query**: Server state management

### Form Management
- **React Hook Form**: Performant form library
- **Input OTP**: OTP input component

### Data Visualization
- **TanStack React Table**: Headless table library
- **Cobe**: Interactive globe component

### Development Tools
- **TypeScript**: Static type checking
- **ESLint**: Code linting
- **Prettier**: Code formatting

### External Integrations
- **Google Maps**: Location services
- **Axios**: HTTP client
- **React Select**: Enhanced select components

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Presentation  │    │   Application   │    │   Data Layer    │
│     Layer       │    │     Layer       │    │                 │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • Pages         │    │ • Hooks         │    │ • API Services  │
│ • Components    │◄───┤ • State Mgmt    │◄───┤ • React Query   │
│ • UI Elements   │    │ • Utils         │    │ • Local Storage │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Architecture Principles
- **Component-Based**: Reusable UI components
- **Hook-Based Logic**: Custom hooks for business logic
- **Service Layer**: Centralized API communication
- **Type Safety**: End-to-end TypeScript coverage

## 📋 Prerequisites

- **Node.js**: Version 18.0 or higher
- **npm/yarn/pnpm**: Package manager
- **Git**: Version control
- **Backend API**: Running supply chain backend

### Development Environment
- **Code Editor**: VS Code (recommended)
- **Browser**: Chrome/Edge (latest)
- **Extensions**: 
  - TypeScript and React extensions
  - Tailwind CSS IntelliSense
  - ESLint and Prettier

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/aquilawest/project.git
cd supplychainmanagementsystem/project-fe
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup
Create a `.env.local` file:
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1

# Google Maps (Optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

## ⚙️ Configuration

### Environment Variables
```env
# Required
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1

# Optional Features
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name

# Development
NEXT_PUBLIC_DEV_MODE=true
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- PostCSS 7 compatibility
- Custom animations
- Extended color palette
- Responsive breakpoints

## 🚦 Development

### Development Server
```bash
# Start development server with Turbopack
npm run dev

# Traditional Next.js dev server
npm run dev:legacy
```

### Build & Production
```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

### Development Scripts
```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## 📁 Project Structure

```
project-fe/
├── app/                     # Next.js App Router
│   ├── (auth)/             # Authentication pages
│   ├── dashboard/          # Protected dashboard pages
│   │   ├── orders/         # Order management
│   │   ├── product/        # Product management
│   │   ├── users/          # User management (admin)
│   │   └── my-products/    # Supplier products
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Home page
├── components/             # Reusable components
│   ├── auth/              # Authentication components
│   ├── order/             # Order components
│   ├── product/           # Product components
│   ├── ui/                # UI components
│   └── user/              # User components
├── feature/               # Feature-specific modules
│   ├── admin/             # Admin functionality
│   ├── auth/              # Authentication logic
│   ├── order/             # Order management
│   └── products/          # Product management
├── hooks/                 # Custom React hooks
├── model/                 # TypeScript interfaces
├── scaffold/              # Layout components
├── store/                 # Redux store
├── utils/                 # Utility functions
└── public/                # Static assets
```

### Key Directories

#### `app/` - Next.js App Router
- Route-based file structure
- Nested layouts and loading states
- Server and client components

#### `components/` - UI Components
- Reusable UI components
- Feature-specific components
- Shared component library

#### `hooks/` - Custom Hooks
- API integration hooks
- Business logic hooks
- Reusable state logic

#### `feature/` - Feature Modules
- Domain-specific logic
- API service functions
- Type definitions

## 👥 User Roles & Features

### 🔴 Admin Dashboard
**Role**: System Administrator

**Features**:
- **User Management**: Create, read, update, delete users
- **Order Oversight**: View and manage all orders across the system
- **Product Monitoring**: Overview of all products in the system
- **System Analytics**: Dashboard with key metrics and statistics
- **User Role Management**: Assign and modify user roles

**Pages**:
- `/dashboard` - Admin overview
- `/dashboard/users` - User management
- `/dashboard/orders` - All orders view
- `/dashboard/product` - All products view

### 🟡 Supplier Dashboard
**Role**: Product Supplier

**Features**:
- **Product Management**: CRUD operations for own products
- **Inventory Control**: Stock level monitoring and management
- **Order Processing**: View and update orders for supplied products
- **Order Status Updates**: Mark orders as delivered/shipped
- **Profile Management**: Update supplier profile and settings

**Pages**:
- `/dashboard` - Supplier overview
- `/dashboard/my-products` - Own products management
- `/dashboard/orders` - Received orders
- `/dashboard/product/view-product/:id` - Product details and ordering

### 🟢 Consumer Dashboard
**Role**: Product Consumer/Buyer

**Features**:
- **Product Browsing**: View all available products
- **Order Placement**: Create new orders for products
- **Order Tracking**: Track order status and history
- **Profile Management**: Update personal information
- **Address Management**: Manage delivery addresses

**Pages**:
- `/dashboard` - Consumer overview
- `/dashboard/product` - Browse all products
- `/dashboard/orders` - Order history and tracking
- `/dashboard/orders/view-order` - Order details

## 🗃️ State Management

### Redux Store Structure
```typescript
interface RootState {
  auth: {
    user: IUser | null;
    isAuthenticated: boolean;
    token: string | null;
  };
  // Additional slices as needed
}
```

### Authentication Slice
```typescript
// store/authSlice.ts
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});
```

### React Query Integration
```typescript
// hooks/products.hook.ts
export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getAllProductsServices,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

## 🔌 API Integration

### Axios Configuration
```typescript
// utils/api.ts
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

// Request interceptor for auth token
axiosInstance.interceptors.request.use((config) => {
  const token = getTokenFromStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Service Layer Pattern
```typescript
// feature/products/productsServices.ts
export const getAllProductsServices = async (): Promise<IProduct[]> => {
  const response = await axiosInstance.get(
    ENDPOINT_URLS.products["get-all"]
  );
  return response.data;
};

export const createProductServices = async (
  data: IProductCreate
): Promise<IProduct> => {
  const response = await axiosInstance.post(
    ENDPOINT_URLS.products["create-product"],
    data
  );
  return response.data;
};
```

### Custom Hooks Pattern
```typescript
// hooks/products.hook.ts
export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createProductServices,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create product');
    },
  });
};
```

## 🎨 UI Components

### Component Library Structure
```
components/
├── ui/                    # Base UI components
│   ├── Button.tsx        # Reusable button component
│   ├── Input.tsx         # Form input component
│   ├── DataTable.tsx     # Advanced data table
│   ├── ConfirmationModal.tsx # Confirmation dialog
│   └── Sidebar.tsx       # Navigation sidebar
├── auth/                 # Authentication components
│   ├── Login.tsx         # Login form
│   └── SignUp.tsx        # Registration form
├── product/              # Product-specific components
│   ├── ProductCard.tsx   # Product display card
│   └── ProductForm.tsx   # Product creation/edit form
└── order/                # Order-specific components
    ├── OrderTable.tsx    # Order listing table
    └── OrderDetails.tsx  # Order detail view
```

### Reusable Components

#### Button Component
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

#### DataTable Component
```typescript
interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  title?: string;
  buttonTitle?: string;
  route?: string;
}
```

### Styling Approach
- **Tailwind CSS**: Utility-first styling
- **Component Variants**: Using `class-variance-authority`
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Ready for dark mode implementation

## 🔐 Authentication Flow

### Authentication States
```typescript
enum AuthState {
  UNAUTHENTICATED = 'unauthenticated',
  AUTHENTICATED = 'authenticated',
  LOADING = 'loading',
  ERROR = 'error',
}
```

### Protected Routes
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

### Role-Based Navigation
```typescript
const getNavigationItems = (userType: string) => {
  const baseItems = [
    { label: 'Products', href: '/dashboard/product' },
    { label: 'Orders', href: '/dashboard/orders' },
  ];

  if (userType === 'admin') {
    return [
      { label: 'Users', href: '/dashboard/users' },
      ...baseItems,
    ];
  }

  return baseItems;
};
```

## 📱 Responsive Design

### Breakpoint Strategy
```css
/* Tailwind CSS Breakpoints */
sm: '640px',   /* Mobile landscape */
md: '768px',   /* Tablet */
lg: '1024px',  /* Desktop */
xl: '1280px',  /* Large desktop */
2xl: '1536px'  /* Extra large desktop */
```

### Mobile-First Components
```typescript
// Responsive table example
<div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50 hidden md:table-header-group">
      {/* Desktop headers */}
    </thead>
    <tbody className="md:table-row-group">
      {/* Responsive rows */}
    </tbody>
  </table>
</div>
```

## 🚀 Deployment

### Build Configuration
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start",
    "export": "next export"
  }
}
```

### Environment Configuration
```bash
# Production environment variables
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/api/v1
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
```

### Deployment Platforms

#### Vercel (Recommended)
```bash
# Deploy to Vercel
npm i -g vercel
vercel
```

#### Docker Deployment
```dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS build
COPY . .
RUN npm run build

FROM base AS runtime
COPY --from=build /app/.next ./.next
EXPOSE 3000
CMD ["npm", "start"]
```

#### Traditional Hosting
```bash
# Build static files
npm run build
npm run export

# Upload 'out' directory to hosting service
```

### Performance Optimizations
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: `@next/bundle-analyzer`
- **Caching**: React Query for server state
- **Lazy Loading**: Dynamic imports for heavy components

## 🧪 Testing (Planned)

### Testing Strategy
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### Testing Tools (To be implemented)
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing
- **MSW**: API mocking

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: Follow ESLint and Prettier configurations
2. **Component Structure**: Use functional components with hooks
3. **TypeScript**: Maintain strict type checking
4. **Naming Conventions**: Use PascalCase for components, camelCase for functions
5. **File Organization**: Group related files in feature directories

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/your-feature-name
```

### Pull Request Process
1. Ensure all tests pass
2. Update documentation if needed
3. Add screenshots for UI changes
4. Request code review
5. Address feedback and merge

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 🆘 Support & Contact

- **Maintainer**: Aquila Onojah
- **Email**: [aquilaonoja@gmail.com](mailto:aquilaonoja@gmail.com)
- **GitHub**: [@aquilawest](https://github.com/aquilawest)

## 📚 Additional Resources

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### UI/UX Resources
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Headless UI Components](https://headlessui.com)
- [Lucide Icons](https://lucide.dev)

### Development Tools
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

## 📈 Roadmap

### Version 1.1 (Planned)
- [ ] Advanced search and filtering
- [ ] Data visualization dashboard
- [ ] Export functionality (PDF, Excel)
- [ ] Real-time notifications
- [ ] Advanced user permissions

### Version 1.2 (Planned)
- [ ] Mobile app (React Native)
- [ ] Offline support (PWA)
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Theme customization

---

**Built with ❤️ for modern supply chain management**
