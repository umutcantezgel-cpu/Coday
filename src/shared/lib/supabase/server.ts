import { createServerClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';

export function createSupabaseServerClient(request: Request, headers?: Headers) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
