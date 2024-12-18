import Calendar from "app/ui/calendar/calendar";
import {parseDate} from '@internationalized/date';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
        <div>
            <Calendar></Calendar>
        </div>
    </main>
  );
}