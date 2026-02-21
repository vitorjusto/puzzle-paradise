import { Link } from "react-router-dom"

export default function NotFoundPage() {

  return (
    <>
		<p>This page dosent exist</p>
		<Link to="/">
			<button>Go back home</button>
		</Link>
    </>
  )
}