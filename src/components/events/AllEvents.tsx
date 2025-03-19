import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import LoadingSpinner from "../LoadingSpinner";

// Define the Event type
type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  createdBy: string;
  attendees: string[];
  __v: number;
};

// Fetch event data using TanStack Query
const fetchEvents = async () => {
  const { data } = await axios.get(
    "https://hands-on-iota.vercel.app/api/v1/events"
  );
  return data;
};

const AllEvents = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const events: Event[] = data?.data || [];

  const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(
        `https://hands-on-iota.vercel.app/api/v1/events/${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });

      // Show success message after successful deletion
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The event has been deleted successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      console.error("Error deleting event:", error);
      // Show error message if deletion fails
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete the event. Try again!",
      });
    },
  });

  const handleDelete = (id: string) => {
    // Show confirmation dialog before deletion
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEventMutation.mutate(id); // Proceed with deletion if confirmed
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <p className="text-red-500 text-center">Failed to load events.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">All Events</h2>

      {/* Make table scrollable on small screens */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg text-xs md:text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr className="text-left">
              <th className="py-2 px-1 md:px-3 border border-gray-200">
                Title
              </th>
              <th className="py-2 px-1 md:px-3 border border-gray-200">Date</th>
              <th className="py-2 px-1 md:px-3 border border-gray-200">Time</th>
              <th className="py-2 px-1 md:px-3 border border-gray-200">
                Location
              </th>
              <th className="py-2 px-1 md:px-3 border border-gray-200">
                Category
              </th>
              <th className="py-2 px-1 md:px-3 border border-gray-200 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id} className="hover:bg-gray-50 text-gray-800">
                <td className="py-2 px-1 md:px-3 border border-gray-200">
                  {event.title}
                </td>
                <td className="py-2 px-1 md:px-3 border border-gray-200">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-1 md:px-3 border border-gray-200">
                  {event.time}
                </td>
                <td className="py-2 px-1 md:px-3 border border-gray-200">
                  {event.location}
                </td>
                <td className="py-2 px-1 md:px-3 border border-gray-200">
                  {event.category}
                </td>
                <td className="py-2 px-1 md:px-3 border border-gray-200 text-center">
                  <Link
                    to={`/edit-events/${event._id}`}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600 transition mx-1"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEvents;
