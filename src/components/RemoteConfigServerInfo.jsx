import clsx from "clsx"
import { useContentService } from "../context/ContentServiceContext"

export default function RemoteConfigServerInfo () {
  const { statusColor, statusText, baseURL } = useContentService()
  return (
    <section className="flex flex-col space-y-4 mb-4 justify-center">
      <h4 className="text-gray-100 text-xs">
        Remote Config Server: <span className="text-gray-400">{baseURL}</span>
      </h4>
      <div className="bg-gray-700 px-4 flex space-x-2 rounded-full items-center justify-center mb-4 py-2">
        <div className={clsx('w-2 h-2 rounded-full', statusColor)} />
        <p className="text-xs text-white">Remote Config Server Status: {statusText}</p>
      </div>
    </section>
  )
}