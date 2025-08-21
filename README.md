# LambdaTestPlaywright101

# Playwright 101 Assignment - Test Execution Guide

## 🚀 How to Run the Tests

### Prerequisites

- Node.js (v16 or higher)
- Git

### Setup & Execution

1. **Clone and install dependencies:**

   ```bash
   git clone <this-repo-url>
   cd <repo-folder>
   npm install
   ```

2. **Set your LambdaTest credentials:**

   ```bash
   # Option 1: Export environment variables
   export LT_USERNAME="your_lambdatest_username"
   export LT_ACCESS_KEY="your_lambdatest_access_key"

   # Option 2: Create .env file
   echo "LT_USERNAME=your_username" > .env
   echo "LT_ACCESS_KEY=your_access_key" >> .env
   ```

3. **Run all tests:**
   ```bash
   npm test
   ```

That's it! The tests will run in parallel on Windows 10 (Chrome) and macOS (Firefox) via LambdaTest Cloud Grid.

## 📊 What the Tests Do

- **Test 1:** Simple Form Demo - message validation
- **Test 2:** Drag & Drop Slider - slider interaction to value 95
- **Test 3:** Input Form Submit - form validation and submission

## 🎯 Test Results

After execution:

- Check console for **Test IDs**
- View detailed reports in your **LambdaTest Dashboard**
- All videos, screenshots, and logs are automatically captured

## 📋 Assignment Requirements Met

✅ 3 test scenarios completed  
✅ Parallel execution on 2 browser/OS combinations  
✅ 3+ different locator strategies used  
✅ Video, screenshots, network & console logs enabled

---

**Note:** Tests were developed and validated locally, then configured for LambdaTest Cloud execution.

