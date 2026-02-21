import { Link } from 'react-router-dom'
import '../../../index.css'
import './Header.css'


function Header() {

  return (
	<>
		<div className="Header">
			<div className="HeaderContainerLeft">
				<Link to="/">
					<div className="Button"></div>
				</Link>
				<div className="Button"></div>
				<div className="CurrencyBase">
					<div className="Currency">
						<p>00</p>
					</div>
					<div className="Currency">
						<p>00</p>
					</div>
				</div>

			</div>
			<div className="HeaderContainerRight">
				<div className="Button"></div>
				<div className="Button"></div>
				<div className="Button"></div>
			</div>
		</div>
	</>
  )
}

export default Header