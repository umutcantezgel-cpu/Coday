/**
 * Security Logger Module (CUSTOS)
 * 
 * Provides structured logging for security-relevant events.
 * Logs are formatted for easy parsing by monitoring systems.
 * 
 * IMPORTANT: Never log sensitive data (passwords, tokens, PII).
 */

export enum SecurityEventType {
    // Authentication Events
    LOGIN_ATTEMPT = 'AUTH_LOGIN_ATTEMPT',
    LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
    LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE',
    LOGOUT = 'AUTH_LOGOUT',

    // Authorization Events
    ACCESS_DENIED = 'AUTHZ_ACCESS_DENIED',
    PERMISSION_ESCALATION = 'AUTHZ_PERMISSION_ESCALATION',

    // Input Validation Events
    VALIDATION_FAILURE = 'INPUT_VALIDATION_FAILURE',
    SUSPICIOUS_INPUT = 'INPUT_SUSPICIOUS',

    // Rate Limiting Events
    RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',

    // General Security Events
    SECURITY_EXCEPTION = 'SECURITY_EXCEPTION',
    CONFIG_CHANGE = 'CONFIG_CHANGE',
}

export interface SecurityLogEntry {
    timestamp: string;
    eventType: SecurityEventType;
    message: string;
    source: string; // e.g., 'ApplicationWizard', 'api/send-lead'
    metadata?: Record<string, unknown>; // Additional context (NO PII!)
    ip?: string; // User IP if available
    userId?: string; // User ID if authenticated
}

/**
 * Logs a security event to the console in a structured format.
 * In production, this should be extended to send to a SIEM or logging service.
 */
export function logSecurityEvent(entry: Omit<SecurityLogEntry, 'timestamp'>): void {
    const fullEntry: SecurityLogEntry = {
        ...entry,
        timestamp: new Date().toISOString(),
    };

    // Format for console (structured JSON for parsing)
    const logPrefix = `[CUSTOS][${fullEntry.eventType}]`;

    // Log based on severity
    switch (entry.eventType) {
        case SecurityEventType.LOGIN_FAILURE:
        case SecurityEventType.ACCESS_DENIED:
        case SecurityEventType.VALIDATION_FAILURE:
        case SecurityEventType.RATE_LIMIT_EXCEEDED:
            console.warn(logPrefix, JSON.stringify(fullEntry));
            break;
        case SecurityEventType.SECURITY_EXCEPTION:
        case SecurityEventType.PERMISSION_ESCALATION:
        case SecurityEventType.SUSPICIOUS_INPUT:
            console.error(logPrefix, JSON.stringify(fullEntry));
            break;
        default:
            console.info(logPrefix, JSON.stringify(fullEntry));
    }
}

/**
 * Convenience function for logging validation failures.
 */
export function logValidationFailure(
    source: string,
    errors: Array<{ path: string; message: string }>,
    ip?: string
): void {
    logSecurityEvent({
        eventType: SecurityEventType.VALIDATION_FAILURE,
        message: `Validation failed with ${errors.length} error(s)`,
        source,
        metadata: { errors: errors.map(e => `${e.path}: ${e.message}`) },
        ip,
    });
}
