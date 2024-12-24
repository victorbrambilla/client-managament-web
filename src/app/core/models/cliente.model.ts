import { Email } from './email.model';
import { PaginateParams } from './paginate-params.model';
import { Status } from './status.enum';

export interface Cliente {
  id?: number;
  inscricao: string;
  nome: string;
  apelido: string;
  status: Status;
  emails?: Email[];
  photoUrl?: string;
}

export interface ClienteParams extends PaginateParams {
  name?: string;
  inscricao?: string;
  status?: Status;

}