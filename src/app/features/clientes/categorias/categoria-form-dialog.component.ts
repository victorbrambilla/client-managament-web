import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../../core/models/categoria.model';
import { CategoriaService } from './categoria.service';

@Component({
  selector: 'app-categoria-form-dialog',
  templateUrl: './categoria-form-dialog.component.html',
  styleUrls: ['./categoria-form-dialog.component.scss'],
  standalone: false,
})
export class CategoriaFormDialogComponent implements OnInit {
  @Output() categoriaUpdated = new EventEmitter<void>();
  categorias: Categoria[] = [];
  categoriaForm: FormGroup;
  isLoading = false;
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private dialogRef: MatDialogRef<CategoriaFormDialogComponent>,
    private snackBar: MatSnackBar
  ) {
    this.categoriaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.loadCategorias();
  }

  async loadCategorias(): Promise<void> {
    try {
      this.isLoading = true;
      this.categorias =
        (await this.categoriaService.getCategorias().toPromise()) ?? [];
    } catch (error) {
      this.showErrorMessage('Erro ao carregar categorias');
      console.error('Erro ao carregar categorias:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.categoriaForm.valid) {
      try {
        this.isLoading = true;
        const categoriaData: Categoria = {
          ...this.categoriaForm.value,
          id: this.editingId,
        };

        if (this.editingId) {
          await this.categoriaService
            .updateCategoria(this.editingId, categoriaData)
            .toPromise();
          this.showSuccessMessage('Categoria atualizada com sucesso');
        } else {
          await this.categoriaService
            .createCategoria(categoriaData)
            .toPromise();
          this.showSuccessMessage('Categoria criada com sucesso');
        }

        this.categoriaForm.reset();
        this.editingId = null;
        await this.loadCategorias();
        this.categoriaUpdated.emit();
      } catch (error) {
        this.showErrorMessage('Erro ao salvar categoria');
        console.error('Erro ao salvar categoria:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  editCategoria(categoria: Categoria): void {
    this.editingId = categoria.id!;
    this.categoriaForm.patchValue({
      nome: categoria.nome,
    });
  }

  async deleteCategoria(id: number): Promise<void> {
    try {
      this.isLoading = true;
      await this.categoriaService.deleteCategoria(id).toPromise();
      this.showSuccessMessage('Categoria excluída com sucesso');
      await this.loadCategorias();
    } catch (error: any) {
      if (error.error.code === 'ENTITY_IN_USE_ERROR') {
        this.showErrorMessage(
          'Categoria não pode ser excluída pois está em uso'
        );
      } else {
        this.showErrorMessage('Erro ao excluir categoria');
      }
      console.error('Erro ao excluir categoria:', error);
    } finally {
      this.isLoading = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
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
