/**
 * Work / Case Study getter utilities — SEQ-02
 *
 * Type-safe accessor functions for the work/portfolio data layer.
 *
 * @module shared/data/workGetters
 */
import { workData, type Project, type ProjectType } from '@/shared/data/work';

/** Returns all projects as an array. */
export function getAllProjects(): Project[] {
  return Object.values(workData);
}

/** Find a single project by its slug. Returns undefined if not found. */
export function getProjectBySlug(slug: string): Project | undefined {
  return workData[slug];
}

/** Get all projects of a specific type (case_study, in_progress, template). */
export function getProjectsByType(type: ProjectType): Project[] {
  return Object.values(workData).filter((p) => p.type === type);
}

/** Get only completed case studies. */
export function getCaseStudies(): Project[] {
  return getProjectsByType('case_study');
}

/** Get projects filtered by category (e.g. 'development', 'design', 'marketing'). */
export function getProjectsByCategory(category: string): Project[] {
  return Object.values(workData).filter((p) => p.category === category);
}

/** Get featured case studies (status: 'live' AND type: 'case_study'). */
export function getFeaturedCaseStudies(): Project[] {
  return Object.values(workData).filter((p) => p.type === 'case_study' && p.status === 'live');
}
