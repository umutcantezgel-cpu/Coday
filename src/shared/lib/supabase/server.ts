import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';

export function createSupabaseServerClient(request: Request, headers?: Headers) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase environment variables');
    }

    return createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return parseCookieHeader(request.headers.get('Cookie') ?? '').map((c) => ({
                    name: c.name,
                    value: c.value ?? '',
                }));
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) => {
                    const header = serializeCookieHeader(name, value, options);
                    if (headers) {
                        headers.append('Set-Cookie', header);
                    }
                });
            },
        },
    });
}

export function createAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error('Missing Supabase admin environment variables');
    }

    // Für den Admin-Client via SSR benötigen wir keinen echten Cookie-Speicher
    return createServerClient(supabaseUrl, supabaseServiceKey, {
        cookies: {
            getAll() { return []; },
            setAll() { },
        },
    });
}
