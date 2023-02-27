import getBareAvplay from './getBareAvPlay';
import getHlsPlayer from './getHlsPlayer';
import isTizen from './isTizen';

export default function getPlayerApi(playerContainerId, config) {
  const tizenDevice = isTizen()

  if (config.kind === 'srcOnly') {
    if (tizenDevice) {
      return getBareAvplay(playerContainerId, config.src)
    }
    return getHlsPlayer(playerContainerId, config.src)
  }
}