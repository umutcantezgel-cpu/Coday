
export interface SpokeNode {
  industry: string;
  location: string;
  title: string;
}

export function generateSemanticLinks(
  currentNode: SpokeNode,
  allNodes: SpokeNode[],
  limit: number = 3
): { url: string; anchor: string; type: 'hub' | 'neighbor' }[] {
  const links: { url: string; anchor: string; type: 'hub' | 'neighbor' }[] = [];

  // 1. ZWINGEND: Link zum Parent-Hub (verhindert Orphan Pages & bündelt PageRank)
  links.push({
    url: `/branchen-hub/${currentNode.industry.toLowerCase()}`,
    anchor: `Alle ${currentNode.title} Web-Lösungen ansehen`,
    type: 'hub'
  });
  
  // 2. Ring-Topologie für geographische Nachbarn (verhindert 2-Node Spider Traps)
  // Wir sortieren alle Nodes alphabetisch, um einen deterministischen Kreis zu bilden.
  const siloNodes = allNodes
    .filter(n => n.industry === currentNode.industry)
    .sort((a, b) => a.location.localeCompare(b.location));
    
  if (siloNodes.length > 1) {
    const currentIndex = siloNodes.findIndex(n => n.location === currentNode.location);
    
    for (let i = 1; i <= limit; i++) {
      // Modulo für Ring-Schließung (Garantiert keine Isolations-Bubbles)
      const nextIndex = (currentIndex + i) % siloNodes.length;
      const neighbor = siloNodes[nextIndex];
      if (!neighbor) continue;
      
      const anchors = [
        `Webentwicklung für ${neighbor.title} in ${neighbor.location}`,
        `${neighbor.title} Plattformen nahe ${neighbor.location}`,
        `Modernes Webdesign für ${neighbor.title} (${neighbor.location})`
      ];
      
      links.push({
        url: `/branchen-hub/${neighbor.industry.toLowerCase()}/${neighbor.location.toLowerCase()}`,
        anchor: anchors[(currentIndex + i) % anchors.length] || '',
        type: 'neighbor'
      });
    }
  }

  return links;
}
