import PlayerControls from "./components/PlayerControls";
import PlayerSection from "./components/PlayerSection";
import PlayerState from "./components/PlayerState";
import RemoteConfigServerInfo from "./components/RemoteConfigServerInfo";
import { ContentServiceProvider } from "./context/ContentServiceContext";
import { PlayerProvider } from "./context/PlayerContext";

function App() {
  return (
    <ContentServiceProvider>
      <PlayerProvider>
        <main className="bg-gray-800 h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl text-center text-gray-100 font-bold mb-2">
            TV Player Demo
          </h1>
          <RemoteConfigServerInfo />
          <PlayerSection />
          <PlayerState />
          <PlayerControls />
        </main>
      </PlayerProvider>
    </ContentServiceProvider>
  );
}

export default App;
