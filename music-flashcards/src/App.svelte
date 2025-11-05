<script>
  import { Router, Route, Link } from "svelte-routing";
  import FlashcardPage from "./lib/FlashcardPage.svelte";
  import Settings from "./lib/Settings.svelte";

  export let url = "";
</script>

<Router {url}>
  <nav>
    <Link to="/">Flashcards</Link>
    <Link to="settings">Settings</Link>
  </nav>

  <div>
    <Route path="/" component={FlashcardPage} />
    <Route path="settings" component={Settings} />
  </div>
</Router>
