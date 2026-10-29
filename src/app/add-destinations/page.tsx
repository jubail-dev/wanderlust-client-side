import type { Metadata } from "next"

import { AddDestinationForm } from "@/components/destinations/add-destination-form"

export const metadata: Metadata = {
  title: "Add Travel Package | Wanderlust",
  description: "Create a new travel package and publish it to the catalogue.",
};

const AddDestinationsPage = () => {
    return (
        <div className="flex-1">
            <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8 md:py-14">
                <h1 className="mb-8 text-3xl font-normal tracking-tight md:mb-10 md:text-4xl">
                    Add New Travel Package
                </h1>

                <div className="mx-auto w-full max-w-3xl">
                    <AddDestinationForm />
                </div>
            </div>
        </div>
    );
};

export default AddDestinationsPage;
