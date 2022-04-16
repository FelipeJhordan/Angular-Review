import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators'

@Component({
  selector: 'poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.scss']
})
export class PokeSearchComponent implements OnInit,OnDestroy {

  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter();
  
  public valueChanged : Subject<string> = new Subject<string>();
  private valueChangedSubscription!: Subscription;
  public value?: string
  constructor() {
  }

  ngOnInit(): void {
    this.valueChangedSubscription = this.valueChanged.pipe(
      debounceTime(800),
      distinctUntilChanged())
    .subscribe( text => {
      this.value=text;
      this.emmitSearch.emit(this.value)
    })
  }

  public search(value: string) {
    this.valueChanged.next(value)
  }

  ngOnDestroy(): void {
    this.valueChangedSubscription.unsubscribe()
  }
}
