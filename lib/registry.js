/**
 * Backternity Component Registry
 *
 * Each component defines documentation, setup, generated files, and integration examples.
 *
 * This file contains a comprehensive set of Backternity components.
 */

const ComponentRegistry = {
  // ==========================================================
  // 🛡️ AUTH COMPONENTS
  // ==========================================================
  "auth-jwt": {
    name: "JWT Authentication",
    description:
      "A scalable JWT-based authentication system for Express with secure route protection, refresh tokens, and extendable user models.",
    type: "auth",
    version: "3.0.0",
    tags: ["auth", "jwt", "express", "security", "scalable"],

    documentation: {
      overview: `A secure and modular JWT authentication system built for Express.js.
Includes registration, login, logout, refresh tokens, and route protection.
The structure follows modern best practices and supports integration with MongoDB, PostgreSQL, Prisma, or any ORM/ODM as needed.
The User model and authentication logic can easily be customized or extended.`,

      installation: "npx backternity add auth-jwt",

      commandDetails: {
        purpose:
          "Installs a ready-to-use JWT authentication system with routes, middleware, and secure token management for Express apps.",
        creates: [
          "/src/routes/auth.js – Handles registration, login, refresh, logout.",
          "/src/services/authService.js – Core logic for authentication and token handling.",
          "/src/middleware/auth.js – Middleware for validating JWT tokens.",
          "/src/models/user.js – Default user model (can be customized).",
          "/src/models/tokenBlacklist.js – Optional refresh token blacklist model.",
          "/src/utils/response.js – Standardized API response helper.",
        ],
        modifies: [
          "server.js – Mounts /api/auth routes.",
          ".env – Adds JWT configuration keys and expiration times.",
        ],
      },

      configuration: `# Environment Variables
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=15m
REFRESH_EXPIRES_IN=30d
# Optional if using MongoDB
MONGODB_URI=mongodb://localhost:27017/backternity-app`,

      frontendUsage: {
        overview:
          "Here’s an example of integrating the authentication routes with a Next.js frontend using React hooks and fetch API for login and protected route access.",
        endpoints: [
          {
            route: "/api/auth/register",
            method: "POST",
            description: "Registers a new user and returns JWT tokens.",
            contentType: "application/json",
            sampleRequest: { email: "demo@example.com", password: "123456" },
            sampleResponse: {
              success: true,
              message: "Registered",
              data: {
                token: "eyJhbGciOiJIUzI1NiIs...",
                refresh: "eyJhbGciOiJIUzI1NiIs...",
                user: { id: "user_12345", email: "demo@example.com" },
              },
            },
          },
          {
            route: "/api/auth/login",
            method: "POST",
            description:
              "Authenticates user credentials and issues access/refresh tokens.",
            contentType: "application/json",
            sampleRequest: { email: "demo@example.com", password: "123456" },
            sampleResponse: {
              success: true,
              data: { token: "eyJhb...", refresh: "eyJhb..." },
            },
          },
          {
            route: "/api/auth/me",
            method: "GET",
            description: "Retrieves authenticated user profile using JWT.",
            contentType: "none",
            sampleResponse: {
              success: true,
              data: { id: "user_12345", email: "demo@example.com" },
            },
          },
          {
            route: "/api/auth/logout",
            method: "POST",
            description:
              "Revokes refresh token and logs the user out securely.",
            contentType: "application/json",
            sampleRequest: {
              refresh_token: "eyJhbGciOiJIUzI1NiIs...",
            },
            sampleResponse: {
              success: true,
              message: "Logged out successfully",
            },
          },
          {
            route: "/api/auth/refresh",
            method: "POST",
            description:
              "Generates a new access token using a valid refresh token.",
            contentType: "application/json",
            sampleRequest: {
              refresh_token: "eyJhbGciOiJIUzI1NiIs...",
            },
            sampleResponse: {
              success: true,
              message: "Token refreshed",
              data: {
                token: "eyJhbGciOiJIUzI1NiIs...",
              },
            },
          },
        ],
        example: `// app/components/LoginForm.jsx
'use client';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);
      localStorage.setItem('accessToken', data.data.token);
      localStorage.setItem('refreshToken', data.data.refresh);

      const me = await fetch('/api/auth/me', {
        headers: {
          Authorization: 'Bearer ' + data.data.token,
        },
      });

      const userData = await me.json();
      setUser(userData);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-black/20 border border-white/10 rounded-xl p-6 text-white space-y-4">
      <h2 className="text-xl font-semibold">Login</h2>
      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-md transition-colors"
        >
          Sign In
        </button>
      </form>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {user && (
        <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
          <p className="text-sm text-emerald-300">Welcome, {user.email}</p>
        </div>
      )}
    </div>
  );
}`,
      },

      backendIntegration: {
        overview:
          "To integrate the authentication routes and middleware into your backend, import and mount them in your Express application.",
        example: `// server.js
const express = require('express');
const dotenv = require('dotenv');
const { authRoutes } = require('./src/routes/auth');
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Auth-JWT service running on port 3000');
});`,
      },

      extendability: {
        overview:
          "The authentication logic and models can be extended or replaced with custom implementations (ORM, ODM, or service-based).",
        example: `// Example: Extending the User model with roles
const mongoose = require('mongoose');
const { User } = require('./src/models/user');

const ExtendedUserSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: String
});

module.exports = mongoose.models.ExtendedUser ||
  User.discriminator('ExtendedUser', ExtendedUserSchema);`,
      },

      usage: `// Protecting routes in Express
const express = require('express');
const { validateAuth } = require('./src/middleware/auth');
const app = express();

app.get('/api/protected', validateAuth, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});`,

      securityTips: [
        "Store JWT_SECRET securely in environment variables.",
        "Use HTTPS in production to prevent token interception.",
        "Keep access tokens short-lived and rotate refresh tokens periodically.",
        "Implement rate limiting to protect against brute-force attacks.",
        "Monitor dependencies and security updates regularly.",
      ],
    },
  },

  "auth-multi-factor": {
    name: "Multi-Factor Authentication (MFA)",
    description:
      "A robust multi-factor authentication system for Express, featuring OTP verification via email and secure JWT token handling.",
    type: "auth",
    version: "2.0.0",
    tags: ["auth", "mfa", "otp", "email", "express", "security", "jwt"],

    documentation: {
      overview: `Adds multi-factor authentication (MFA) to your Express app using email-based one-time passwords (OTPs).
After successful email verification, JWT tokens are issued for session security.
Includes OTP expiry handling, Nodemailer email delivery, and in-memory user storage for quick testing (replace with a real DB for production).`,

      installation: "npx backternity add auth-multi-factor",

      commandDetails: {
        purpose:
          "Installs ready-to-use routes, controllers, and services for multi-factor authentication using OTP verification and JWT.",
        creates: [
          "/routes/auth.js – Defines routes for register, login, verify, and profile endpoints.",
          "/controllers/authController.js – Manages authentication and OTP verification flow.",
          "/services/authService.js – Handles OTP generation, storage, JWT issuance, and user management.",
          "/services/emailService.js – Sends OTPs via Nodemailer using your SMTP credentials.",
          "/middleware/auth.js – Protects routes by verifying JWT tokens.",
          "/.env.example – Example environment configuration for SMTP and JWT setup.",
        ],
        modifies: [
          "server.js – Mounts /api/auth routes for MFA authentication endpoints.",
        ],
      },

      configuration: `# JWT Configuration
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d

# OTP
OTP_EXPIRY_MINUTES=10

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_NAME=Your App Name

PORT=3000
NODE_ENV=development`,

      frontendUsage: {
        overview:
          "Here’s a complete Next.js example showing how to register, verify OTP, and handle JWT tokens using this MFA component.",
        endpoints: [
          {
            route: "/api/auth/register",
            method: "POST",
            description:
              "Registers a user and sends an OTP to the provided email for verification.",
            sampleRequest: {
              email: "user@example.com",
              password: "SecurePass123!",
            },
            sampleResponse: {
              success: true,
              message:
                "Registration successful. Please check your email for OTP verification.",
              token: "temp_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              data: {
                email: "user@example.com",
                verified: false,
                requiresVerification: true,
              },
            },
          },
          {
            route: "/api/auth/login",
            method: "POST",
            description:
              "Initiates login by verifying credentials and sending an OTP email.",
            sampleRequest: {
              email: "user@example.com",
              password: "SecurePass123!",
            },
            sampleResponse: {
              success: true,
              message: "Login credentials verified. OTP sent to your email.",
              token: "temp_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              data: {
                email: "user@example.com",
                requiresVerification: true,
              },
            },
          },
          {
            route: "/api/auth/verify",
            method: "POST",
            description:
              "Verifies the OTP and returns a JWT token upon success.",
            sampleRequest: {
              token: "temp_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              otp: "123456",
            },
            sampleResponse: {
              success: true,
              message: "OTP verified successfully. You are now authenticated.",
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              user: {
                id: "user_67890",
                email: "user@example.com",
                verified: true,
                createdAt: "2024-01-15T10:30:00Z",
              },
            },
          },
          {
            route: "/api/auth/me",
            method: "GET",
            description: "Fetches the authenticated user’s details using JWT.",
            sampleResponse: {
              success: true,
              user: {
                id: "user_67890",
                email: "user@example.com",
                verified: true,
              },
            },
          },
        ],
        example: `// app/components/MFAFlow.jsx
'use client';
import { useState } from 'react';

export default function MFAFlow() {
  const [step, setStep] = useState('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [tempToken, setTempToken] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [message, setMessage] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
    setMessage('');
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setTempToken(data.token);
      setStep('verify');
      setMessage('OTP sent to your email.');
    } else {
      setMessage(data.error || 'Registration failed.');
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    const res = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp, tempToken }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('accessToken', data.token);
      setAccessToken(data.token);
      setStep('authenticated');
      setMessage('Verification successful! Logged in.');
    } else {
      setMessage(data.error || 'OTP verification failed.');
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-black/20 border border-white/10 rounded-xl p-6 text-white space-y-4">
      <h2 className="text-xl font-semibold">Multi-Factor Authentication</h2>

      {step === 'register' && (
        <form onSubmit={handleRegister} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-md transition-colors"
          >
            Register
          </button>
        </form>
      )}

      {step === 'verify' && (
        <form onSubmit={handleVerify} className="space-y-3">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-md transition-colors"
          >
            Verify OTP
          </button>
        </form>
      )}

      {step === 'authenticated' && (
        <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
          <p className="text-sm text-emerald-300">✅ Logged in with JWT</p>
          <p className="text-xs break-all text-white/70 mt-2">
            {accessToken}
          </p>
        </div>
      )}

      {message && <p className="text-amber-400 text-sm">{message}</p>}
    </div>
  );
}`,
      },

      backendIntegration: {
        overview:
          "Integrate the MFA authentication routes and middleware into your Express application easily.",
        example: `// server.js
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth');
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Multi-Factor Auth service running');
});`,
      },

      usage: `// Protect routes with JWT
const express = require('express');
const authMiddleware = require('./src/middleware/auth');
const app = express();

app.get('/api/me', authMiddleware, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});`,

      securityTips: [
        "Use HTTPS in production to secure OTP and token delivery.",
        "Replace in-memory storage with MongoDB or PostgreSQL for persistence.",
        "Use environment variables for SMTP credentials.",
        "Implement rate limiting to prevent OTP abuse.",
        "Keep OTP expiry short (5–10 minutes) for best security.",
      ],
    },
  },

  "razorpay-gateway-express-js": {
    "name": "Razorpay Gateway (Express.js)",
    "description": "Production-ready Express.js middleware for integrating Razorpay payments with modular REST endpoints, secure signature verification, and webhook automation. Designed for scalability and easy extension.",
    "type": "payment",
    "version": "1.1.0",
    "tags": ["razorpay", "payment", "gateway", "express", "secure", "verify", "webhook", "nodejs"],
    
    "documentation": {
      "overview": "A **modular Razorpay payment gateway** built with Express.js, enabling seamless order creation, payment verification, and webhook handling for real-time payment updates. Includes strong HMAC SHA256 verification for security and a flexible architecture for extending with subscriptions, refunds, or custom workflows.",
      
      "installation": "npx backternity add razorpay-gateway-express-js",
      
      "commandDetails": {
        "purpose": "Installs a preconfigured Razorpay payment integration with clean route separation, secure webhook verification, and reusable payment services.",
        "creates": [
          "/src/config/razorpay.js – Initializes Razorpay SDK and loads credentials from .env",
          "/src/services/paymentService.js – Core logic for order creation, verification, and webhooks",
          "/src/routes/payment.js – REST routes for order creation, verification, and fetching details",
          "/server.js.example – Express server integrating payment routes",
          "/.env.example – Example config for Razorpay keys and webhook secret"
        ],
        "modifies": [
          "server.js – Adds /api/payment route and webhook middleware",
          ".env – Adds Razorpay credentials (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, WEBHOOK_SECRET)"
        ]
      },
      
      "configuration": "# Razorpay Configuration\nRAZORPAY_KEY_ID=your_razorpay_key_id\nRAZORPAY_KEY_SECRET=your_razorpay_key_secret\nPORT=8000\nWEBHOOK_SECRET=your_webhook_secret",
      
      "frontendUsage": {
        "overview": "Integrate directly with your frontend to initiate secure payment orders, verify signatures after checkout, and track payment statuses in real-time. Perfect for integrating with React, Next.js, or Vue apps.",
        "endpoints": [
          {
            "route": "/api/payment/order",
            "method": "POST",
            "description": "Creates a new Razorpay order. Accepts amount, currency, metadata, and optional custom options.",
            "sampleRequest": {
              "amount": 50000,
              "currency": "INR",
              "metadata": { "userId": "123", "plan": "pro" }
            },
            "sampleResponse": {
              "success": true,
              "order": {
                "id": "order_N1tA2j3B5x",
                "amount": 50000,
                "currency": "INR",
                "status": "created",
                "receipt": "rcpt_12345"
              }
            }
          },
          {
            "route": "/api/payment/verify",
            "method": "POST",
            "description": "Verifies payment using the signature returned by Razorpay after successful payment.",
            "sampleRequest": {
              "razorpay_order_id": "order_N1tA2j3B5x",
              "razorpay_payment_id": "pay_N1u7Hk8x",
              "razorpay_signature": "sha256signaturehere"
            },
            "sampleResponse": {
              "success": true,
              "message": "Payment verified successfully"
            }
          },
          {
            "route": "/api/payment/order/:id",
            "method": "GET",
            "description": "Fetches full Razorpay order details using the order ID.",
            "sampleResponse": {
              "success": true,
              "order": {
                "id": "order_N1tA2j3B5x",
                "amount": 50000,
                "status": "paid"
              }
            }
          },
          {
            "route": "/api/payment/webhook",
            "method": "POST",
            "description": "Receives and verifies Razorpay webhooks for automatic payment events (e.g., payment captured, refund, etc.).",
            "sampleRequest": {
              "event": "payment.captured",
              "payload": { "payment": { "entity": { "id": "pay_N1u7Hk8x" } } }
            },
            "sampleResponse": {
              "success": true,
              "received": true
            }
          }
        ],
        "example": "// Example frontend usage (Next.js)\n'use client';\nimport { useState } from 'react';\n\nexport default function RazorpayCheckout() {\n  const [loading, setLoading] = useState(false);\n\n  async function handlePayment() {\n    setLoading(true);\n    const res = await fetch('/api/payment/order', {\n      method: 'POST',\n      headers: { 'Content-Type': 'application/json' },\n      body: JSON.stringify({ amount: 49900 }) // amount in paise\n    });\n    const data = await res.json();\n\n    const options = {\n      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,\n      amount: data.order.amount,\n      currency: data.order.currency,\n      order_id: data.order.id,\n      handler: async (response) => {\n        await fetch('/api/payment/verify', {\n          method: 'POST',\n          headers: { 'Content-Type': 'application/json' },\n          body: JSON.stringify(response)\n        });\n        alert('Payment verified successfully!');\n      }\n    };\n\n    const razorpay = new window.Razorpay(options);\n    razorpay.open();\n    setLoading(false);\n  }\n\n  return (\n    <button\n      onClick={handlePayment}\n      disabled={loading}\n      className=\"bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-md text-white\"\n    >\n      {loading ? 'Processing...' : 'Pay ₹499'}\n    </button>\n  );\n}"
      },

      "backendIntegration": {
        "overview": "Add the payment routes to your Express backend to securely create and verify Razorpay orders. You can also extend the service with refunds or subscription endpoints using Razorpay APIs.",
        "example": "// server.js\nconst express = require('express');\nconst dotenv = require('dotenv');\nconst cors = require('cors');\nconst bodyParser = require('body-parser');\nconst paymentRoute = require('./src/routes/payment');\n\ndotenv.config();\nconst app = express();\napp.use(cors());\napp.use(bodyParser.json());\napp.use('/api/payment', paymentRoute);\n\nconst PORT = process.env.PORT || 8000;\napp.listen(PORT, () => console.log(`✅ Razorpay Gateway running on port ${PORT}`));"
      },

      "usage": "// Example service usage (server-side)\nconst { createOrder, verifyPaymentSignature } = require('./src/services/paymentService');\n\n(async () => {\n  const order = await createOrder({ amount: 10000, metadata: { user: 'John' } });\n  console.log('Created order:', order);\n})();",
      
      "securityTips": [
        "Always verify Razorpay signatures server-side using the secret key.",
        "Never expose your Razorpay key secret or webhook secret on the frontend.",
        "Validate incoming webhook requests before processing them.",
        "Use HTTPS in production for all payment endpoints.",
        "Restrict webhook IPs in the Razorpay dashboard to prevent spoofing."
      ]
    },

    "meta": {
      "framework": "express",
      "requiresAuth": false,
      "requiresDatabase": false,
      "paymentGateway": "razorpay",
      "scalable": true,
      "secure": true,
      "category": "payment",
      "related": ["auth-jwt", "logger-winston", "sse-events"]
    }
  },
  "auth-oauth-github": {
    name: "GitHub OAuth",
    description:
      "OAuth authentication for Express using GitHub — includes secure JWT issuance and user profile handling with TypeScript support.",
    type: "auth",
    version: "2.1.0",
    tags: ["auth", "oauth", "github", "express", "jwt", "typescript"],

    documentation: {
      overview: `A flexible OAuth authentication component for Express.js using **GitHub** as the provider.
It handles the full flow — authorization redirect, token exchange, profile retrieval, and JWT issuance.
Ideal for adding “Login with GitHub” functionality to any backend or Next.js app.`,

      installation: "npx backternity add auth-oauth-github",

      commandDetails: {
        purpose:
          "Installs a TypeScript-based GitHub OAuth 2.0 authentication flow with automatic JWT generation and user profile management.",
        creates: [
          "/src/routes/oauth.ts – Defines GitHub OAuth endpoints.",
          "/src/controllers/oauthController.ts – Handles GitHub OAuth logic and callback processing.",
          "/src/services/oauthService.ts – Manages token exchange, user retrieval, and JWT creation.",
          "/src/models/OAuthUser.ts – Defines a typed in-memory user model.",
          "/.env.example – Includes JWT, app, and GitHub credentials.",
        ],
        modifies: [
          "server.ts – Mounts /api/oauth routes.",
          "tsconfig.json – (optional) Ensures module resolution for @/ imports.",
        ],
      },

      configuration: `# JWT Configuration
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d

# Application Settings
APP_URL=http://localhost:3000
PORT=3000

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_REDIRECT_URI=http://localhost:3000/api/oauth/github/callback`,

      frontendUsage: {
        overview:
          "Below is a complete **Next.js** example that demonstrates GitHub OAuth login. After successful authentication, the backend returns a signed JWT and user profile.",
        endpoints: [
          {
            route: "/api/oauth/github",
            method: "GET",
            description: "Redirects the user to GitHub for authorization.",
            sampleRequest: "GET /api/oauth/github",
            sampleResponse: {
              type: "redirect",
              url: "https://github.com/login/oauth/authorize?client_id=your_client_id&redirect_uri=http://localhost:3000/api/oauth/github/callback&scope=user:email",
            },
          },
          {
            route: "/api/oauth/github/callback",
            method: "GET",
            description:
              "Handles GitHub's callback, issues JWT, and returns the user profile.",
            sampleRequest:
              "GET /api/oauth/github/callback?code=github_auth_code",
            sampleResponse: {
              success: true,
              message: "GitHub authentication successful",
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              user: {
                id: "user_12345",
                email: "john@example.com",
                name: "John Doe",
                image: "https://avatars.githubusercontent.com/u/12345",
                provider: "github",
                verified: true,
                createdAt: "2024-01-15T10:30:00Z",
              },
            },
          },
        ],
        example: `// app/components/GitHubLogin.jsx
'use client';
import { useState, useEffect } from 'react';

export default function GitHubLogin() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Handle redirect after GitHub callback
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('accessToken', token);
      fetchUser(token);
    }
  }, []);

  async function fetchUser(token) {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await res.json();
      setUser(data.user);
    } catch {
      setMessage('Failed to fetch user profile.');
    }
  }

  function handleGitHubLogin() {
    window.location.href = '/api/oauth/github';
  }

  return (
    <div className="max-w-sm mx-auto bg-black/20 border border-white/10 rounded-xl p-6 text-white space-y-4">
      <h2 className="text-xl font-semibold">Login with GitHub</h2>

      {!user && (
        <button
          onClick={handleGitHubLogin}
          className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 rounded-md transition-colors"
        >
          Continue with GitHub
        </button>
      )}

      {user && (
        <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
          <p className="text-sm text-emerald-300">✅ Logged in as {user.name}</p>
          <p className="text-xs text-white/70 mt-1">{user.email}</p>
          <p className="text-xs text-white/70 mt-1">
            GitHub ID: {user.oauthId}
          </p>
        </div>
      )}

      {message && <p className="text-amber-400 text-sm">{message}</p>}
    </div>
  );
}`,
      },

      backendIntegration: {
        overview:
          "Integrate the GitHub OAuth routes into your Express app. Once the callback completes, you'll receive a JWT and user data, ready to use with your existing authentication system.",
        example: `// server.ts
import express from 'express';
import dotenv from 'dotenv';
import { oauthRoutes } from './src/routes/oauth';

dotenv.config();

const app = express();
app.use('/api/oauth', oauthRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('✅ GitHub OAuth service running');
});`,
      },

      usage: `// Example of protecting a route with the returned JWT
import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();

function validateAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer '))
    return res.status(401).json({ error: 'Missing token' });
  try {
    const token = header.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/api/protected', validateAuth, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});`,

      securityTips: [
        "Always use HTTPS for OAuth redirects and callbacks.",
        "Store client secrets and JWT keys securely in environment variables.",
        "Never expose your client secret in frontend code.",
        "Use short-lived JWTs and refresh tokens for better security.",
        "Replace in-memory user storage with a database in production.",
      ],
    },

    meta: {
      framework: "express",
      language: "typescript",
      supportsOAuth: true,
      providers: ["github"],
      scalable: true,
      related: ["auth-jwt"],
    },
  },

  "auth-oauth-google": {
    name: "Google OAuth",
    description:
      "Authenticate users with Google OAuth using Passport.js and JWT for secure, scalable Express backends.",
    type: "auth",
    version: "2.0.0",
    tags: ["auth", "oauth", "google", "passport", "express", "jwt", "security"],

    documentation: {
      overview: `A production-ready **Google OAuth 2.0** authentication component built with **Passport.js** and **JWT**.
It provides secure OAuth login with automatic JWT issuance and user profile management.
Perfect for adding Google-based authentication to any Express or Next.js app.`,

      installation: "npx backternity add auth-oauth-google",

      commandDetails: {
        purpose:
          "Installs Passport.js-based Google OAuth flow with JWT token handling and Express integration.",
        creates: [
          "/src/config/passport.js – Configures Passport Google OAuth 2.0 strategy.",
          "/src/routes/auth.js – Routes for /auth/google and /auth/google/callback.",
          "/src/services/userService.js – Handles user creation and retrieval.",
          "/.env.example – Example environment configuration for OAuth and JWT.",
        ],
        modifies: [
          "server.js – Mounts /auth routes and configures Passport middleware.",
          "frontend/.env – Add FRONTEND_URL for redirect handling.",
        ],
      },

      configuration: `# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# JWT Configuration
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d

# Application URLs
BACKEND_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000`,

      frontendUsage: {
        overview:
          "Use the endpoints below to implement secure Google login from your Next.js frontend. The backend returns a signed JWT and user profile after successful authentication.",
        endpoints: [
          {
            route: "/auth/google",
            method: "GET",
            description:
              "Redirects the user to Google for OAuth authorization.",
            sampleRequest: "GET /auth/google",
            sampleResponse: {
              type: "redirect",
              url: "https://accounts.google.com/o/oauth2/v2/auth?client_id=your_client_id&redirect_uri=http://localhost:3001/auth/google/callback&scope=openid%20email%20profile",
            },
          },
          {
            route: "/auth/google/callback",
            method: "GET",
            description:
              "Handles Google's callback, issues JWT, and redirects the user to the frontend with the token.",
            sampleRequest: "GET /auth/google/callback?code=google_auth_code",
            sampleResponse: {
              type: "redirect",
              url: "http://localhost:3000/auth/callback?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              user: {
                id: "user_67890",
                email: "user@gmail.com",
                name: "John Doe",
                image: "https://lh3.googleusercontent.com/a/default-user",
                provider: "google",
                createdAt: "2024-01-15T10:30:00Z",
              },
            },
          },
        ],
        example: `// app/components/GoogleLogin.jsx
'use client';
import { useState, useEffect } from 'react';

export default function GoogleLogin() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Capture token from callback redirect
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('accessToken', token);
      fetchUser(token);
    }
  }, []);

  async function fetchUser(token) {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await res.json();
      setUser(data.user);
    } catch {
      setMessage('Failed to fetch user profile.');
    }
  }

  return (
    <div className="max-w-sm mx-auto bg-black/20 border border-white/10 rounded-xl p-6 text-white space-y-4">
      <h2 className="text-xl font-semibold">Login with Google</h2>

      {!user && (
        <button
          onClick={() => (window.location.href = 'http://localhost:3001/auth/google')}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-colors"
        >
          Continue with Google
        </button>
      )}

      {user && (
        <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
          <p className="text-sm text-emerald-300">✅ Logged in as {user.name}</p>
          <p className="text-xs text-white/70 mt-1">{user.email}</p>
          <p className="text-xs text-white/70 mt-1">Provider: Google</p>
        </div>
      )}

      {message && <p className="text-amber-400 text-sm">{message}</p>}
    </div>
  );
}`,
      },

      backendIntegration: {
        overview:
          "Integrate the Google OAuth routes into your Express app. After authentication, the backend redirects users to your frontend with a JWT token.",
        example: `// server.js
const express = require('express');
const session = require('express-session');
const passport = require('./src/config/passport');
const authRoutes = require('./src/routes/auth');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use('/auth', authRoutes);

app.listen(process.env.PORT || 3001, () =>
  console.log(\`✅ Google OAuth running on port \${process.env.PORT || 3001}\`)
);`,
      },

      usage: `// Example protected route using JWT
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.get('/api/me', verifyToken, (req, res) => {
  res.json({ message: 'Authenticated user', user: req.user });
});`,

      securityTips: [
        "Always use HTTPS for OAuth redirects and callbacks.",
        "Never expose your client secret in frontend code.",
        "Store JWT and OAuth credentials securely in environment variables.",
        "Set correct redirect URIs in Google Cloud Console.",
        "Use short-lived JWTs with rotation for maximum security.",
      ],
    },

    meta: {
      framework: "express",
      language: "javascript",
      supportsOAuth: true,
      providers: ["google"],
      scalable: true,
      related: ["auth-jwt", "auth-oauth-github"],
    },
  },
  // ==========================================================
  // 💾 DATABASE COMPONENTS
  // ==========================================================
  "database-mongodb": {
    name: "MongoDB Database",
    description:
      "A modular MongoDB integration for Express with Mongoose, featuring dynamic model registration, CRUD APIs, and built-in support for auth components like auth-jwt.",
    type: "database",
    version: "3.1.0",
    tags: [
      "database",
      "mongodb",
      "mongoose",
      "crud",
      "javascript",
      "express",
      "auth",
      "scalable",
    ],

    documentation: {
      overview: `A powerful, modular MongoDB integration for Express using **Mongoose**.
This component provides a shared database layer that is automatically reused by authentication and other Backternity modules (like **auth-jwt**, **aws-s3-upload**, and **logger-winston**).
It supports dynamic model registration and discriminator-based extensions — perfect for scalable systems.`,

      installation: "npx backternity add database-mongodb",

      commandDetails: {
        purpose:
          "Installs a shared MongoDB integration for Express with Mongoose and dynamic model management. Designed to work standalone or as a foundation for other components like auth-jwt.",
        creates: [
          "/src/config/database.js – Shared MongoDB connection logic.",
          "/src/models/index.js – Registers base User and Product models.",
          "/src/routes/crud.js – Provides generic CRUD endpoints for all models.",
          "/server.js.example – Example integration for Express app.",
          "/.env.example – Environment variables for MongoDB configuration.",
        ],
        modifies: [
          "server.js – Adds MongoDB connection setup.",
          "src/models – Can be extended dynamically via discriminators.",
        ],
      },

      configuration: `# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/backternity-app
NODE_ENV=development
PORT=3000`,

      frontendUsage: {
        overview:
          "You can interact with any registered model (like `User` or `Product`) using these CRUD API endpoints. Below is a Next.js example for fetching, creating, and updating documents.",
        endpoints: [
          {
            route: "/api/crud/Product",
            method: "POST",
            description: "Create a new product document.",
            sampleRequest: {
              name: "Gaming Laptop",
              price: 89999,
              category: "Electronics",
              inStock: true,
            },
            sampleResponse: {
              success: true,
              data: {
                _id: "64f8a4b2c1234567890abcde",
                name: "Gaming Laptop",
                price: 89999,
                category: "Electronics",
                inStock: true,
                createdAt: "2024-09-07T10:30:00Z",
                updatedAt: "2024-09-07T10:30:00Z",
              },
            },
          },
          {
            route: "/api/crud/Product",
            method: "GET",
            description: "Fetch all products (supports query filters).",
            sampleRequest: null,
            sampleResponse: {
              success: true,
              data: [
                {
                  _id: "64f8a4b2c1234567890abcde",
                  name: "Gaming Laptop",
                  price: 89999,
                  category: "Electronics",
                  inStock: true,
                  createdAt: "2024-09-07T10:30:00Z",
                },
                {
                  _id: "64f8a4b2c1234567890abcdf",
                  name: "Wireless Mouse",
                  price: 2999,
                  category: "Accessories",
                  inStock: true,
                  createdAt: "2024-09-07T10:31:00Z",
                },
              ],
              total: 2,
              page: 1,
              limit: 10,
            },
          },
          {
            route: "/api/crud/Product/64f8a4b2c1234567890abcde",
            method: "PUT",
            description: "Update a specific product by its ID.",
            sampleRequest: {
              price: 79999,
              inStock: false,
            },
            sampleResponse: {
              success: true,
              data: {
                _id: "64f8a4b2c1234567890abcde",
                name: "Gaming Laptop",
                price: 79999,
                category: "Electronics",
                inStock: false,
                updatedAt: "2024-09-07T11:00:00Z",
              },
            },
          },
          {
            route: "/api/crud/Product/64f8a4b2c1234567890abcde",
            method: "DELETE",
            description: "Delete a specific product by its ID.",
            sampleRequest: null,
            sampleResponse: {
              success: true,
              message: "Product deleted successfully",
              deletedId: "64f8a4b2c1234567890abcde",
            },
          },
          {
            route: "/api/crud/Product/64f8a4b2c1234567890abcde",
            method: "GET",
            description: "Fetch a specific product by its ID.",
            sampleRequest: null,
            sampleResponse: {
              success: true,
              data: {
                _id: "64f8a4b2c1234567890abcde",
                name: "Gaming Laptop",
                price: 89999,
                category: "Electronics",
                inStock: true,
                createdAt: "2024-09-07T10:30:00Z",
                updatedAt: "2024-09-07T10:30:00Z",
              },
            },
          },
        ],
        example: `// app/components/ProductManager.jsx
'use client';
import { useState, useEffect } from 'react';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '' });

  // Fetch all products
  async function fetchProducts() {
    const res = await fetch('/api/crud/Product');
    const data = await res.json();
    setProducts(data);
  }

  // Create a new product
  async function addProduct() {
    await fetch('/api/crud/Product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ name: '', price: '' });
    fetchProducts();
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-lg mx-auto bg-black/20 p-6 rounded-xl border border-white/10 text-white space-y-4">
      <h2 className="text-xl font-semibold">MongoDB Product Manager</h2>

      <div className="space-y-2">
        <input
          placeholder="Product Name"
          className="w-full p-2 rounded bg-black/40 border border-white/20 text-white"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Price"
          type="number"
          className="w-full p-2 rounded bg-black/40 border border-white/20 text-white"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <button
          onClick={addProduct}
          className="w-full bg-emerald-600 hover:bg-emerald-700 py-2 rounded-md font-semibold"
        >
          Add Product
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Available Products</h3>
        {products.length === 0 ? (
          <p className="text-sm text-gray-400">No products found.</p>
        ) : (
          <ul className="space-y-1">
            {products.map((p) => (
              <li
                key={p._id}
                className="p-2 bg-black/30 rounded-md border border-white/10"
              >
                {p.name} — ₹{p.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}`,
      },

      backendIntegration: {
        overview:
          "Integrate this MongoDB component into your Express app. Other Backternity modules (like auth-jwt) automatically reuse its shared Mongoose connection.",
        example: `// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectMongoDB = require('./src/config/database');
const crudRoutes = require('./src/routes/crud');
require('./src/models');

dotenv.config();

const app = express();
app.use(express.json());
connectMongoDB();

app.use('/api/crud', crudRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('✅ MongoDB component active and ready');
});`,
      },

      extendability: {
        overview:
          "Extend core models (like `User`) using discriminators or Mongoose schema extensions. Ideal for adding fields like roles, permissions, or avatars used by auth-jwt.",
        example: `// src/extensions/UserExtension.js
const mongoose = require('mongoose');
const { User } = require('../database-mongodb/src/models');

const ExtendedUserSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: String
});

module.exports = mongoose.models.ExtendedUser ||
  User.discriminator('ExtendedUser', ExtendedUserSchema);`,
      },

      usage: `// Example CRUD usage in Express
const express = require('express');
const app = express();
const crudRoutes = require('./src/routes/crud');
const connectMongoDB = require('./src/config/database');
connectMongoDB();

app.use('/api/crud', crudRoutes);

app.listen(3000, () => console.log('MongoDB CRUD API running'));`,

      securityTips: [
        "Use environment variables for your MongoDB URI; never hardcode credentials.",
        "Enable TLS for remote MongoDB connections (Atlas).",
        "Avoid exposing CRUD endpoints publicly in production.",
        "Use Mongoose validation and indexes for data integrity.",
        "Regularly back up your database for safety.",
      ],
    },

    meta: {
      framework: "express",
      requiresDatabase: true,
      sharedConnection: true,
      expandable: true,
      supportsAuth: true,
      scalable: true,
      related: ["auth-jwt", "logger-winston", "aws-s3-upload"],
    },
  },

  // ==========================================================
  // ⚙️ MIDDLEWARE / UTILITIES
  // ==========================================================
  "rate-limiter": {
    name: "Rate Limiter",
    description: "Prevents abuse & DDoS attacks by limiting requests per IP.",
    type: "middleware",
    version: "2.0.0",
    tags: ["security", "express"],

    documentation: {
      overview:
        "Implements express-rate-limit middleware for controlling request frequency.",
      installation: "npx backternity add rate-limiter",
      commandDetails: {
        purpose: "Adds rate-limiting middleware to protect routes.",
        creates: [
          "/middleware/rateLimiter.js – Preconfigured limiter middleware.",
        ],
        modifies: ["server.js – Applies limiter globally."],
      },
      configuration: `# Environment Variables
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100`,

      frontendUsage: {
        overview:
          "The rate limiter protects your API endpoints from abuse. When rate limits are exceeded, specific HTTP responses are returned.",
        endpoints: [
          {
            route: "/api/test-endpoint",
            method: "GET",
            description:
              "Test any protected endpoint to see rate limiting in action.",
            sampleRequest: null,
            sampleResponse: {
              success: true,
              message: "Request successful",
              rateLimit: {
                limit: 100,
                remaining: 99,
                resetTime: "2024-09-07T10:31:00Z",
              },
            },
          },
          {
            route: "/api/test-endpoint",
            method: "GET",
            description: "Response when rate limit is exceeded.",
            sampleRequest: null,
            sampleResponse: {
              error: "Too many requests",
              message: "Rate limit exceeded. Try again later.",
              retryAfter: 60,
            },
          },
          {
            route: "/api/rate-limit/status",
            method: "GET",
            description: "Check current rate limit status for your IP.",
            sampleRequest: null,
            sampleResponse: {
              success: true,
              data: {
                ip: "192.168.1.100",
                requestsRemaining: 85,
                totalLimit: 100,
                windowMs: 60000,
                resetTime: "2024-09-07T10:31:00Z",
              },
            },
          },
        ],
        example: `// app/components/RateLimitTester.jsx
'use client';
import { useState } from 'react';

export default function RateLimitTester() {
  const [result, setResult] = useState('');
  const [requestCount, setRequestCount] = useState(0);

  const testRateLimit = async () => {
    try {
      const res = await fetch('/api/test-endpoint');
      const data = await res.json();
      
      if (res.ok) {
        setRequestCount(prev => prev + 1);
        setResult(\`✅ Request \${requestCount + 1} successful. \${data.rateLimit?.remaining || 'N/A'} requests remaining.\`);
      } else {
        setResult(\`❌ Rate limited! \${data.message}\`);
      }
    } catch (error) {
      setResult(\`⚠️ Error: \${error.message}\`);
    }
  };

  return (
    <div className="p-4 border border-white/10 rounded-lg bg-black/30 text-white">
      <h3 className="text-lg font-semibold mb-3">Rate Limit Tester</h3>
      <button
        onClick={testRateLimit}
        className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded font-medium"
      >
        Send Request ({requestCount} sent)
      </button>
      <p className="text-sm text-gray-300 mt-2">{result}</p>
    </div>
  );
}`,
      },

      usage: `const rateLimiter = require('./middleware/rateLimiter');
app.use(rateLimiter);`,
    },
  },

  "logger-winston": {
    name: "Winston Logger",
    description:
      "Advanced structured logging system for Node.js and Express using Winston. Supports console and file logs, JSON formatting, and request tracking middleware.",
    type: "utility",
    version: "2.0.0",
    tags: ["logging", "winston", "express", "node", "monitoring", "json"],

    documentation: {
      overview: `A robust, production-ready logging component built on **Winston**, providing structured, leveled, and environment-based logging for Express and Node.js apps.
Supports file and console transports, request logging middleware, and JSON-structured log output for analysis tools like ELK or Datadog.`,

      installation: "npx backternity add logger-winston",

      commandDetails: {
        purpose:
          "Installs a Winston-based logger with default transports (console and optional file). Includes structured JSON logging and Express middleware for request and error logging.",
        creates: [
          "/src/services/logger.js – Configures Winston logger with transports and formats.",
          "/server.js.example – Demonstrates request logging and error handling.",
          "/.env.example – Configures log level and file output settings.",
        ],
        modifies: [
          "server.js – Integrates logger middleware and error tracking.",
          ".env – Adds logging configuration (level, file path, output toggle).",
        ],
      },

      configuration: `# Logger Configuration
LOG_LEVEL=info          # Available: error, warn, info, http, verbose, debug, silly
LOG_TO_FILE=true        # Enable/disable file logging
LOG_FILE_PATH=./logs/app.log
SERVICE_NAME=api-service
NODE_ENV=development`,

      frontendUsage: {
        overview:
          "Although this is a backend logger, it supports frontend-compatible structured logs when used in full-stack apps (e.g., for API request metrics). Use with tools like Datadog, Logtail, or custom dashboards to visualize logs.",
        endpoints: [
          {
            route: "/api/log-event",
            method: "POST",
            description:
              "Send a custom log event from frontend to backend logger.",
            sampleRequest: {
              level: "info",
              message: "User action performed",
              context: {
                page: "/dashboard",
                action: "button_click",
                userId: "user_123",
              },
            },
            sampleResponse: {
              success: true,
              message: "Log event recorded successfully",
              timestamp: "2024-09-07T10:30:00Z",
              logId: "log_64f8a4b2c1234567890abcde",
            },
          },
          {
            route: "/api/logs/health",
            method: "GET",
            description: "Get logging system health and recent stats.",
            sampleRequest: null,
            sampleResponse: {
              success: true,
              data: {
                status: "healthy",
                logLevel: "info",
                logsToday: 1245,
                errorsToday: 3,
                lastErrorTime: "2024-09-07T09:45:00Z",
                fileLogging: true,
                transports: ["console", "file"],
              },
            },
          },
          {
            route: "/api/logs/recent",
            method: "GET",
            description: "Retrieve recent log entries (last 50).",
            sampleRequest: null,
            sampleResponse: {
              success: true,
              data: [
                {
                  timestamp: "2024-09-07T10:29:45Z",
                  level: "info",
                  message: "User login successful",
                  context: { userId: "user_123", ip: "192.168.1.100" },
                },
                {
                  timestamp: "2024-09-07T10:28:12Z",
                  level: "warn",
                  message: "High response time detected",
                  context: { route: "/api/data", duration: 1200 },
                },
              ],
              total: 50,
              page: 1,
            },
          },

          {
            route: "/",
            method: "GET",
            description: "Root route to confirm the logger is active.",
            sampleResponse: {
              success: true,
              message: "Logger active. Check console or logs for output.",
            },
          },
          {
            route: "/error",
            method: "GET",
            description:
              "Simulates a server error and logs it through Winston.",
            sampleResponse: {
              success: false,
              message: "An error was logged successfully.",
              status: 500,
            },
          },
        ],
        example: `// app/components/LogEventButton.jsx (Next.js example)
'use client';
import { useState } from 'react';

export default function LogEventButton() {
  const [status, setStatus] = useState('');

  const sendLog = async () => {
    setStatus('Sending log...');
    try {
      const res = await fetch('/api/log-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: 'info',
          message: 'User triggered frontend log event',
          context: { page: '/dashboard', action: 'button_click' }
        }),
      });
      if (res.ok) setStatus('✅ Log sent successfully');
      else setStatus('⚠️ Log send failed');
    } catch {
      setStatus('❌ Failed to send log');
    }
  };

  return (
    <div className="p-4 border border-white/10 rounded-lg bg-black/30">
      <button
        onClick={sendLog}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded"
      >
        Send Log Event
      </button>
      <p className="text-sm text-gray-400 mt-2">{status}</p>
    </div>
  );
}`,
      },

      backendIntegration: {
        overview:
          "Easily integrate the logger into your Express server to track HTTP requests, system events, and errors.",
        example: `// server.js
const express = require('express');
const dotenv = require('dotenv');
const logger = require('./src/services/logger');
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    logger.http('HTTP Request', {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: Date.now() - start,
      ip: req.ip
    });
  });
  next();
});

// Example route
app.get('/', (req, res) => {
  logger.info('Root route accessed', { ip: req.ip });
  res.send('Logger is active!');
});

// Error handling
app.use((err, req, res, next) => {
  logger.error('Unhandled Error', { message: err.message, stack: err.stack });
  res.status(500).send('Error logged');
});

app.listen(port, () => {
  logger.info(\`Server running on port \${port}\`);
});`,
      },

      usage: `// Logging different events
const logger = require('./src/services/logger');

// Informational
logger.info('User login successful', { userId: 123 });

// Warnings
logger.warn('High response time', { route: '/api/data', duration: 1200 });

// Errors
logger.error('Database connection failed', { service: 'db', retrying: true });

// Debug logs
logger.debug('Fetched records', { count: 34, source: 'cache' });`,

      securityTips: [
        "Avoid logging sensitive data like passwords or tokens.",
        "Mask or sanitize personal user information before logging.",
        "Use separate transports for error logs in production.",
        "Rotate logs regularly to prevent disk overflow.",
        "Integrate Winston with cloud logging (ELK, Datadog, or CloudWatch) for production visibility.",
      ],
    },

    meta: {
      framework: "express",
      requiresAuth: false,
      requiresDatabase: false,
      scalable: true,
      category: "monitoring",
      related: ["database-mongodb", "auth-jwt", "aws-s3-upload"],
    },
  },
  "job-queue-bull": {
    name: "Bull Job Queue",
    description:
      "A scalable and production-ready background job queue system built on Bull and Redis. Supports retries, delays, dashboards, and REST control.",
    type: "utility",
    version: "2.0.0",
    tags: [
      "bull",
      "redis",
      "queue",
      "jobs",
      "express",
      "background",
      "scheduler",
    ],

    documentation: {
      overview: `A robust, fault-tolerant job queue component for **Express** applications powered by **Bull** and **Redis**.
Enables background processing, scheduled tasks, automatic retries, and includes a real-time web dashboard (Bull Board) for monitoring.
Perfect for sending emails, processing uploads, caching, notifications, and other async workloads.`,

      installation: "npx backternity add job-queue-bull",

      commandDetails: {
        purpose:
          "Installs a complete Bull + Redis job queue system with REST endpoints, retry logic, and a Bull Board admin dashboard.",
        creates: [
          "/src/config/queue.js – Configures Bull and Redis connection.",
          "/src/routes/jobs.js – REST API routes for job management.",
          "/src/services/jobService.js – Add, fetch, and retry jobs.",
          "/src/config/dashboard.js – Bull Board web UI setup.",
          "/.env.example – Redis connection and queue settings.",
        ],
        modifies: [
          "server.js – Mounts /api/jobs and /admin/queues routes.",
          ".env – Adds Redis and queue configuration.",
        ],
      },

      configuration: `# Redis Configuration
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Queue Settings
QUEUE_NAME=background-jobs
MAX_RETRIES=3
PORT=3001`,

      frontendUsage: {
        overview:
          "Use this component with your frontend (Next.js or React) to enqueue background jobs like sending emails, generating reports, or processing uploads. You can also monitor job progress using the built-in Bull Board UI.",
        endpoints: [
          {
            route: "/api/jobs/add",
            method: "POST",
            description:
              "Adds a new job to the queue with optional delay or retries.",
            sampleRequest: {
              type: "send-email",
              data: {
                to: "user@example.com",
                subject: "Welcome to our platform!",
                template: "welcome",
                userId: "user_123",
              },
              options: {
                delay: 5000,
                attempts: 3,
                backoff: "exponential",
              },
            },
            sampleResponse: {
              success: true,
              message: "Job added to queue successfully",
              job: {
                id: "job_64f8a4b2c1234567890abcde",
                type: "send-email",
                status: "waiting",
                priority: 0,
                createdAt: "2024-09-07T10:30:00Z",
                estimatedProcessTime: "2024-09-07T10:30:05Z",
              },
            },
          },
          {
            route: "/api/jobs/status/job_64f8a4b2c1234567890abcde",
            method: "GET",
            description: "Retrieves the status and result of a specific job.",
            sampleRequest: null,
            sampleResponse: {
              success: true,
              data: {
                id: "job_64f8a4b2c1234567890abcde",
                type: "send-email",
                status: "completed",
                progress: 100,
                result: {
                  messageId: "msg_abc123",
                  sentAt: "2024-09-07T10:30:08Z",
                  success: true,
                },
                processedOn: "2024-09-07T10:30:08Z",
                finishedOn: "2024-09-07T10:30:08Z",
                attempts: 1,
                failedReason: null,
              },
            },
          },
          {
            route: "/api/jobs/retry-failed",
            method: "POST",
            description: "Retries all failed jobs currently in the queue.",
            sampleRequest: {
              maxRetries: 3,
            },
            sampleResponse: {
              success: true,
              message: "Failed jobs requeued successfully",
              data: {
                retriedCount: 5,
                failedJobIds: [
                  "job_64f8a4b2c1234567890abcde",
                  "job_64f8a4b2c1234567890abcdf",
                ],
              },
            },
          },
          {
            route: "/api/jobs/stats",
            method: "GET",
            description: "Get queue statistics and job counts.",
            sampleRequest: null,
            sampleResponse: {
              success: true,
              data: {
                waiting: 12,
                active: 3,
                completed: 1245,
                failed: 8,
                delayed: 2,
                paused: 0,
                totalProcessed: 1253,
                processingRate: "15 jobs/min",
              },
            },
          },
        ],
        example: `// app/jobs/EnqueueJob.jsx (Next.js example)
'use client';
import { useState } from 'react';

export default function EnqueueJob() {
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState('');

  async function enqueueEmailJob() {
    setStatus('Submitting job...');
    try {
      const res = await fetch('/api/jobs/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: 'sendEmail', email: 'user@example.com' }),
      });
      const data = await res.json();
      if (data.success) {
        setJobId(data.jobId);
        setStatus('✅ Job queued successfully!');
      } else {
        setStatus('⚠️ Failed to queue job');
      }
    } catch (err) {
      setStatus('❌ Error connecting to job queue');
    }
  }

  async function checkStatus() {
    if (!jobId) return;
    const res = await fetch('/api/jobs/status/' + jobId);
    const data = await res.json();
    alert(JSON.stringify(data.status, null, 2));
  }

  return (
    <div className="p-4 border border-white/10 rounded-lg bg-black/30">
      <button
        onClick={enqueueEmailJob}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
      >
        Queue Email Job
      </button>

      {jobId && (
        <button
          onClick={checkStatus}
          className="ml-3 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded font-medium"
        >
          Check Job Status
        </button>
      )}

      <p className="text-sm text-gray-400 mt-3">{status}</p>
      <p className="text-xs text-gray-500 mt-1">
        🔍 Monitor queue: <a href="/admin/queues" className="underline">Bull Board Dashboard</a>
      </p>
    </div>
  );
}`,
      },

      backendIntegration: {
        overview:
          "Integrate Bull queue and REST routes into your Express application. The Bull Board admin dashboard lets you visualize, pause, or retry jobs in real-time.",
        example: `// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const jobRoutes = require('./src/routes/jobs');
const serverAdapter = require('./src/config/dashboard');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// REST API routes for jobs
app.use('/api/jobs', jobRoutes);

// Bull Board admin dashboard
app.use('/admin/queues', serverAdapter.getRouter());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(\`✅ Job Queue service running on port \${PORT}\`));`,
      },

      usage: `// Enqueue and monitor background jobs
const { addJob, getJobStatus } = require('./src/services/jobService');

// Add new job
const job = await addJob({ task: 'emailReport', to: 'user@example.com' });

// Check status
const status = await getJobStatus(job.id);
console.log(status);`,

      securityTips: [
        "Never expose your Redis port publicly; use firewall rules or Docker networking.",
        "Monitor queue performance using Bull Board.",
        "Use separate Redis databases for production and development.",
        "Use Redis AUTH and TLS for secured deployments.",
        "Handle retries gracefully — avoid infinite retry loops.",
      ],
    },

    meta: {
      framework: "express",
      requiresAuth: false,
      requiresDatabase: false,
      scalable: true,
      monitoringUI: true,
      category: "utility",
      related: ["logger-winston", "database-mongodb", "auth-jwt"],
    },
  },

  "worker-threads": {
    name: "Worker Threads",
    description:
      "Offload CPU-intensive tasks to worker threads in Node.js to keep your Express server responsive. Includes a reusable worker service and a Fibonacci demo route.",
    type: "utility",
    version: "2.0.0",
    tags: [
      "worker-threads",
      "multithreading",
      "performance",
      "express",
      "javascript",
      "node",
    ],

    documentation: {
      overview: `A production-grade demonstration of **Node.js Worker Threads** for executing CPU-heavy computations without blocking the main event loop.
Ideal for handling complex calculations, image processing, or encryption in scalable Express applications.`,

      installation: "npx backternity add worker-threads-example",

      commandDetails: {
        purpose:
          "Installs a worker-thread utility with Express integration to run CPU-bound tasks (like Fibonacci calculations) off the main thread.",
        creates: [
          "/src/worker.js – Defines the CPU-heavy task (Fibonacci example).",
          "/src/services/workerService.js – Manages worker thread creation and lifecycle.",
          "/src/routes/heavyTask.js – Express route to trigger worker computation.",
          "/server.js.example – Example Express server with worker endpoint.",
        ],
        modifies: [
          "server.js – Adds a new route /api/calculate-fibonacci using worker threads.",
        ],
      },

      configuration: `# Environment Variables
PORT=3001
NODE_ENV=development`,

      frontendUsage: {
        overview:
          "You can trigger heavy computations like Fibonacci calculations directly from your frontend (Next.js or React). The computation runs on a worker thread, ensuring the main API remains responsive.",
        endpoints: [
          {
            route: "/api/calculate-fibonacci?number=40",
            method: "GET",
            description:
              "Executes a CPU-intensive Fibonacci calculation in a worker thread and returns the result asynchronously.",
            sampleRequest: "GET /api/calculate-fibonacci?number=40",
            sampleResponse: {
              success: true,
              message: "Fibonacci calculation completed",
              data: {
                input: 40,
                result: 102334155,
                executionTime: "1.245s",
                workerId: "worker_thread_1",
                timestamp: "2024-01-20T14:25:00Z",
              },
            },
          },
        ],
        example: `// app/workers/FibonacciClient.jsx (Next.js example)
'use client';
import { useState } from 'react';

export default function FibonacciClient() {
  const [number, setNumber] = useState(40);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function calculateFibonacci() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(\`/api/calculate-fibonacci?number=\${number}\`);
      const data = await res.json();
      setResult(data.result);
    } catch {
      setResult({ error: 'Failed to fetch result' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 border border-white/10 rounded-lg bg-black/30">
      <label className="block mb-2 text-sm font-medium">Enter Fibonacci Number:</label>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="px-3 py-2 rounded bg-zinc-900 border border-zinc-700 text-white w-full mb-3"
      />

      <button
        onClick={calculateFibonacci}
        disabled={loading}
        className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-700 text-white px-4 py-2 rounded font-medium"
      >
        {loading ? 'Calculating...' : 'Run Worker'}
      </button>

      {result && (
        <div className="mt-4 text-sm text-gray-300">
          <p>🧮 Result: <b>{result.result}</b></p>
          <p>🧠 Thread ID: {result.threadId}</p>
        </div>
      )}
    </div>
  );
}`,
      },

      backendIntegration: {
        overview:
          "Integrate the worker service into your Express app to handle compute-heavy tasks in background threads while keeping your main API non-blocking.",
        example: `// server.js
const express = require('express');
const heavyTaskRoutes = require('./src/routes/heavyTask');

const app = express();
const port = process.env.PORT || 3001;

app.use('/api', heavyTaskRoutes);

app.get('/', (req, res) => {
  res.send('Main thread is responsive! Visit /api/calculate-fibonacci?number=40');
});

app.listen(port, () => {
  console.log(\`🚀 Worker Threads server running at http://localhost:\${port}\`);
});`,
      },

      usage: `// Reuse worker threads for any CPU-heavy task
const { runWorker } = require('./src/services/workerService');
const path = require('path');

(async () => {
  const result = await runWorker({
    workerPath: path.resolve(__dirname, './src/worker.js'),
    workerData: 35
  });
  console.log('Worker Result:', result);
})();`,

      securityTips: [
        "Workers run in isolated threads — avoid sharing mutable global state.",
        "Limit input size to prevent long-running worker tasks.",
        "Use clustering for additional parallelism if needed.",
        "Monitor thread pool utilization in production.",
        "Always handle worker termination errors safely.",
      ],
    },

    meta: {
      framework: "express",
      requiresAuth: false,
      requiresDatabase: false,
      parallelProcessing: true,
      language: "javascript",
      scalable: true,
      category: "utility",
      related: ["job-queue-bull", "logger-winston"],
    },
  },
  // ==========================================================
  // ☁️ STORAGE
  // ==========================================================
  "aws-s3-upload": {
    name: "AWS S3 Upload",
    description:
      "A production-ready Express component for secure file uploads to AWS S3 using Multer and AWS SDK. Supports single and multiple uploads with public URLs and validation.",
    type: "storage",
    version: "2.0.0",
    tags: ["aws", "s3", "upload", "express", "multer", "storage", "javascript"],

    documentation: {
      overview: `This component provides an **Express + AWS S3** integration for handling file uploads efficiently and securely.
It supports both single and multiple file uploads using **Multer-S3**, with full control over file validation, naming, and upload limits.
It’s ideal for scalable systems requiring direct S3 uploads, such as profile pictures, documents, or media files.`,

      installation: "npx backternity add aws-s3-upload",

      commandDetails: {
        purpose:
          "Installs a complete AWS S3 file upload system using Multer-S3. Includes routes, configuration, and validation logic for secure file handling.",
        creates: [
          "/src/config/aws.js – Configures AWS SDK and credentials.",
          "/src/services/s3UploadService.js – Handles S3 uploads, filtering, and validation.",
          "/src/routes/upload.js – Defines single and multiple upload endpoints.",
          "/server.js.example – Demonstrates full Express integration.",
          "/.env.example – Example configuration for AWS and file size limits.",
        ],
        modifies: [
          "server.js – Adds /api/upload routes.",
          ".env – Adds AWS credentials and file restrictions.",
        ],
      },

      configuration: `# AWS Configuration
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-bucket-name

# Upload Configuration
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf`,

      frontendUsage: {
        overview:
          "Use the following **Next.js example** to upload files directly from your frontend using the provided Express S3 endpoints.",
        endpoints: [
          {
            route: "/api/upload/single",
            method: "POST",
            description: "Uploads a single file to AWS S3.",
            sampleRequest: "FormData with 'file' field",
            sampleResponse: {
              success: true,
              message: "File uploaded successfully",
              file: {
                filename: "profile-1699234567890.jpg",
                originalname: "profile.jpg",
                size: 245760,
                mimetype: "image/jpeg",
                url: "https://your-bucket.s3.amazonaws.com/uploads/profile-1699234567890.jpg",
                key: "uploads/profile-1699234567890.jpg",
                bucket: "your-bucket-name",
              },
            },
          },
          {
            route: "/api/upload/multiple",
            method: "POST",
            description: "Uploads multiple files (max 5) to AWS S3.",
            sampleRequest: "FormData with multiple 'files' fields",
            sampleResponse: {
              success: true,
              message: "Files uploaded successfully",
              files: [
                {
                  filename: "document-1699234567890.pdf",
                  originalname: "document.pdf",
                  size: 1048576,
                  mimetype: "application/pdf",
                  url: "https://your-bucket.s3.amazonaws.com/uploads/document-1699234567890.pdf",
                  key: "uploads/document-1699234567890.pdf",
                },
                {
                  filename: "image-1699234567891.png",
                  originalname: "screenshot.png",
                  size: 524288,
                  mimetype: "image/png",
                  url: "https://your-bucket.s3.amazonaws.com/uploads/image-1699234567891.png",
                  key: "uploads/image-1699234567891.png",
                },
              ],
              totalUploaded: 2,
            },
          },
          {
            route: "/api/upload/single",
            method: "POST",
            description: "Error response for invalid file type or size.",
            sampleRequest: "FormData with invalid file",
            sampleResponse: {
              success: false,
              error: "File validation failed",
              details:
                "Only JPEG, PNG, and PDF files are allowed. Maximum size: 5MB.",
            },
          },
        ],
        example: `// app/components/FileUploader.jsx
'use client';
import { useState } from 'react';

export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setMessage('Uploading...');
    try {
      const res = await fetch('/api/upload/single', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setUploadedUrl(data.file.url);
        setMessage('✅ File uploaded successfully');
      } else {
        setMessage('❌ ' + (data.error || 'Upload failed'));
      }
    } catch (err) {
      setMessage('❌ Upload error: ' + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-black/20 border border-white/10 rounded-xl p-6 text-white space-y-4">
      <h2 className="text-xl font-semibold">Upload to AWS S3</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0])}
        className="block w-full text-sm text-gray-300 border border-white/10 rounded-md cursor-pointer bg-black/30 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-emerald-500 file:text-white hover:file:bg-emerald-600"
      />

      <button
        onClick={handleUpload}
        className="w-full bg-emerald-600 hover:bg-emerald-700 py-2 rounded-md font-semibold transition-colors"
      >
        Upload File
      </button>

      {message && <p className="text-sm text-gray-300">{message}</p>}
      {uploadedUrl && (
        <a
          href={uploadedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-emerald-400 text-sm underline"
        >
          View Uploaded File
        </a>
      )}
    </div>
  );
}`,
      },

      backendIntegration: {
        overview:
          "Integrate the AWS S3 upload routes into your Express application. This automatically enables secure single and multiple file uploads.",
        example: `// server.js
const express = require('express');
const dotenv = require('dotenv');
const uploadRoutes = require('./src/routes/upload');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/upload', uploadRoutes);

app.listen(PORT, () => {
  console.log(\`✅ S3 upload server running on port \${PORT}\`);
});`,
      },

      usage: `// Example S3 Signed URL (for private file access)
const s3 = require('./src/config/aws');

const url = s3.getSignedUrl('getObject', {
  Bucket: process.env.S3_BUCKET_NAME,
  Key: 'uploads/example.png',
  Expires: 60, // 1 minute
});

console.log('Signed URL:', url);`,

      securityTips: [
        "Never expose AWS credentials client-side.",
        "Use least-privilege IAM policies for your S3 user.",
        "Validate file types and size limits via environment variables.",
        "Enable CORS for your frontend origin in the S3 bucket settings.",
        "Use HTTPS for all uploads and signed URL access.",
        "Rotate AWS keys periodically for enhanced security.",
      ],
    },

    meta: {
      framework: "express",
      cloudProvider: "aws",
      storageService: "s3",
      requiresAuth: false,
      requiresDatabase: false,
      scalable: true,
      related: ["database-mongodb", "auth-jwt", "logger-winston"],
    },
  },
  // ==========================================================
  // 🔁 JOB QUEUES & PROCESSING
  // ==========================================================

  // ==========================================================
  // 🧩 ADDITIONAL STORAGE (MINIO)
  // ==========================================================
  "storage-minio": {
    name: "MinIO Storage",
    description:
      "S3-compatible storage using MinIO for local testing and on-prem deployments.",
    type: "storage",
    version: "1.0.0",
    tags: ["minio", "s3", "storage"],

    documentation: {
      overview:
        "Provides S3-compatible API using MinIO and a simple uploader middleware.",
      installation: "npx backternity add storage-minio",
      commandDetails: {
        purpose: "Adds MinIO client integration and upload middleware.",
        creates: [
          "/config/minio.js – MinIO client config.",
          "/middleware/minioUpload.js – Upload helper middleware.",
        ],
        modifies: ["server.js – Adds upload endpoints and health checks."],
      },
      configuration: `# Environment Variables
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin`,
      usage: `const minioClient = require('./config/minio');
app.post('/api/upload', minioUpload.single('file'), (req, res) => {
  res.json({ url: req.file.url });
});`,
    },
  },

  // ==========================================================
  // 🗄️ CACHING SOLUTIONS
  // ==========================================================

  "cache-redis": {
    name: "Redis Cache System",
    description:
      "Advanced Redis caching layer with namespaces, TTL, and Express middleware for API response caching and high-performance data retrieval.",
    type: "utility",
    version: "2.1.0",
    tags: ["redis", "cache", "express", "performance", "nodejs", "typescript"],

    documentation: {
      overview: `A high-performance Redis caching component for Express and Node.js.
Implements key namespaces, flexible TTL, and programmatic APIs for manual or middleware-based caching.
Perfect for reducing database load and improving API latency across scalable backend systems.`,

      installation: "npx backternity add cache-redis",

      commandDetails: {
        purpose:
          "Installs a Redis-based caching system with automatic middleware integration, key management utilities, and programmatic APIs for Express applications.",
        creates: [
          "/src/config/redis.js – Initializes Redis client with connection and namespace support.",
          "/src/utils/cacheKeys.js – Utility for building consistent namespaced keys.",
          "/src/services/cacheService.js – Core caching logic (set/get/del/clear).",
          "/src/middleware/cacheResponse.js – Express middleware for auto-response caching.",
          "/src/routes/cacheAdmin.js – Admin endpoints for managing cache namespaces.",
          "/main.js.example – Demo Express app with caching in action.",
        ],
        modifies: [
          "server.js – Adds cache admin routes and response caching middleware.",
          ".env – Adds Redis connection and namespace configuration.",
        ],
      },

      configuration: `# Redis Configuration
REDIS_URL=redis://localhost:6379
REDIS_NAMESPACE=backternity
PORT=3000`,

      frontendUsage: {
        overview:
          "Integrate Redis caching with your frontend or Next.js app to dramatically speed up repeated API calls. This example shows how to fetch and display cached data (with `fromCache` status).",
        endpoints: [
          {
            route: "/api/products",
            method: "GET",
            description:
              "Fetches cached product data, with automatic TTL-based invalidation.",
          },
          {
            route: "/cache/keys/:type",
            method: "GET",
            description: "Lists all cache keys for a specific namespace.",
          },
          {
            route: "/cache/namespace/:type",
            method: "DELETE",
            description: "Clears all cached entries under a namespace.",
          },
        ],
        example: `// app/cache/ProductsFetcher.jsx (Next.js example)
'use client';
import { useState, useEffect } from 'react';

export default function ProductsFetcher() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromCache, setFromCache] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data.data);
      setFromCache(data.fromCache);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <div className="p-4 border border-white/10 rounded-lg bg-black/30">
      <h3 className="text-lg font-semibold mb-2 text-white">
        🛍️ Product List {fromCache && <span className="text-xs text-emerald-400">(from cache)</span>}
      </h3>
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : (
        <ul className="space-y-2">
          {products.map((p) => (
            <li key={p.id} className="text-sm text-foreground">
              {p.name}
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-gray-500 mt-3">🔄 Data auto-caches for 60s using Redis.</p>
    </div>
  );
}`,
      },

      backendIntegration: {
        overview:
          "Integrate Redis caching seamlessly into your Express application using middleware or direct service APIs. Cache responses, database results, or any computed data for maximum performance.",
        example: `// server.js
const express = require('express');
const dotenv = require('dotenv');
const cacheResponse = require('./src/middleware/cacheResponse');
const cacheAdmin = require('./src/routes/cacheAdmin');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/cache', cacheAdmin);

// Cached endpoint example
app.get('/api/products', cacheResponse('products', 60), async (req, res) => {
  const products = [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Phone' }];
  res.json(products);
});

app.listen(3000, () => console.log('🚀 Redis Cache Server running on port 3000'));`,
      },

      usage: `// Direct Cache Service Example
const cacheService = require('./src/services/cacheService');

// Set cache
await cacheService.set('user', '123', { name: 'Alice' }, 300);

// Get cache
const user = await cacheService.get('user', '123');

// Clear cache namespace
await cacheService.clearNamespace('user');`,

      securityTips: [
        "Avoid caching sensitive data such as passwords or tokens.",
        "Use short TTLs for frequently changing data.",
        "Isolate Redis instances per environment (dev/staging/prod).",
        "Monitor cache memory usage to prevent eviction spikes.",
        "Enable Redis AUTH for secure production deployments.",
      ],
    },

    meta: {
      framework: "express",
      requiresAuth: false,
      requiresDatabase: false,
      scalable: true,
      category: "utility",
      related: ["job-queue-bull", "logger-winston", "worker-threads-example"],
    },
  },
  "notifications-websocket": {
    name: "Real-Time Notifications (WebSocket)",
    description:
      "A scalable, production-ready WebSocket notification system for Express with optional email and queue-based delivery.",
    type: "bundles",
    version: "2.0.0",
    tags: [
      "websocket",
      "notifications",
      "realtime",
      "express",
      "socketio",
      "email",
      "queue",
    ],

    documentation: {
      overview: `A powerful, real-time notification system using **WebSocket (Socket.IO)** for instant delivery across clients.
Supports persistent storage (MongoDB), optional email notifications, and background queue processing with Bull.
Ideal for modern apps needing instant alerts, multi-channel delivery, and scalability.`,

      installation: "npx backternity add notifications-websocket",

      commandDetails: {
        purpose:
          "Installs a fully functional WebSocket notification system with real-time delivery, persistence, and multi-channel support (socket, email, queue).",
        creates: [
          "/src/config/websocket.js – Initializes the Socket.IO server and manages client connections.",
          "/src/models/notification.js – MongoDB schema for storing notification data.",
          "/src/config/email.js – Configures Nodemailer for optional email notifications.",
          "/src/config/queue.js – Sets up Bull queue for background message processing.",
          "/src/services/notificationService.js – Core service for creating and managing notifications.",
          "/src/routes/notifications.js – REST routes for creating, listing, and marking notifications.",
          "/server.js.example – Example server with integrated WebSocket and Express routing.",
        ],
        modifies: [
          "server.js – Adds WebSocket initialization and notification API routes.",
          ".env – Adds WebSocket, SMTP, and queue environment variables.",
        ],
      },

      configuration: `# WebSocket Notifications Configuration
PORT=3001
ENABLE_EMAIL_NOTIFICATIONS=true
NOTIFICATION_QUEUE_ENABLED=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=YourApp Notifications <your-email@gmail.com>`,

      frontendUsage: {
        overview:
          "Integrate in your Next.js or React app to receive instant real-time notifications. Users join their own private WebSocket room to receive personalized alerts.",
        endpoints: [
          {
            route: "/api/notifications",
            method: "POST",
            description:
              "Send a new notification via WebSocket, email, or queue.",
          },
          {
            route: "/api/notifications/:userId",
            method: "GET",
            description:
              "Fetch notifications for a user (supports unread filtering).",
          },
          {
            route: "/api/notifications/:id/read",
            method: "PATCH",
            description: "Mark a notification as read.",
          },
        ],
        example: `// app/notifications/NotificationClient.jsx (Next.js example)
'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function NotificationClient({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:3001', { transports: ['websocket'] });

    socket.on('connect', () => {
      setConnected(true);
      socket.emit('join', userId);
      console.log('🔗 Connected to WebSocket server');
    });

    socket.on('notification', (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    socket.on('disconnect', () => {
      setConnected(false);
      console.log('❌ Disconnected from server');
    });

    return () => socket.disconnect();
  }, [userId]);

  return (
    <div className="p-4 border border-white/10 rounded-lg bg-black/30">
      <h3 className="text-lg font-semibold mb-2 text-white">
        🔔 Notifications {connected ? '🟢' : '🔴'}
      </h3>
      {notifications.length === 0 ? (
        <p className="text-sm text-muted-foreground">No notifications yet...</p>
      ) : (
        <ul className="space-y-2 max-h-[250px] overflow-y-auto [&::-webkit-scrollbar]:w-0 scrollbar-none">
          {notifications.map((n) => (
            <li
              key={n._id}
              className="text-sm text-foreground border border-white/10 rounded-md p-2"
            >
              <strong className="text-emerald-400">{n.title}</strong>
              <p className="text-xs text-muted-foreground">{n.message}</p>
              <span className="text-[10px] text-gray-500 block mt-1">
                {n.type.toUpperCase()} • {n.priority.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
      },

      backendIntegration: {
        overview:
          "Integrate WebSocket notifications into your Express app easily — initialize the WebSocket server, attach it to HTTP, and set the shared socket instance for the notification service.",
        example: `// server.js
const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const initWebSocket = require('./src/config/websocket');
const notificationRoutes = require('./src/routes/notifications');
const { setSocketInstance } = require('./src/services/notificationService');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = initWebSocket(server);
setSocketInstance(io);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notifications');
app.use(express.json());
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(\`🔔 Notification service running on port \${PORT}\`));`,
      },

      usage: `// Programmatic usage example
const { createNotification } = require('./src/services/notificationService');

await createNotification({
  userId: '507f1f77bcf86cd799439011',
  title: 'New message received',
  message: 'You have a new message from Jane.',
  type: 'info',
  priority: 'normal',
  channels: ['socket', 'email'],
  metadata: { email: 'user@example.com' }
});`,

      securityTips: [
        "Authenticate WebSocket connections (e.g., via JWT or session tokens).",
        "Limit broadcast channels to user-specific rooms to prevent leaks.",
        "Use HTTPS + WSS in production for encrypted communication.",
        "Throttle notification creation endpoints to prevent abuse.",
        "Sanitize email inputs to prevent injection attacks.",
      ],
    },

    meta: {
      framework: "express",
      requiresAuth: false,
      requiresDatabase: true,
      supportsWebSocket: true,
      scalable: true,
      category: "communication",
      related: ["cache-redis", "job-queue-bull", "auth-jwt"],
    },
  },

  // ==========================================================
  // 🤖 AI INTEGRATIONS
  // ==========================================================

  "ai-openai-chat": {
    name: "OpenAI Chat (GPT)",
    description:
      "AI-powered chat system using OpenAI GPT models for Express apps. Provides a simple REST API for intelligent conversation.",
    type: "AI",
    version: "1.0.0",
    tags: [
      "ai",
      "openai",
      "gpt",
      "express",
      "chat",
      "natural-language",
      "nodejs",
    ],

    documentation: {
      overview: `A lightweight and production-ready AI chat component built on OpenAI’s GPT models.
Provides a clean Express REST API for chat and can easily integrate with any frontend like Next.js, React, or Vue.
Supports configurable models, JSON responses, and secure environment variable setup.`,

      installation: "npx backternity add ai-openai-chat",

      commandDetails: {
        purpose:
          "Installs a ready-to-use OpenAI chat system for Express.js applications. Handles API routing, request processing, and GPT responses via OpenAI SDK.",
        creates: [
          "/src/config/openai.js – Initializes the OpenAI client using API key from environment variables.",
          "/src/services/chatService.js – Contains logic to send user messages and retrieve AI responses.",
          "/src/routes/chat.js – Exposes POST /api/ai/chat for chat requests.",
          "/server.js – Express server setup integrating the chat route.",
          "/.env.example – Configures OpenAI API key and model name.",
        ],
        modifies: [
          "server.js – Adds /api/ai/chat route and JSON parsing middleware.",
          ".env – Adds OpenAI configuration variables.",
        ],
      },

      configuration: `# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key
MODEL_NAME=gpt-4o-mini
PORT=3001`,

      frontendUsage: {
        overview:
          "Integrate the Q&A endpoint into your frontend using fetch or a Next.js client component. Below is a working example using Next.js with Tailwind styling.",
        endpoints: [
          {
            route: "/api/ai/qna",
            method: "POST",
            description:
              "Sends a user question to the server and retrieves an AI-generated answer.",
            sampleRequest: {
              question:
                "What are the benefits of using Node.js for backend development?",
            },
            sampleResponse: {
              success: true,
              message: "AI response generated successfully",
              data: {
                question:
                  "What are the benefits of using Node.js for backend development?",
                answer:
                  "Node.js offers several key benefits for backend development: 1) Non-blocking I/O for high performance, 2) JavaScript ecosystem and npm packages, 3) Fast V8 engine, 4) Great for real-time applications, 5) Large community support, and 6) Cross-platform compatibility.",
                model: "gpt-4o-mini",
                tokens: {
                  prompt: 15,
                  completion: 67,
                  total: 82,
                },
                timestamp: "2024-01-20T14:25:00Z",
              },
            },
          },
        ],
        example: `// app/ai/AskAI.jsx (Next.js Example)
'use client';
import { useState } from 'react';

export default function AskAI() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!question.trim()) return;
    setLoading(true);
    const res = await fetch('/api/ai/qna', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  }

  return (
    <div className="p-4 bg-black/40 border border-white/10 rounded-lg">
      <h3 className="text-lg font-semibold mb-3 text-white">💬 Ask the AI</h3>
      <textarea
        className="w-full p-2 text-sm rounded bg-black/20 border border-white/10 text-white focus:outline-none"
        rows={3}
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-3 px-4 py-2 rounded bg-primary text-white text-sm hover:bg-primary/90 transition"
      >
        {loading ? 'Thinking...' : 'Ask'}
      </button>
      {answer && (
        <div className="mt-4 text-sm text-foreground border-t border-white/10 pt-2">
          <strong className="text-emerald-400">AI:</strong> {answer}
        </div>
      )}
    </div>
  );
}`,
      },

      backendIntegration: {
        overview:
          "Integrate the Q&A route into your Express backend and connect it to OpenAI via your API key. The component handles request validation and model configuration automatically.",
        example: `// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const qnaRoutes = require('./src/routes/qna');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/ai/qna', qnaRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(\`🤖 OpenAI QnA service running on port \${PORT}\`));`,
      },

      usage: `// Direct Service Example
const { askQuestion } = require('./src/services/qnaService');

(async () => {
  const answer = await askQuestion('What is quantum computing?');
  console.log('AI Answer:', answer);
})();`,

      securityTips: [
        "Never expose your OpenAI API key in frontend or client-side code.",
        "Use environment variables and keep them in `.env` files.",
        "Add rate limiting and input sanitization to prevent abuse.",
        "Avoid large input payloads that could increase token costs.",
      ],
    },

    meta: {
      framework: "express",
      requiresAuth: false,
      requiresDatabase: false,
      aiIntegrated: true,
      provider: "openai",
      scalable: true,
      category: "ai",
      related: ["cache-redis", "auth-jwt", "notifications-websocket"],
    },
  },

  "ai-google-gemini-chat": {
    name: "Google Gemini Chat",
    description:
      "AI-powered Q&A system for Express using Google Gemini API with fast and intelligent natural language responses.",
    type: "AI",
    version: "1.0.0",
    tags: [
      "ai",
      "google",
      "gemini",
      "express",
      "qna",
      "natural-language",
      "nodejs",
    ],

    documentation: {
      overview: `A modern AI-powered Q&A component built with **Google Gemini’s API** and **Express.js**.
It exposes a REST API endpoint that receives a user's question and returns an intelligent, context-aware answer powered by Google's Gemini models.
Designed to be flexible, lightweight, and easy to integrate with any frontend application.`,

      installation: "npx backternity add ai-google-gemini-qna",

      commandDetails: {
        purpose:
          "Sets up an Express service for text-based Q&A powered by Google Gemini AI.",
        creates: [
          "/src/config/gemini.js – Initializes Gemini client with API key.",
          "/src/services/qnaService.js – Handles question requests and AI responses.",
          "/src/routes/qna.js – Express route for /api/ai/qna endpoint.",
          ".env.example – Configuration for Gemini API and model.",
          "server.js – Example Express entry point.",
        ],
        modifies: [
          "server.js – Adds QnA API route (/api/ai/qna).",
          ".env – Adds GEMINI_API_KEY and MODEL_NAME configuration.",
        ],
      },

      configuration: `# Google Gemini API Configuration
GEMINI_API_KEY=your-google-gemini-api-key
MODEL_NAME=gemini-1.5-flash
PORT=3001`,

      frontendUsage: {
        overview:
          "Integrate the Q&A API easily with any frontend — especially Next.js — to power intelligent chatbot or assistant features.",
        endpoints: [
          {
            route: "/api/ai/qna",
            method: "POST",
            description:
              "Sends a user question to Gemini and returns an AI-generated response.",
            sampleRequest: {
              question:
                "Explain the concept of microservices architecture and its advantages",
            },
            sampleResponse: {
              success: true,
              message: "Gemini response generated successfully",
              data: {
                question:
                  "Explain the concept of microservices architecture and its advantages",
                answer:
                  "Microservices architecture is a design approach where applications are built as a collection of small, independent services. Key advantages include: 1) Independent deployment and scaling, 2) Technology diversity per service, 3) Improved fault isolation, 4) Better team autonomy, 5) Easier maintenance and updates, and 6) Enhanced resilience and reliability.",
                model: "gemini-1.5-flash",
                tokens: {
                  prompt: 16,
                  completion: 89,
                  total: 105,
                },
                timestamp: "2024-01-20T14:25:00Z",
              },
            },
          },
        ],
        example: `// Example (Next.js / React)
import { useState } from 'react';

export default function GeminiQnA() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  async function askGemini() {
    const res = await fetch('/api/ai/qna', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    setAnswer(data.answer || 'Error: No response');
  }

  return (
    <div className="space-y-4 max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold text-foreground">Ask Google Gemini</h2>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        className="w-full border border-border bg-background/50 rounded-lg px-3 py-2 text-sm text-foreground"
      />
      <button
        onClick={askGemini}
        className="px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm hover:bg-emerald-600 transition"
      >
        Ask
      </button>
      {answer && (
        <div className="p-3 border border-border/40 bg-secondary/30 rounded-lg text-sm text-muted-foreground whitespace-pre-wrap">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}`,
      },

      backendIntegration: {
        overview:
          "To integrate this Gemini-based Q&A into your backend, simply import the route and mount it to your Express app.",
        example: `// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import qnaRoutes from './src/routes/qna.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/ai/qna', qnaRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log('🤖 Google Gemini QnA service running on port ' + (process.env.PORT || 3001));
});`,
      },

      usage: `// Simple API request example
const res = await fetch('/api/ai/qna', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question: 'What is quantum computing?' })
});
const data = await res.json();
console.log('Gemini says:', data.answer);`,

      securityTips: [
        "Never expose your Gemini API key in frontend code.",
        "Use a backend proxy to handle API requests securely.",
        "Implement rate limiting to prevent abuse.",
        "Use environment variables for sensitive credentials.",
      ],
    },

    meta: {
      framework: "express",
      language: "javascript",
      aiProvider: "google-gemini",
      scalable: true,
      requiresDatabase: false,
      requiresAuth: false,
      supportsAI: true,
    },
  },

  "sse-events": {
    name: "Server-Sent Events (SSE)",
    description:
      "Production-ready SSE system for Express enabling real-time, one-way data streaming with event broadcasting, auto-reconnect, and heartbeat management.",
    type: "realtime",
    version: "1.2.0",
    tags: [
      "sse",
      "events",
      "express",
      "realtime",
      "streaming",
      "javascript",
      "nodejs",
    ],

    documentation: {
      overview: `A robust **Server-Sent Events (SSE)** system that enables real-time communication from your backend to connected clients.
Unlike WebSockets, SSE offers **one-way streaming** — ideal for dashboards, live updates, or analytics feeds with minimal overhead.
Built with simplicity and scalability in mind, it includes built-in **auto-reconnect**, **heartbeat**, and **event broadcasting** mechanisms.`,

      installation: "npx backternity add sse-events",

      commandDetails: {
        purpose:
          "Adds real-time server-to-client streaming using Server-Sent Events (SSE).",
        creates: [
          "/src/services/sseService.js – Core SSE logic with client management and broadcasting.",
          "/src/routes/sse.js – Routes for connecting and sending events.",
          "/src/example-client.js – Example of consuming SSE stream in Node/Browser.",
        ],
        modifies: [
          "server.js – Mounts SSE routes at /api/events and /api/send.",
          ".env – Optional: add PORT and SSE_RETRY_TIMEOUT configuration.",
        ],
      },

      configuration: `# SSE Configuration
PORT=3001
SSE_RETRY_TIMEOUT=5000 # client reconnect interval in ms`,

      frontendUsage: {
        overview:
          "Use this component to stream real-time data from the server directly into your frontend apps (React, Next.js, or vanilla JS). The connection automatically re-establishes if interrupted.",
        endpoints: [
          {
            route: "/api/events",
            method: "GET",
            description:
              "Opens a persistent event stream connection to receive real-time updates.",
            sampleRequest: "GET /api/events",
            sampleResponse: {
              type: "text/event-stream",
              connection: "keep-alive",
              data: [
                'event: heartbeat\\ndata: {"status":"connected","timestamp":"2024-01-20T14:25:00Z"}\\n\\n',
                'event: notification\\ndata: {"type":"info","message":"New user registered","userId":"12345"}\\n\\n',
                'event: analytics\\ndata: {"metric":"page_views","value":1247,"change":"+5.2%"}\\n\\n',
              ],
            },
          },
          {
            route: "/api/send",
            method: "POST",
            description:
              "Broadcasts a new event with data to all connected clients.",
            sampleRequest: {
              eventType: "notification",
              data: {
                type: "success",
                message: "Payment processed successfully",
                userId: "user_12345",
                amount: 99.99,
              },
            },
            sampleResponse: {
              success: true,
              message: "Event broadcasted to all connected clients",
              data: {
                eventType: "notification",
                clientsNotified: 127,
                timestamp: "2024-01-20T14:25:00Z",
              },
            },
          },
        ],
        example: `// Example: Next.js / React frontend usage
import { useEffect, useState } from 'react';

export default function LiveEvents() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const source = new EventSource('http://localhost:3001/api/events');

    source.addEventListener('update', (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data]);
    });

    source.onerror = (err) => console.error('SSE error:', err);
    return () => source.close();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold text-foreground mb-3">
        Live Server Events
      </h2>
      <ul className="space-y-2">
        {messages.map((msg, i) => (
          <li
            key={i}
            className="border border-border/30 rounded-lg p-2 bg-secondary/30 text-sm text-foreground/90"
          >
            {msg.message || JSON.stringify(msg)}
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      },

      backendIntegration: {
        overview:
          "Add SSE routes to your Express app for both event streaming and broadcasting. Clients connect to `/api/events`, while your server or admin interface can send events via `/api/send`.",
        example: `// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sseRoutes = require('./src/routes/sse');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', sseRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log('✅ SSE Server running on port', process.env.PORT || 3001);
});`,
      },

      usage: `// Send custom broadcast from server
await fetch('http://localhost:3001/api/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    event: 'update',
    data: { message: 'Server metrics refreshed' }
  })
});`,

      advanced: {
        overview:
          "SSE supports scaling via Redis Pub/Sub and authentication middleware for secure, multi-instance deployments.",
        example: `// Example: Redis Pub/Sub Scaling
