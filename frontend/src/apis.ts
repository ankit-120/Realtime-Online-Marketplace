export function register() {
  return `${import.meta.env.VITE_URL}/api/user/signup`;
}

export function login() {
  return `${import.meta.env.VITE_URL}/api/user/login`;
}

export function addProduct() {
  return `${import.meta.env.VITE_URL}/api/item/add`;
}

export function getAllProduct() {
  return `${import.meta.env.VITE_URL}/api/item/items/all`;
}

export function getProductById(id: string | undefined) {
  return `${import.meta.env.VITE_URL}/api/item/get/${id}`;
}
