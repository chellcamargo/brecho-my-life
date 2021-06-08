import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },  {
    path: 'user-list',
    loadChildren: () => import('./pages/user-list/user-list.module').then( m => m.UserListPageModule)
  },
  {
    path: 'endereco-add',
    loadChildren: () => import('./pages/endereco-add/endereco-add.module').then( m => m.EnderecoAddPageModule)
  },
  {
    path: 'endereco-list',
    loadChildren: () => import('./pages/endereco-list/endereco-list.module').then( m => m.EnderecoListPageModule)
  },
  {
    path: 'user-perfil',
    loadChildren: () => import('./pages/user-perfil/user-perfil.module').then( m => m.UserPerfilPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },

 

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
