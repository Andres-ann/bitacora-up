import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRandomComponent } from './post-random.component';

describe('PostRandomComponent', () => {
  let component: PostRandomComponent;
  let fixture: ComponentFixture<PostRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostRandomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
