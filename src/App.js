import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from "axios";
import League from "./League";
import Team from "./Team";

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
        cycleMax:"15",
        chosenTeam:false


    }
    filter=()=>{
        const leagueHistory = this.state.leagueHistory.filter((cycle)=>
        {return cycle.round>=this.state.cycleMin&&cycle.round<=this.state.cycleMax})
        this.setState({filterLeagueHistory:leagueHistory})
    }
    setValue=(key,event)=>{
        this.setState({[key]:event.target.value})
    }
    getLeagueHistory=()=>{

    }
    getHistory=(leagueId)=>{
        axios.get(`https://app.seker.live/fm1/history/${leagueId}`).then(
            response=>{
                this.setState({leagueHistory:response.data,filterLeagueHistory:response.data},()=>this.setMinAndMaxCycle())
            })
            }


    getMin=()=>{
        return this.state.leagueHistory[0].round
    }
    getMax=()=>{
       return this.state.leagueHistory[this.state.leagueHistory.length-1].round
    }
    setMinAndMaxCycle=()=>{
        this.setState({cycleMin:this.getMin(),cycleMax:this.getMax()})
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
    render() {
        return (
            <div className="App">
                <div id={"main-container"}>
                    <div id={"header-container"}>
                        <label>♥️</label>
                        <label
                            style={{fontSize: 60, fontWeight: "bold"}}>
                            Welcome to TWO
                            <label
                                style={{fontSize: 50}}> (The better
                                <img style={{width: 160}} src={"./oldone.png"} alt={"one"}/> )
                            </label>
                        </label>
                        hi Ram how are you?
                    </div>
                    <div id={"dashboard-container"}>
                        <div id={"sidebar-container"}>
                            <div id={"leagues-names-container"}>
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
                                this.state.team.length > 0 && <div id={"team-container"}>
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
                                            setGoals={this.setGoals}/>
                            }

                        </div>
                    </div>
                    <label id={"spacer"} style={{height:80}}>

                    </label>
                </div>

            </div>

        );
    }
}

export default App;
