import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

// Define the HelpRequest type
type HelpRequest = {
  _id: string;
  title: string;
  description: string;
  urgencyLevel: string;
  createdBy: string;
  __v: number;
};

// Fetch help request data using TanStack Query
const fetchHelpRequests = async () => {
  const { data } = await axios.get(
    "https://hands-on-iota.vercel.app/api/v1/helpRequest"
  );
  return data;
};

const AllHelpRequests = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["helpRequests"],
    queryFn: fetchHelpRequests,
  });

  const helpRequests: HelpRequest[] = data?.data || [];

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="text-red-500 text-center">Failed to load help requests.</p>
    );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        All Help Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg text-xs md:text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr className="text-left">
              <th className="py-2 px-1 md:px-3 border border-gray-200">
                Title
              </th>
              <th className="py-2 px-1 md:px-3 border border-gray-200">
                Description
              </th>
              <th className="py-2 px-1 md:px-3 border border-gray-200">
                Urgency Level
              </th>
            </tr>
          </thead>
          <tbody>
            {helpRequests.map((request) => (
              <tr key={request._id} className="hover:bg-gray-50 text-gray-800">
                <td className="py-2 px-1 md:px-3 border border-gray-200">
                  {request.title}
                </td>
                <td className="py-2 px-1 md:px-3 border border-gray-200">
                  {request.description}
                </td>
                <td className="py-2 px-1 md:px-3 border border-gray-200">
                  {request.urgencyLevel}
                </td>
                <td className="py-2 px-1 md:px-3 border border-gray-200">
                  {request.createdBy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllHelpRequests;
