import { Component, OnInit } from '@angular/core';
import { BookResponse, BorrowedBookResponse, FeedbackRequest, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BookService, FeedbackService } from '../../../../services/services';


@Component({
  selector: 'app-my-borrowed-book',
  templateUrl: './my-borrowed-book.component.html',
  styleUrl: './my-borrowed-book.component.scss'
})
export class MyBorrowedBookComponent implements OnInit {

  constructor(private bookeService: BookService, private feedbackService: FeedbackService) { }
  ngOnInit(): void {
    this.findAllBorowedBooks();
  }
  findAllBorowedBooks() {
    this.bookeService.findAllBooksBorrowedBooks({
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
  size: number = 10;
  feedbackRequest: FeedbackRequest = {
    bookId: 0,
    comment: 'Is amazing book ...',
    note:0.0
  }
  level:string='success'
  message:string=""


  private _isLastPage: boolean = false;
  writeFeedback(book: BorrowedBookResponse) {
    this.selectedBook = book
    this.feedbackRequest.bookId=this.selectedBook?.id as number
    
  }
  returnBorrowedBook(withFeedback: boolean) {
    console.log(this.selectedBook)

    this.bookeService.returnBorrowBook(
       {
        "book-id":this.selectedBook?.id as number
       }
    ).subscribe({
      next:()=>{
        if(withFeedback){
          this.giveFeedback()
        }
        this.level="success"
        this.message="book returned with feedback"
        this.selectedBook=undefined
        this.findAllBorowedBooks();

      }
    })


  }
  giveFeedback() {
    console.log(this.feedbackRequest)
    this.feedbackService.saveFeedBack({
      
      body: this.feedbackRequest
    }).subscribe({
      next: () => {
        this.level="success"
        this.message="feedback send successfully !"

      },error:error=>{
        console.log(error)
        this.level="error"
        this.message="something wrong try again "
        
      }
    })
  }

  get isLastPage(): boolean {
    return this.page == this.pageBook.totalPages as number - 1;
  }
  GoToLastPage() {
    this.page = this.pageBook.totalPages as number - 1;
    this.findAllBorowedBooks()
  }
  GoToNextPage() {
    this.page++;
    this.findAllBorowedBooks()
  }
  GoToPage(arg0: number) {
    this.page = arg0;
    this.findAllBorowedBooks()
  }
  GoToPreviousePage() {
    this.page--;
    this.findAllBorowedBooks()
  }
  GoToFirst() {
    this.page = 0;
    this.findAllBorowedBooks()
  }
}
