# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTracker3.Repo.insert!(%TaskTracker3.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias TaskTracker3.Repo
alias TaskTracker3.Users.User

pwhash = Argon2.hash_pwd_salt("password")

Repo.insert!(%User{email: "alice@example.com", password_hash: pwhash})
Repo.insert!(%User{email: "bob@example.com", password_hash: pwhash})

alias TaskTracker3.Tasks.Task

Repo.insert!(%Task{name: "Hi", desc: "Lalalaal", time: 15, complete: true, user_id: 1})
Repo.insert!(%Task{name: "What's up", desc: "Still singing", time: 45, complete: false, user_id: 2})
