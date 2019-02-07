import "../styles/common.scss";
import { Logo } from "./Logo";
import * as React from "react";

export const NavBar = () => (
  <div>
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <Logo />
          </a>
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start" />

          <div className="navbar-end">
            <a className="navbar-item">🧡 Saved</a>
            <a className="navbar-item">💻 CLI</a>

            <a className="navbar-item">🤖 API</a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>

              <div className="navbar-dropdown">
                <a className="navbar-item" />
                <a className="navbar-item" />
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a>
              </div>
            </div>
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
);