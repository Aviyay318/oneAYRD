import Matches from "./Matches";
import matches from "./Matches";

function League(props){

    const getCycle=(round)=>{
        return  props.history.filter((matches)=> {return matches.round===round});

    }
    return(
        <div id={"league-container"}>
            <h1>League History</h1>
            <div>
                <p>Choose League Cycle Between 1 and 15:</p>
                <label>Min:</label>
                <input type={"number"} value={props.cycleMin} onChange={(event)=>props.setValue("cycleMin",event)}/>
                <label>Max:</label>
                <input type={"number"} value={props.cycleMax} onChange={(event)=>props.setValue("cycleMax",event)}/>
                <br/>
                <button disabled={props.cycleMin<1||props.cycleMax>15} onClick={()=>props.filter()}>Filter</button>
            </div>
            <label>{props.history.length}</label>
            <Matches matches={getCycle(1)} setGoals={props.setGoals}/>

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