import web3 from './web3'
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import logo from './logo.svg';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import AboutUs from "./AboutUs";
import Btn from './components/Button';
import ContainerApp from "./components/ContainerApp";
import CreateCard from "./CreateCard";
import HallOfShame from "./HallOfShame";
import Home from "./Home";
import LandingPage from "./LandingPage";
import NavBar from "./components/NavBar";
import ContainerNav from "./components/ContainerNav";
import Rules from "./Rules";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      hasMetamask: false,
      network: 'Unknown',
      loading: true
    }
    ReactGA.initialize('UA-120470128-1');
    ReactGA.pageview(window.location.hash);
    this.checkWeb3(this.callback);
  }

  callback(metamask, isLoggedIn, network) {
    this.setState({isLoggedIn: isLoggedIn, hasMetamask: metamask, network: network, loading: false})
  }

  checkWeb3 = async (callback) => {
    var hasMetamask = false;
    var isLoggedIn = false;
    var network = "Unknown";
    if(web3 != "undefined") {
      const address = await web3.eth.getAccounts();
      hasMetamask = true;
      if (address.length > 0) {
        var networkId = await web3.eth.net.getId();
        var networkName;
        switch (networkId) {
          case 1:
            networkName = "Main";
            break;
          case 2:
            networkName = "Morden";
            break;
          case 3:
            networkName = "Ropsten";
            break;
          case 4:
            networkName = "Rinkeby";
            break;
          case 42:
            networkName = "Kovan";
            break;
          default:
            networkName = "Unknown";
        }
        network = networkName;
        isLoggedIn = true;
      }
    }
    this.callback(hasMetamask, isLoggedIn, network);
  }

  render() {
    if (this.state.loading) {
      return <LandingPage hasMetamask={this.state.hasMetamask} network={this.state.network} />;
    }

    return (

      <HashRouter>
      <div><b>{this.state.isLoggedIn == true && this.state.network == "Ropsten" ?
        <ContainerApp>
          <ContainerNav>
          <NavBar>
                <div><a href="#home">Crypto Against Humanity</a></div>
                <li><a href="#home" ><NavLink to="/home">Play</NavLink></a></li>
                <li><a href="#about-us"><NavLink to="/about-us">About Us</NavLink></a></li>
                <li><a href="#rules"><NavLink to="/rules">Guide</NavLink></a></li>
                <li><a href="#hall-of-shame"><NavLink to="/hall-of-shame">Hall of Shame</NavLink></a></li>
                <li><a href="#create-card"><NavLink to="/create-card"><Btn primary>Create Card</Btn></NavLink></a></li>
          </NavBar>
          </ContainerNav>

          <div className="content">
              <Route exact path="/" component={Home}/>
              <Route exact path="/home" component={Home}/>
              <Route path="/about-us" component={AboutUs}/>
              <Route path="/rules" component={Rules}/>
              <Route path="/hall-of-shame" component={HallOfShame}/>
              <Route path="/create-card" component={CreateCard}/>
          </div>
        </ContainerApp>
        :
            <LandingPage hasMetamask={this.state.hasMetamask} network={this.state.network} />
        }
      </b></div>
      </HashRouter>
    );
  }
}

export default App;
