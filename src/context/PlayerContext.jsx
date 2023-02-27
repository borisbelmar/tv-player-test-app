import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { getPlayerApi } from "../utils"
import { useContentService } from "./ContentServiceContext"

const PlayerContext = createContext({
  playerInstance: null
})

export const PLAYER_CONTAINER_ID = 'player-container'

export function PlayerProvider({ children }) {
  const { content } = useContentService()
  const [playerInstance, setPlayerInstance] = useState(null)

  useEffect(() => {
    if (!content) {
      return
    }
    setPlayerInstance(prev => {
      if (prev) {
        prev.destroy()
      }
      return getPlayerApi(PLAYER_CONTAINER_ID, content)
    })
  }, [content])

  return (
    <PlayerContext.Provider value={{
      playerInstance
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  const [state, setState] = useState(null)
  const { playerInstance } = useContext(PlayerContext)

  const play = useCallback(() => {
    if (playerInstance) {
      playerInstance.play()
    }
  }, [playerInstance])

  const pause = useCallback(() => {
    if (playerInstance) {
      playerInstance.pause()
    }
  }, [playerInstance])

  useEffect(() => {
    let interval
    if (playerInstance) {
      interval = setInterval(() => {
        setState(playerInstance.getPlayerState())
      }, 200)
    }
    return () => clearInterval(interval)
  }, [playerInstance])

  return {
    play,
    pause,
    state
  }
}