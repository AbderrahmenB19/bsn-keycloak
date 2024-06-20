import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookResponse } from '../../../../services/models';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {

  private _book: BookResponse = {};
  private _bookCover: string | undefined;
  private _manage: boolean = false;

  public get manage() {
    return this._manage;
  }
  
  @Input()
  public set manage(value) {
    this._manage = value;
  }

  public get bookCover(): string | undefined {
    if (this._book.cover) {
      return 'data:image/jpg;base64,' + this._book.cover;
    }
    return `https://picsum.photos/200/300?random=${Math.random()}`;
  }

  public set bookCover(value: string | undefined) {
    this._bookCover = value;
  }

  get book(): BookResponse {
    return this._book;
  }
  
  @Input()
  set book(bookResponse: BookResponse) {
    this._book = bookResponse;
  }

  @Output() share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  OnArchive() {
    console.log("onarchive");
    this.archive.emit(this._book);
  }

  onShare() {
    this.share.emit(this._book);
  }

  onEdit() {
    this.edit.emit(this._book);
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this._book);
  }

  onBorrow() {
    console.log("borrow");
    this.borrow.emit(this._book);
  }

  onShowDetails() {
    console.log("showdetails");
    this.details.emit(this._book);
  }
}
