NEEDS:
Need to have changing state and pass props

SHOULDS:
Should use reflux
Make pretty with CSS - pick pre setup lib thing

PLAN:
Slider to select days in advance
Just display quality for now

Implement machine learning with mock and then scraped data
Implement scraper for Surfline or NOAA


API:
	Quality /quality/:spot_id/:date_time_in_timestamp

	

IMPLEMENTATION NOTES:

Each component/surf view will have
  componentDidMount -> setting up timers or somethign that will neeed cleaning
  componentWillUnmount -> cleaning up anything from component/view

If ever update state based on props use a closure or its really just a method and setState knows to call it 
with the current state and props
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));

or just do logic in the React Component before saying an action happened?


IN REACT USE COMPOSITION INSTEAD OF INHERITANCE - components wrap components and passs vars down via props instead of extending classes
https://facebook.github.io/react/docs/composition-vs-inheritance.html

https://download.acsu.buffalo.edu/index.php?sw=mac/anyconnect-macosx-i386-4.3.02039-k9.dmg




NOTES:

State or Prop?
Is it passed in from a parent via props? If so, it probably isn't state.
Does it remain unchanged over time? If so, it probably isn't state.
Can you compute it based on any other state or props in your component? If so, it isn't state.

State is like the value of a text input
Prop is the value dervied from that state that ull pass down into some other component
Props are Read-Only - so JUST used for passing


JSX - just strings together React.createElement calls with preprocessor
  It can handle any "expression" in {} for ex:
  value={this.state.mul === 0 ? this.state.mul : 3}
  or logic with 
  {true && <Something/>}

NEVER modify state directly always use setState:
  this.setState({comment: 'Hello'}); instead of this.state.comment

setState is what triggers a render



RANDOM JS NOTE:
var t =3;
{t} = {t:3};


its called SPREAD ... when used in statement
var parts = ['shoulders', 'knees'];
var lyrics = ['head', ...parts, 'and', 'toes']; // ["head", "shoulders", "knees", "and", "toes"]

its called REST ...args_array when used in function def makes args into an array (opposite as breadking it up ) which can be useful for => becuase no arguments (or this)


BAD IDEA:
  Supposed to do business logic in Store, however.. what if u need a prop or something other than state to figure it out? Maybe
  Pass in a closure with them for setStatus call in Action.whateverHandler(thisGetsToStore);
RIGHT IDEA:
  Action.whatever can take however many parameters not jsut store so you can pass props or whatever up to store as well and do bus. logic
  in the store




FOR MACHINE LEARNING - 
	Combine NOAA and LOLA data
	For prediction train against data from 5,4,3,2,1 days before a classificiation of good or bad
	Add other weather data like rain