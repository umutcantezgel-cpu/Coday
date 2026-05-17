/**
 * Lead entity barrel export.
 */
export {
  LeadSchema,
  type Lead,
  type StoredLead,
  type LeadSubmissionResult,
} from '@/entities/lead/model/types';
export { submitLead, getLeads, updateLeadStatus } from '@/entities/lead/lib/leadService';
