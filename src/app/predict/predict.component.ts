import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-predict',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './predict.component.html',
  styleUrl: './predict.component.scss'
})
export class PredictComponent implements OnInit {
  // Data from JSON
  locations: any[] = [];
  governorates: string[] = [];
  delegations: any[] = [];
  localities: string[] = [];

  // Form fields
  selectedGovernorate: string = '';
  selectedDelegation: string = '';
  selectedLocality: string = '';
  surface: number = 0;
  bedrooms: number = 0;
  bathrooms: number = 0;
  floor: number = 0;
  elevator: string = 'no';
  equippedKitchen: string = 'no';
  balcony: string = 'no';
  heating: string = 'no';
  airConditioning: string = 'no';
  parking: string = 'no';
  garage: string = 'no';

  price: number = 0;

  constructor(private http: HttpClient, private apiService: ApiService) { }

  ngOnInit() {
    // Load JSON data
    this.http.get<any[]>('assets/Locations.json').subscribe((data) => {
      console.log(data);
      this.locations = data;
      this.governorates = data.map((loc) => loc.governorate);
    });
  }

  // Update delegations when governorate changes
  onGovernorateChange() {
    const selectedGov = this.locations.find((loc) => loc.governorate === this.selectedGovernorate);
    this.delegations = selectedGov ? selectedGov.delegations : [];
    this.selectedDelegation = ''; // Reset delegation
    this.selectedLocality = ''; // Reset locality
    this.localities = []; // Reset localities
  }

  // Update localities when delegation changes
  onDelegationChange() {
    const selectedDel = this.delegations.find((del) => del.delegation === this.selectedDelegation);
    this.localities = selectedDel ? selectedDel.localities : [];
    this.selectedLocality = ''; // Reset locality
  }

  // Predict function
  predict() {
    const data = {
      state: this.selectedGovernorate,
      delegation: this.selectedDelegation,
      municipality: this.selectedLocality,
      surface: this.surface,
      bedrooms: this.bedrooms,
      bathrooms: this.bathrooms,
      elevator: this.elevator,
      equipped_kitchen: this.equippedKitchen,
      balcony: this.balcony,
      heating: this.heating,
      air_conditioning: this.airConditioning,
      parking: this.parking,
      garage: this.garage,
      floor: this.floor,
    };

    console.log('Form Data:', data);
    // Call your API service here
    this.apiService.predictPrice(data).subscribe(
      (res) => {
        console.log(res);
        this.price = res.prediction;
      },
      (error) => {
        console.error("Error", error);
      }
    )
  }

  // Limit numeric input values
  validateNumber(event: any, field: 'surface' | 'bedrooms' | 'bathrooms' | 'floor', max: number) {
    const value = parseFloat(event.target.value);
    if (value > max) {
      event.target.value = max;
      this[field] = max;
    }
  }
}
