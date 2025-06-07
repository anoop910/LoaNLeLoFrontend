import { jwtDecode } from 'jwt-decode';

// Check if a token is expired
export function isTokenExpired(token) {
  if (!token) {
    return true; // no token = expired
  }

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; // seconds
    return decoded.exp < now;
  } catch (err) {
    return true; // decoding failed = treat as expired
  }
}

// Validate token and handle logout
export function validateTokenAndRedirect() {
  const token = localStorage.getItem('jwtToken');
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('jwtToken');
    return false;
  }
  return true;
}
