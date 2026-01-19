import { BASE_URL_API_LOCAL } from "../helpers";
import type { Task } from "../types/task.types";

export const fetchTasks = async () => {
  try {
    const response = await fetch(`${BASE_URL_API_LOCAL}/tasks`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch tasks: ${response.status} ${response.statusText}`,
      );
    }

    const data = (await response.json()) as Task[];
    return data;
  } catch (error) {
    // TODO: handle error
    console.error(error);
  }
};
