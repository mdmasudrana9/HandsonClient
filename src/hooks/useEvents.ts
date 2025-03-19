import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
}

// Fetch events from API
const fetchEvents = async (): Promise<Event[]> => {
  const { data } = await axios.get("http://localhost:5000/api/v1/events");
  return data;
};

// Custom Hook
const useEvents = () => {
  return useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
};

export default useEvents;
