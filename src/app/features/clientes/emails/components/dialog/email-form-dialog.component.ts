import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from '../../../../../core/models/categoria.model';
import { Email } from '../../../../../core/models/email.model';

interface DialogData {
  email: Email;
  categorias: Categoria[];
}

@Component({
  selector: 'app-email-form-dialog',
  templateUrl: './email-form-dialog.component.html',
  styleUrls: ['./email-form-dialog.component.scss'],
  standalone:false
})
export class EmailFormDialogComponent {
  emailForm: FormGroup;
  isNew: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmailFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isNew = !data.email.id;
    this.emailForm = this.fb.group({
      id: [data.email.id],
      email: [data.email.email, [Validators.required, Validators.email]],
      clienteId: [data.email.clienteId],
      categoria: [data.email.categoria, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.emailForm.valid) {
      this.dialogRef.close(this.emailForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  compareCategoria(c1: Categoria, c2: Categoria): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}