import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se o usuário estiver autenticado, permite o acesso à página
  if (authService.isAuthenticated()) {
    return true;
  }

  // Se NÃO estiver autenticado, redireciona para a tela de login
  router.navigate(['/index']);
  return false;
};
