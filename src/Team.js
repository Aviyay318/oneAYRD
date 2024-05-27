import React from "react";
import Matches from "./Matches";

function Team(props){
    return(
        <div>
            <h1>Team</h1>
         <Matches matches={props.matches} setGoals={props.setGoals}/>
            <h2>Players:</h2>
            {props.players.map((player) => {
                    return (
                        <div>{player.firstName} {player.lastName} {player.captain&&<label>Captain</label>}</div>
                    );
                })
            }
            <div>
                <h1>Stats:</h1>
                <div>first half goals  VS second half goals</div>
                <div>the earlier goal: </div>
                <div>the last goal:</div>
                <div>the cycle with most goals:</div>
                <div>the cycle with last goals:</div>
            </div>

        </div>
    )
}
export default Team;