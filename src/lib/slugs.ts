/**
 * Lista de slugs que não podem ser usados por usuários
 * para evitar conflitos com as rotas do sistema.
 */
export const RESERVED_SLUGS = [
  'admin',
  'api',
  'auth',
  'checkout',
  'dashboard',
  'favicon.ico',
  'globals.css',
  'images',
  'lib',
  'login',
  'logout',
  'pagamento',
  'precos',
  'register',
  's',
  'settings',
  'site-demo',
  'static',
  'styles',
  'utils',
];

/**
 * Valida se um slug é permitido
 */
export function isSlugReserved(slug: string): boolean {
  return RESERVED_SLUGS.includes(slug.toLowerCase());
}

/**
 * Limpa e formata uma string para ser usada como slug
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Remove acentos
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Espaços para -
    .replace(/--+/g, '-') // Evita --
    .trim();
}
