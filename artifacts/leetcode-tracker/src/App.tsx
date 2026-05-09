import { Switch, Route, Router as WouterRouter } from "wouter";
import RoadmapPage from "@/pages/RoadmapPage";
import MilestonePage from "@/pages/MilestonePage";
import CategoryPage from "@/pages/CategoryPage";
import QuestionDetail from "@/pages/QuestionDetail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={RoadmapPage} />
      <Route path="/milestone/:id" component={MilestonePage} />
      <Route path="/category/:id" component={CategoryPage} />
      <Route path="/question/:id" component={QuestionDetail} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
