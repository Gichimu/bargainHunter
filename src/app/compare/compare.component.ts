import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { defaultIfEmpty, map } from 'rxjs/operators';
import { HttpService } from '../services/http.service';


@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  
  $jumiaProducts: Observable<any>
  products = [];
  selectedVal: string = 'fridges';
  $carrefourProducts: Observable<any>

  searchFormGroup: FormGroup;
  
  constructor(private readonly httpservice: HttpService, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.products.length = 0;
    this.searchFormGroup = this._formBuilder.group({
      search: '',
    });
    this.httpservice.getFromJumia(this.selectedVal).subscribe(data => {
      this.products = data
    });
  }

  getKeyword(){
    this.httpservice.getFromJumia(this.searchFormGroup.value.search).subscribe(data => {
      this.products = data
    });
  }

  // comparePrices(keyword: string){
  //   this.httpservice.getFromJumia(keyword).subscribe(data => {
  //     // this.products.push(data[0])
  //     this.ngOnInit()
  //   })
  // }

}
