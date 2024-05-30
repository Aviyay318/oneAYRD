import React from "react";
import "./Matches.css"
function Matches(props){
    const toShowRounds=()=>{
        let result = true;
        if(props.answer==="no"){
            result = false;
        }
        return result
    }

    return(
        <div className="Matches">
            <label id={"matches-title"} style={{height:15}}>Matches</label>
            {
                toShowRounds()
                &&
                <div id={"round-container"}>
                    <label id={"choose-round-label"} style={{fontWeight: "bold", fontSize: 20, height:10}}>Choose Round:</label>
                    <br/>
                    {props.rounds}
                </div>
            }


            {
                <table id={"matches-table"} style={{textAlign: "center", width:props.tableSize}}>
                    <tr>
                        <th>Round</th>
                        <th>HomeTeam</th>
                        <th>Goals</th>
                        <th>AwayTeam</th>

                    </tr>
                    {
                        props.matches.map((match) => {
                            return (
                                <tr>
                                    <td width={200}>{match.round}</td>
                                    <td width={200}>{match.homeTeam.name}</td>
                                    <td width={200}>{props.setGoals(match.goals)}</td>
                                    <td width={200}>{match.awayTeam.name}</td>

                                </tr>
                            )
                        })
                    }
                </table>
            }
        </div>
    )
}

export default Matches;