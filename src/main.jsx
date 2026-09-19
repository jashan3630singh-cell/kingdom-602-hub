import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const ADMIN_USERNAME = "K602_Command";
const ADMIN_PASSWORD = "V7!qR9#Lm2@X8pK4";

const initialEvents = [
  ["Flame Dragon", "Coming Soon", "⚔️"],
  ["Tyrant", "Coming Soon", "👑"],
  ["Swordland", "20 Sep 2026", "🗡️"],
  ["Alliance Brawl", "Coming Soon", "🏆"]
];

const alliances = ["LFA", "HiddenLeaf", "One Piece"];

function App() {
  const [page, setPage] = useState("Home");
  const [admin, setAdmin] = useState(false);
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const [notice, setNotice] = useState(
    "Welcome to Kingdom 602 — United We Stand."
  );

  const [players, setPlayers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    alliance: "",
    power: ""
  });

  const [events, setEvents] = useState(initialEvents);

  const nav = [
    "Home",
    "Transfer",
    "KVK",
    "Events",
    "Alliances",
    "Players",
    "Guides",
    "Gallery",
    "Announcements"
  ];

  function handleLogin(e) {
    e.preventDefault();

    if (
      login.username === ADMIN_USERNAME &&
      login.password === ADMIN_PASSWORD
    ) {
      setAdmin(true);
      setPage("Admin");
      setLogin({
        username: "",
        password: ""
      });
    } else {
      alert("Incorrect admin username or password.");
    }
  }

  function logout() {
    setAdmin(false);
    setPage("Home");
  }

  function addPlayer(e) {
    e.preventDefault();

    if (!form.name) return;

    setPlayers([
      ...players,
      {
        id: Date.now(),
        ...form
      }
    ]);

    setForm({
      name: "",
      alliance: "",
      power: ""
    });
  }

  function deletePlayer(id) {
    setPlayers(players.filter((p) => p.id !== id));
  }

  function addEvent() {
    const name = prompt("Event name:");

    if (!name) return;

    const date = prompt("Event date/time:");

    setEvents([
      ...events,
      [name, date || "Coming Soon", "📅"]
    ]);
  }

  return (
    <div className="app">

      {/* HEADER */}

      <header>
        <div className="brand">
          <div className="crest">602</div>

          <div>
            <h1>KINGDOM 602</h1>
            <p>United We Stand</p>
          </div>
        </div>

        <button
          className="menu"
          onClick={() =>
            setPage(page === "Home" ? "Events" : "Home")
          }
        >
          ☰
        </button>
      </header>

      {/* NAVIGATION */}

      <nav>
        {nav.map((n) => (
          <button
            className={page === n ? "active" : ""}
            onClick={() => setPage(n)}
            key={n}
          >
            {n}
          </button>
        ))}

        <button
          className={page === "Admin" ? "active" : ""}
          onClick={() => setPage("Admin Login")}
        >
          🔐 Admin
        </button>
      </nav>

      <main>

        {/* HOME */}

        {page === "Home" && (
          <>
            <section className="hero">
              <span>WELCOME TO</span>

              <h2>KINGDOM 602</h2>

              <p>United We Stand</p>

              <button
                onClick={() => setPage("Transfer")}
              >
                ENTER TRANSFER CENTER →
              </button>
            </section>

            <section className="grid">

              {[
                ["⚔️", "KVK", "Prepare. Fight. Unite.", "KVK"],
                ["🔄", "TRANSFER", "Join Kingdom 602", "Transfer"],
                ["📅", "EVENTS", "Kingdom event schedule", "Events"],
                ["👥", "ALLIANCES", "Our kingdom alliances", "Alliances"]
              ].map((x) => (
                <article
                  onClick={() => setPage(x[3])}
                  className="card"
                  key={x[1]}
                >
                  <b>{x[0]}</b>
                  <h3>{x[1]}</h3>
                  <p>{x[2]}</p>
                </article>
              ))}

            </section>

            <section className="notice">
              <b>📢 Kingdom Announcement</b>
              <p>{notice}</p>
            </section>
          </>
        )}

        {/* TRANSFER */}

        {page === "Transfer" && (
          <section className="panel">

            <h2>🔄 Transfer Center</h2>

            <p>
              Apply to join Kingdom 602.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                alert(
                  "Application submitted! Admin review is required."
                );
              }}
            >

              <input
                placeholder="Player name"
                required
              />

              <input
                placeholder="Current kingdom"
                required
              />

              <input
                placeholder="Power / TG level"
                required
              />

              <textarea
                placeholder="Tell us about yourself"
              />

              <button>
                Submit Transfer Application
              </button>

            </form>

          </section>
        )}

        {/* KVK */}

        {page === "KVK" && (
          <section className="panel">

            <h2>⚔️ KVK Center</h2>

            <div className="kvk">

              <h3>
                Kingdom 602 KVK Command Center
              </h3>

              <p>
                Save speedups, prepare troops,
                coordinate rallies and follow
                kingdom leadership announcements.
              </p>

              <div className="grid">

                <div className="mini">
                  Preparation
                  <br />
                  <strong>Coming Soon</strong>
                </div>

                <div className="mini">
                  Battle Phase
                  <br />
                  <strong>Coming Soon</strong>
                </div>

                <div className="mini">
                  Strategy
                  <br />
                  <strong>Team Coordination</strong>
                </div>

              </div>

            </div>

          </section>
        )}

        {/* EVENTS */}

        {page === "Events" && (
          <section className="panel">

            <h2>📅 Kingdom Events</h2>

            <div className="events">

              {events.map((event, i) => (

                <div className="event" key={i}>

                  <span>{event[2]}</span>

                  <div>
                    <h3>{event[0]}</h3>
                    <p>{event[1]}</p>
                  </div>

                </div>

              ))}

            </div>

          </section>
        )}

        {/* ALLIANCES */}

        {page === "Alliances" && (
          <section className="panel">

            <h2>👥 Alliances</h2>

            <div className="grid">

              {alliances.map((a) => (

                <div className="mini" key={a}>

                  <h3>{a}</h3>

                  <p>
                    Alliance profile and
                    recruitment information.
                  </p>

                </div>

              ))}

            </div>

          </section>
        )}

        {/* PLAYERS */}

        {page === "Players" && (
          <section className="panel">

            <h2>🧑 Player Directory</h2>

            <form onSubmit={addPlayer}>

              <input
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value
                  })
                }
                placeholder="Player name"
                required
              />

              <input
                value={form.alliance}
                onChange={(e) =>
                  setForm({
                    ...form,
                    alliance: e.target.value
                  })
                }
                placeholder="Alliance"
              />

              <input
                value={form.power}
                onChange={(e) =>
                  setForm({
                    ...form,
                    power: e.target.value
                  })
                }
                placeholder="Power"
              />

              <button>
                Add Player
              </button>

            </form>

            <div className="players">

              {players.length === 0 && (
                <p>No players added yet.</p>
              )}

              {players.map((p) => (

                <div className="player" key={p.id}>

                  <div>
                    <b>{p.name}</b>

                    <span>
                      {p.alliance || "No alliance"} •{" "}
                      {p.power || "Power not listed"}
                    </span>
                  </div>

                  <button
                    onClick={() => deletePlayer(p.id)}
                  >
                    Delete
                  </button>

                </div>

              ))}

            </div>

          </section>
        )}

        {/* GUIDES */}

        {page === "Guides" && (
          <section className="panel">

            <h2>📖 Guides</h2>

            <div className="grid">

              {[
                "KVK Preparation",
                "Flame Dragon",
                "Tyrant",
                "Viking",
                "Swordland",
                "Alliance Strategy"
              ].map((x) => (

                <div className="mini" key={x}>

                  <h3>{x}</h3>

                  <p>
                    Guide content can be added
                    from the admin system.
                  </p>

                </div>

              ))}

            </div>

          </section>
        )}

        {/* GALLERY */}

        {page === "Gallery" && (
          <section className="panel">

            <h2>🖼️ Gallery</h2>

            <div className="gallery">

              <div>602</div>
              <div>⚔️</div>
              <div>🏰</div>
              <div>👑</div>

            </div>

            <p>
              Kingdom 602 memories and event
              screenshots.
            </p>

          </section>
        )}

        {/* ANNOUNCEMENTS */}

        {page === "Announcements" && (
          <section className="panel">

            <h2>📢 Announcements</h2>

            <div className="notice">
              <p>{notice}</p>
            </div>

          </section>
        )}

        {/* ADMIN LOGIN */}

        {page === "Admin Login" && !admin && (
          <section className="panel">

            <h2>🔐 Kingdom 602 Admin</h2>

            <p>
              Authorized administrators only.
            </p>

            <form onSubmit={handleLogin}>

              <input
                type="text"
                value={login.username}
                onChange={(e) =>
                  setLogin({
                    ...login,
                    username: e.target.value
                  })
                }
                placeholder="Admin username"
                required
              />

              <input
                type="password"
                value={login.password}
                onChange={(e) =>
                  setLogin({
                    ...login,
                    password: e.target.value
                  })
                }
                placeholder="Admin password"
                required
              />

              <button>
                Login to Admin Panel
              </button>

            </form>

          </section>
        )}

        {/* ADMIN DASHBOARD */}

        {page === "Admin" && admin && (
          <section className="panel">

            <h2>👑 Kingdom 602 Admin Dashboard</h2>

            <p>
              Welcome, Commander. Manage the
              Kingdom 602 website from here.
            </p>

            <div className="grid">

              <div className="mini">
                <h3>👥 Players</h3>
                <p>
                  {players.length} players
                </p>

                <button
                  onClick={() => setPage("Players")}
                >
                  Manage Players
                </button>
              </div>

              <div className="mini">
                <h3>📅 Events</h3>
                <p>
                  {events.length} events
                </p>

                <button onClick={addEvent}>
                  Add Event
                </button>
              </div>

              <div className="mini">
                <h3>📢 Announcement</h3>
                <p>
                  Update kingdom announcement.
                </p>

                <button
                  onClick={() => {
                    const newNotice =
                      prompt(
                        "New kingdom announcement:",
                        notice
                      );

                    if (newNotice) {
                      setNotice(newNotice);
                    }
                  }}
                >
                  Change Announcement
                </button>
              </div>

              <div className="mini">
                <h3>⚔️ KVK</h3>
                <p>
                  Manage KVK information.
                </p>

                <button
                  onClick={() => setPage("KVK")}
                >
                  Open KVK
                </button>
              </div>

            </div>

            <button
              style={{
                marginTop: "25px"
              }}
              onClick={logout}
            >
              Logout
            </button>

          </section>
        )}

      </main>

      <footer>
        © 2026 Kingdom 602 • United We Stand
      </footer>

    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);
