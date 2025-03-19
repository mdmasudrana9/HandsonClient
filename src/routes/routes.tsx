import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import AllEvents from "../components/events/AllEvents";
import EventForm from "../components/events/CreateEvents";
import UpdateEventForm from "../components/events/UpdateEvent";
import AllTeams from "../components/team/AllTeam";
import CreateTeam from "../components/team/CreateTeam";
import UpdateTeamForm from "../components/team/UpdateTeam";
import CreateHelpRequest from "../components/helpReq/CreateReq";
import AllHelpRequests from "../components/helpReq/AllReq";
import Dashboard from "../components/DashBoardHome";
// import Login from "../pages/Login";
// import Registration from "../pages/Registration";
// import { routerGenerator } from "../utils/routesGenerator";
// import { adminPaths } from "./admin.routes";
// import { facultyPaths } from "./faculty.routes";
// import { studentPaths } from "./student.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/create-events",
        element: <EventForm />,
      },

      {
        path: "/all-events",
        element: <AllEvents />,
      },
      {
        path: "/create-team",
        element: <CreateTeam />,
      },
      {
        path: "/all-teams",
        element: <AllTeams />,
      },
      {
        path: "/edit-events/:id",
        element: <UpdateEventForm />,
      },
      {
        path: "/edit-team/:id",
        element: <UpdateTeamForm />,
      },
      {
        path: "/create-req",
        element: <CreateHelpRequest />,
      },
      {
        path: "/all-req",
        element: <AllHelpRequests />,
      },
    ],
  },
]);

export default router;
