@echo off
echo.
echo ============================================
echo  FarmVerse API Test Suite - Port 8082
echo ============================================
echo.

REM -- TEST 1: Register new user (expect 200)
echo [TEST 1] Register new user (expect HTTP 200)
curl.exe -s -w " | HTTP: %%{http_code}" -X POST http://localhost:8082/api/auth/register -H "Content-Type: application/json" -d "@test_register.json"
echo.
echo.

REM -- TEST 2: Login with correct credentials (expect 200)
echo [TEST 2] Login with correct credentials (expect HTTP 200)
curl.exe -s -w " | HTTP: %%{http_code}" -X POST http://localhost:8082/api/auth/login -H "Content-Type: application/json" -d "@test_login.json"
echo.
echo.

REM -- TEST 3: Invalid email (expect 400)
echo [TEST 3] Validation - invalid email (expect HTTP 400)
curl.exe -s -w " | HTTP: %%{http_code}" -X POST http://localhost:8082/api/auth/register -H "Content-Type: application/json" -d "@test_invalid_email.json"
echo.
echo.

REM -- TEST 4: Short password (expect 400)
echo [TEST 4] Validation - short password (expect HTTP 400)
curl.exe -s -w " | HTTP: %%{http_code}" -X POST http://localhost:8082/api/auth/register -H "Content-Type: application/json" -d "@test_short_pass.json"
echo.
echo.

REM -- TEST 5: Duplicate email (expect 409)
echo [TEST 5] Duplicate email re-registration (expect HTTP 409)
curl.exe -s -w " | HTTP: %%{http_code}" -X POST http://localhost:8082/api/auth/register -H "Content-Type: application/json" -d "@test_register.json"
echo.
echo.

REM -- TEST 6: Wrong password login (expect 401)
echo [TEST 6] Wrong password login (expect HTTP 401)
curl.exe -s -w " | HTTP: %%{http_code}" -X POST http://localhost:8082/api/auth/login -H "Content-Type: application/json" -d "@test_wrong_pass.json"
echo.
echo.

REM -- TEST 7: Unauthenticated access to protected route (expect 403)
echo [TEST 7] Protected route without token (expect HTTP 403)
curl.exe -s -w " | HTTP: %%{http_code}" -X GET http://localhost:8082/api/farmers
echo.
echo.

echo ============================================
echo  Tests Complete
echo ============================================
