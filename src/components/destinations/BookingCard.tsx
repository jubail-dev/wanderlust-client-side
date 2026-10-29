"use client";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import React, {  useState } from "react";
import { Button } from "../ui/button";
import { useSession } from "@/lib/auth-client";

type DestinationData = {
  _id: string;
  name?: string;
  country?: string;
  category?: string;
  price?: string | number;
  duration?: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
};

const BookingCard = ({
  destinationData,
}: {
  destinationData: DestinationData;
}) => {
  const {
    price,
    departureDate
   
  } = destinationData;

  const [selectedDate, setSelectedDate] = useState(
    departureDate
      ? new Date(departureDate).toISOString().split("T")[0]
      : "2026-11-15",
  );

  const {data: session} = useSession()
  const user = session?.user

  const handleBoking  = async (e : React.SubmitEvent<HTMLElement>) => {
    e.preventDefault() 
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    const departureDate = data.selectedDate

    const userData = {
        userName: user?.name,
        email: user?.email,
        ...destinationData,
        departureDate: departureDate,
        bookingDate : new Date()
    }
    console.log(userData);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })

    const bookingsRes = await response.json()
    console.log(bookingsRes);

  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6 sticky top-8">
      <div>
        <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
          Starting from
        </span>
        <div className="flex items-baseline mt-1">
          <span className="text-3xl sm:text-4xl font-extrabold text-cyan-600">
            ${price}
          </span>
          <span className="ml-2 text-sm text-gray-500">per person</span>
        </div>
      </div>

      {/* Departure Date Picker/Display */}
      <form onSubmit={handleBoking}>
      <div className="space-y-1.5">
        <label
          htmlFor="departureDate"
          className="text-xs font-semibold text-gray-600"
        >
          Departure Date
        </label>

        <div className="relative">
          <input
            name="selectedDate"
            id="departureDate"
            type="date"
            defaultValue={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm font-medium outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Book Now Button */}
      <Button type="submit" className="w-full flex items-center justify-center py-3 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl shadow-md transition-colors">
        <span>Book Now</span>
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
      {/* Perks / Features */}
      <div className="space-y-3 pt-2 border-t border-gray-100 text-xs text-gray-600">
        <div className="flex items-center">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
          <span>Free cancellation up to 7 days</span>
        </div>
        <div className="flex items-center">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
          <span>Travel insurance included</span>
        </div>
        <div className="flex items-center">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
          <span>24/7 customer support</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
