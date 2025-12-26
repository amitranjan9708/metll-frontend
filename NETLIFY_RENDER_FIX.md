# Fix: Netlify Not Hitting Render API

## Problem
- ✅ Local development: Works (hitting Render API)
- ❌ Netlify production: Not hitting Render API

## Most Likely Cause: CORS Issue

Your Render backend needs to allow requests from your Netlify domain.

## Solution

### 1. Update Your Render Backend CORS Configuration

In your Render backend code, update the CORS configuration to include your Netlify domain:

```typescript
import cors from "cors";

app.use(cors({
  origin: [
    "https://your-netlify-app.netlify.app", // Replace with your actual Netlify domain
    "http://localhost:8080", // Local development
    "http://localhost:3000", // Alternative local port
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
```

### 2. Set Environment Variable on Render

In your Render dashboard, set the `FRONTEND_URL` environment variable:
- Key: `FRONTEND_URL`
- Value: `https://your-netlify-app.netlify.app`

### 3. Test CORS from Netlify

Open your Netlify site in a browser, open DevTools Console, and check:
1. Look for the API URL being logged: `🔗 API Base URL: https://metll-backend.onrender.com`
2. Check Network tab for the request to `/api/waitlist`
3. Look for CORS errors in the console

### 4. Quick Test - Allow All Origins (Temporary)

For testing, you can temporarily allow all origins on your Render backend:

```typescript
app.use(cors({
  origin: "*", // Allow all origins (NOT recommended for production)
  credentials: false, // Must be false when origin is "*"
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
```

**⚠️ Warning**: This is insecure. Only use for testing, then switch to specific origins.

### 5. Verify API URL in Production

After deploying to Netlify:
1. Open your site
2. Open browser DevTools Console
3. You should see: `🔗 API Base URL: https://metll-backend.onrender.com`
4. When submitting the form, you should see: `📤 Submitting to: https://metll-backend.onrender.com/api/waitlist`

## Debugging Steps

1. **Check Browser Console** (on Netlify site):
   - Look for API URL logs
   - Check for CORS errors
   - Check Network tab for failed requests

2. **Check Render Logs**:
   - Go to Render dashboard → Your service → Logs
   - See if requests are reaching the backend
   - Check for CORS-related errors

3. **Test with curl**:
   ```bash
   curl -X POST https://metll-backend.onrender.com/api/waitlist \
     -H "Origin: https://your-netlify-app.netlify.app" \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com"}' \
     -v
   ```
   
   Look for `Access-Control-Allow-Origin` in the response headers.

## Common Issues

1. **CORS preflight failing**: Make sure OPTIONS requests are handled
2. **Wrong origin**: Ensure your Netlify domain is in the allowed origins list
3. **Credentials**: If using credentials, origin cannot be "*"

