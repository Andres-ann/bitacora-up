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

  formFrases: FormGroup;
  @Input()
  modelFrases: Frases;
  @Output()
  submitValues: EventEmitter<Frases> = new EventEmitter<Frases>();

  ngOnInit(): void {
    this.formFrases = this.formBuilder.group({
      frase: ['', Validators.required],
      autor: ['', Validators.required],
    });
    if (this.modelFrases !== undefined) {
      this.formFrases.patchValue(this.formFrases);
    }
  }

  onSubmit(): void {
    this.submitValues.emit(this.formFrases.value);
  }
}
