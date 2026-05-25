declare module '@axe-core/playwright' {
  export default class AxeBuilder {
    constructor(options: { page: unknown });
    analyze(): Promise<{ violations: unknown[] }>;
  }
}

declare module '@sentry/nextjs' {
  export const captureException: (e: unknown) => void;
}

type Messages = typeof import('./messages/de.json');

declare module 'sanity' {
  export function defineType<T = unknown>(config: T): T;
  export function defineField<T = unknown>(config: T): T;
  export interface Rule {
    required: () => Rule;
    custom: (fn: (value: unknown) => unknown) => Rule;
    min: (n: number) => Rule;
    max: (n: number) => Rule;
    warning: (msg: string) => Rule;
  }
}
