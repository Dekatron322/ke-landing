# Redux API Setup

This project now has a complete Redux API setup using Redux Toolkit Query.

## Files Created

### Store Configuration

- `store/index.ts` - Main Redux store configuration
- `store/api/apiSlice.ts` - Base API slice with your Heroku backend URL
- `store/api/endpoints.ts` - All API endpoints (auth, customers, vendors, transactions, HMOs)
- `store/hooks.ts` - Typed Redux hooks for TypeScript

### Types

- `types/api.ts` - Complete TypeScript interfaces for all API responses and requests

## Usage Examples

### Authentication

```typescript
import { useLoginMutation } from "../store/api/endpoints"

const LoginComponent = () => {
  const [login, { isLoading, error }] = useLoginMutation()

  const handleLogin = async (credentials) => {
    try {
      const result = await login(credentials).unwrap()
      console.log("Login successful:", result)
    } catch (err) {
      console.error("Login failed:", err)
    }
  }
}
```

### Data Fetching

```typescript
import { useGetCustomersQuery } from '../store/api/endpoints'

const CustomerList = () => {
  const { data, isLoading, error } = useGetCustomersQuery({ page: 1, limit: 10 })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading customers</div>

  return (
    <div>
      {data?.data.map(customer => (
        <div key={customer.id}>{customer.businessName}</div>
      ))}
    </div>
  )
}
```

### Using Typed Hooks

```typescript
import { useAppDispatch, useAppSelector } from "../store/hooks"

const MyComponent = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.api.queries) // Fully typed

  // Your component logic
}
```

## Available Endpoints

### Authentication

- `login` - User login
- `register` - User registration
- `logout` - User logout
- `refreshToken` - Refresh access token
- `getProfile` - Get user profile
- `updateProfile` - Update user profile

### Customers

- `getCustomers` - Get paginated customers list
- `getCustomerById` - Get single customer
- `createCustomer` - Create new customer
- `updateCustomer` - Update customer
- `deleteCustomer` - Delete customer

### Vendors

- `getVendors` - Get paginated vendors list
- `getVendorById` - Get single vendor
- `createVendor` - Create new vendor
- `updateVendor` - Update vendor
- `deleteVendor` - Delete vendor

### Transactions

- `getTransactions` - Get paginated transactions
- `getTransactionById` - Get single transaction
- `createTransaction` - Create new transaction
- `updateTransaction` - Update transaction

### HMOs

- `getHmoCategories` - Get HMO categories
- `getHmosByCategory` - Get HMOs by category

## Features

- ✅ Automatic caching and invalidation
- ✅ Loading and error states
- ✅ TypeScript support
- ✅ Optimistic updates
- ✅ Automatic re-fetching on focus/reconnect
- ✅ Request deduplication
- ✅ Error handling

The setup is ready to use throughout your application!
