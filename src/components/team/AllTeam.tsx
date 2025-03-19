import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../LoadingSpinner";

type Team = {
  _id: string;
  name: string;
  description: string;
  createdBy: string;
  membershipType: "public" | "private";
  members: string[];
  events: string[];
  achievements: string[];
  leaderboardPosition: number;
  __v: number;
};

const fetchTeams = async () => {
  const { data } = await axios.get(
    "https://hands-on-iota.vercel.app/api/v1/team"
  );
  return data;
};

const AllTeams = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["teams"],
    queryFn: fetchTeams,
  });

  const teams: Team[] = data?.data || [];

  const deleteTeamMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`https://hands-on-iota.vercel.app/api/v1/team/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The team has been deleted.",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      console.error("Error deleting team:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete the team. Try again!",
      });
    },
  });

  const handleDelete = (id: string) => {
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
        deleteTeamMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Failed to load teams.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">All Teams</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-3 border border-gray-200">Name</th>
              <th className="py-2 px-3 border border-gray-200">Description</th>
              <th className="py-2 px-3 border border-gray-200">Members</th>
              <th className="py-2 px-3 border border-gray-200">Achievements</th>
              <th className="py-2 px-3 border border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id} className="hover:bg-gray-50 text-gray-800">
                <td className="py-2 px-3 border border-gray-200">
                  {team.name}
                </td>
                <td className="py-2 px-3 border border-gray-200">
                  {team.description}
                </td>
                <td className="py-2 px-3 border border-gray-200">
                  {team.members?.join(", ") || "No members"}
                </td>
                <td className="py-2 px-3 border border-gray-200">
                  {team.achievements?.join(", ") || "No achievements"}
                </td>
                <td className="py-2 px-3 border border-gray-200">
                  <Link
                    to={`/edit-team/${team._id}`}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600 transition mx-1"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(team._id)}
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

export default AllTeams;
