import { Routes } from '@angular/router';
import { PredictComponent } from './predict/predict.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: PredictComponent
  }
];
