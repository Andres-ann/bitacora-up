import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { RandomService } from 'src/app/services/random.service';
import { ActivatedRoute } from '@angular/router';
import { Frases } from 'src/app/models/frases.model';

@Component({
  selector: 'app-post-random',
  templateUrl: './post-random.component.html',
  styleUrls: ['./post-random.component.css'],
})
export class PostRandomComponent {
  id!: any;
  posts: Frases[] = [];
  isLoading: boolean = true;

  @Input() visualizaciones!: number;
  @Output() postUpdated = new EventEmitter<Frases>();

  constructor(
    private crudService: CrudService,
    private randomService: RandomService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.randomService.getFraseRandom().subscribe((res) => {
      this.posts = res;
      this.isLoading = false;
    });
  }
}
