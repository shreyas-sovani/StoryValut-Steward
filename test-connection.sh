#!/bin/bash

# ============================================================================
# SSE Connection Verification Script
# StoryVault Steward - Integration Audit
# ============================================================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BACKEND_URL="${BACKEND_URL:-http://localhost:3001}"
FRONTEND_URL="${FRONTEND_URL:-http://localhost:5173}"
SSE_ENDPOINT="$BACKEND_URL/api/funding/stream"
HEALTH_ENDPOINT="$BACKEND_URL/health"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}🔍 StoryVault Steward - SSE Connection Verification${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ============================================================================
# Test 1: Health Check
# ============================================================================
echo -e "${YELLOW}📋 Test 1: Backend Health Check${NC}"
echo "   Endpoint: $HEALTH_ENDPOINT"
echo ""

HEALTH_RESPONSE=$(curl -s -w "\n%{http_code}" "$HEALTH_ENDPOINT" 2>/dev/null)
HEALTH_STATUS=$(echo "$HEALTH_RESPONSE" | tail -n1)
HEALTH_BODY=$(echo "$HEALTH_RESPONSE" | sed '$d')

if [ "$HEALTH_STATUS" = "200" ]; then
    echo -e "   ${GREEN}✅ Backend is healthy (HTTP $HEALTH_STATUS)${NC}"
    echo "   Response: $HEALTH_BODY" | head -c 200
    echo ""
else
    echo -e "   ${RED}❌ Backend health check failed (HTTP $HEALTH_STATUS)${NC}"
    echo "   Is the backend running on $BACKEND_URL?"
    echo ""
    echo "   💡 Start the backend with: npm run dev (in the root directory)"
    exit 1
fi

echo ""

# ============================================================================
# Test 2: CORS Headers Check
# ============================================================================
echo -e "${YELLOW}📋 Test 2: CORS Headers (OPTIONS preflight)${NC}"
echo "   Testing CORS for origin: $FRONTEND_URL"
echo ""

CORS_HEADERS=$(curl -s -I -X OPTIONS \
    -H "Origin: $FRONTEND_URL" \
    -H "Access-Control-Request-Method: GET" \
    -H "Access-Control-Request-Headers: Content-Type" \
    "$SSE_ENDPOINT" 2>/dev/null)

echo "   Headers received:"
echo "$CORS_HEADERS" | grep -i "access-control\|content-type\|cache-control" | while read line; do
    echo "   $line"
done

# Check for CORS allow origin
if echo "$CORS_HEADERS" | grep -qi "access-control-allow-origin"; then
    echo -e "   ${GREEN}✅ CORS headers present${NC}"
else
    echo -e "   ${RED}❌ CORS headers missing${NC}"
fi

echo ""

# ============================================================================
# Test 3: SSE Endpoint Headers
# ============================================================================
echo -e "${YELLOW}📋 Test 3: SSE Endpoint Headers${NC}"
echo "   Endpoint: $SSE_ENDPOINT"
echo ""

# Get headers only (timeout after 2 seconds)
SSE_HEADERS=$(curl -s -I -m 2 \
    -H "Origin: $FRONTEND_URL" \
    -H "Accept: text/event-stream" \
    "$SSE_ENDPOINT" 2>/dev/null)

echo "   Headers received:"
echo "$SSE_HEADERS" | grep -i "content-type\|cache-control\|connection\|access-control" | while read line; do
    echo "   $line"
done

# Verify required SSE headers
PASS_COUNT=0
FAIL_COUNT=0

echo ""
echo "   Required headers verification:"

if echo "$SSE_HEADERS" | grep -qi "content-type.*text/event-stream"; then
    echo -e "   ${GREEN}✅ Content-Type: text/event-stream${NC}"
    ((PASS_COUNT++))
else
    echo -e "   ${RED}❌ Content-Type: text/event-stream (MISSING)${NC}"
    ((FAIL_COUNT++))
fi

if echo "$SSE_HEADERS" | grep -qi "cache-control.*no-cache"; then
    echo -e "   ${GREEN}✅ Cache-Control: no-cache${NC}"
    ((PASS_COUNT++))
else
    echo -e "   ${YELLOW}⚠️  Cache-Control: no-cache (recommended)${NC}"
fi

if echo "$SSE_HEADERS" | grep -qi "connection.*keep-alive"; then
    echo -e "   ${GREEN}✅ Connection: keep-alive${NC}"
    ((PASS_COUNT++))
else
    echo -e "   ${YELLOW}⚠️  Connection: keep-alive (recommended)${NC}"
fi

if echo "$SSE_HEADERS" | grep -qi "access-control-allow-origin"; then
    echo -e "   ${GREEN}✅ Access-Control-Allow-Origin present${NC}"
    ((PASS_COUNT++))
else
    echo -e "   ${RED}❌ Access-Control-Allow-Origin (MISSING - CORS will fail!)${NC}"
    ((FAIL_COUNT++))
fi

echo ""

# ============================================================================
# Test 4: SSE Stream Test (5 second sample)
# ============================================================================
echo -e "${YELLOW}📋 Test 4: SSE Stream Test (5 seconds)${NC}"
echo "   Connecting to stream..."
echo ""

# Connect to SSE and capture output for 5 seconds
SSE_OUTPUT=$(timeout 5 curl -s -N \
    -H "Origin: $FRONTEND_URL" \
    -H "Accept: text/event-stream" \
    "$SSE_ENDPOINT" 2>/dev/null)

if [ -n "$SSE_OUTPUT" ]; then
    echo -e "   ${GREEN}✅ SSE stream is sending data${NC}"
    echo ""
    echo "   📡 Stream output (first 500 chars):"
    echo "   ────────────────────────────────────"
    echo "$SSE_OUTPUT" | head -c 500 | while IFS= read -r line; do
        echo "   $line"
    done
    echo ""
    echo "   ────────────────────────────────────"
    
    # Check for expected events
    if echo "$SSE_OUTPUT" | grep -q "event:.*funding_update\|connected\|CONNECTED"; then
        echo -e "   ${GREEN}✅ Initial connection event received${NC}"
    else
        echo -e "   ${YELLOW}⚠️  No connection event detected in output${NC}"
    fi
else
    echo -e "   ${RED}❌ No data received from SSE stream${NC}"
    echo "   The stream may not be working correctly."
fi

echo ""

# ============================================================================
# Summary
# ============================================================================
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}📊 Summary${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "   Backend URL:  $BACKEND_URL"
echo "   Frontend URL: $FRONTEND_URL"
echo "   SSE Endpoint: $SSE_ENDPOINT"
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "   ${GREEN}✅ All critical checks passed!${NC}"
    echo ""
    echo "   Your SSE connection should work correctly."
    echo "   Test in browser: Open DevTools → Network → XHR/Fetch"
    echo "   Look for 'funding/stream' with type 'eventsource'"
else
    echo -e "   ${RED}❌ $FAIL_COUNT critical check(s) failed${NC}"
    echo ""
    echo "   Please fix the issues above before testing in browser."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ============================================================================
# Quick Test Commands
# ============================================================================
echo -e "${YELLOW}💡 Quick manual tests:${NC}"
echo ""
echo "   # Test health endpoint:"
echo "   curl $HEALTH_ENDPOINT"
echo ""
echo "   # Test SSE stream (Ctrl+C to stop):"
echo "   curl -N -H 'Accept: text/event-stream' $SSE_ENDPOINT"
echo ""
echo "   # Test CORS preflight:"
echo "   curl -I -X OPTIONS -H 'Origin: $FRONTEND_URL' $SSE_ENDPOINT"
echo ""
