"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

const DeleteDestinationDialog = ({id}: {id: string}) => {

    const handleDeteteDestination = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();

       redirect("/destinations")
    }

    
  return (
    <AlertDialog>
  <AlertDialogTrigger render={<Button className="flex items-center px-4 py-2 border border-red-200 rounded-lg text-red-600 bg-white hover:bg-red-50 font-medium shadow-sm transition-colors">
          <Trash2 className="w-4 h-4 mr-2" />
          Cancel
        </Button>}>
    Show Dialog
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the destination.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDeteteDestination}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  );
};

export default DeleteDestinationDialog;
