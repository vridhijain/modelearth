/**
 * Submodule Static Server Configuration
 * This file dynamically serves submodule directories as static content
 * Lines are inserted into server/index.js file by Claude with "code insert" and "code toggle"
 */

const path = require('path');
const fs = require('fs');

// List of submodules to serve as static directories
const SUBMODULES = [
  'localsite',
  'realitystream',
  'feed',
  'swiper',
  'comparison',
  'codechat',
  'home',
  'cloud',
  'projects'
];

/**
 * Add submodule static middleware to Express app
 * @param {Object} app - Express application instance
 */
function addSubmoduleStatic(app) {
  SUBMODULES.forEach(submodule => {
    const submodulePath = path.resolve(__dirname, submodule);
    if (fs.existsSync(submodulePath)) {
      const express = require('./server/node_modules/express');
      app.use(`/${submodule}`, express.static(submodulePath));
      console.log(`[Submodules] Serving /${submodule} from ${submodulePath}`);
    } else {
      console.log(`[Submodules] Warning: ${submodule} directory not found`);
    }
  });
}

module.exports = { addSubmoduleStatic, SUBMODULES };