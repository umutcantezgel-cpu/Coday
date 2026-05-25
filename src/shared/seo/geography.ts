export function getCoordinates(location: string): { lat: number; lng: number } | null {
  // Mocked geocoder for demonstration. In production, this is usually a static JSON dataset of target cities.
  const map: Record<string, { lat: number; lng: number }> = {
    'wetzlar': { lat: 50.5583, lng: 8.5014 },
    'giessen': { lat: 50.5828, lng: 8.6811 },
    'linden': { lat: 50.5283, lng: 8.6536 },
    'butzbach': { lat: 50.4344, lng: 8.6719 },
    'marburg': { lat: 50.8090, lng: 8.7706 },
    'frankfurt': { lat: 50.1109, lng: 8.6821 },
  };
  return map[location.toLowerCase()] || null;
}

export function getDistance(coords1: { lat: number; lng: number }, coords2: { lat: number; lng: number }): number {
  // Haversine formula to calculate the distance between two geographical points
  const R = 6371; // Earth's radius in km
  const dLat = (coords2.lat - coords1.lat) * (Math.PI / 180);
  const dLng = (coords2.lng - coords1.lng) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(coords1.lat * (Math.PI / 180)) * Math.cos(coords2.lat * (Math.PI / 180)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
