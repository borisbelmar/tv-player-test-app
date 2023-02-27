import { useContentService } from "../context/ContentServiceContext"
import { PLAYER_CONTAINER_ID } from "../context/PlayerContext"
import Loading from "./Loading"

export default function PlayerSection () {
  const { content, loading } = useContentService()
  return (
    <section className="bg-gray-700 p-4 flex space-x-4 rounded">
      <div id={PLAYER_CONTAINER_ID} className="bg-gray-900 w-[720px] h-[405px] relative" />
      <div className="relative bg-gray-800 w-[360px] p-4 rounded shadow-md text-gray-100 text-sm flex items-center">
        {loading && (
          <Loading/>
        )}
        {content && (
          <p>
            {JSON.stringify(content, null, 2)}
          </p>
        )}
      </div>
    </section>
  )
}