import { Component, OnInit } from '@angular/core';
import { BookRequest, BookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent implements OnInit {

  constructor(private bookservice: BookService, private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId']
    if (bookId) {
      this.bookservice.findBookById({
        "book-id": bookId
      }).subscribe({
        next: (bookRe: BookResponse) => {
          this.bookRequest = {
            shareable:bookRe.shareable,
            id:bookRe.id,
            authorName: bookRe.authorName as string,
            isbn: bookRe.isbn as string,
            synopsis: bookRe.synopsis as string ,
            title: bookRe.title as string 

          }
          if(bookRe.cover){
            this.selectedPicture = "data:image/jpg;base64,"+bookRe.cover
          }
        }
      })
    }

  }
  saveBook() {
    this.bookservice.saveBook({
      body: this.bookRequest
    }).subscribe({
      next: (bookId: number) => {
        this.bookservice.uploadBookCoverPicture({
          "book-id": bookId,
          body: {
            file: this.selectedBookcover
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['books/my-books']);

          }
        });

      }, error: error => {
        console.log(error)
        this.ErrorMsg = error.error.validationErrors;
      }
    })
  }

  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: ""
  }
  ErrorMsg: Array<string> = []
  selectedPicture: string = "";
  selectedBookcover: any;
  OnFileSelected(event: any) {
    this.selectedBookcover = event.target.files[0];
    console.log(this.selectedBookcover)
    if (
      this.selectedBookcover
    ) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedBookcover)
      reader.onload = () => {

        this.selectedPicture = reader.result as string

      }

    }

  }


}
