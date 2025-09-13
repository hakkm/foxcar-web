import { BookingWizard } from "@/features/bookings/wizard/booking-wizard";

export default function AddBookingPage() {
  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold">Nouvelle réservation</h1>
      <BookingWizard />
    </div>
  );
}
