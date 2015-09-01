var DisplayStartup = React.createClass({
  getInitialState: function() {
    return {
      name: 'Discover A Startup',
      url: 'https://github.com/avinoth/dstartup',
      description: 'Discover random startups',
      score: '0',
      umm: 'd96b535e49275e48b04caa5c5df186b4c8d3f09b36672a65',
      angelUrl: 'https://api.angel.co/1'
    };
  },

  componentDidMount: function () {
    return this.searchStartups
  },

  searchStartups: function() {
    alphabets = 'abcdefghijklmnopqurstuvwxyz';
    rand = alphabets.substr(Math.floor(Math.random() * 26), 1);
    searchURL = "" + this.state.angelUrl + "/search/?query=" + rand + "&type=Startup&access_token=" + this.state.umm;
    $.ajax({
      url: searchURL,
      type: 'GET',
      dataType: 'JSONP',
      success: this.fetchRandom
    });
  },

  fetchRandom: function(data) {
    startup = data[Math.floor(Math.random() * data.length)];
    startupURL = "" + this.state.angelUrl + "/startups/" + startup.id + "?access_token=" + this.state.umm;
    return $.ajax({
      url: startupURL,
      type: 'GET',
      dataType: 'JSONP',
      success: function(sdata) {
        if (this.isMounted()) {
          this.setState({name: sdata.name, url: sdata.company_url, description: sdata.product_desc, score: sdata.quality});
        }
      }.bind(this),
    });
  },

  render: function() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10">
              <div className="jumbotron">
                <div className="intro-message">
                  <h1 id="name">{this.state.name}</h1>
                  <h4>
                    <i className="fa fa-external-link"></i>
                    <a href={this.state.url} target="_blank" id="url">&nbsp;
                      {this.state.url}
                    </a>
                  </h4>
                  <p id="desc">{this.state.description}</p>
                  <hr />
                </div>
              </div>
            </div>
            <div className="col-sm-2">
              <a className="btn btn-primary btn-lg text-center" id="explorer" onClick={this.searchStartups}><span className="network-name">Another</span></a><br />
              <h1 id="score">{this.state.score}</h1>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
});

var Footer = React.createClass({
  render: function() {
    return (
      <div className="navbar navbar-fixed-bottom">
        <div className="container">
          <p className="muted credit pull-right footer">
            Made with &#10084; by <a href="http://www.avinoth.com">avinoth</a>&nbsp;&nbsp;
            <a href="https://github.com/avinoth/dstartup" target="_blank"><i className="fa fa-github fa-2x"></i></a>
            <a href="https://twitter.com/avinoth_" target="_blank"><i className="fa fa-twitter fa-2x"></i></a>
          </p>
        </div>
      </div>
    )
  }
});

React.render(
  <DisplayStartup />,
  document.getElementById('wrap')
);
