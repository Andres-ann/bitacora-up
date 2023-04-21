import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Frases } from 'src/app/models/frases.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.css'],
})
export class GenericFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) {}

  formFrase: FormGroup;
  @Input()
  modelFrases: Frases;
  @Output()
  submitValues: EventEmitter<Frases> = new EventEmitter<Frases>();

  ngOnInit(): void {
    this.formFrase = this.formBuilder.group({
      frase: ['', Validators.required],
      autor: ['', Validators.required],
      likes: [0],
      visualizaciones: [0],
    });
    if (this.modelFrases !== undefined) {
      this.formFrase.patchValue(this.modelFrases);
    }
  }

  onSubmit(): void {
    this.submitValues.emit(this.formFrase.value);
  }
}
