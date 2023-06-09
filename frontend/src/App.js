import "./App.css";
import UrlShortenerInput from "./url-components/UrlShortenerInput";
import UrlList from "./url-components/UrlList";
import Background from "./animation-components/Background";

const App = () => {
  return (
    <div class="flex--column">
      <Background />
      <UrlShortenerInput />
      <UrlList />
    </div>
  );
};

export default App;
