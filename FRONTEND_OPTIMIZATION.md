# Frontend optimization guide

## Structure Optimization

### Before (Current)
```
src/
├── components/
│   ├── Appointments/
│   ├── Community/
│   ├── ...
├── context/
├── assets/
└── pages/
```

### After (Optimized)
```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── features/        # Feature-specific components
│   └── layout/          # Layout components
├── pages/               # Page components
├── hooks/               # Custom hooks
├── context/             # Context providers
├── services/            # API services
├── utils/               # Utility functions
├── styles/              # Global styles
└── types/               # TypeScript types (if using TS)
```

## Key Optimizations

### 1. API Service Layer
Create centralized API service instead of direct axios calls:

```js
// services/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add interceptors for JWT token handling
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 2. Custom Hooks
Extract common logic into custom hooks:

```js
// hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// hooks/useApi.js
import { useState, useCallback } from 'react';
import api from '../services/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, url, data = null) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api[method](url, data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, request };
};
```

### 3. Component Optimization
- Use React.memo for expensive components
- Lazy load components with React.lazy
- Split large components into smaller ones
- Use useCallback for event handlers

### 4. Bundle Optimization
- Use Tree shaking (import specific modules)
- Code splitting with React.lazy and Suspense
- Dynamic imports for routes
- Optimize images (WebP, responsive sizes)

### 5. State Management
- Keep context simple and focused
- Use useReducer for complex state
- Memoize context values to prevent unnecessary re-renders

```js
// Memoized context value
const value = useMemo(() => ({
  user,
  login,
  logout,
  isLoading,
}), [user, login, logout, isLoading]);
```

### 6. Performance Monitoring
- Add performance monitoring
- Track API response times
- Monitor component render times

### 7. Environment Configuration
```
.env.development
VITE_API_URL=http://localhost:5000

.env.production
VITE_API_URL=https://api.healingherbsapp.com
```

### 8. Async Handling
- Use async/await consistently
- Handle loading and error states
- Add timeouts for API calls
- Implement retry logic

## Updated Frontend Features
1. Centralized API service
2. Custom hooks for common operations
3. Better error handling
4. Loading states
5. Token refresh handling
6. Protected routes
7. Lazy loaded components
8. Optimized images
9. Environment-based configuration
10. Better TypeScript support
