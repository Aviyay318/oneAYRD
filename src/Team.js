import React from "react";
import Matches from "./Matches";
import "./Team.css"
function Team(props){
    return(
        <div className={"Team"}>

            <label className={"Title"}>Team Data: add team name here</label>
            <div id={"team-upper-content-container"}>
                <div className={"Glass"} id={"team-players-container"}>
                    <h2>Players:</h2>
                    {props.players.map((player) => {
                        return (
                            <div>
                                {player.firstName}
                                {player.lastName}
                                {player.captain && <label>Captain</label>}
                            </div>
                        );
                    })
                    }
                </div>
                <div className={"Glass"} id={"team-stats-container"}>
                    <h3>Stats:</h3>
                    <div>first half goals VS second half goals</div>
                    <div>the earlier goal:</div>
                    <div>the last goal:</div>
                    <div>the cycle with most goals:</div>
                    <div>the cycle with last goals:</div>
                </div>
            </div>
            <div id={"team-lower-content-container"}>
                <div className={"Glass"} id={"team-matches-container"}>
                    <Matches matches={props.matches} setGoals={props.setGoals} answer={"no"} tableSize={800}/>
                </div>


            </div>


        </div>
    )
}

export default Team;