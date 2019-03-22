defmodule TaskTracker3Web.TaskView do
  use TaskTracker3Web, :view
  alias TaskTracker3Web.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      name: task.name,
      desc: task.desc,
      time: task.time,
      complete: task.complete,
      user_id: task.user_id}
  end
end
