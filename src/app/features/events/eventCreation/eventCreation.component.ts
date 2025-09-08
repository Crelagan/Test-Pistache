import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../../core/services/events.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-create-event',
  templateUrl: './eventCreation.component.html',
  styleUrls: ['./eventCreation.component.scss'],
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, MatButtonModule, MatCardModule]
})
export class CreateEventComponent {
  event = {
    name: '',
    city: '',
    start_date: '',
    description: ''
  };

  constructor(private eventsService: EventsService, private router: Router) {}

  onSubmit() {
    this.eventsService.createEvent(this.event).subscribe(() => {
      this.router.navigate(['/events']);
    });
  }
}
