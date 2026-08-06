# FarmVerse API Test Script
# Runs against http://localhost:8082

$BASE = "http://localhost:8082/api/auth"
$headers = @{ "Content-Type" = "application/json" }

function Test-Api {
    param($name, $method, $url, $body, $expectedStatus)
    try {
        if ($body) {
            $response = Invoke-WebRequest -Method $method -Uri $url -Headers $headers -Body $body -ErrorAction Stop
        } else {
            $response = Invoke-WebRequest -Method $method -Uri $url -Headers $headers -ErrorAction Stop
        }
        $status = $response.StatusCode
        $content = $response.Content
    } catch {
        $status = $_.Exception.Response.StatusCode.value__
        try { 
            $content = $_.ErrorDetails.Message 
        } catch { 
            $content = $_.Exception.Message 
        }
    }
    
    $pass = if ($status -eq $expectedStatus) { "PASS" } else { "FAIL" }
    $color = if ($pass -eq "PASS") { "Green" } else { "Red" }
    Write-Host "`n[$pass] $name" -ForegroundColor $color
    Write-Host "  Expected: $expectedStatus | Got: $status"
    Write-Host "  Response: $content"
}

Write-Host "`n========== FarmVerse API Tests ==========" -ForegroundColor Cyan
Write-Host "Target: $BASE" -ForegroundColor Cyan

# Test 1: Register new user (should return 200)
Test-Api "Register new user" "POST" "$BASE/register" `
    '{"name":"Puspal Das","email":"puspal@farmverse.com","password":"secure123"}' `
    200

# Test 2: Login with correct credentials (should return 200 + JWT)
Test-Api "Login with correct credentials" "POST" "$BASE/login" `
    '{"email":"puspal@farmverse.com","password":"secure123"}' `
    200

# Test 3: Register with invalid email (should return 400)
Test-Api "Validation - invalid email" "POST" "$BASE/register" `
    '{"name":"Test","email":"not-an-email","password":"abc123"}' `
    400

# Test 4: Register with short password (should return 400)
Test-Api "Validation - password too short" "POST" "$BASE/register" `
    '{"name":"Test","email":"test@test.com","password":"ab"}' `
    400

# Test 5: Register with empty body (should return 400)
Test-Api "Validation - empty name" "POST" "$BASE/register" `
    '{"name":"","email":"test@test.com","password":"abc123"}' `
    400

# Test 6: Register with duplicate email (should return 409)
Test-Api "Duplicate email registration" "POST" "$BASE/register" `
    '{"name":"Puspal Again","email":"puspal@farmverse.com","password":"anotherpass"}' `
    409

# Test 7: Login with wrong password (should return 401)
Test-Api "Wrong password login" "POST" "$BASE/login" `
    '{"email":"puspal@farmverse.com","password":"wrongpassword"}' `
    401

# Test 8: Access protected route without token (should return 403)
Test-Api "Unauthenticated access to protected route" "GET" "http://localhost:8082/api/farmers" `
    $null `
    403

Write-Host "`n========== Tests Complete ==========" -ForegroundColor Cyan
