// src/api/bookings.ts
import http from "./http";
import type { Booking } from "../types";

// Saját foglalások lekérdezése
export async function listUserBookings(userId: number) {
  const res = await http.get<Booking[]>(`/users/${userId}/bookings`);
  return res.data;
}

// Új foglalás létrehozása
export async function createBooking(userId: number, timeslotId: number) {
  console.log("createBooking body:", { user_id: userId, timeslot_id: timeslotId });

  const res = await http.post<Booking[]>(
    "/bookings",
    {
      user_id: userId,
      timeslot_id: timeslotId,
    }
  );

  return res.data[0];
}

// Foglalás lemondása
export async function cancelBooking(bookingId: number) {
  await http.post(`/bookings/${bookingId}/cancel`);
}
