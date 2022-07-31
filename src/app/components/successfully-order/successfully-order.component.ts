import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-successfully-order',
  templateUrl: './successfully-order.component.html',
  styleUrls: ['./successfully-order.component.scss']
})
export class SuccessfullyOrderComponent implements OnInit {

  @Input() total!: number;
  constructor() { }
  ngOnInit(): void {
  }

}
