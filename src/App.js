import Silhouettes from './abis/Silhouettes.json'
import React, {Componer} from 'react';
import Identicon from 'indenticon.js';
import Navbar from './Navbar';
import Main from './Main';
import Web3 from 'web3';
import './app.css';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host:'ipfs.infura.io', port:5001, protocol:'http'})

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser')
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3 
    const accounts = await web3.eth.getAccounts()
    this.setState({account:accounts[0]})
    const networkId = await web3.eth.net.gatId()
    const networkData = Silhouettes.networks[networkId]
    if(networkData) {
      const silhouettes = new web3.eth.Contract(Silhouettes.abi, networkData.address)
      this.setState({silhouettes})
      const Increment = await silhouettes.methods.Increment().call()
      this.setState({Increment})
      for(let i = 1; i <= Increment; i++) {
        const png = await silhouettes.methods.png(i).call()
        this.setState({pngs:[...this.state.png, png]})
      }
      this.setState({loading:false})
    } else {
      window.alert('Silhouettes contract not deployed')
    }
  }
  captureFile = event => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({buffer:Buffer(reader.result)})
      console.log('buffer', this.state.buffer)
    }
  }
  upload = tags => {
    console.log('Submitting file to ipfs')
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('IPFS result', result)
      if(error) {
        console.error(error)
        return
      }
      this.setState({loading:true})
      this.state.silhouettes.methods.upload(result[0].hash, tags).send({from:this.state.account}).on('transactionHash', (hash) => {
        this.setState({loading:false})
      })
    })
  }
  constructor(props) {
    super(props)
    this.state = {
      account:'',
      silhouettes: null,
      pngs:[],
      loading:true
    }
    this.upload = this.upload.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }
  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        {this.state._loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              pngs={this.state.pngs}
              captureFile={this.captureFile}
              upload={this.upload}
            />
        }
      </div> 
    );
  }
}
export default App;