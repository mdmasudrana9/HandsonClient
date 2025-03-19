import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2
import { useNavigate } from "react-router-dom";

// Define the data structure for HelpRequest
interface HelpRequestFormData {
  title: string;
  description: string;
  urgencyLevel: "low" | "medium" | "urgent";
  postedBy: string;
  organization?: string;
  volunteersNeeded: number;
  comments: string[];
}

const CreateHelpRequest = () => {
  const queryClient = useQueryClient(); // ✅ To refresh help request list after submission
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HelpRequestFormData>();

  // ✅ Define Mutation to send data to the API
  const createHelpRequestMutation = useMutation({
    mutationFn: async (newHelpRequest: HelpRequestFormData) => {
      const response = await axios.post(
        "https://hands-on-iota.vercel.app/api/v1/helpRequest/create-request",
        newHelpRequest
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["helpRequests"] }); // ✅ Refresh help request list
      // ✅ Show SweetAlert success message after help request creation
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your help request has been created!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/all-req");
    },
    onError: (error) => {
      console.error("Error creating help request:", error);
      alert("Failed to create help request. Try again!");
    },
  });

  const onSubmit = (data: HelpRequestFormData) => {
    createHelpRequestMutation.mutate(data); // ✅ Send data to API
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Create a Help Request
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          {/* Title */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm">
              Help Request Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              placeholder="Enter help request title"
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
              placeholder="Describe the help request..."
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Urgency Level */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm">Urgency Level</label>
            <select
              {...register("urgencyLevel", {
                required: "Urgency level is required",
              })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-sm bg-white"
            >
              <option value="">Select urgency level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="urgent">Urgent</option>
            </select>
            {errors.urgencyLevel && (
              <p className="text-red-500 text-xs mt-1">
                {errors.urgencyLevel.message}
              </p>
            )}
          </div>

          {/* Posted By */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm">Posted By</label>
            <input
              {...register("postedBy", { required: "Posted by is required" })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              placeholder="Enter your name"
            />
            {errors.postedBy && (
              <p className="text-red-500 text-xs mt-1">
                {errors.postedBy.message}
              </p>
            )}
          </div>

          {/* Organization (Optional) */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm">
              Organization (Optional)
            </label>
            <input
              {...register("organization")}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              placeholder="Enter your organization (optional)"
            />
          </div>

          {/* Volunteers Needed */}
          <div>
            <label className="block text-gray-700 text-sm">
              Volunteers Needed
            </label>
            <input
              type="number"
              {...register("volunteersNeeded", {
                required: "Number of volunteers needed is required",
                valueAsNumber: true,
              })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            />
            {errors.volunteersNeeded && (
              <p className="text-red-500 text-xs mt-1">
                {errors.volunteersNeeded.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-[#1E2939] text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              Create Help Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHelpRequest;
