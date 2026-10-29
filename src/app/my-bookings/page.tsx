import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Trash2, Eye, CheckCircle2 } from "lucide-react";

interface Booking {
  _id: string;
  userName: string;
  email: string;
  name: string;
  country: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  bookingDate: string;
}

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${user?.email}`,
    { cache: "no-store" }
  );

  const result: Booking[] = await response.json();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage and view your upcoming travel plans
        </p>
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {result?.map((booking) => (
          <div
            key={booking._id}
            className="border border-gray-200 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-6 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Left Content */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full md:w-auto">
              {/* Image */}
              <div className="relative w-full sm:w-48 h-36 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={booking.imageUrl}
                  alt={booking.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col gap-2 text-center sm:text-left w-full">
                {/* Status Badge */}
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Confirmed
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900">
                  {booking.name}
                </h2>

                {/* Meta Info */}
                <div className="space-y-1 text-sm text-gray-500">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Departure: {booking.departureDate}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>Booking ID: {booking._id}</span>
                  </div>
                </div>

                {/* Price */}
                <p className="text-2xl font-bold text-sky-500 mt-1">
                  ${booking.price}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
              <button className="flex items-center gap-1.5 px-4 py-2 border border-rose-300 text-rose-500 rounded-lg text-sm font-medium hover:bg-rose-50 transition-colors">
                <Trash2 className="w-4 h-4" />
                Cancel
              </button>
              <Link
                href={`/details/${booking._id}`}
                className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors"
              >
                <Eye className="w-4 h-4" />
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingsPage;