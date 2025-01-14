import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CommonModule,
  ],
})
export class SignupComponent {
  signupForm: FormGroup;
  confirmForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;
  isConfirm = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^[\p{L}\p{M}\p{S}\p{N}\p{P}]+$/u),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required, Validators.minLength(3)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );

    this.confirmForm = this.fb.group({
        confirmationCode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  getPasswordErrorMessage(): string {
    const control = this.signupForm.get('password');
    if (control?.hasError('required')) {
      return 'Senha é obrigatória';
    }
    if (control?.hasError('minlength')) {
      return 'Senha deve ter no mínimo 8 caracteres';
    }
    if (control?.hasError('pattern')) {
      return 'Senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial';
    }
    return '';
  }

  async onSubmit(): Promise<void> {
    if (this.signupForm.valid) {
      try {
        this.isLoading = true;

        // Simular chamada à API
        const res = await this.authService.signup(
          this.signupForm.value.email,
          this.signupForm.value.password,
          this.signupForm.value.username,
            this.signupForm.value.name
        );
        console.log('res', res);

        if(!res.isSignUpComplete && res.nextStep.signUpStep === 'CONFIRM_SIGN_UP'){
            this.isConfirm = true;
            this.showSuccess('Conta criada com sucesso!');
            return
        }

        this.isConfirm = true;
        this.showSuccess('Conta criada com sucesso!');
        this.router.navigate(['/login']);
      } catch (error) {
        console.log('error', error);
        this.showError('Erro ao criar conta. Tente novamente.');
      } finally {
        this.isLoading = false;
      }
    }
  }

  async onConfirm(): Promise<void> {
    if (this.confirmForm.valid) {
      try {
        this.isLoading = true;

        // Simular chamada à API
        await  this.authService.confirmSignUp(this.signupForm.value.username,this.confirmForm.value.confirmationCode);
        this.showSuccess('Conta confirmada com sucesso!');
        this.router.navigate(['/login']);
      } catch (error) {
        this.showError('Erro ao confirmar conta. Tente novamente.');
      } finally {
        this.isLoading = false;
      }
    }
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['success-snackbar'],
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }
}
