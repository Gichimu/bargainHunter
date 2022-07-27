import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, zip } from 'rxjs';
import { defaultIfEmpty, filter, first, take, map } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
})
export class CompareComponent implements OnInit {
  jumiaProducts = [];
  carrefourProducts$: Observable<any>;
  sharedMessage: Array<any>;
  comparison = false;
  private subscription: Subscription;
  products$: Observable<any>;
  resultProducts$: Observable<any>;
  selectedVal: string = ' ';
  $carrefourProducts: Observable<any>;

  searchFormGroup: FormGroup;

  constructor(
    private readonly httpservice: HttpService,
    private readonly router: Router,
    private readonly sharingservice: SharingService,
    private _formBuilder: FormBuilder
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
    this.comparison = false
    this.products$ = this.httpservice.getFromCarrefour(
      this.searchFormGroup.value.search
    );

  }

  comparePrices(keyword: string) {
    this.jumiaProducts.length = 0;
    // keyword.split(' ').forEach((word) => {
    //   this.httpservice.getFromJumia(word).subscribe((data) => {
    //     this.jumiaProducts.push(data[0]);
    //   });
    // });
    this.carrefourProducts$ = this.httpservice.getFromCarrefour(keyword);
    this.products$ = this.httpservice.getFromJumia(keyword.split(' ')[1])
    // console.log(this.jumiaProducts);
    this.comparison = true;
    // this.jumiaProducts = this.jumiaProducts.filter(item => {
    //   item != null
    // })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
