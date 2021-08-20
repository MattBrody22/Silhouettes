import React, {Component} from 'react';
import Identicon from 'identicon.js';

class Main extends Component {
  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth:'500px'}}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p> 
              <h2>Share Image</h2>
              <form onSubmit={(event) => {
                event.preventDefault()
                const tags = this.pngTags.value 
                this.props.upload(tags)
              }} >
                <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                  <div className="form-group mr-sm-2">
                    <br></br> 
                      <input
                        id="pngTags"
                        type="text"
                        ref={(input) => {this.pngTags = input}}
                        className="form-control"
                        placeholder="Png tags..."
                        required />
                  </div> 
                <button type="submit" class="btn btn-primary btn-block btn-lg">Upload!</button>
              </form> 
              <p>&nbsp;</p>
              {this.props.images.map((image, key) => {
                return (
                  <div className="card mb-4" key={key}>
                    <div className+"card-header">
                      <img 
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(png.owner, 30).toString()}`}
                      />
                      <small className="text-muted">{png.owner}</small> 
                    </div>
                    <ul id="pngList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p class="text-center"><img src={`http://ipfs.infura.io/ipfs/${png.hash}`} style={{maxWidth:'420px'}}/></p> 
                        <p>{png.tags}</p>
                      </li> 
                      <li key={key} className="list-group-item py-2"> 
                        <small className="float-left mt-1 text-muted"> 
                        </small>
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={png.id}
                          onClick={(event) => {
                            console.log(event.target.name)
                          }}
                        >
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </main> 
        </div>
      </div> 
    );
  }
}
export default Main;