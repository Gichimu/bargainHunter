import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { defaultIfEmpty, map } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { SharingService } from '../services/sharing.service';

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
    // let matchString = keyword.replace(/ /g, '|').slice(0, 30)
    let matchString = keyword.split(' ').splice(0, 5)
    // let splitString = matchString.slice(0, 5)
    // let matchString = splitString.replace(/""/g, '/|/');

    this.carrefourProducts$ = this.httpservice.getFromCarrefour(keyword);
    this.products$ = this.httpservice.getFromJumia(keyword.split(' ')[1])
        
          // matchString.some(r => product.description.split(' ').includes(r))

        // product.price > 0
        // product.description.match(/matchString/gi)
        // matchString.some(rx => rx.test(product.description))
    //   })
    // }))
    console.log(matchString)
    // console.log(this.jumiaProducts);
    this.comparison = true;
  }

  goTo(link: string){
    window.location.href = link;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
