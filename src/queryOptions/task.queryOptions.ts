import { queryOptions } from "@tanstack/react-query";
import { fetchTasks } from "../services/task.service";

export const tasksQueryOptions = () =>
  queryOptions({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks(),
  });
