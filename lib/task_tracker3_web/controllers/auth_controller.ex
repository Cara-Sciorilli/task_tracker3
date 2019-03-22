defmodule TaskTracker3Web.AuthController do
  use TaskTracker3Web, :controller

  alias TaskTracker3.Users
  alias TaskTracker3.Users.User

  action_fallback TaskTracker3Web.FallbackController

  def authenticate(conn, %{"email" => email, "password" => password}) do
    with {:ok, %User{} = user} <- Users.authenticate_user(email, password) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(TaskTracker3Web.Endpoint, "user_id", user.id),
          user_id: user.email,
        }
      }

      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(resp))
    end
  end
end
