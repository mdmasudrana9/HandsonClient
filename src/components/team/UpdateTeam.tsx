import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

interface TeamFormData {
  name: string;
  description: string;
  category: string;
  members: string[];
}

const UpdateTeamForm = () => {
  const queryClient = useQueryClient(); // ✅ To refresh team list after submission
  const navigate = useNavigate();
  const { id: _id } = useParams(); // Use teamId from the URL parameter
  console.log(_id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Use this to populate the form with existing data
  } = useForm<TeamFormData>();

  // Fetch the existing team data when the form is loaded
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(
          `https://hands-on-iota.vercel.app/api/v1/team/${_id}`
        );
        const teamData = response.data;
        console.log(teamData?.data);
        // Set the form fields with the fetched team data
        setValue("name", teamData?.data?.name);
        setValue("description", teamData?.data?.description);
        setValue("category", teamData?.data?.category);
        setValue("members", teamData?.data?.members.join(", ")); // Assuming members is an array
      } catch (error) {
        console.error("Error fetching team data:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to load team data",
          text: "Could not retrieve team data. Please try again later.",
        });
      }
    };
    fetchTeam();
  }, [_id, setValue]);

  const updateTeamMutation = useMutation({
    mutationFn: async (updatedTeam: TeamFormData) => {
      const response = await axios.patch(
        `https://hands-on-iota.vercel.app/api/v1/team/${_id}`,
        updatedTeam
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team"] });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your team has been updated!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/all-teams");
    },
    onError: (error) => {
      console.error("Error updating team:", error);
      alert("Failed to update team. Try again!");
    },
  });

  const onSubmit = (data: TeamFormData) => {
    updateTeamMutation.mutate(data); // ✅ Send data to API
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Update a Team
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          {/* Team Name */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm">Team Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              placeholder="Enter team name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
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
              placeholder="Describe the team..."
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
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
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Members */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm">
              Members (comma separated)
            </label>
            <input
              {...register("members", {
                required: "At least one member is required",
              })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              placeholder="Enter member names"
            />
            {errors.members && (
              <p className="text-red-500 text-xs mt-1">
                {errors.members.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-[#1E2939] text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              Update Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTeamForm;
