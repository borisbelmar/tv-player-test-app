import useSpatialItem from "../hooks/useSpatialItem"

export default function PlayerButton(props) {
  const ref = useSpatialItem()

  return (
    <button
      ref={ref}
      className="bg-teal-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-orange-600"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}