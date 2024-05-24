import Matches from "./Matches";

function League(props){
    return(
        <div>
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
            <Matches matches={props.history} setGoals={props.setGoals}/>
        </div>
    )
}
export default League;