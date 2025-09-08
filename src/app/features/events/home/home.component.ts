import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../core/services/events.service';
import { MatCardModule} from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule, MatCardModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events : any[] = [];
  filteredEvents: any[] = [];
  filterCity: string = '';
  sortBy: string = 'date';

  constructor(private eventService: EventsService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
      this.applyFilters();
      this.cdr.detectChanges();
    });
  }

  applyFilters() {
    let result = [...this.events];
    if (this.filterCity.trim()) {
      result = result.filter(e => e.city?.toLowerCase().includes(this.filterCity.trim().toLowerCase()));
    }
    if (this.sortBy === 'date') {
      result.sort((a, b) => (a.start_date || '').localeCompare(b.start_date || ''));
    } else if (this.sortBy === 'city') {
      result.sort((a, b) => (a.city || '').localeCompare(b.city || ''));
    } else if (this.sortBy === 'name') {
      result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
    this.filteredEvents = result;
  }

  resetFilters() {
    this.filterCity = '';
    this.sortBy = 'date';
    this.applyFilters();
  }

  goToCreateEvent() {
    this.router.navigate(['/app-create-event']);
  }
}
