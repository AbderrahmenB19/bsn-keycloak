import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { MyBooksComponent } from './pages/my-books/my-books.component';
import { ManageBookComponent } from './pages/manage-book/manage-book.component';
import { MyBorrowedBookComponent } from './pages/my-borrowed-book/my-borrowed-book.component';
import { MyReturnedBooksComponent } from './pages/my-returned-books/my-returned-books.component';
import { authGuard } from '../../services/guard/auth.guard';

const routes: Routes = [
  {
    path:"" , component:MainComponent ,canActivate:[authGuard] , children:[
      {
        path:""  ,canActivate:[authGuard] ,component:BookListComponent
      },
      {
        path:"my-books" ,canActivate:[authGuard] , component:MyBooksComponent
      },
      {
        path: "manage" ,canActivate:[authGuard] , component:ManageBookComponent
      },
      {
        path: "manage/:bookId" ,canActivate:[authGuard] , component:ManageBookComponent
      },
      {
        path:"my-borrowed-books",canActivate:[authGuard] , component:MyBorrowedBookComponent
      },{
        path:"my-returned-books",canActivate:[authGuard] , component:MyReturnedBooksComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
