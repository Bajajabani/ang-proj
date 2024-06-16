import { Routes } from '@angular/router';
import HomeComponent from './features/home/home.component';
import ThematicComponent from './features/thematic/thematic.component';
import ContactComponent from './features/contact/contact.component';
import AboutComponent from './features/about/about.component';
import NotFoundComponent from './features/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'todos', component: ThematicComponent },
    { path: '**', component: NotFoundComponent },
];