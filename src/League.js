import Matches from "./Matches";
import matches from "./Matches";
import "./League.css"
import {formToJSON} from "axios";

function League(props){

    const getCycle=(round)=>{
        return  props.history.filter((matches)=> {return matches.round===round});

    }
    const getRounds = () => {
        const rounds = props.allCycle;

        const roundArray = Array.from({ length: rounds - 1 }, (_, i) => i + 1);

        return roundArray.map(i => (
            <Matches key={i} matches={getCycle(i)} setGoals={props.setGoals} />
        ));
    };
    return(
        <div id={"league-container"}>
            <div id={"league-history-container"}>
                <h1>League History</h1>
                <p>Choose League Cycle between 1 to {props.allCycle}:</p>
                <label>Min:</label>
                <input type={"number"} value={props.cycleMin} onChange={(event) => props.setValue("cycleMin", event)}/>
                <label>Max:</label>
                <input type={"number"} value={props.cycleMax} onChange={(event) => props.setValue("cycleMax", event)}/>
                <br/>
                <button disabled={props.cycleMin < 1||props.allCycle} onClick={() => props.filter()}>Filter
                </button>
            </div>
            <label>Rounds</label>
            {
                getRounds()
            }
            <div id={"goals-mvp-container"}>
                <h2>Goals MVP</h2>
                <table id={"goals-mvp-table"}>
                    <th>Name</th>
                    <th>Goals</th>
                    <tr>
                        <td>name1</td>
                        <td>goals1</td>
                    </tr>
                    <tr>
                        <td>name2</td>
                        <td>goals2</td>
                    </tr>
                    <tr>
                        <td>name3</td>
                        <td>goals3</td>
                    </tr>
                    {/*{*/}
                    {/*    props.soccers.map((soccer)=>{*/}
                    {/*        return(*/}
                    {/*            <tr>*/}
                    {/*                <td>{soccer.name}</td>*/}
                    {/*                <td>{soccer.goals}</td>*/}
                    {/*            </tr>*/}
                    {/*        )*/}
                    {/*    })*/}
                    {/*}*/}
                </table>
            </div>
        </div>
    )
}

export default League;