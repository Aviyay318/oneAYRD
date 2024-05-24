import React from "react";
import Matches from "./Matches";

function Team(props){
    return(
        <div>
         <Matches matches={props.matches} setGoals={props.setGoals}/>
            <h2>Players:</h2>
            {props.players.map((player) => {
                    return (
                        <div>{player.firstName} {player.lastName} {player.captain&&<label>Captain</label>}</div>
                    );
                })
            }
        </div>
    )
}
export default Team;