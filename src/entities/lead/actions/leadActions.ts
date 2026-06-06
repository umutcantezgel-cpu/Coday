'use server';

import { createAdminClient } from '@/shared/lib/supabase/server';
import {
  LeadSchema,
  type StoredLead,
  type LeadSubmissionResult,
} from '@/entities/lead/model/types';

export async function submitLeadAction(data: unknown): Promise<LeadSubmissionResult> {
  try {
    const validatedData = LeadSchema.parse(data);
    const supabase = createAdminClient();

    const { data: insertedData, error } = await supabase
      .from('leads')
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        company: validatedData.company,
        project: validatedData.project,
        message: validatedData.message,
        budget: validatedData.budget,
        timeline: validatedData.timeline,
        source: validatedData.source,
        selected_module_ids: validatedData.selectedModuleIds,
        selected_package_id: validatedData.selectedPackageId,
        total_one_time_cents: validatedData.totalOneTimeCents,
        total_monthly_cents: validatedData.totalMonthlyCents,
        status: 'new',
      })
      .select()
      .single();

    if (error) throw error;

    // Send email via API is optional but recommended
    // In server actions, you could also call Resend directly here

    return { success: true, leadId: insertedData.id };
  } catch (error) {
    console.error('Lead submission action error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getLeadsAction(): Promise<StoredLead[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

     
    return data.map((item: any) => ({
      id: item.id,
      createdAt: item.created_at,
      status: item.status,
      name: item.name,
      email: item.email,
      phone: item.phone,
      company: item.company,
      project: item.project,
      message: item.message,
      budget: item.budget,
      timeline: item.timeline,
      source: item.source,
      selectedModuleIds: item.selected_module_ids,
      selectedPackageId: item.selected_package_id,
      totalOneTimeCents: item.total_one_time_cents,
      totalMonthlyCents: item.total_monthly_cents,
    }));
  } catch (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
}

export async function updateLeadStatusAction(
  leadId: string,
  status: StoredLead['status']
): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from('leads').update({ status }).eq('id', leadId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating lead status:', error);
    return false;
  }
}
