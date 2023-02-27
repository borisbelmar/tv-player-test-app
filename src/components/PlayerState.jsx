import { usePlayer } from "../context/PlayerContext"

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export default function PlayerState () {
  const { state } = usePlayer()

  return state ? (
    <div className="flex flex-row justify-center space-x-2 bg-gray-700 text-white mt-4 p-2 rounded">
      <span>{formatTime(state.currentTime)}</span>
      <span>/</span>
      <span>{formatTime(state.duration)}</span>
      <span>-</span>
      <span>{!state.paused ? 'Playing' : 'Paused'}</span>
    </div>
  ) : null
}