<script>
  import { onDestroy, onMount } from "svelte";
  import { Router, navigate } from "svelte-routing";
  import { auth$ as auth, logout } from "@example/auth";

  const ROUTES = {
    LOGIN: "/login",
    HOME: "/home",
  };

  let sub;
  onMount(() => {
    sub = auth.subscribe(({ sessionToken }) => {
      const needsLogin = !sessionToken;
      if (needsLogin) navigate(ROUTES.LOGIN);
      else if (!needsLogin && window.location.pathname === ROUTES.LOGIN) {
        navigate(ROUTES.HOME);
      }
    });
  });

  onDestroy(() => {
    sub.unsubscribe();
  });
</script>

{#if $auth.sessionToken}
  <header class="header">
    <nav>
      <Router>
        <span>Welcome, <strong>User</strong>!</span>
        <button class="action" type="button" on:click|once={logout}>Logout</button
        >
      </Router>
    </nav>
  </header>
{:else}
  <span class="not-logged-in"><strong>Tip:</strong> You are not logged in.</span>
{/if}

<style>
  .header {
    border-bottom: 1px solid #222;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 2rem 4rem;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    place-content: space-between;
  }
  nav {
    color: #f8f8f8;
    font: inherit;
    font-size: 1.6rem;
    display: flex;
    gap: 2rem;
    align-items: center;
    width: 100%;
    place-content: space-between;
  }

  nav span strong {
    position: relative;
    z-index: 1;
    font-weight: 700;
    color: #fff;
  }
  nav span strong::before {
    content: "";
    height: 5px;
    width: 98%;
    left: 4px;
    bottom: 1px;
    z-index: -1;
    background: #ff3454;
    position: absolute;

  }

  nav .action {
    background: none;
    border: 2px solid currentColor;
    border-radius: 4px;
    color: #404cfa;
    font-size: 1.2rem;
    line-height: 1.5;
    font-weight: 700;
    padding: .8rem 2rem;
    height: 4.2rem;
    text-decoration: none;
    transition: all .2s ease-in-out;
    font: inherit;
    letter-spacing: inherit;
    font-weight: 600;
    text-transform: uppercase;
  }

  nav .action:hover,
  nav .action:focus {
    background-color: #404cfa;
    border-color: #404cfa;
    color: #fff;
    outline: 0;
  }

  .not-logged-in {
    padding: 4vmin 4rem;
    display: inline-block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    border-radius: 4px;
    text-align: center;
    color: #fff;
    opacity: .1;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    transition: opacity 150ms linear;
    cursor: help;
  }
  .not-logged-in:hover {
    opacity: 1;
  }

  @media screen and (max-width: 768px) {
    .not-logged-in {
      padding-left: 2rem;
      padding-right: 2rem;
      letter-spacing: 0.1em;
      font-weight: 600;
    }
    .action {
      transform: scale(.75);
      transform-origin: right center;
    }
  }
  
</style>
