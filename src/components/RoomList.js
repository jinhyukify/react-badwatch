import React from 'react';
import { Link } from 'react-router';

class RoomList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'RoomList';
    }
    render() {
        return (
        		<div className="roomList">
        			<div className="rooms">
						<Link to="/chat/bronze">
							<img src="/asset/images/room_1.png" className="roomImage"/>
							<div className="chat-name">
								심해층
							</div>
							<div className="tier-div">
								<img src="/asset/images/bronze.png"/>
							</div>
						</Link>       
					</div> 		
					<div className="rooms">	
						<Link to="/chat/silver">
							<img src="/asset/images/room_2.png" className="roomImage"/>
							<div className="chat-name">	
								해저층
							</div>	
							<div className="tier-div">
								<img src="/asset/images/silver.png"/>
							</div>						
						</Link> 
					</div> 	       		
					<div className="rooms">	
						<Link to="/chat/gold">
							<img src="/asset/images/room_3.png" className="roomImage"/>
							<div className="chat-name">
								지상계
							</div>	
							<div className="tier-div">
								<img src="/asset/images/gold.png"/>
							</div>
						</Link>  
					</div> 	      		
					<div className="rooms">	
						<Link to="/chat/platinum">
							<img src="/asset/images/room_4.png" className="roomImage"/>
							<div className="chat-name">
								성층권
							</div>	
							<div className="tier-div">
								<img src="/asset/images/platinum.png"/>
							</div>
						</Link>      
					</div> 	  			
					<div className="rooms">
						<Link to="/chat/diamond">
							<img src="/asset/images/room_5.png" className="roomImage"/>
							<div className="chat-name">
								천상계
							</div>	
							<div className="tier-div">
								<img src="/asset/images/diamond.png"/>
							</div>
						</Link>   
					</div> 

					<div className="mobile-rooms">
						<Link to="/chat/bronze">
							<div className="chat-name">
								심해층
							</div>
							<div className="tier-div">
								<img src="/asset/images/bronze.png"/>
							</div>
						</Link>       
					</div> 		
					<div className="mobile-rooms">	
						<Link to="/chat/silver">
							<div className="chat-name">	
								해저층
							</div>	
							<div className="tier-div">
								<img src="/asset/images/silver.png"/>
							</div>						
						</Link> 
					</div> 	       		
					<div className="mobile-rooms">	
						<Link to="/chat/gold">
							<div className="chat-name">
								지상계
							</div>	
							<div className="tier-div">
								<img src="/asset/images/gold.png"/>
							</div>
						</Link>  
					</div> 	      		
					<div className="mobile-rooms">	
						<Link to="/chat/platinum">
							<div className="chat-name">
								성층권
							</div>	
							<div className="tier-div">
								<img src="/asset/images/platinum.png"/>
							</div>
						</Link>      
					</div> 	  			
					<div className="mobile-rooms">
						<Link to="/chat/diamond">
							<div className="chat-name">
								천상계
							</div>	
							<div className="tier-div">
								<img src="/asset/images/diamond.png"/>
							</div>
						</Link>   
					</div> 	 	     			
        		</div>
        	);
    }
}

export default RoomList;
