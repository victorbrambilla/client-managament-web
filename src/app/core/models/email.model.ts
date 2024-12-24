import { Categoria } from "./categoria.model";

export interface Email {
  id?: number;
  email: string;
  clienteId: number;
  categoria: Categoria;
}

export interface CreateEmail{
  email: string;
  clienteId: number;
  categoriaId: number;
}

export interface UpdateEmail{
  email: string;
  clienteId: number;
  categoriaId: number;
}