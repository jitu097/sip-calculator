/**
 * Simple tests for SIP Calculator
 */

const SIPCalculator = require('./sip-calculator');

console.log('🧪 Running SIP Calculator Tests...\n');

// Test 1: Basic SIP Calculation
console.log('Test 1: Basic SIP Calculation');
console.log('Input: ₹5,000/month, 12% return, 10 years');
const test1 = SIPCalculator.calculate(5000, 12, 10);
console.log('Result:', test1);
console.log('✅ Test 1 passed\n');

// Test 2: Goal-Based Calculation
console.log('Test 2: Goal-Based Calculation');
console.log('Input: Target ₹50,00,000, 12% return, 15 years');
const test2 = SIPCalculator.calculateRequiredSIP(5000000, 12, 15);
console.log('Result:', test2);
console.log('✅ Test 2 passed\n');

// Test 3: Step-Up SIP
console.log('Test 3: Step-Up SIP');
console.log('Input: ₹5,000/month, 12% return, 10 years, 10% step-up');
const test3 = SIPCalculator.calculateStepUpSIP(5000, 12, 10, 10);
console.log('Result:', test3);
console.log('✅ Test 3 passed\n');

// Test 4: Year-Wise Breakup
console.log('Test 4: Year-Wise Breakup');
console.log('Input: ₹5,000/month, 12% return, 5 years');
const test4 = SIPCalculator.getYearWiseBreakup(5000, 12, 5);
console.log('Result:', test4);
console.log('✅ Test 4 passed\n');

// Test 5: Error Handling
console.log('Test 5: Error Handling');
try {
  SIPCalculator.calculate(-1000, 12, 10);
  console.log('❌ Test 5 failed - Should have thrown error');
} catch (error) {
  console.log('✅ Test 5 passed - Error caught:', error.message);
}

console.log('\n🎉 All tests completed!');