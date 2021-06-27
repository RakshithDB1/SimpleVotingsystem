import React, { Component } from 'react';
import web3 from './web3';
import ballot from './ballot';
import logo from './logo.svg';
// import './App.css';
 
 
class App extends Component{
 
  state = {
    proposal: '',
    admin: '',
    choice1: '',
    choice2: '',
    winner: '',
    name: '',
    address: '',
    contractState: '',
  };
 
  async componentDidMount() {
    const proposal = await ballot.methods.proposal().call();
    const admin = await ballot.methods.ballotOfficialAddress().call();
    const choice1 = await ballot.methods.choice1().call();
    const choice2 = await ballot.methods.choice2().call();
    const winner = await ballot.methods.winner().call();
    const contractState = await ballot.methods.contractState().call()
    console.log(contractState);
    this.setState({ proposal, admin, choice1, choice2, winner, contractState });
  }
 
  async startVote() {
    const acc = await web3.eth.getAccounts();
    const account = acc[0];
    const txn = await ballot.methods.startVote().send({ from: account });
  }
 
  addVoter = async () => {
    const acc = await web3.eth.getAccounts();
    const account = acc[0];
 
    const txn = await ballot.methods.addVoter(this.state.address, this.state.name).send({from: account});
  }
 
  doVoteChoice1 = async () => {
    const acc = await web3.eth.getAccounts();
    const account = acc[0];
    const txn = await ballot.methods.doVote(true).send({from: account});
  }
 
  doVoteChoice2 = async () => {
    const acc = await web3.eth.getAccounts();
    const account = acc[0];
    const txn = await ballot.methods.doVote(false).send({from: account});
  }
 
  endVote = async () => {
    const acc = await web3.eth.getAccounts();
    const account = acc[0];
    const txn = await ballot.methods.endVote().send({from: account});
  }
 
 
  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract to vote for {this.state.proposal} </p>
        <p>This contract is managed by {this.state.admin} </p>
 
        <p>Choice1 {this.state.choice1} </p>
        <p>Choice2 {this.state.choice2} </p>
 
        <p> Winner? {this.state.winner}</p>
 
        <button onClick={this.startVote}>Start Voting</button>
 
        <button onClick={this.addVoter}>Add a voter</button>
 
        <p>Name</p><input value={this.state.name} onChange={ e => this.setState({name:e.target.value})}></input>
        <p>Address</p><input value={this.state.address} onChange={ e => this.setState({address:e.target.value})}></input>
        <br/>
        <p>Name from input: {this.state.name}</p>
        <p>Address from input: {this.state.address}</p>
 
        <button onClick={this.doVoteChoice1}>{this.state.choice1}</button>
        <button onClick={this.doVoteChoice2}>{this.state.choice2}</button>
      <br/>
        <button onClick={this.endVote}>Finalize Results</button>
 
 
      </div>
    );
  }
}
 
export default App;
 
const link= "https://drive.google.com/drive/folders/1Gu4gzYJQTREvJXzNw6OArX1L70eeMwIf?usp=sharing"
 
