/**----------------------------------------------------------------------------
 * 3.5 Setting an Initial State
 * ----------------------------------------------------------------------------
 * We have added a new button to our app that will allow users to "Report as 
 * Abuse" comments they don't like. We will be working on this new feature for 
 * our app through the next few challenges.
 *
 * The first step toward implementing this feature is to set an initial state 
 * to the Comment component.
 * 
 * 1. Let's start by declaring a constructor() function on the Comment 
 * component. Remember, from inside the constructor() we must call super() as 
 * the very first thing.
 * 
 * 2. Next, let's declare an Initial State to the Comment component by 
 * assigning it as an empty object.
 * 
 * 3. Now, let's add a property to the newly created state object and call it 
 * isAbusive. Then let's set it as false by default.
 */

class CommentBox extends React.Component {
  render() {
    const comments = this._getComments() || [];
    return (
      <div className="comment-box">
        <h3>Comments</h3>
        {this._getPopularMessage(comments.length)}
        <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
        <div className="comment-list">
          {comments}
        </div>
      </div>
    );
  }

  _getPopularMessage(commentCount) {
    const POPULAR_COUNT = 10;
    if (commentCount > POPULAR_COUNT) {
      return (
        <div>This post is getting really popular, don't miss out!</div>
      );
    }
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

  constructor() {
    /* start steps 1, 2, 3*/
    super();

    this.state = {
      isAbusive: false
    };
    /* end steps 1, 2, 3*/
  }

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
          <a href="#">Report as Abuse</a>
        </div>
      </div>
    );
  }
}


/**----------------------------------------------------------------------------
 * 3.6 Conditionally Displaying Elements 
 * ----------------------------------------------------------------------------
 * We're still working on the "Report Abuse" feature of our app. Now it's time 
 * to conditionally show or hide abusive comments based on the component state.
 *
 * 1. Let's declare a new variable called commentBody in the render() method of 
 * the Comment component. Don't worry about setting an initial value, just 
 * declare the variable using let.
 * 
 * 2. After the variable declaration, add an if statement to check whether the 
 * isAbusive property of the state object has a falsy value. If isAbusive is 
 * falsy, then assign the body prop to the commentBody variable.
 * 
 * 3. Add an else clause to our if statement where we assign commentBody as an 
 * <em> element containing the text: Content marked as abusive
 * 
 * 4. Within <p> tag with class comment-body, let's replace the call for 
 * this.props.body with the commentBody variable.
 */

class CommentBox extends React.Component {

  render() {
    const comments = this._getComments() || [];
    return (
      <div className="comment-box">
        <h3>Comments</h3>
        {this._getPopularMessage(comments.length)}
        <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
        <div className="comment-list">
          {comments}
        </div>
      </div>
    );
  }

  _getPopularMessage(commentCount) {
    const POPULAR_COUNT = 10;
    if (commentCount > POPULAR_COUNT) {
      return (
        <div>This post is getting really popular, don't miss out!</div>
      );
    }
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
  constructor() {
    super();
    this.state = {
      isAbusive: false
    };
  }

  render() {
    /* start steps 1, 2 and 3 */
    let commentBody;
    /* Lógica para analisar se um determinado post é abusivo ou não. */
    if (!this.state.isAbusive) {
      commentBody = this.props.body
    } else {
      commentBody = <em>Content marked as abusive</em>
    }
    /* end steps 1, 2 and 3 */

    return (
      <div className="comment">

        <img src={this.props.avatarUrl} alt={`${this.props.author}'s picture`} />

        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">
          { /* start step 4 */}
          { /* {this.props.body} */}
          <p>{commentBody}</p>
          { /* end step 4 */}
        </p>
        <div className="comment-actions">
          <a href="#">Delete comment</a>
          <a href="#">Report as Abuse</a>
        </div>
      </div>
    );
  }
}


/**----------------------------------------------------------------------------
 * 3.7 Changing the State
 * ----------------------------------------------------------------------------
 * Let's add the final piece we're missing to allow users to mark comments as 
 * abusive in our app: making the "Report as Abuse" button interactive.
 *
 * 1. Let's declare a new method in the Comment component called _toggleAbuse(). 
 * Then let's make it receive one argument called event and call 
 * event.preventDefault() to prevent the page from being reloaded when the 
 * method is called.
 * 
 * 2. Next, let's toggle the isAbusive state. To toggle it we'll set isAbusive 
 * to true if it's false; and set it to false if it's true.
 * 
 * 3. Now let's add an onClick handler to the "Report as Abuse" button that 
 * calls the _toggleAbuse method. Tip: don't forget to bind() the method to 
 * the current context when you pass it to the event handler. You do not need 
 * to pass event to the call to bind(), only the current context ( this).
 */

/* Componente - Caixa de Comentários */
class CommentBox extends React.Component {

  render() {
    /* Lógica para  mostrar comentários disponíveis */
    const comments = this._getComments() || [];
    return (
      <div className="comment-box">
        <h3>Comments</h3>
        {this._getPopularMessage(comments.length)}
        <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
        <div className="comment-list">
          {comments}
        </div>
      </div>
    );
  }

  /* Método para retornar o post mais popular enviado */
  _getPopularMessage(commentCount) {
    const POPULAR_COUNT = 10;
    if (commentCount > POPULAR_COUNT) {
      return (
        <div>This post is getting really popular, don't miss out!</div>
      );
    }
  }

  /* Método para retornar array dos elementos do JSX */
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

  /* Método para retornar a quantidade de comentários postados pelos usuários */
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


/* Componente responsável pelos comentários realizados pelos usuários */
class Comment extends React.Component {
  constructor() {
    super();
    /* Caso algum determinado comentário do usuário for abusivo, os demais 
        usuários poderão 'desativar' o comentário. */
    this.state = {
      isAbusive: false
    };
  }

  render() {
    let commentBody;
    /* Aqui tratará a lógica para analisar se um determinado post é 
        abusivo ou não. */
    if (!this.state.isAbusive) {
      commentBody = this.props.body;
    } else {
      commentBody = <em>Content marked as abusive</em>;
    }
    return (
      <div className="comment">
        <img src={this.props.avatarUrl} alt={`${this.props.author}'s picture`} />
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">
          {commentBody}
        </p>
        <div className="comment-actions">
          <a href="#">Delete comment</a>
          <a href="#" onClick={this._toggleAbuse.bind(this)}>Report as Abuse</a>
        </div>
      </div>
    );
  }
  /* Método responsável por remover o post abusivo (através do evento de click) */
  _toggleAbuse(event) {
    event.preventDefault();

    this.setState({
      isAbusive: !this.state.isAbusive
    });
  }
}


