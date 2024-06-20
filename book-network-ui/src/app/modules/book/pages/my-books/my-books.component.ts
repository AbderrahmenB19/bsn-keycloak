import { Component, OnInit } from '@angular/core';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit{
  constructor(private bookService: BookService, private router: Router) { }
shareBook(book: BookResponse) {
  console.log("yalooooo")
this.bookService.updateShareableStatus({
  "book-id":book.id as number

}).subscribe({
  next:()=>{
    book.shareable=!book.shareable ;
  }
})
}
archiveBook(book: BookResponse) {
  this.bookService.updateArchivedStatus({
    "book-id":book.id as number
  
  }).subscribe({
    next:()=>{
      book.archived=!book.archived ;
    }
  })
}
editBook(book: BookResponse) {
this.router.navigate(['books','manage',book.id])
}
  message: string = "";
  page: number = 0;
  size: number = 2;

  private _isLastPage: boolean = false;
  
  bookResponse: PageResponseBookResponse = {}
 
  ngOnInit(): void {
    this.findAllbooks()


  }
  


 
  findAllbooks() {

    this.bookService.findAllBooksByOwner({
      page: this.page,
      size: this.size
    }).subscribe({
      
      next: (books) => {
        
        this.bookResponse = books;


      }, error: (err) => {
        
        console.log(err)
        
      }
    })
  }
  get isLastPage(): boolean {
    return this.page == this.bookResponse.totalPages as number - 1;
  }
  GoToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllbooks()
  }
  GoToNextPage() {
    this.page++;
    this.findAllbooks()
  }
  GoToPage(arg0: number) {
    this.page = arg0;
    this.findAllbooks()
  }
  GoToPreviousePage() {
    this.page--;
    this.findAllbooks()
  }
  GoToFirst() {
    this.page = 0;
    this.findAllbooks()
  }


}
