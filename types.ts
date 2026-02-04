export interface NavItem {
  label: string;
  path: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  metrics: { label: string; value: string }[];
  duration: string;
}

export enum PageStatus {
  LIVE = 'Live',
  DRAFT = 'Draft',
  ARCHIVED = 'Archived'
}
