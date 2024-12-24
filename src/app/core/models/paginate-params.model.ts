export interface PaginateParams {
  page: number; // Número da página (0-indexed)
  size: number; // Tamanho da página
  sortBy?: string;
  sortDirection?: string;
}
