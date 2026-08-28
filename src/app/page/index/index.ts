import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [FormsModule],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private router = inject(Router);

  //variaveis conectadas ao fomulario
  username: string = '';
  password: string = '';

  //Mensagem de erro
  errorMessage:string ='';

  //Função para enviar o formulario
  fazerLogin():void {

    this.errorMessage = '';

    //Validação dos dados solicitados (admin/123456)
    if (this.username === 'admin' && this.password === '123456'){
      //Sucesso: vai para Home
      this.router.navigate(['/home']);
    } else{
      //Erro: exibe aviso
      this.errorMessage = 'Usuario ou senha incorretos';
    }


  }

}
