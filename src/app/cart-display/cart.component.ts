import { EventEmitter, Inject } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Output() closePopup = new EventEmitter();
  @Output() cancelPopup = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public BookStoreItems: any) { }

  ngOnInit(): void {
    console.log(this.BookStoreItems)
  }
  
  cancelPopupEventHandler() {
    this.closePopup.emit();
  }

  closePopupEventHandler() {
    this.closePopup.emit();
  }

}
