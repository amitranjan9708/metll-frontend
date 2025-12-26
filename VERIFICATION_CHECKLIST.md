# Configuration Verification Checklist

## ✅ Current Configuration

### API Configuration (`client/lib/api-config.ts`)
- **Development**: Uses `http://localhost:3001`
- **Production**: Uses `https://metll-backend.onrender.com`
- **Override**: Can be set via `VITE_API_BASE_URL` environment variable

### Build Process
- **Netlify Build**: `pnpm run build:client` → `vite build`
- **Vite**: Sets `import.meta.env.PROD = true` during production build
- **Output**: `dist/spa/` directory

## 🔍 Verification Steps

### 1. Test Local Development
```bash
npm run dev
```
- Open browser console
- Should see: `🔗 API Base URL: http://localhost:3001`
- Should see: `🌍 Mode: DEVELOPMENT`
- Form submission should call: `http://localhost:3001/api/waitlist`

### 2. Test Production Build Locally
```bash
npm run build:client
npx serve dist/spa
```
- Open browser console
- Should see: `🔗 API Base URL: https://metll-backend.onrender.com`
- Should see: `🌍 Mode: PRODUCTION`
- Form submission should call: `https://metll-backend.onrender.com/api/waitlist`

### 3. Verify Netlify Deployment
After deploying to Netlify:
1. Open your Netlify site
2. Open browser DevTools → Console
3. Check for:
   - `🔗 API Base URL: https://metll-backend.onrender.com`
   - `🌍 Mode: PRODUCTION`
4. Submit the form and check:
   - `📤 Submitting to: https://metll-backend.onrender.com/api/waitlist`
   - `📥 Response status: 201` (or appropriate status)

### 4. Check Render Backend CORS
Your Render backend must allow requests from:
- Your Netlify domain (e.g., `https://your-app.netlify.app`)
- `http://localhost:8080` (for local testing)

Example CORS config on Render:
```typescript
app.use(cors({
  origin: [
    "https://your-netlify-app.netlify.app",
    "http://localhost:8080",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
```

## 🐛 Common Issues

### Issue: Netlify still using localhost URL
**Solution**: 
- Rebuild and redeploy on Netlify
- Clear browser cache
- Check that `import.meta.env.PROD` is `true` in production build

### Issue: CORS Error on Netlify
**Solution**:
- Add your Netlify domain to Render backend CORS allowed origins
- Check Render logs to see if requests are reaching the backend

### Issue: API URL not updating
**Solution**:
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for the actual URL being used
- Verify the build output includes the correct URL

## 📝 Testing Commands

```bash
# Build production locally to test
npm run build:client

# Serve the built files
npx serve dist/spa

# Or use Python
python3 -m http.server 8000 -d dist/spa
```

Then open `http://localhost:8000` and check the console logs.

