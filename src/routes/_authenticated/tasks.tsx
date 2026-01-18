import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { tasksQueryOptions } from "../../queryOptions/task.queryOptions";

export const Route = createFileRoute("/_authenticated/tasks")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(tasksQueryOptions());

  console.log("data:", data);

  return <div>Hello "/_authenticated/tasks"!</div>;
}
