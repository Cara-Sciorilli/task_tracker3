defmodule TaskTracker3Web.PageController do
  use TaskTracker3Web, :controller

  def index(conn, _params) do
    tasks = TaskTracker3.Tasks.list_tasks()
    |> Enum.map(&(Map.take(&1, [:name, :desc, :time, :complete, :user_id])))
    render(conn, "index.html", tasks: tasks)
  end
end
