export type ConsentCategory = 'necessary' | 'functional' | 'analytics' | 'marketing';

export interface StorageItemDefinition {
  key: string;
  category: ConsentCategory;
  purposeDe: string;
  purposeEn: string;
  duration: string;
  storageType: 'localStorage' | 'sessionStorage';
}

export const CODAY_STORAGE_INVENTORY: StorageItemDefinition[] = [
  {
    key: 'coday-consent-v2',
    category: 'necessary',
    purposeDe: 'Speichert den audit-festen Einwilligungsnachweis nach DSGVO Art. 7 Abs. 1.',
    purposeEn: 'Stores audit-proof consent decision under GDPR Art. 7(1).',
    duration: '12 Monate',
    storageType: 'localStorage',
  },
  {
    key: 'theme',
    category: 'functional',
    purposeDe: 'Speichert die vom Nutzer gewählte Hell-/Dunkel-Darstellung.',
    purposeEn: 'Stores user preference for Light/Dark display theme.',
    duration: 'Dauerhaft bis Löschung',
    storageType: 'localStorage',
  },
  {
    key: 'strobi-chat-storage',
    category: 'functional',
    purposeDe: 'Ermöglicht das Fortsetzen des Beratungsgesprächs mit dem AI-Assistenten Strobi.',
    purposeEn: 'Allows continuing conversations with AI assistant Strobi across views.',
    duration: 'Sitzung / 30 Tage',
    storageType: 'localStorage',
  },
  {
    key: 'coday-configurator-state',
    category: 'functional',
    purposeDe: 'Merkt sich gewählte Optionen im interaktiven Webdesign-Kalkulator.',
    purposeEn: 'Stores selected options in the interactive web design calculator.',
    duration: 'Sitzung',
    storageType: 'sessionStorage',
  },
];
