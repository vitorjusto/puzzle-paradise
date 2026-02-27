import { Link } from 'react-router-dom'
import '../../../index.css'
import './Header.css'
import Swal from 'sweetalert2'

function Header() {

	function MissionClick()
	{
		Swal.fire(
			{
				  html: `
				  <div class="MissionBase">
				  	<div>
						<h2>Missions</h2>
				  		<div class="MissionContainer">
					  		<ul class="MissionGameList">
					  			<li class="MissionGameListItem">2 Easy Picross</li>
					  			<li class="MissionGameListItem">3 Medium Picross</li>
					  			<li class="MissionGameListItem">4 Easy Sudoku</li>
					  			<li class="MissionGameListItem">4 Easy Sudoku</li>
					  			<li class="MissionGameListItem">4 Easy Sudoku</li>
					  			<li class="MissionGameListItem">4 Easy Sudoku</li>
					  			<li class="MissionGameListItem">4 Easy Sudoku</li>
					  		</ul>
					  </div>
					</div>
				  	<div>
						<h2>Daily</h2>
					  	<div class="MissionContainer">
    						<ul class="MissionGameList">
								<li class="MissionGameListItem">2 Easy Picross</li>
								<li class="MissionGameListItem">3 Medium Picross</li>
								<li class="MissionGameListItem">4 Easy Sudoku</li>
								<li class="MissionGameListItem">4 Easy Sudoku</li>
								<li class="MissionGameListItem">4 Easy Sudoku</li>
								<li class="MissionGameListItem">4 Easy Sudoku</li>
								<li class="MissionGameListItem">4 Easy Sudoku</li>
							</ul>
						</div>
						</div>
					</div>
  				`,
				color: "white",
				width: 700,
				background: "#333333",
				showCancelButton: true,
  				confirmButtonColor: "green",
  				cancelButtonColor: "green",
  				confirmButtonText: "Starts Missions",
  				cancelButtonText: "Starts Daily Missions",
			}
		);
	}
	
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
				<div className="Button" onClick={MissionClick}></div>
				<div className="Button"></div>
				<div className="Button"></div>
			</div>
		</div>
	</>
  )
}

export default Header