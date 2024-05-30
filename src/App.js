import './App.css';
import React from "react";
import axios from "axios";
import League from "./League";
import Team from "./Team";
import stylizedAlert from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

class App extends React.Component{
    state={
        leagues:[],
        team:[],
        matches:[],
        selectedLeague:"",
        players:[],
        leagueHistory:[],
        filterLeagueHistory:[],
        cycleMin:"1",
        cycleMax:"",
        chosenTeam:false,
        allCycle:"",
        cycle:"1",
        goalsMVP:[{name:"ram",goals:"3"}]
    }
    getGoalsMVP=()=>{
        const goals = this.getAllGoals()
        let playersGoals=[]
        console.log(goals[0].scorer.id)
        for (let i=0;i<goals.length;i++){
            let count = 1;
            for (let j = i+1; j < goals.length; j++) {
                if (goals[i].scorer.id===goals[j].scorer.id){
                    count++;
                }
            }
          const isExist = playersGoals.filter((player)=> {return playersGoals.id===goals[i].scorer.id})
            if (isExist.length===0){
                const name = goals[i].scorer.firstName+" "+goals[i].scorer.lastName
                playersGoals.push({id:goals[i].scorer.id,name:name,goals:count})
            }
        }
        playersGoals.sort((a, b) => b.goals - a.goals);
        const goalsMVP = [];
        const numberOfTopPlayers = 3;
        for (let i = 0; i < numberOfTopPlayers && i < playersGoals.length; i++) {
            goalsMVP.push(playersGoals[i]);
        }
        this.setState({goalsMVP:goalsMVP})
        console.log(goals)
    }
    getAllGoals=()=>{
       const goals=[]
        for (let i = 0; i < this.state.leagueHistory.length; i++) {
            for (let j = 0; j <this.state.leagueHistory[i].goals.length ; j++) {
                goals.push(this.state.leagueHistory[i].goals[j])
            }
        }
        console.log(goals)
        return goals
    }
    setCycle=(cycle)=>{
        this.setState({cycle:cycle})
    }
    filter=()=>{
        const leagueHistory = this.state.leagueHistory.filter((cycle)=>
        {return cycle.round>=this.state.cycleMin&&cycle.round<=this.state.cycleMax})
        this.setState({filterLeagueHistory:leagueHistory,allCycle:leagueHistory[leagueHistory.length-1].round})
    }
    setValue=(key,event)=>{
        this.setState({[key]:event.target.value})
    }
    getLeagueHistory=()=>{

    }
    getHistory=(leagueId)=>{
        axios.get(`https://app.seker.live/fm1/history/${leagueId}`).then(
            response=>{
                this.setState({leagueHistory:response.data,filterLeagueHistory:response.data},
                    ()=>{this.setMinAndMaxCycle() ;this.getGoalsMVP()})
            })
            }


    getMin=()=>{
        return this.state.leagueHistory[0].round
    }
    getMax=()=>{
       return this.state.leagueHistory[this.state.leagueHistory.length-1].round
    }
    setMinAndMaxCycle=()=>{
        this.setState({cycleMin:this.getMin(),cycleMax:this.getMax(),allCycle:this.getMax()})
    }
    getMatchesByTeam=(teamId)=>{
        axios.get(`https://app.seker.live/fm1/history/${this.state.selectedLeague}/${teamId}`)
            .then(response => {
                console.log(response.data)
                this.setState({matches:response.data,chosenTeam:true});
            })
    }
    getTeamByLeague=(leagueId)=>{
        axios.get(`https://app.seker.live/fm1/teams/${leagueId}`)
            .then(response => {
                this.setState({team:response.data,selectedLeague:leagueId,chosenTeam:false})
            })
    }
    setGoals=(goals)=>{
        const homeTeamGoals = goals.filter(goal => goal.home === true).length;
        const awayTeamGoals = goals.length - homeTeamGoals;
        return (
            <label>
                {homeTeamGoals} - {awayTeamGoals}
            </label>
        );
    }

    getPlayers=(teamId)=>{
        axios.get(`https://app.seker.live/fm1/squad/${this.state.selectedLeague}/${teamId}`).then(
            response=>{
                console.log(response.data)
                this.setState({players:response.data})
            }
        )
    }
    componentDidMount() {
        axios.get('https://app.seker.live/fm1/leagues').then(
            response=>{
                this.setState({leagues:response.data})
            }
        )
    }
    newAlert=()=>{
        const myStylizedAlert = withReactContent(stylizedAlert)
        myStylizedAlert.fire({
            title: <h2>אנחנו מצטערים שי</h2>,
        }).then(()=>{
            return myStylizedAlert.fire(<h3>😭 בבקשה אל תביא לנו 60</h3>)
        })
    }
    render() {
        return (
            <div className="App">
                <div className={"Glass"} id={"main-container"}>
                    <div id={"header-container"}>
                        <label onClick={this.newAlert} style={{fontSize:30,cursor:"pointer"}}>♥️</label>
                        {/*{this.getGoalsMVP}*/}
                        <label
                            style={{fontSize: 60, fontWeight: "bold"}}>
                            Welcome to TWO
                            <label
                                style={{fontSize: 50}}> (The better
                                <img style={{width: 160}} src={"./oldone.png"} alt={"one"}/> )
                            </label>
                        </label>
                    </div>
                    <div id={"dashboard-container"}>
                        <div  id={"sidebar-container"}>
                            <div className={"Glass"} id={"leagues-names-container"}>
                                <h2 style={{textAlign:"left"}}>Leagues</h2>
                                {
                                    this.state.leagues.map((league) => {
                                        return (
                                            <div style={{cursor: "pointer"}} onClick={() => {
                                                this.getTeamByLeague(league.id);
                                                this.getHistory(league.id)
                                            }}>{league.name}</div>

                                        )
                                    })
                                }
                            </div>
                            {
                                this.state.team.length > 0 && <div className={"Glass"} id={"team-names-container"}>
                                    <h2>Teams</h2>
                                    {
                                        this.state.team.map((team) => {
                                            return (
                                                <div style={{cursor: "pointer"}} onClick={() => {
                                                    this.getMatchesByTeam(team.id);
                                                    this.getPlayers(team.id);
                                                }}>{team.name}</div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <div id={"content-container"}>
                            {
                                this.state.chosenTeam ?
                                    <Team players={this.state.players}
                                          matches={this.state.matches}
                                          setGoals={this.setGoals}/>
                                    : this.state.selectedLeague !== "" &&
                                    <League history={this.state.filterLeagueHistory}
                                            setValue={this.setValue}
                                            cycleMin={this.state.cycleMin}
                                            cycleMax={this.state.cycleMax}
                                            filter={this.filter}
                                            allCycle={this.state.allCycle}
                                            setCycle={this.setCycle}
                                            cycle={this.state.cycle}
                                            setGoals={this.setGoals}
                                            goalsMVP={this.state.goalsMVP}/>
                            }

                        </div>
                        <div id={"other-sidebar-container"}>
                            {/*this is an empty sidebar container for SPACING ONLY*/}
                        </div>
                    </div>
                    <label id={"spacer"} style={{height:80}}>AYRD</label>
                </div>

            </div>

        );
    }
}

export default App;
