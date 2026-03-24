const API_BASE = '/api';

async function request(path, options) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    },
    ...options
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.error || `Request failed: ${res.status}`;
    throw new Error(message);
  }

  return data;
}

export function getBeers(params = {}) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === '' || v == null) continue;
    qs.set(k, String(v));
  }
  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  return request(`/beers${suffix}`);
}

export function getBeer(id) {
  return request(`/beers/${id}`);
}

export function postRating(payload) {
  return request('/ratings', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function getRecommendations(userId) {
  const qs = new URLSearchParams({ user_id: userId });
  return request(`/recommendations?${qs.toString()}`);
}

export function postFavorite(payload) {
  return request('/favorites', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function getStores(q) {
  const qs = q ? `?q=${encodeURIComponent(q)}` : '';
  return request(`/stores${qs}`);
}

export function getAvailability(params = {}) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === '' || v == null) continue;
    qs.set(k, String(v));
  }
  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  return request(`/availability${suffix}`);
}
