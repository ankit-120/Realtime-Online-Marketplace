export function register() {
  return `${import.meta.env.VITE_URL}/api/user/signup`;
}

export function login() {
  return `${import.meta.env.VITE_URL}/api/user/login`;
}
