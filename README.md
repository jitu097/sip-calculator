# 💰 SIP Calculator

A simple, lightweight JavaScript library for **Systematic Investment Plan (SIP)** calculations with compound interest, returns estimation, and investment planning features.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://www.ecma-international.org/)

## 🌟 Features

- ✅ Calculate SIP returns with compound interest
- ✅ Goal-based planning (calculate required monthly investment)
- ✅ Step-up SIP calculations (increase investment annually)
- ✅ Year-wise investment breakup
- ✅ Zero dependencies
- ✅ Works in Node.js and browsers
- ✅ Lightweight (~2KB)
- ✅ Easy to use API

## 📦 Installation

### Node.js

```bash
npm install sip-calculator
```

Or download `sip-calculator.js` and include it in your project.

### Browser

```html
<script src="sip-calculator.js"></script>
```

## 🚀 Usage

### Basic SIP Calculation

```javascript
const SIPCalculator = require('sip-calculator'); // Node.js
// or use window.SIPCalculator in browser

// Calculate returns for ₹5,000 monthly investment at 12% annual return for 10 years
const result = SIPCalculator.calculate(5000, 12, 10);

console.log(result);
/*
{
  monthlyInvestment: 5000,
  timePeriod: 10,
  annualReturnRate: 12,
  totalInvested: 600000,
  estimatedReturns: 549195,
  futureValue: 1149195,
  totalMonths: 120
}
*/
```

### Goal-Based Planning

```javascript
// Calculate required monthly SIP to reach ₹50,00,000 in 15 years at 12% return
const goalResult = SIPCalculator.calculateRequiredSIP(5000000, 12, 15);

console.log(goalResult);
/*
{
  targetAmount: 5000000,
  timePeriod: 15,
  annualReturnRate: 12,
  requiredMonthlyInvestment: 10138,
  totalMonths: 180
}
*/
```

### Step-Up SIP

```javascript
// Start with ₹5,000 monthly, increase by 10% annually at 12% return for 10 years
const stepUpResult = SIPCalculator.calculateStepUpSIP(5000, 12, 10, 10);

console.log(stepUpResult);
/*
{
  initialInvestment: 5000,
  timePeriod: 10,
  annualReturnRate: 12,
  stepUpPercentage: 10,
  totalInvested: 957457,
  estimatedReturns: 903168,
  futureValue: 1860625
}
*/
```

### Year-Wise Breakup

```javascript
// Get year-by-year investment growth
const breakup = SIPCalculator.getYearWiseBreakup(5000, 12, 5);

console.log(breakup);
/*
[
  { year: 1, invested: 60000, value: 62097, returns: 2097 },
  { year: 2, invested: 120000, value: 130286, returns: 10286 },
  { year: 3, invested: 180000, value: 205173, returns: 25173 },
  { year: 4, invested: 240000, value: 287257, returns: 47257 },
  { year: 5, invested: 300000, value: 377155, returns: 77155 }
]
*/
```

## 📊 API Reference

### `SIPCalculator.calculate(monthlyInvestment, annualReturnRate, timePeriod)`

Calculate SIP returns with compound interest.

**Parameters:**
- `monthlyInvestment` (number): Monthly investment amount
- `annualReturnRate` (number): Expected annual return rate in percentage (e.g., 12 for 12%)
- `timePeriod` (number): Investment period in years

**Returns:** Object with calculation results

---

### `SIPCalculator.calculateRequiredSIP(targetAmount, annualReturnRate, timePeriod)`

Calculate required monthly SIP to reach a financial goal.

**Parameters:**
- `targetAmount` (number): Target/goal amount
- `annualReturnRate` (number): Expected annual return rate in percentage
- `timePeriod` (number): Investment period in years

**Returns:** Object with required monthly investment

---

### `SIPCalculator.calculateStepUpSIP(initialInvestment, annualReturnRate, timePeriod, stepUpPercentage)`

Calculate SIP with annual step-up (increasing investment).

**Parameters:**
- `initialInvestment` (number): Initial monthly investment
- `annualReturnRate` (number): Expected annual return rate in percentage
- `timePeriod` (number): Investment period in years
- `stepUpPercentage` (number): Annual increase percentage

**Returns:** Object with step-up calculation results

---

### `SIPCalculator.getYearWiseBreakup(monthlyInvestment, annualReturnRate, timePeriod)`

Get year-by-year investment breakup.

**Parameters:**
- `monthlyInvestment` (number): Monthly investment amount
- `annualReturnRate` (number): Expected annual return rate in percentage
- `timePeriod` (number): Investment period in years

**Returns:** Array of year-wise results

## 🧪 Testing

Run the included test file:

```bash
node test.js
```

## 📝 Use Cases

- 💼 **Personal finance apps** - Help users plan investments
- 📱 **Investment calculators** - Web/mobile SIP calculators
- 📊 **Financial dashboards** - Display investment projections
- 🎓 **Educational tools** - Teach compound interest concepts
- 🏦 **Fintech applications** - Investment planning features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 👤 Author

**jitu097**
- GitHub: [@jitu097](https://github.com/jitu097)

## 🙏 Acknowledgments

- SIP calculation formulas based on standard financial mathematics
- Inspired by the need for simple, accurate investment calculators

## ⭐ Star this repo

If you find this useful, please star this repository!

---

Made with ❤️ for the fintech community