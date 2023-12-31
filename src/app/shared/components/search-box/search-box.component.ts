import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  private debouncer: Subject<string> = new Subject<string>()
  private debouncerSubscription?: Subscription

  @Input()
  public placeholder: string = ''
  @Input()
  public initialValue: string = ''

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter()
  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter()

  @ViewChild("txtInput")
  public tagInput!: ElementRef<HTMLInputElement>

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(500),

      )
      .subscribe( value => {
        this.onDebounce.emit(value)
      })
  }
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe()
  }
  emitValue( value: string ){
    this.onValue.emit(value)
  }

  onKeyPress( searchTerm: string) {
    this.debouncer.next( searchTerm )
  }
}
