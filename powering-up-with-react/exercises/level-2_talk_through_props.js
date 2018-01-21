/**----------------------------------------------------------------------------
 * 2.5 Converting HTML Mockups to Components
 * ----------------------------------------------------------------------------
 * Using the existing HTML from mockup.html, let's create a new React component.
 * 
 * 1. In the components.js file, declare a new React component named Comment.
 * 
 * 2. Add a render() method to the Comment component.
 * 
 * 3. Copy the existing mockup from mockup.html into the render() method and 
 * return it. Remember to rename the class HTML attributes to className in JSX.
 */

// mockup.html
<div class="comment">
  <p class="comment-header">Anne Droid</p>
  <p class="comment-body">
    I wanna know what love is...
  </p>
  <div class="comment-actions">
    <a href="#">Delete comment</a>
  </div>
</div>

// component.js
class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <p className="comment-header">Anne Droid</p>
        <p className="comment-body">
          I wanna know what love is...
          </p>
        <div className="comment-actions">
          <a href="#">Delete comment</a>
        </div>
      </div>
    );
  }
}


/**----------------------------------------------------------------------------
 * 2.6 Reading Props
 * ----------------------------------------------------------------------------
 * Even though we passed props to the Comment component, we still aren't 
 * reading in those props. Let’s fix that!
 * 
 * 1. Replace the hard-coded text within the <p> tag that has the class 
 * comment-header to read in the author prop instead.
 * 
 * 2. Now let's replace the hard-coded text within the <p> tag that has the 
 * class comment-body to read in the body prop.
 */

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <p className="comment-header">
          {this.props.author}
        </p>
        <p className="comment-body">
          {this.props.body}
        </p>
        <div className="comment-actions">
          <a href="#">Delete comment</a>
        </div>
      </div>
    );
  }
}


/**----------------------------------------------------------------------------
 * 2.7 Using the Comment Component 
 * ----------------------------------------------------------------------------
 * We went ahead and created the CommentBox component. Let’s use the Comment 
 * component we previously created and pass some props to it.
 * 
 * 1. Within the <div> element with class name comment-list, add a new Comment 
 * component.
 * 
 * 2. Provide an author prop of "Anne Droid" and a body prop of "I want to know 
 * what love is..." to the new Comment component.
 */

class CommentBox extends React.Component {
  render() {
    return (
      <div className="comment-box">
        <h3>Comments</h3>
        <h4 className="comment-count">2 comments</h4>
        <div className="comment-list">
          <div className="comment-list">
            <Comment
              author="Anne Droid" body="I want to know what love is..." />
            <Comment
              author="Morgan McCircuit" body="Great picture!" />
          </div>
        </div>
      </div>
    );
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <p className="comment-header">
          {this.props.author}
        </p>
        <p className="comment-body">
          {this.props.body}
        </p>
        <div className="comment-actions">
          <a href="#">Delete comment</a>
        </div>
      </div>
    );
  }
}


/**----------------------------------------------------------------------------
 * 2.10 Mapping Components 
 * ----------------------------------------------------------------------------
 * The render() method in CommentBox is now expecting the method _getComments() 
 * to return an array of comments.
 * 
 * Let's implement this method by returning an array of Comment components. 
 * We'll use the map() function to return an array of Comment components from 
 * the commentList array.
 *   
 * 1. Add an avatarUrl property to each element in the commentList array and 
 * set the values to 'images/default-avatar.png'.
 * 
 * 2. Let's make _getComments() return an array of Comment components by 
 * calling the map() method of commentList and having it return a Comment for 
 * each item in the array.
 * 
 * 3. Now let's pass these properties as props to each Comment component: 
 * author, body, and avatarUrl. Don't forget that the callback to map takes an 
 * argument that represents each element from the calling object.
 * 
 * 4. Our console is showing a warning because we're not passing a key prop 
 * with a unique identifier for each comment in the array. Let's add a key prop 
 * to each Comment component and use comment.id as the unique identifier.
 */

class CommentBox extends React.Component {
  render() {
    const comments = this._getComments() || [];
    return (
      <div className="comment-box">
        <h3>Comments</h3>
        <h4 className="comment-count">{comments.length} comments</h4>
        <div className="comment-list">
          {comments}
        </div>
      </div>
    );
  }

