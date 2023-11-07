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

export function getAllProductExcept() {
  return `${import.meta.env.VITE_URL}/api/item/logged/all`;
}

export function getMyProducts() {
  return `${import.meta.env.VITE_URL}/api/item/myProducts`;
}

export function getProductById(id: string | undefined) {
  return `${import.meta.env.VITE_URL}/api/item/get/${id}`;
}

export function createAuction() {
  return `${import.meta.env.VITE_URL}/api/auction/create`;
}
