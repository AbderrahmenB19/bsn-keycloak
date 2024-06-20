import { Component } from '@angular/core';
import { BookService } from '../../../../services/services';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse } from '../../../../services/models';

@Component({
  selector: 'app-my-returned-books',
  templateUrl: './my-returned-books.component.html',
  styleUrl: './my-returned-books.component.scss'
})
export class MyReturnedBooksComponent {

  constructor(private bookeService: BookService, ) { }
  ngOnInit(): void {
    this.findAllBooksReturnedBooks();
  }
  findAllBooksReturnedBooks() {
    this.bookeService.findAllBooksReturnedBooks({
      page: this.page,
      size: this.size

    }).subscribe({
      next: (bookResponse: PageResponseBorrowedBookResponse) => {
        this.pageBook = bookResponse
      }
    })

  }
  displayedColumns: string[] = ['id', 'title', 'Author', 'ISBN', "rate", "conf"];
  pageBook: PageResponseBorrowedBookResponse = {}
  

  

  selectedBook: BorrowedBookResponse | undefined;
  index: number = 1;
  page: number = 0;
  size: number = 2;
  message:string ="";
  level:string|undefined

  

  private _isLastPage: boolean = false;

  
  approveBoookReturn(book:BorrowedBookResponse) {
    if(!book.returned){
      return ;
    }
    this.bookeService.approveReturnBorrowBook({
      "book-id": book.id as number
    }).subscribe({
      next:()=>{
        this.message= "the booke was approved succecsfully";
        this.level='success'

      },error:err=>{
        this.level="error"
        this.message="You cannot approve the return of a book you do not own"
      }
    })
    
    }

  get isLastPage(): boolean {
    return this.page == this.pageBook.totalPages as number - 1;
  }
  GoToLastPage() {
    this.page = this.pageBook.totalPages as number - 1;
    this.findAllBooksReturnedBooks()
  }
  GoToNextPage() {
    this.page++;
    this.findAllBooksReturnedBooks()
  }
  GoToPage(arg0: number) {
    this.page = arg0;
    this.findAllBooksReturnedBooks()
  }
  GoToPreviousePage() {
    this.page--;
    this.findAllBooksReturnedBooks()
  }
  GoToFirst() {
    this.page = 0;
    this.findAllBooksReturnedBooks()
  }
}


