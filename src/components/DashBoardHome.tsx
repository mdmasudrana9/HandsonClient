import { useState } from "react";
import {
  CalendarIcon,
  UsersIcon,
  HeartIcon,
  TrophyIcon,
  ClockIcon,
} from "lucide-react";

const Dashboard = () => {
  const [upcomingEvents] = useState([
    {
      id: 1,
      title: "Beach Cleanup",
      date: "2025-03-25",
      location: "Sunset Beach",
      category: "Environmental",
    },
    {
      id: 2,
      title: "Food Bank Volunteers",
      date: "2025-03-28",
      location: "Community Center",
      category: "Social Services",
    },
    {
      id: 3,
      title: "Senior Home Visit",
      date: "2025-04-02",
      location: "Sunny Meadows Care Home",
      category: "Healthcare",
    },
  ]);

  const [helpRequests] = useState([
    {
      id: 1,
      title: "Tutors Needed for After-School Program",
      urgency: "medium",
      postedBy: "Education First",
    },
    {
      id: 2,
      title: "Winter Clothes Distribution",
      urgency: "urgent",
      postedBy: "Homeless Outreach",
    },
  ]);

  const userStats = {
    hoursLogged: 24,
    eventsAttended: 5,
    impactPoints: 120,
    position: 42,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Welcome Card */}
      <div className="container  px-8 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-800">
            Welcome to HandsOn!
          </h2>
          <p className="mt-3 text-gray-600 text-sm">
            HandsOn is a community-driven social volunteering platform
            connecting you with meaningful social impact opportunities. Discover
            events, respond to community help requests, form teams, and track
            your impact—all in one place. Think of us as a "GitHub for social
            work"—where people contribute their time instead of code, building
            real-world impact together.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center text-xs">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Find Events
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center text-xs">
              <HeartIcon className="w-4 h-4 mr-2" />
              Help Requests
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center text-xs">
              <UsersIcon className="w-4 h-4 mr-2" />
              Join Teams
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="container px-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Your Impact */}
          <div className="bg-white rounded-lg shadow-md p-6 text-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <TrophyIcon className="w-5 h-5 mr-2 text-yellow-500" />
              Your Impact
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Hours Volunteered</span>
                <span className="font-semibold">{userStats.hoursLogged}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Events Attended</span>
                <span className="font-semibold">
                  {userStats.eventsAttended}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Impact Points</span>
                <span className="font-semibold">{userStats.impactPoints}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Leaderboard Position</span>
                <span className="font-semibold">#{userStats.position}</span>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-xs">
              View Full Impact Report
            </button>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-md p-6 text-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
              Upcoming Events
            </h3>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border-b pb-3">
                  <h4 className="font-medium text-blue-700">{event.title}</h4>
                  <div className="text-xs text-gray-500 mt-1 flex items-center">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    {event.date}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {event.location}
                  </div>
                  <div className="mt-2">
                    <span className="text-xxs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {event.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-xs">
              View All Events
            </button>
          </div>

          {/* Help Requests */}
          <div className="bg-white rounded-lg shadow-md p-6 text-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <HeartIcon className="w-5 h-5 mr-2 text-red-500" />
              Help Requests
            </h3>
            <div className="space-y-4">
              {helpRequests.map((request) => (
                <div key={request.id} className="border-b pb-3">
                  <h4 className="font-medium text-blue-700">{request.title}</h4>
                  <div className="text-xs text-gray-500 mt-1">
                    Posted by: {request.postedBy}
                  </div>
                  <div className="mt-2">
                    <span
                      className={`text-xxs px-2 py-1 rounded-full ${
                        request.urgency === "urgent"
                          ? "bg-red-100 text-red-800"
                          : request.urgency === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {request.urgency.charAt(0).toUpperCase() +
                        request.urgency.slice(1)}{" "}
                      Priority
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-xs">
              View All Requests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
