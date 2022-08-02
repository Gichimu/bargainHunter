import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { defaultIfEmpty, map, filter, finalize } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { SharingService } from '../services/sharing.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  jumiaProducts = [];
  carrefourProducts$: Observable<any>;
  sharedMessage: Array<any>;
  comparison = false;
  private subscription: Subscription;
  products$: Observable<any>;
  resultProducts$: Observable<any>;
  selectedVal: string = ' ';
  $carrefourProducts: Observable<any>;
  loading$ = new BehaviorSubject<boolean>(true);

  searchFormGroup: FormGroup;

  constructor(
    private readonly httpservice: HttpService,
    private readonly router: Router,
    private readonly sharingservice: SharingService,
    private _formBuilder: FormBuilder,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.comparison = false;
    this.sharedMessage = [];
    this.searchFormGroup = this._formBuilder.group({
      search: '',
    });
    this.products$ = this.httpservice.getFromJumia(this.selectedVal);
    this.subscription = this.sharingservice.getUpdate().subscribe((message) => {
      this.ngOnInit();
    });
  }

  getKeyword() {
    this.comparison = false;
    this.products$ = this.httpservice.getFromCarrefour(
      this.searchFormGroup.value.search
    );
  }

  comparePrices(keyword: string) {
    this.comparison = true;
    this.jumiaProducts.length = 0;
    let matchString = keyword.split(' ').splice(0, 7);
    let newMatchString = [...new Set(matchString)];
    let specs = keyword.match(/[0-9]/)
    

    this.carrefourProducts$ = this.httpservice
      .getFromCarrefour(newMatchString[0] + ' ' + newMatchString[1])
      .pipe(finalize(() => this.loading$.next(false)))
     

    let nothingFromJumia = this.httpservice
      .getFromJumia(keyword)
      .pipe(defaultIfEmpty(false));

    this.products$ = this.httpservice
      .getFromJumia(keyword)
      .pipe(
        map((products) =>
          products.filter((item) => item.description === matchString)
        )
      );

    if (nothingFromJumia) {
      this.products$ = this.httpservice
        .getFromJumia(
          matchString[0] + ' ' + matchString[1] + ' ' + matchString[2]
        )
        .pipe(
          map((products) =>
            products.filter((item) => item.description == keyword)
          )
        );
    }
    
  }

  goTo(link: string) {
    window.open(link, "_blank")
  }

  goBack() {
    window.history.back()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
