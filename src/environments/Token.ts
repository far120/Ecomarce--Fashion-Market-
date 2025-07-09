export function isTokenValid(): boolean {
    const token = localStorage.getItem('token');
    // console.log('Token from localStorage:', token);
    // Check if the token is a valid JWT
    if (!token || typeof token !== 'string') {
        return false;
    }
    const parts = token.split('.');
    if (parts.length !== 3) {
        return false;
    }
    try {
        const payload = JSON.parse(atob(parts[1]));
        // console.log('Decoded JWT payload:', payload);
        // Check if the token has expired
        if (payload.exp && typeof payload.exp === 'number') {
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp > currentTime;
        }
        return true; // Token is valid and not expired
    } catch (e) {
        return false; // Invalid token format
    }
}

