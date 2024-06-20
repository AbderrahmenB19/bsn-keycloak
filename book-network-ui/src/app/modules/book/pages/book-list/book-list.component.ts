import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';

import { BookResponse, PageResponseBookResponse } from '../../../../services/models';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  message: string = "";
  page: number = 0;
  size: number = 5;

  private _isLastPage: boolean = false;
  level: string = "success";
  bookResponse: PageResponseBookResponse = {}
  constructor(private bookService: BookService, private router: Router) { }
  ngOnInit(): void {
    this.findAllbooks()


  }
  borrowBook(book: BookResponse) {
    this.message = "";
    
    this.bookService.borrowBook({
      "book-id": book.id as number
    }).subscribe({
      next: () => {
        this.level="success"
        this.message = "book succesfully added to list "
      }, error: (error) => {
        this.level="error"
        this.message = error.error.error
        console.log(error)
      }
    })

  }


 
  findAllbooks() {

    this.bookService.findAllBook({
      page: this.page,
      size: this.size
    }).subscribe({
      
      next: (books) => {
        
        this.bookResponse = books;


      }, error: (err) => {
        this.level="error"
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
