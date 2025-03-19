import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
}

const UpdateEventForm = () => {
  const queryClient = useQueryClient(); // ✅ To refresh event list after submission
  const navigate = useNavigate();
  const { id: _id } = useParams(); // Use eventId from the URL parameter
  console.log(_id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Use this to populate the form with existing data
  } = useForm<EventFormData>();

  // Fetch the existing event data when the form is loaded
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://hands-on-iota.vercel.app/api/v1/events/${_id}`
        );
        const eventData = response.data;
        console.log(eventData?.data?.date);
        // Set the form fields with the fetched event data
        setValue("title", eventData?.data?.title);
        setValue("description", eventData?.data?.description);
        setValue("date", eventData?.data?.date);
        setValue("time", eventData?.data?.time);
        setValue("location", eventData?.data?.location);
        setValue("category", eventData?.data?.category);
      } catch (error) {
        console.error("Error fetching event data:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to load event data",
          text: "Could not retrieve event data. Please try again later.",
        });
      }
    };
    fetchEvent();
  }, [_id, setValue]);

  const updateEventMutation = useMutation({
    mutationFn: async (updatedEvent: EventFormData) => {
      const response = await axios.patch(
        `https://hands-on-iota.vercel.app/api/v1/events/${_id}`,
        updatedEvent
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your event has been updated!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/all-events");
    },
    onError: (error) => {
      console.error("Error updating event:", error);
      alert("Failed to update event. Try again!");
    },
  });

  const onSubmit = (data: EventFormData) => {
    updateEventMutation.mutate(data); // ✅ Send data to API
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Update an Event
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          {/* Title */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm">Event Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              placeholder="Enter event title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-sm h-20 resize-none"
              placeholder="Describe the event..."
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 text-sm">Date</label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Time */}
          <div>
            <label className="block text-gray-700 text-sm">Time</label>
            <input
              type="time"
              {...register("time", { required: "Time is required" })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            />
            {errors.time && (
              <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm">Location</label>
            <input
              {...register("location", { required: "Location is required" })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              placeholder="Enter location"
            />
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-sm bg-white"
            >
              <option value="">Select a category</option>
              <option value="Environmental">Environmental</option>
              <option value="Social">Social</option>
              <option value="Educational">Educational</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-[#1E2939] text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEventForm;
