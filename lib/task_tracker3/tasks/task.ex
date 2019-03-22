defmodule TaskTracker3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :complete, :boolean, default: false
    field :desc, :string
    field :name, :string
    field :time, :decimal
    belongs_to :user, TaskTracker3.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :desc, :time, :complete, :user_id])
    |> validate_required([:name, :desc, :time, :complete, :user_id])
  end
end
