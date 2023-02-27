export default function getBareAvplay (playerContainerId, src) {
  const object = document.createElement('object')
  object.setAttribute('type', 'application/avplayer')

  const playerContainer = document.getElementById(playerContainerId)
  playerContainer.appendChild(object)

  window.webapis.avplay.open(src)
  window.webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_LETTER_BOX')
  window.webapis.avplay.setDisplayRect(0, 0, 720, 405)
  window.webapis.avplay.prepare()
  
  return {
    play: () => window.webapis.avplay.play(),
    pause: () => window.webapis.avplay.pause(),
    getPlayerState: () => ({
      currentTime: window.webapis.avplay.getCurrentTime(),
      duration: window.webapis.avplay.getDuration(),
      paused: window.webapis.avplay.getState() === 'PAUSED',
    }),
    destroy: () => {
      window.webapis.avplay.stop()
      window.webapis.avplay.close()
      object.remove()
    }
  }
}