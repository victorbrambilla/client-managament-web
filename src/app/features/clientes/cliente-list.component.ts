import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente, ClienteParams } from '../../core/models/cliente.model';
import { ClienteService } from './clientes.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Status } from '../../core/models/status.enum';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  ProgressSpinnerMode,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ObservableInput } from 'rxjs';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss'],
  standalone: false,
})
export class ClienteListComponent implements OnInit {
  displayedColumns: string[] = [
    'inscricao',
    'nome',
    'apelido',
    'status',
    'acoes',
  ];
  dataSource: MatTableDataSource<Cliente>;
  filters: ClienteParams = {
    page: 0,
    size: 10,
    sortBy: 'id',
    sortDirection: 'ASC',
  };
  statusOptions = Object.values(Status);
  isLoading = false;
  totalClientes = 0;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Cliente>();
  }

  ngOnInit(): void {
    console.log('ClienteListComponent inicializado');
    this.loadClientes();
  }

  async loadClientes(): Promise<void> {
    try {
      this.isLoading = true;
      const clientes = await this.clienteService
        .getClientes(this.filters)
        .toPromise();
      if (!clientes || clientes.content.length === 0) {
        this.showErrorMessage('Nenhum cliente encontrado');
      }
      this.totalClientes = clientes?.totalElements || 0;
      this.dataSource.data = clientes?.content || [];
    } catch (error) {
      this.showErrorMessage('Erro ao carregar clientes');
      console.error('Erro ao carregar clientes:', error);
    } finally {
      this.isLoading = false;
    }
  }

  applyFilters(event: Event): void {
    event.preventDefault();
    this.filters.page = 0;
    this.loadClientes();
  }

  onPageChange(event: PageEvent): void {
    this.filters.page = event.pageIndex;
    this.filters.size = event.pageSize;
    this.loadClientes();
  }

  clearFilters(): void {
    this.filters = {
      page: 0,
      size: 10,
      sortBy: 'id',
      sortDirection: 'ASC',
    };
    this.loadClientes();
  }

  editCliente(cliente: Cliente): void {
    // Implementar lógica de edição
    this.router.navigate(['/clientes/editar', cliente.id]);
  }
  async deleteCliente(id: number): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Tem certeza que deseja excluir este cliente?' },
    });

    const confirmed = await dialogRef.afterClosed().toPromise();
    if (confirmed) {
      try {
        await this.clienteService.deleteCliente(id).toPromise();
        this.showErrorMessage('Cliente excluído com sucesso');
        await this.loadClientes();
      } catch (error) {
        this.showErrorMessage('Erro ao excluir cliente');
        console.error('Erro ao excluir cliente:', error);
      }
    }
  }

  getStatusClass(status: string): string {
    const statusLower = status.toLowerCase();
    return `status-chip status-${statusLower}`;
  }

  navigateToCreateCliente() {
    this.router.navigate(['/clientes/novo']);
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
}
