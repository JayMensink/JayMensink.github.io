class StatisticMath {
	constructor() {
		throw new Error("Class cannot be instantiated.");
	}

	// Cumulative Distribution Function
	static CDF(mean, sigma, to) {
		var z = (to - mean) / Math.sqrt(2 * sigma * sigma);
		var t = 1 / (1 + 0.3275911 * Math.abs(z));
		var erf = 1 - ((((1.061405429 * t + -1.453152027) * t + 1.421413741) * t + -0.284496736) * t + 0.254829592) * t * Math.exp(-z * z);
		var sign = (z >= 0) * 2 - 1;
		return (1 / 2) * (1 + sign * erf);
	}
}
