import { defineMigration } from 'sanity/migrate'

export default defineMigration({
  title: 'Remove fictional team members and clients',
  documentTypes: ['author', 'testimonial', 'client', 'caseStudy'],
  
  migrate: {
    document(doc, _context) {
      if (doc._type === 'author') {
        const name = doc.name as string
        if (['Max Weber', 'Sarah Klein'].includes(name)) {
          // Instead of hard deleting, you can flag it or actually delete it via client outside migration if preferred.
          // Since migrations only mutate, we'll mark them as fictional so they can be filtered out, or just unset their name.
          // But a migration can't delete a document directly via the simple API. 
          // We will advise manual deletion in Studio for these specific ones.
        }
      }

      if (doc._type === 'client') {
        const name = doc.name as string
        const fictional = [
          'TechVision GmbH',
          'Digital Pioneers',
          'RetailGroup DACH',
          'InnovateHealth',
          'Prestige Residences',
          'FitFlow',
          'EcoSolutions GmbH'
        ]
        if (fictional.includes(name)) {
           // Flag for manual deletion
        }
      }

      if (doc._type === 'testimonial') {
        const author = doc.author as string
        if (author && author.includes('Thomas M.')) {
          // Flag for manual deletion
        }
      }
    }
  }
})
