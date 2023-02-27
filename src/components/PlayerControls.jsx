import { useContentService } from "../context/ContentServiceContext";
import { usePlayer } from "../context/PlayerContext";
import PlayerButton from "./PlayerButton";

export default function PlayerControls() {
  const { getRemoteContent, loading } = useContentService()
  const { play, pause } = usePlayer()

  return (
    <div className="flex flex-row justify-center space-x-4 bg-gray-700 mt-4 p-2 rounded">
      <PlayerButton onClick={play}>
        Play
      </PlayerButton>
      <PlayerButton onClick={pause}>
        Pause
      </PlayerButton>
      <PlayerButton onClick={getRemoteContent} disabled={loading}>
        Load Content
      </PlayerButton>
    </div>
  )
}