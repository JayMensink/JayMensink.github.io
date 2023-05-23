class ArrayMath {
	constructor() {
		throw new Error("Class cannot be instantiated.");
	}

	// Sum of all elements in the array
	static sum = (array) => {
		return array.reduce((a, b) => a + b);
	};

	// Product of all elements in the array
	static product = (array) => {
		let product = 1;
		for (const value of array) {
			product *= value;
		}
		return product;
	};

	// Mean (average) of the elements
	static average = (array) => {
		return this.sum(array) / array.length;
	};

	// Median of the elements
	static median = (array) => {
		array.sort(function (a, b) {
			return a - b;
		});
		var half = Math.floor(array.length / 2);
		if (array.length % 2) {
			return array[half];
		}
		return (array[half - 1] + array[half]) / 2.0;
	};

	// Mode of the elements
	static mode = (array) => {
		let counts = {};
		for (const value of array) {
			if (counts.hasOwnProperty(value)) {
				counts[value] += 1;
			} else {
				counts[value] = 1;
			}
		}
		let mostFrequentValue = null;
		for (const value of Object.keys(counts)) {
			if (mostFrequentValue == null) {
				mostFrequentValue = value;
			}
			if (counts[value] > counts[mostFrequentValue]) {
				mostFrequentValue = value;
			}
		}
		return mostFrequentValue;
	};

	// Range of the elements (difference between the maximum and minimum)
	static range = (array) => {
		return Math.max(array) - Math.min(array);
	};

	// Count of the elements
	static count = (array) => {
		return Object.keys(array).length;
	};

	// Standard deviation of the elements
	static standardDeviation = (array) => {
		return Math.sqrt(
			this.sum(array.map((x) => Math.pow(x - this.average(array), 2))) /
				array.length
		);
	};

	// Variance of the elements
	static variance = (array) => {
		return this.standardDeviation(array) ** 2;
	};

	// Absolute values of the elements
	static abs = (array) => {
		return array.map(Math.abs);
	};

	// Sorting the array in ascending order
	static asc = (array) => {
		return array.sort(function (a, b) {
			return a - b;
		});
	};

	// Sorting the array in descending order
	static desc = (array) => {
		return array.sort(function (a, b) {
			return b - a;
		});
	};

	// Reverse the order of the elements in the array
	static reverse = (array) => {
		return [...array].reverse();
	};

	// Finding the index of the first occurrence of a specific element
	static find = (array, target) => {
		return array.indexOf(target);
	};

	// Checking if all elements in the array are positive
	static isPositive = (array) => {
		return array.every((element) => element > 0);
	};

	// Checking if all elements in the array are negative
	static isNegative = (array) => {
		return array.every((element) => element < 0);
	};

	// Finding the largest N elements in the array
	static largestValues = (array, amount) => {
		const sortedArray = this.desc(array);
		if (amount >= array.length) {
			return sortedArray;
		}
		return sortedArray.slice(0, amount);
	};

	// Finding the smallest N elements in the array
	static smallestValues = (array, amount) => {
		const sortedArray = this.asc(array);
		if (amount >= array.length) {
			return sortedArray;
		}
		return sortedArray.slice(0, amount);
	};

	// Calculating the cumulative sum of the elements
	static cumulativeSum = (array) => {
		let cumulativeSum = 0;
		const cumulativeSumArray = array.map((value) => {
			cumulativeSum += value;
			return cumulativeSum;
		});
		return cumulativeSumArray;
	};

	// Calculating the cumulative product of the elements
	static cumulativeProduct = (array) => {
		let cumulativeProduct = 1;
		const cumulativeProductArray = array.map((value) => {
			cumulativeProduct *= value;
			return cumulativeProduct;
		});
		return cumulativeProductArray;
	};

	// Finding the index of the maximum value in the array
	static maxIndex = (array) => {
		let max = -Infinity;
		let maxIndex = -1;
		for (let i = 0; i < array.length; i++) {
			if (array[i] > max) {
				max = array[i];
				maxIndex = i;
			}
		}
		return maxIndex;
	};

	// Finding the index of the minimum value in the array
	static minIndex = (array) => {
		let min = Infinity;
		let minIndex = -1;
		for (let i = 0; i < array.length; i++) {
			if (array[i] < min) {
				min = array[i];
				minIndex = i;
			}
		}
		return minIndex;
	};
}
