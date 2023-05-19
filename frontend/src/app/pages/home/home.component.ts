import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: any[];
  isLoading: boolean = true;

  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.crudService.getFrases().subscribe((data) => {
      this.posts = data;
      this.isLoading = false;
    });
  }

  updateFrasesList() {
    this.crudService.getFrases().subscribe((res) => {
      this.posts = res;
    });
  }

  updateLikeList() {
    this.crudService.getFrases().subscribe((res) => {
      this.posts = res;
    });
  }
}
