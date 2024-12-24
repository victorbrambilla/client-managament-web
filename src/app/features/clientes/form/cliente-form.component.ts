import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../clientes.service';
import { Status } from '../../../core/models/status.enum';
import { Cliente } from '../../../core/models/cliente.model';
 

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
  standalone:false
})
export class ClienteFormComponent implements OnInit {
  clienteForm: FormGroup;
  clienteId?: number;
  isLoading = false;
  statusOptions = Object.values(Status);
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.clienteForm = this.fb.group({
      inscricao: ['', Validators.required],
      nome: ['', Validators.required],
      apelido: [''],
      status: [Status.ATIVADO, Validators.required],
      photoUrl: ['']
    });
  }

  ngOnInit(): void {
    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.clienteId) {
      this.loadCliente();
    }
  }

  async loadCliente(): Promise<void> {
    try {
      this.isLoading = true;
      const cliente = await this.clienteService.getCliente(this.clienteId!).toPromise();
      if (cliente) {
        this.clienteForm.patchValue(cliente);
      }
      if (cliente && cliente.photoUrl) {
        this.imagePreview = cliente.photoUrl;
      }
    } catch (error) {
      this.showErrorMessage('Erro ao carregar cliente');
      console.error('Erro ao carregar cliente:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.clienteForm.valid) {
      try {
        this.isLoading = true;
        const clienteData: Cliente = this.clienteForm.value;
        
        if (this.clienteId) {
          await this.clienteService.updateCliente(this.clienteId, { ...clienteData }).toPromise();
          this.showSuccessMessage('Cliente atualizado com sucesso');
        } else {
          await this.clienteService.createCliente(clienteData).toPromise();
          this.showSuccessMessage('Cliente criado com sucesso');
        }
        
        this.router.navigate(['/clientes']);
      } catch (error) {
        this.showErrorMessage('Erro ao salvar cliente');
        console.error('Erro ao salvar cliente:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  onPhotoUrlChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      this.imagePreview = input.value;
      this.clienteForm.patchValue({ photoUrl: input.value });
    }
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}