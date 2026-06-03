/**
 * Escalation Handler for QA System
 * Implements the escalation logic requested by the user.
 */

function blockDeployment(reason, details = '') {
  console.error('\n======================================================');
  console.error('❌ QA GATE FAILED (DEPLOYMENT BLOCKED)');
  console.error(`REASON: ${reason}`);
  if (details) console.error(details);
  console.error('======================================================\n');
  process.exit(1);
}

function warnDeployment(reason, details = '') {
  console.warn('\n======================================================');
  console.warn('⚠️ QA GATE WARNING (ACTION REQUIRED IN 48H)');
  console.warn(`REASON: ${reason}`);
  if (details) console.warn(details);
  console.warn('======================================================\n');
}

function infoLog(reason, details = '') {
  console.info('\n------------------------------------------------------');
  console.info('ℹ️ QA GATE INFO (TRACKING)');
  console.info(`REASON: ${reason}`);
  if (details) console.info(details);
  console.info('------------------------------------------------------\n');
}

module.exports = {
  blockDeployment,
  warnDeployment,
  infoLog,
};