  _getComments() {
    /* start steps 1, 2, 3 and 4 */
    const commentList = [
      { id: 1, author: 'Clu', body: 'Just say no to love!', avatarUrl: 'images/default-avatar.png' },
      { id: 2, author: 'Anne Droid', body: 'I wanna know what love is...', avatarUrl: 'images/default-avatar.png' }
    ];

    return commentList.map((comment) => {
      return (<Comment
        author={comment.author}
        body={comment.body}
        avatarUrl={comment.avatarUrl}
        key={comment.id} />
      );
    });
    /* end steps 1, 2, 3 and 4 */
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">
          {this.props.body}
        </p>
        <div className="comment-actions">
          <a href="#">Delete comment</a>
        </div>
      </div>
    );
  }
}


/**----------------------------------------------------------------------------
 * 2.11 Adding a Comment Avatar 
 * ----------------------------------------------------------------------------
 * Now that we're passing the avatarUrl prop to the Comment component, let's 
 * add some markup to display an image with the avatar for each comment.
 *
 * 1. Add an <img /> as the very first tag inside the <div> element with class 
 * comment. Reminder: All opening tags <img> without a closing tag must use the 
 * self-closing syntax <img /> instead.
 * 
 * 2. Now let's add a src attribute to our newly created <img /> tag and give 
 * it the avatarUrl prop.
 * 
 * 3. It's recommended that every <img /> tag on our page has an alt attribute. 
 * So let's add an alt attribute to our image with the following format:
 *      `${this.props.author}'s picture`
 * Tip: The format above uses ES2015 string templates syntax.
 */

class CommentBox extends React.Component {

  render() {
    const comments = this._getComments() || [];
    return (
      <div className="comment-box">
        <h3>Comments</h3>
        <h4 className="comment-count">{comments.length} comments</h4>
        <div className="comment-list">
          {comments}
        </div>
      </div>
    );
  }

  _getComments() {

    const commentList = [
      { id: 1, author: 'Clu', body: 'Just say no to love!', avatarUrl: 'images/default-avatar.png' },
      { id: 2, author: 'Anne Droid', body: 'I wanna know what love is...', avatarUrl: 'images/default-avatar.png' }
    ];

    return commentList.map((comment) => {
      return (<Comment
        author={comment.author}
        body={comment.body}
        avatarUrl={comment.avatarUrl}
        key={comment.id} />);
    });

  }
}

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        { /* start steps 1, 2 and 3 */}
        <img src={this.props.avatarUrl} alt={`${this.props.author}'s picture`} />
        { /* end steps 1, 2 and 3 */}
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">
          {this.props.body}
        </p>
        <div className="comment-actions">
          <a href="#">Delete comment</a>
        </div>
      </div>
    );
  }
}


/**----------------------------------------------------------------------------
 * 2.12 Comment Popularity
 * ----------------------------------------------------------------------------
 * Let's make our app show a message when the current post is getting really 
 * popular. We'll write a function that only displays this message in pages 
 * that have a certain number of comments.
 *
 * 1. Make _getPopularMessage() return the following div if the value of the 
 * commentCount argument is greater than POPULAR_COUNT:
 * <div>
 *   This post is getting really popular, don't miss out!
 * </div>
 * 
 * 2. Now let's call the _getPopularMessage() method from render() right after 
 * the <h3> tag, and pass the length of comments as the argument.
 */

/* Componente - Caixa de Comentários */
class CommentBox extends React.Component {
  render() {
    /* Lógica para exibir os comentários disponíveis */
    const comments = this._getComments() || [];
    return (
      <div className="comment-box">
        <h3>Comments</h3>
        { /* start step 3 */}
        {this._getPopularMessage(comments.length)}
        { /* end step 3 */}
        <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
        <div className="comment-list">
          {comments}
        </div>
      </div>
    );
  }

  /* Método para retornar o post mais popular enviado  */
  _getPopularMessage(commentCount) {
    const POPULAR_COUNT = 10;
    /* start steps 1 and 2 */
    if (commentCount > POPULAR_COUNT) {
      return (
        <div>This post is getting really popular, don't miss out!</div>
      );
    }
    /* end steps 1 and 2 */
  }

  _getComments() {

    const commentList = [
      { id: 1, author: 'Clu', body: 'Just say no to love!', avatarUrl: 'images/default-avatar.png' },
      { id: 2, author: 'Anne Droid', body: 'I wanna know what love is...', avatarUrl: 'images/default-avatar.png' }
    ];

    return commentList.map((comment) => {
      return (<Comment
        author={comment.author}
        body={comment.body}
        avatarUrl={comment.avatarUrl}
        key={comment.id} />);
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <img src={this.props.avatarUrl} alt={`${this.props.author}'s picture`} />
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">
          {this.props.body}
        </p>
        <div className="comment-actions">
          <a href="#">Delete comment</a>
        </div>
      </div>
    );
  }
}

