

import { type StoredLead, type LeadSubmissionResult } from '@/entities/lead/model/types';
import { submitLeadAction, getLeadsAction, updateLeadStatusAction } from '@/entities/lead/actions/leadActions';
import { cache } from 'react';

/**
 * Submit a new lead.
 */
export async function submitLead(data: unknown): Promise<LeadSubmissionResult> {
  const result = await submitLeadAction(data);
  
  // Keep the email notification trigger here or move it fully to action.
  // Since we are refactoring, we'll keep the frontend call if it's there, but we can rely on the action.
  if (result.success) {
    try {
      await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
    }
  }

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
