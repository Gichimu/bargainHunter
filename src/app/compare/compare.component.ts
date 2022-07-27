import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, zip } from 'rxjs';
import { defaultIfEmpty, filter, first, map } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
})
export class CompareComponent implements OnInit {
  jumiaProducts = [];
  sharedMessage: Array<any>;
  private subscription: Subscription;
  products$: Observable<any>;
  resultProducts$: Observable<any>;
  selectedVal: string = 'fridges';
  $carrefourProducts: Observable<any>;

  searchFormGroup: FormGroup;

  constructor(
    private readonly httpservice: HttpService,
    private readonly router: Router,
    private readonly sharingservice: SharingService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.sharedMessage = [];
    this.searchFormGroup = this._formBuilder.group({
      search: '',
    });
    this.products$ = this.httpservice.getFromCarrefour(this.selectedVal);
    this.subscription = this.sharingservice.getUpdate().subscribe((message) => {
      // this.sharedMessage.push(message.text);
      // console.log(this.sharedMessage);
      this.ngOnInit()
    });
  }

  getKeyword() {
    this.products$ = this.httpservice.getFromCarrefour(
      this.searchFormGroup.value.search
    );
  }

  comparePrices(keyword: string) {
    keyword.split(' ').forEach((word) => {
      this.httpservice.getFromJumia(word).subscribe((data) => {
        this.jumiaProducts.push(data[0]);
      });
    });
    console.log(this.jumiaProducts);
    // this.jumiaProducts = this.jumiaProducts.filter(item => {
    //   item != null
    // })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
