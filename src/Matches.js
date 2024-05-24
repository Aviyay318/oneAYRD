import React from "react";

function Matches(props){
    return(
        <div>
            <h2>Matches</h2>
            {
                <table>
                    <tr>
                        <th>Round</th>
                        <th>HomeTeam</th>
                        <th>Goals</th>
                        <th>AwayTeam</th>

                    </tr>
                    {
                        props.matches.map((match)=>{
                            return(
                                <tr>
                                    <td>{match.round}</td>
                                    <td>{match.homeTeam.name}</td>
                                    <td>{props.setGoals(match.goals)}</td>
                                    <td>{match.awayTeam.name}</td>

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