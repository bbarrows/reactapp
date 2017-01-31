import Reflux from 'reflux';

/*

Make React components for each surfline metric (Tide, Swell, etc). Start with and focus on Quality of surf maybe first

If you can extend the use of some like MEtric class for Tide , Swell, etc shoudl be able to for all actually

Everything is really a prop.. So maybe add some state like :
Spot/Location selection
Days prediction ahead


*/

var Actions = Reflux.createActions([
  "fetchData",
  "textChanged"
]);

class Store extends Reflux.Store {
  constructor() {
    super();
    this.state = {quality: "", mul: 0};
    this.listenTo(Actions.fetchData, this.callAPI);
    this.listenTo(Actions.textChanged, this.calculateSomething)
  }

  callAPI(status) {
    this.setState({quality: status});
  }

  calculateSomething(status) {
    this.setState(function() {return {mul: Number(status) * 2}; });//old => ({mul: Number(old.mul) * 2}));
  }
}
/*
var Store = Reflux.createStore({
  listenables: [Actions],

  init() {
    this.listenTo(Actions.fetchData, this.fetchData);
  },

  fetchData() {
    let _this = this;
    
    $.get("/quality/12/12")
      .done((data) => {
        console.log(data);
        _this.setState(data);
      });
      
      this.setState(1);
  }
});
*/














class ChildComponentRenderCounter extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = Store;
    this.render_count = 0;
    this.mount = 0;
    this.unmount = 0;
  }
/*
  static propTypes() {
    mul: React.PropTypes.number
  }
  */
  componentDidMount() {
  console.log("in mount");
    this.mount++;
  }
  componentWillUnmount() {
  console.log("in unmount");

    this.unmount++;
  }
/*
  shouldComponentUpdate(nprops, nstate) {
  console.log("in shouldComponentUpdate")
    console.log(nprops)
    console.log(nstate)
    return this.render_count === 1;
  } */

  render() {
    let num = this.render_count++;
    return (<div>Rendered: {num} {this.mount} {this.unmount} </div>);  
  }
}


class ThingValue extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = Store;
    this.render_count = 0;
  }
/*
  static propTypes() {
    mul: React.PropTypes.number
  }
  */
  render() {
    console.log(this.state);
    let num = this.state.mul;
    return (<div>numberRRRR: {num} <div>{this.props.children}</div></div>);  
  }
}

class TextThing extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = Store;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    Actions.textChanged(e.target.value);
  }

  render() {
  console.log(`this.state.mul ${this.state.mul}`);
    return (<div><input type="text"  onChange={this.handleChange} /> <ThingValue>
    {this.state.mul == 4 &&
    <div>
    <ChildComponentRenderCounter/>
    <p>children?divthing</p></div>
    }
    </ThingValue></div>);
  } 
}

class Quality extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = Store;
    this.requestQuality.bind(this);
  }

  // If wasnt on click and was automatically loaded when component was created you would use:

  requestQuality(e) {
    //Do AJAX HERE, cant be an object must be a string sent to store
    Actions.fetchData("AJAX");
  }
  
  render() {
    let quality = this.state.quality;
    return (<div><h1>Hello, {quality}</h1> <a href="#" onClick={this.requestQuality} >Fetch</a></div>);
  }
}



class ContainerThing extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = Store;
  }

  render() {
    return (<div> <Quality /> <TextThing /> </div>);
  } 
}


ReactDOM.render(
  <ContainerThing />,
  document.getElementById('quality')
);


