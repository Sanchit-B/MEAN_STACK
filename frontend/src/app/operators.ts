import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class operatorComponent implements OnInit , AfterViewInit{

  @ViewChild('button', {static:true}) button;

  @ViewChild('input1', {static:true}) input1: ElementRef;
  @ViewChild('input2', {static:true}) input2: ElementRef;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    // switchMap

    let obs1 = interval(1000);
    let obs2 = fromEvent(this.button, 'click');

    // obs1.switchMap(
    //     event => {
    //         return obs2;
    //     }
    // ).subscribe(res => console.log(res));
  }
}
