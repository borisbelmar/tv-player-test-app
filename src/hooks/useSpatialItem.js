import { useEffect, useRef } from "react";
import { spatialNavigationManager } from "../utils";

const spatialNavigationApi = spatialNavigationManager()

export default function useSpatialItem () {
  const itemRef = useRef(null)

  useEffect(() => {
    const node = itemRef.current
    spatialNavigationApi.registerElement(node)
    return () => spatialNavigationApi.unregisterElement(node)
  }, [])

  return itemRef
}