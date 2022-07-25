import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  $products: Array<any>[5];

  constructor(private readonly httpservice: HttpService) {}

  ngOnInit(): void {
    this.httpservice
      .getFromJumia()
      .pipe(map(data) => {
        return [...data, {img: this.getBase64ImageFromUrl}]
      })
      .subscribe((data) => {});
  }

  getAll(): void {
    this.httpservice.getFromCarrefour('').subscribe((data) => {
      this.$products = data;

      // this.$products.length = 4;
    });
  }

  async getBase64ImageFromUrl(imageUrl) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          resolve(reader.result);
        },
        false
      );

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }
}
