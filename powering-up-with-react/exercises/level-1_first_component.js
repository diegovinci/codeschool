/**----------------------------------------------------------------------------
 * 1.5 Creating a Component 
 * ----------------------------------------------------------------------------
 * Time to write our first React component.
 * 
 * 1. Make the RobotBox class a React component.
 * 
 * 2. Now define an instance method responsible for rendering the component.
 * 
 * 3. Inside the render() instance method, return a div element with the 
 * content Hello From React. Remember: no quotes are needed when markup is 
 * returned in React components.
 */

class RobotBox extends React.Component {
  render() {
    return (
      <div>Hello From React</div>
    );
  }
}


/** ---------------------------------------------------------------------------
 * 1.6 Rendering a Component 
 * ----------------------------------------------------------------------------
 * Now let's use ReactDOM to render components to our HTML page.
 * 
 * 1. As the first argument to the renderer, invoke the RobotBox component.
 * 
 * 2. As the second argument, pass the target container element.
 */

class RobotBox extends React.Component {
  render() {
    return <div>Hello From React</div>;
  }
}

let target = document.getElementById('robot-app');

ReactDOM.render(<RobotBox />, target);


/** ---------------------------------------------------------------------------
 * 1.9 Coding JSX 
 * ----------------------------------------------------------------------------
 * Let's finish coding our RobotBox component.
 * 
 * 1. Add an <h3> tag as a child node to the existing <div> with the following 
 * content: McCircuit is my name
 * 
 * 2. Add a <p> element as a child node of the existing <div> and after the 
 * <h3> tag. Give it the CSS class name message and the following content: I am here to help.
 */

class RobotBox extends React.Component {
  render() {
    return (
      <div>
        <h3>McCircuit is my name</h3>
        <p className="message">I am here to help</p>
      </div>
    );
  }
}


/** ---------------------------------------------------------------------------
 * 1.10 JSX and Plain JavaScript
 * ----------------------------------------------------------------------------
 * Turns out robots are very knowledgeable in the subject of math, thanks to 
 * JavaScript! Let's see what they have to say about the value of PI.
 * 
 * 1. Before the return statement, create a new variable called pi and assign 
 * it the value of PI. In case you don't remember, you can use the built-in 
 * Math.PI property from JavaScript.
 * 
 * 2. Reference the pi variable from inside the render() method so that the 
 * message returned by our component says: The value of PI is approximately 
 * 3.141592653589793.
 * 
 * 3. Lastly, add a CSS class to the component <div> called is-tasty-pie.
 */

class RobotTime extends React.Component {
  render() {
    const pi = Math.PI;

    return (
      <div className="is-tasty-pie">
        The value of PI is approximately {pi}
      </div>
    );
  }
}


/** ---------------------------------------------------------------------------
 * 1.11 JSX and Collections
 * ----------------------------------------------------------------------------
 * Let's iterate through a collection using JSX.
 * 
 * 1. Using the map() method on the topics array, let's start by returning an 
 * empty <li> element for each item.
 * 
 * 2. Using the single argument to the callback function passed to map(), 
 * render each topic inside the <li> tag.
 */

class RobotItems extends React.Component {
  render() {
    const topics = ["React", "JSX", "JavaScript", "Programming"];
    return (
      <div>
        <h3>Topics I am interested in</h3>
        <ul>
          /* Here, we’re displaying a list of elements using JSX and 
          JavaScript’s native map function. */
          {topics.map(topic => <li>{topic}</li>)}
        </ul>
      </div>
    );
  }
}
