import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonFloatComponent } from './components/button-float/button-float.component';
import { ShowComponent } from './pages/show/show.component';
import { EditComponent } from './pages/edit/edit.component';
import { CreateComponent } from './pages/create/create.component';
import { GenericFormComponent } from './components/generic-form/generic-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuFixedComponent } from './components/menu-fixed/menu-fixed.component';
import { SearchComponent } from './pages/search/search.component';
import { PostRandomComponent } from './pages/post-random/post-random.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PostItemComponent,
    ButtonFloatComponent,
    ShowComponent,
    EditComponent,
    CreateComponent,
    GenericFormComponent,
    MenuFixedComponent,
    SearchComponent,
    PostRandomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
