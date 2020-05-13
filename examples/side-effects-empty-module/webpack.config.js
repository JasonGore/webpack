var path = require("path");

module.exports = {
	mode: "production",
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].bundle.js",
		chunkFilename: "[id].chunk.js"
	},
	stats: {
		// Examine all modules
		maxModules: Infinity,
		// Display bailout reasons
		optimizationBailout: true
	},
	optimization: {
    usedExports: true,
		sideEffects: true,
  }
};