const Redis = require('ioredis');
const redis = new Redis();
const { sendSSEEvent } = require('./src/services/sseService');

redis.subscribe('sse:broadcast');
redis.on('message', (channel, message) => {
  const { event, data } = JSON.parse(message);
  sendSSEEvent(event, data);
});

// Example: Auth-protected connection
router.get('/events', validateAuth, setupSSE);`,
      },

      securityTips: [
        "Use HTTPS in production to protect event streams.",
        "Implement authentication middleware if streaming sensitive data.",
        "Rate-limit broadcast routes to prevent abuse.",
        "Use Redis Pub/Sub for multi-instance deployments.",
      ],
    },

    meta: {
      framework: "express",
      language: "javascript",
      realtime: true,
      requiresDatabase: false,
      requiresAuth: false,
      supportsStreaming: true,
      scalable: true,
    },
  },

  "file-upload-dragdrop": {
    name: "Drop File Upload (Multer)",
    description:
      "A production-ready Express component for secure drag-and-drop file uploads using Multer. Supports single and multiple uploads, file validation, metadata responses, and progress tracking.",
    type: "storage",
    version: "2.0.0",
    tags: [
      "file",
      "upload",
      "multer",
      "express",
      "drag-drop",
      "storage",
      "nodejs",
      "javascript",
    ],

    documentation: {
      overview:
        "A **drag-and-drop friendly file upload system** for Express using Multer. It supports both single and multiple file uploads with automatic file validation, storage, and clean JSON responses. Ideal for Next.js or React-based drag-drop frontends.",
      installation: "npx backternity add file-upload-dragdrop",

      commandDetails: {
        purpose:
          "Installs a full-featured file upload system (single + multiple) compatible with drag-and-drop interfaces.",
        creates: [
          "/src/config/storage.js – Configures storage location and filename logic.",
          "/src/services/uploadService.js – Handles Multer setup, file validation, and metadata responses.",
          "/src/routes/upload.js – Provides upload and listing API routes.",
          "/server.js.example – Example Express integration with static file serving.",
          "/.env.example – Configuration for upload directory, limits, and file types.",
        ],
        modifies: [
          "server.js – Mounts upload routes under /api.",
          ".env – Adds upload configuration variables.",
        ],
      },

      configuration:
        "# File Upload Configuration\nPORT=3001\nUPLOAD_DEST=uploads\nMAX_FILE_SIZE=5242880\nALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf\nSTORAGE_DRIVER=local",

      frontendUsage: {
        overview:
          "This backend pairs perfectly with drag-and-drop React components (like Dropzone or your own UI). Users can drop files which will be sent via `/api/upload/single` or `/api/upload/multiple`. The backend returns structured file metadata and URLs for previews.",
        endpoints: [
          {
            route: "/api/upload/single",
            method: "POST",
            description: "Uploads a single file from the drag-and-drop area.",
            sampleRequest: "FormData with 'file' field",
            sampleResponse: {
              success: true,
              message: "File uploaded successfully",
              file: {
                filename: "1729440123456-profile.png",
                originalname: "profile.png",
                mimetype: "image/png",
                size: 242153,
                url: "/uploads/1729440123456-profile.png",
                uploadedAt: "2024-11-03T10:00:00Z",
              },
            },
          },
          {
            route: "/api/upload/multiple",
            method: "POST",
            description: "Uploads multiple files (up to 10) via drag-and-drop.",
            sampleRequest: "FormData with multiple 'files' fields",
            sampleResponse: {
              success: true,
              message: "3 files uploaded successfully",
              files: [
                {
                  filename: "172944010001-document.pdf",
                  url: "/uploads/172944010001-document.pdf",
                  size: 1012524,
                },
                {
                  filename: "172944010002-photo.png",
                  url: "/uploads/172944010002-photo.png",
                  size: 320488,
                },
              ],
            },
          },
          {
            route: "/api/upload/list",
            method: "GET",
            description:
              "Lists all uploaded files with metadata (for frontend preview grids).",
            sampleResponse: {
              success: true,
              files: [
                {
                  filename: "profile.png",
                  size: 123456,
                  url: "/uploads/profile.png",
                  modified: "2024-11-03T09:30:00Z",
                },
              ],
            },
          },
        ],

        example:
          '// Example: React / Next.js frontend integration\nimport { useState } from \'react\';\n\nexport default function DragDropUploader() {\n  const [files, setFiles] = useState([]);\n  const [message, setMessage] = useState(\'\');\n\n  const handleDrop = async (event) => {\n    event.preventDefault();\n    const formData = new FormData();\n    for (const file of event.dataTransfer.files) {\n      formData.append(\'files\', file);\n    }\n    const res = await fetch(\'/api/upload/multiple\', { method: \'POST\', body: formData });\n    const data = await res.json();\n    setFiles(data.files || []);\n    setMessage(data.message);\n  };\n\n  return (\n    <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="p-6 border border-dashed rounded-lg">\n      <h3 className="font-semibold mb-2">Drag and drop files here</h3>\n      <p className="text-sm text-gray-400">or click to upload manually</p>\n      <ul className="mt-4 space-y-1 text-sm">\n        {files.map((f) => (\n          <li key={f.filename} className="text-green-400">✅ {f.filename}</li>\n        ))}\n      </ul>\n      {message && <p className="mt-2 text-xs text-amber-400">{message}</p>}\n    </div>\n  );\n}',
      },

      backendIntegration: {
        overview:
          "Integrate upload routes into your Express backend to support drag-and-drop uploads. Uploaded files are automatically stored in the configured directory and served under `/uploads`.",
        example:
          "// server.js\nconst express = require('express');\nconst dotenv = require('dotenv');\nconst cors = require('cors');\nconst path = require('path');\nconst uploadRoutes = require('./src/routes/upload');\ndotenv.config();\n\nconst app = express();\napp.use(cors());\napp.use(express.json());\napp.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DEST || 'uploads')));\napp.use('/api', uploadRoutes);\n\napp.listen(process.env.PORT || 3001, () => {\n  console.log(`📁 File Upload Server running on port ${process.env.PORT || 3001}`);\n});",
      },

      usage:
        "// Example: Upload file programmatically\nconst formData = new FormData();\nformData.append('file', selectedFile);\nawait fetch('http://localhost:3001/api/upload/single', { method: 'POST', body: formData });",

      advanced: {
        overview:
          "Easily extendable to S3, MinIO, or GCP by swapping the Multer storage configuration. Use this structure for scalable drag-drop upload workflows.",
        example:
          "// Example: S3 Integration\nconst multerS3 = require('multer-s3');\nconst AWS = require('aws-sdk');\nAWS.config.update({ accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });\nconst s3 = new AWS.S3();\nconst upload = multer({\n  storage: multerS3({\n    s3,\n    bucket: process.env.S3_BUCKET_NAME,\n    acl: 'public-read',\n    key: (req, file, cb) => cb(null, `uploads/${Date.now()}-${file.originalname}`)\n  })\n});",
      },

      securityTips: [
        "Validate MIME types and file sizes via environment variables.",
        "Serve uploads from a separate CDN or static domain for safety.",
        "Never trust user filenames directly; always sanitize and rename.",
        "For large files, consider chunked upload or resumable streaming.",
        "Use HTTPS to protect uploads in production.",
      ],
    },

    meta: {
      framework: "express",
      language: "javascript",
      requiresDatabase: false,
      requiresAuth: false,
      storageType: "local",
      supportsDragDrop: true,
      supportsS3: true,
      scalable: true,
      category: "storage",
      related: ["aws-s3-upload", "storage-minio", "logger-winston"],
    },
  },
};

export default ComponentRegistry;
