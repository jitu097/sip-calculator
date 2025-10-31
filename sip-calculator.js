/**
 * SIP Calculator - A simple JavaScript library for Systematic Investment Plan calculations
 * @author jitu097
 * @license MIT
 */

class SIPCalculator {
  /**
   * Calculate SIP returns with compound interest
   * @param {number} monthlyInvestment - Monthly investment amount
   * @param {number} annualReturnRate - Expected annual return rate (in percentage, e.g., 12 for 12%)
   * @param {number} timePeriod - Investment period in years
   * @returns {object} Calculation results
   */
  static calculate(monthlyInvestment, annualReturnRate, timePeriod, inflationRate = 0) {
    if (monthlyInvestment <= 0 || annualReturnRate <= 0 || timePeriod <= 0) {
      throw new Error('All parameters must be positive numbers');
    }

    if (inflationRate < 0) {
      throw new Error('Inflation rate cannot be negative');
    }

    const monthlyRate = annualReturnRate / 12 / 100;
    const months = timePeriod * 12;
    
    // SIP Formula: M × [{(1 + i)^n – 1} / i] × (1 + i)
    const futureValue = monthlyInvestment * 
      (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    
    const totalInvested = monthlyInvestment * months;
    const estimatedReturns = futureValue - totalInvested;

    // Inflation-adjusted (present value) of the future value
    const inflationAdjustedFutureValue = inflationRate > 0
      ? futureValue / Math.pow(1 + inflationRate / 100, timePeriod)
      : futureValue;

    const inflationAdjustedEstimatedReturns = inflationAdjustedFutureValue - totalInvested;

    // Real annual return (simple subtraction). This is provided for reference.
    const realAnnualReturnRate = annualReturnRate - inflationRate;

    return {
      monthlyInvestment,
      timePeriod,
      annualReturnRate,
      inflationRate,
      realAnnualReturnRate,
      totalInvested: Math.round(totalInvested),
      estimatedReturns: Math.round(estimatedReturns),
      futureValue: Math.round(futureValue),
      inflationAdjustedFutureValue: Math.round(inflationAdjustedFutureValue),
      inflationAdjustedEstimatedReturns: Math.round(inflationAdjustedEstimatedReturns),
      totalMonths: months
    };
  }

  /**
   * Calculate required monthly SIP to reach a goal
   * @param {number} targetAmount - Goal amount
   * @param {number} annualReturnRate - Expected annual return rate (in percentage)
   * @param {number} timePeriod - Investment period in years
   * @returns {object} Required monthly investment
   */
  static calculateRequiredSIP(targetAmount, annualReturnRate, timePeriod, inflationRate = 0) {
    if (targetAmount <= 0 || annualReturnRate <= 0 || timePeriod <= 0) {
      throw new Error('All parameters must be positive numbers');
    }

    if (inflationRate < 0) {
      throw new Error('Inflation rate cannot be negative');
    }

    const monthlyRate = annualReturnRate / 12 / 100;
    const months = timePeriod * 12;

    // Reverse SIP Formula to find monthly investment (nominal)
    const requiredMonthlyInvestment = targetAmount /
      (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

    // Also compute required monthly investment in real terms by subtracting inflation
    const realAnnualReturnRate = annualReturnRate - inflationRate;
    const realMonthlyRate = realAnnualReturnRate / 12 / 100;

    let requiredMonthlyInvestmentReal = null;
    if (realMonthlyRate === 0) {
      requiredMonthlyInvestmentReal = targetAmount / months;
    } else if (realAnnualReturnRate <= -100) {
      // unrealistic negative real return that would make growth impossible
      requiredMonthlyInvestmentReal = null;
    } else {
      requiredMonthlyInvestmentReal = targetAmount /
        (((Math.pow(1 + realMonthlyRate, months) - 1) / realMonthlyRate) * (1 + realMonthlyRate));
    }

    return {
      targetAmount,
      timePeriod,
      annualReturnRate,
      inflationRate,
      realAnnualReturnRate,
      requiredMonthlyInvestment: Math.round(requiredMonthlyInvestment),
      requiredMonthlyInvestmentReal: requiredMonthlyInvestmentReal === null ? null : Math.round(requiredMonthlyInvestmentReal),
      totalMonths: months
    };
  }

  /**
   * Calculate SIP with step-up (increasing investment each year)
   * @param {number} initialInvestment - Initial monthly investment
   * @param {number} annualReturnRate - Expected annual return rate (in percentage)
   * @param {number} timePeriod - Investment period in years
   * @param {number} stepUpPercentage - Annual step-up percentage
   * @returns {object} Calculation results with step-up
   */
  static calculateStepUpSIP(initialInvestment, annualReturnRate, timePeriod, stepUpPercentage, inflationRate = 0) {
    if (initialInvestment <= 0 || annualReturnRate <= 0 || timePeriod <= 0 || stepUpPercentage < 0) {
      throw new Error('Invalid parameters');
    }

    if (inflationRate < 0) {
      throw new Error('Inflation rate cannot be negative');
    }

    const monthlyRate = annualReturnRate / 12 / 100;
    let futureValue = 0;
    let totalInvested = 0;
    let currentMonthlyInvestment = initialInvestment;

    for (let year = 1; year <= timePeriod; year++) {
      const monthsInYear = 12;

      for (let month = 1; month <= monthsInYear; month++) {
        const remainingMonths = (timePeriod - year) * 12 + (monthsInYear - month + 1);
        futureValue += currentMonthlyInvestment * Math.pow(1 + monthlyRate, remainingMonths);
        totalInvested += currentMonthlyInvestment;
      }

      // Increase investment for next year
      currentMonthlyInvestment = currentMonthlyInvestment * (1 + stepUpPercentage / 100);
    }

    const estimatedReturns = futureValue - totalInvested;

    const inflationAdjustedFutureValue = inflationRate > 0
      ? futureValue / Math.pow(1 + inflationRate / 100, timePeriod)
      : futureValue;

    const inflationAdjustedEstimatedReturns = inflationAdjustedFutureValue - totalInvested;

    return {
      initialInvestment,
      timePeriod,
      annualReturnRate,
      stepUpPercentage,
      inflationRate,
      totalInvested: Math.round(totalInvested),
      estimatedReturns: Math.round(estimatedReturns),
      futureValue: Math.round(futureValue),
      inflationAdjustedFutureValue: Math.round(inflationAdjustedFutureValue),
      inflationAdjustedEstimatedReturns: Math.round(inflationAdjustedEstimatedReturns)
    };
  }

  /**
   * Get year-wise breakup of SIP investment
   * @param {number} monthlyInvestment - Monthly investment amount
   * @param {number} annualReturnRate - Expected annual return rate (in percentage)
   * @param {number} timePeriod - Investment period in years
   * @returns {array} Year-wise breakup
   */
  static getYearWiseBreakup(monthlyInvestment, annualReturnRate, timePeriod, inflationRate = 0) {
    const breakup = [];

    for (let year = 1; year <= timePeriod; year++) {
      const result = this.calculate(monthlyInvestment, annualReturnRate, year, inflationRate);
      breakup.push({
        year,
        invested: result.totalInvested,
        value: result.futureValue,
        returns: result.estimatedReturns,
        inflationAdjustedValue: result.inflationAdjustedFutureValue,
        inflationAdjustedReturns: result.inflationAdjustedEstimatedReturns
      });
    }

    return breakup;
  }
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SIPCalculator;
}

// Export for browsers
if (typeof window !== 'undefined') {
  window.SIPCalculator = SIPCalculator;
}