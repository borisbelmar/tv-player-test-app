import Hls from "hls.js"

export default function getHlsPlayer (playerContainerId, src) {
  const video = document.createElement('video')
  video.classList.add('w-full', 'h-full')
  video.setAttribute('autoplay', true)
  video.setAttribute('playsinline', true)
  video.setAttribute('muted', false)

  const playerContainer = document.getElementById(playerContainerId)
  playerContainer.appendChild(video)

  const hls = new Hls()
  hls.loadSource(src)
  hls.attachMedia(video)

  return {
    play: () => video.play(),
    pause: () => video.pause(),
    getPlayerState: () => ({
      currentTime: video.currentTime,
      duration: video.duration,
      paused: video.paused,
    }),
    destroy: () => {
      hls.destroy()
      video.remove()
    }
  }
}