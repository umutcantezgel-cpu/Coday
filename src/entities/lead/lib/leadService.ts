import { type StoredLead, type LeadSubmissionResult } from '@/entities/lead/model/types';
import {
  submitLeadAction,
  getLeadsAction,
  updateLeadStatusAction,
} from '@/entities/lead/actions/leadActions';
import { cache } from 'react';

/**
 * Submit a new lead.
 */
export async function submitLead(data: unknown): Promise<LeadSubmissionResult> {
  const result = await submitLeadAction(data);
  // Email notification is now handled centrally by saveLeadInternalAction
  return result;
}

/**
 * Get all stored leads from Supabase.
 */
export const getLeads = cache(async (): Promise<StoredLead[]> => {
  return await getLeadsAction();
});

/**
 * Update lead status in Supabase.
 */
export async function updateLeadStatus(
  leadId: string,
  status: StoredLead['status']
): Promise<boolean> {
  return await updateLeadStatusAction(leadId, status);
}
