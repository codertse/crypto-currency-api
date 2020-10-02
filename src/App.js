import React from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

class App extends React.Component{
  constructor(){
    super()
    this.state={
      coins: [],
      search: "",
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
      )
      .then(res => {
        this.setState({coins: res.data});
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }

  handleChange(e){
    this.setState({search: e.target.value});
  };

  
  

  render(){
    const filteredCoins = this.state.coins.filter(coin => 
      coin.name.toLowerCase().includes(this.state.search.toLowerCase())
    );
    const topText= "Made with <3"
    return (
      <div>
        <h2 className="nav1">Cryptocurrency Market<a className = "author" 
            href = "https://github.com/codertse/crypto-currency-api.git">Github</a> <a className = "author" 
            href = "https://www.linkedin.com/in/tseveendorj-ganbold-603770139/">LinkedIn</a></h2>
        <div className='coin-app'>
        
          <div className='coin-search'>
            
            <h2 className='coin-text'>Search a Cryptocurrency</h2>
            <form>
              <input
                className='coin-input'
                type='text'
                onChange={this.handleChange}
                placeholder='Search'
              />
            </form>
          </div>
          {filteredCoins.map(coin => {
            return (
              <Coin
                
                key={coin.id}
              
                name={coin.name}
                price={coin.current_price}
                symbol={coin.symbol}
                marketcap={coin.total_volume}
                volume={coin.market_cap}
                image={coin.image}
                priceChange={coin.price_change_percentage_24h}
              />
            );
          })}
        </div>
      </div>
    );
    
  }
}
export default App;


