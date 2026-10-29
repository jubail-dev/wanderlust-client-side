import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  MapPin, 
  Star, 
  Calendar, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EditDestinationsDialog from "@/components/destinations/EditDestinationsDialog";
import DeleteDestinationDialog from "@/components/destinations/DeleteDestinationDialog";
import BookingCard from "@/components/destinations/BookingCard";

const DestinationsDetailsPage = async ({ params }: { params: Promise<{ destinationsId: string }> }) => {
    const { destinationsId } = await params;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${destinationsId}`);
    const destinationData = await response.json();

    const { _id, name, country, price, duration, description, departureDate, imageUrl } = destinationData;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Top Navigation & Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Link 
                        href="/destinations" 
                        className="flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Destinations
                    </Link>

                    <div className="flex items-center gap-3">

                        <EditDestinationsDialog destinationData={destinationData}></EditDestinationsDialog>


                        <DeleteDestinationDialog id ={_id}></DeleteDestinationDialog>
                    </div>
                </div>

                {/* Banner Image */}
                <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden shadow-md">
                    <Image 
                        src={imageUrl || "https://images.unsplash.com/photo-1537996194471-e657df975ab4"} 
                        alt={name || "Destination Image"} 
                        fill 
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Left & Middle Columns: Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Location */}
                        <div className="flex items-center text-gray-500 font-medium">
                            <MapPin className="w-4 h-4 mr-1 text-cyan-600" />
                            <span>{country}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{name}</h1>

                        {/* Ratings & Duration Info Badges */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                            <div className="flex items-center bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1.5" />
                                <span className="font-semibold mr-1">4.9</span>
                                <span className="text-gray-400">(234 reviews)</span>
                            </div>
                            <div className="flex items-center bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                                <Calendar className="w-4 h-4 text-cyan-600 mr-1.5" />
                                <span>{duration}</span>
                            </div>
                        </div>

                        {/* Overview Section */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                            <h2 className="text-xl font-bold text-gray-900">Overview</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {description}
                            </p>
                        </div>

                        {/* Highlights Section */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                            <h2 className="text-xl font-bold text-gray-900">Highlights</h2>
                            <p className="text-gray-600">
                                Discover the magic of this destination with pristine landscapes, rich culture, and unforgettable experiences.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <div className="flex items-center text-gray-700 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
                                    <span>Luxury beachfront accommodation</span>
                                </div>
                                <div className="flex items-center text-gray-700 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
                                    <span>Traditional Balinese spa treatment</span>
                                </div>
                                <div className="flex items-center text-gray-700 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
                                    <span>Sunrise trek to Mount Batur</span>
                                </div>
                                <div className="flex items-center text-gray-700 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
                                    <span>Private beach dinner experience</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Card */}

                        <BookingCard destinationData={destinationData}></BookingCard>

                </div>

            </div>
        </div>
    );
};

export default DestinationsDetailsPage;