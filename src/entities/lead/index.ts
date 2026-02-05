/**
 * Lead entity barrel export.
 */
export { LeadSchema, type Lead, type StoredLead, type LeadSubmissionResult } from './model/types';
export { submitLead, getLeads, updateLeadStatus } from './lib/leadService';
