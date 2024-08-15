/**
 *  Gera um slug a partir de um título.
 * **/
export function createSlug(title: string) {
  return title
    .toLowerCase() // Converte para minúsculas
    .trim() // Remove espaços no início e no fim
    .replace(/[^\w\s-]/g, '') // Remove caracteres não alfanuméricos, exceto espaços e hífens
    .replace(/[\s-]+/g, '-') // Substitui espaços e múltiplos hífens por um único hífen
    .replace(/^-+|-+$/g, '') // Remove hífens no início e no fim
}
