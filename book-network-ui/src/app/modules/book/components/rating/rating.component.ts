import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  @Input() rating:number=0;
  @Output() ratingClicked: EventEmitter<number> = new EventEmitter<number>();
  max_rating:number=5;
  get fullStars():number{
    return Math.floor(this.rating)
  }
  get halfStar():boolean{
    return this.rating % 1 !==0;
  }
  get emptyStars():number{
    return this.max_rating-Math.ceil(this.rating);
  }


  

}
