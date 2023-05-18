import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Frases } from 'src/app/models/frases.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  constructor(private router: Router, private crudService: CrudService) {}

  onSubmit(frase: Frases) {
    this.crudService.createFrase(frase).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
