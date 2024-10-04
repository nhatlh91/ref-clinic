import {ChangeDetectorRef, Component, signal} from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventAddArg,
  EventChangeArg,
  EventRemoveArg
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {createEventId, INITIAL_EVENTS} from "../../event-ulti";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})

export class BookingComponent {
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      // center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
    locale: 'vi', // Set the locale to Vietnamese
    buttonText: {
      today: 'Hôm nay',
      month: 'Tháng',
      week: 'Tuần',
      day: 'Ngày',
      list: 'Danh sách'
    },
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef,
              private http: HttpClient) {
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Nhập nội dung tiêu đề!');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Bạn chắc chắn xóa '${clickInfo.event.title}' ?`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }


  handleEventAdd(eventInfo: EventAddArg) {
    this.saveEventToDatabase(eventInfo.event);
  }

  handleEventChange(eventInfo: EventChangeArg) {
    this.updateEventInDatabase(eventInfo.event);
  }

  handleEventRemove(eventInfo: EventRemoveArg) {
    this.deleteEventFromDatabase(eventInfo.event);
  }

  saveEventToDatabase(event: EventApi) {
    const eventData = {
      id: event.id,
      title: event.title,
      start: event.start?.toISOString(),
      end: event.end?.toISOString(),
      allDay: event.allDay
    };

    this.http.post('/api/events', eventData).subscribe(
      (response) => {
        console.log('Event saved successfully');
      },
      (error) => {
        console.error('Error saving event:', error);
      }
    );
  }

  updateEventInDatabase(event: EventApi) {
    const eventData = {
      id: event.id,
      title: event.title,
      start: event.start?.toISOString(),
      end: event.end?.toISOString(),
      allDay: event.allDay
    };

    this.http.put(`/api/events/${event.id}`, eventData).subscribe(
      (response) => {
        console.log('Event updated successfully');
      },
      (error) => {
        console.error('Error updating event:', error);
      }
    );
  }

  deleteEventFromDatabase(event: EventApi) {
    this.http.delete(`/api/events/${event.id}`).subscribe(
      (response) => {
        console.log('Event deleted successfully');
      },
      (error) => {
        console.error('Error deleting event:', error);
      }
    );
  }
}
