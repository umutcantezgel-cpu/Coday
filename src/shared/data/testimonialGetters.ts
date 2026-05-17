/**
 * Testimonial / Client Reference getter utilities — SEQ-02
 *
 * @module shared/data/testimonialGetters
 */
import { clientReferences, type ClientReference } from '@/shared/data/teamMembers';

/** Returns all client references / testimonials. */
export function getAllTestimonials(): ClientReference[] {
  return clientReferences;
}

/** Filter testimonials by industry. */
export function getTestimonialsByIndustry(industry: string): ClientReference[] {
  return clientReferences.filter((t) => t.industry === industry);
}

/** Get a single testimonial by its ID. */
export function getTestimonialById(id: string): ClientReference | undefined {
  return clientReferences.find((t) => t.id === id);
}
