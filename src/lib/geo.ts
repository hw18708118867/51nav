export interface LocationInfo {
  city: string;
  region: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

let cache: Promise<LocationInfo> | null = null;

async function fetchIpLocation(): Promise<LocationInfo> {
  const res = await fetch('https://ipinfo.io/json');
  if (!res.ok) throw new Error('ipinfo failed');
  const data = await res.json();
  const [lat, lon] = String(data.loc || '0,0').split(',').map(Number);
  return {
    city: data.city || 'Local',
    region: data.region || '',
    country: data.country_name || data.country || '',
    countryCode: data.country || '',
    latitude: lat || 0,
    longitude: lon || 0,
    timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export function getLocation(): Promise<LocationInfo> {
  if (!cache) cache = fetchIpLocation().catch(() => defaultLocation());
  return cache;
}

function defaultLocation(): LocationInfo {
  return {
    city: 'Local',
    region: '',
    country: '',
    countryCode: '',
    latitude: 0,
    longitude: 0,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}
