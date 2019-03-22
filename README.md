# TaskTracker 3
Design Choices:
  * Two resources, User and Task.
  * User has_many Tasks
  * User cannot be made without a name
  * Task has a field that belongs_to User
  * Tasks cannot be made without a Name and Description and Time must be an invterval of 15
  * To complete tasks, click complete task button on card
  * To increase time in interval of 15 click arrows or enter multiple of 15
  * When a user is logged in, their name is at the top
  * If a user doesn't exist when trying to log in or uses the wrong password an alert comes up.
  * UI : Changed the font, Added descriptions of what the user can do at every page, Prettier colors, Tasks are cards
  
To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
