import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  public errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.errorMessage = this.route.snapshot.data['errorMessage'];

    this.route.data.subscribe( d => this.errorMessage = d['errorMessage']);
  }

}
