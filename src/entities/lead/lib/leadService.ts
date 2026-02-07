import { LeadSchema, type StoredLead, type LeadSubmissionResult } from '../model/types';




/**
 * Submit a new lead (localStorage for MVP).
 * In production, this would POST to a backend API.
 */
export async function submitLead(data: unknown): Promise<LeadSubmissionResult> {
    try {
        // Validate with Zod
        const validatedData = LeadSchema.parse(data);

        // Dynamically import Supabase client to avoid initialization issues during SSR/build
        const { supabase } = await import('@/shared/lib/supabase/client');

        // Insert into Supabase
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
                // Map camelCase to snake_case for DB
                selected_module_ids: validatedData.selectedModuleIds,
                selected_package_id: validatedData.selectedPackageId,
                total_one_time_cents: validatedData.totalOneTimeCents,
                total_monthly_cents: validatedData.totalMonthlyCents,
                status: 'new'
            })
            .select()
            .single();

        if (error) throw error;

        // Log for development
        // console.log('📧 Lead submitted to Supabase');

        // 📧 Send Email Notification
        try {
            await fetch('/api/send-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(validatedData),
            });
            // console.log('📧 Email notification sent.');
        } catch (emailError) {
            console.error('Failed to send email notification:', emailError);
            // Don't fail the whole submission if email fails, just log it
        }

        return {
            success: true,
            leadId: insertedData.id,
        };
    } catch (error) {
        console.error('Lead submission error:', error);

        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            };
        }

        return {
            success: false,
            error: 'Ein unbekannter Fehler ist aufgetreten.',
        };
    }
}


/**
 * Get all stored leads from Supabase.
 */
export async function getLeads(): Promise<StoredLead[]> {
    try {
        const { supabase } = await import('@/shared/lib/supabase/client');

        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Map snake_case back to camelCase if necessary, or ensure types match.
        // For StoredLead, we expect camelCase.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            totalMonthlyCents: item.total_monthly_cents
        })) as StoredLead[];
    } catch (error) {
        console.error('Error fetching leads:', error);
        return [];
    }
}

/**
 * Update lead status in Supabase.
 */
export async function updateLeadStatus(
    leadId: string,
    status: StoredLead['status']
): Promise<boolean> {
    try {
        const { supabase } = await import('@/shared/lib/supabase/client');

        const { error } = await supabase
            .from('leads')
            .update({ status })
            .eq('id', leadId);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error updating lead status:', error);
        return false;
    }
}

