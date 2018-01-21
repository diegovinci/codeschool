/**----------------------------------------------------------------------------
 * 4.4 Adding Refs to our Form
 * ----------------------------------------------------------------------------
 * If you remember, in React we use refs to reference DOM elements in our code 
 * after the component has been rendered.
 * 
 * Let's add refs to the fields of our form so we can access the form values 
 * inside of the component.
 *
 * 1. Add a ref to the input tag that will hold the user's name, and make 
 * it assign the <input> element to this._author. Remember: arrow functions 
 * come in very handy for refs.
 * 
 * 2. Now let's add another ref in our form, this time to the <textarea> 
 * element that will hold the user's comment, and make it assign the <textarea> 
 * element to this._body.
 */

class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      isAbusive: false
    };
  }

  render() {
    let commentBody;
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

  _toggleAbuse(event) {
    event.preventDefault();

    this.setState({
      isAbusive: !this.state.isAbusive
    });
  }
}

class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: [
        { id: 1, author: 'Morgan McCircuit', body: 'Great picture!', avatarUrl: 'images/default-avatar.png' },
        { id: 2, author: 'Bending Bender', body: 'Excellent stuff', avatarUrl: 'images/default-avatar.png' }
      ]
    };
  }

  render() {
    const comments = this._getComments();
    return (
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />
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
    return this.state.comments.map((comment) => {
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

  _addComment(commentAuthor, commentBody) {
    let comment = {
      id: Math.floor(Math.random() * (9999 - this.state.comments.length + 1)) + this.state.comments.length,
      author: commentAuthor,
      body: commentBody
    };

    this.setState({
      comments: this.state.comments.concat([comment])
    });
  }
}

class CommentForm extends React.Component {
  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>New comment</label>
        <div className="comment-form-fields">
          { /* start steps 1 and 2 */}
          <input placeholder="Name:" ref={(input) => this._author = input} />
          <textarea placeholder="Comment:" ref={(textarea) => this._body = textarea}></textarea>
          { /* end steps 1 and 2 */}
        </div>
        <div className="comment-form-actions">
          <button type="submit">
            Post comment
            </button>
        </div>
      </form>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();

    this.props.addComment(this._author.value, this._body.value);

    this._author.value = '';
    this._body.value = '';
  }
}


/**----------------------------------------------------------------------------
 * 4.5 Implementing a Comment Count 
 * ----------------------------------------------------------------------------
 * Let's add a new feature to our app: Let's keep track of how many characters 
 * a user has typed in the body field of our form.
 * 
 * 1. Let's add a method to CommentForm called _getCharacterCount().
 * 
 * 2. Within _getCharacterCount(), let's change the state of our app. We're 
 * going to set the characters state to the total number of characters in the 
 * value property of this._body.
 * 
 * 3. Finally, let's add an onKeyUp event listener to the <textarea> element, 
 * making it call _getCharacterCount() every time a key is pressed while typing.
 */

class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      isAbusive: false
    };
  }

  render() {
    let commentBody;
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

  _toggleAbuse(event) {
    event.preventDefault();

    this.setState({
      isAbusive: !this.state.isAbusive
    });
  }
}

class CommentBox extends React.Component {

  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: [
        { id: 1, author: 'Morgan McCircuit', body: 'Great picture!', avatarUrl: 'images/default-avatar.png' },
        { id: 2, author: 'Bending Bender', body: 'Excellent stuff', avatarUrl: 'images/default-avatar.png' }
      ]
    };
  }

  render() {
    const comments = this._getComments();
    return (
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />
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
    return this.state.comments.map((comment) => {
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

  _addComment(commentAuthor, commentBody) {
    let comment = {
      id: Math.floor(Math.random() * (9999 - this.state.comments.length + 1)) + this.state.comments.length,
      author: commentAuthor,
      body: commentBody
    };

    this.setState({
      comments: this.state.comments.concat([comment])
    });
  }
}

class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      characters: 0
    };
  }

  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>New comment</label>
        <div className="comment-form-fields">
          <input placeholder="Name:" ref={input => this._author = input} />
          <textarea
            placeholder="Comment:"
            ref={textarea => this._body = textarea}
            { /* start step 3 */ }
            onKeyUp={this._getCharacterCount.bind(this)}
            { /* end step 3 */ }
          ></textarea>
        </div>
        <p>{this.state.characters} characters</p>
        <div className="comment-form-actions">
          <button type="submit">
            Post comment
            </button>
        </div>
      </form>
    );
  }

  _handleSubmit(event) {
    event.preventDefault();

    this.props.addComment(this._author.value, this._body.value);

    this._author.value = '';
    this._body.value = '';

    this.setState({ characters: 0 });
  }

  /* start steps 1 and 2 */
  _getCharacterCount() {
    this.setState({
      characters: this._body.value.length
    });
  }
  /* end steps 1 and 2 */

}


/**----------------------------------------------------------------------------
 * 4.6 Validating Forms
 * ----------------------------------------------------------------------------
 * Our form is allowing users to add comments with empty responses. We don't 
 * want that to happen, so let's add some validation.
 * 
 * 1. Within _handleSubmit(), right after the event.preventDefault() call, 
 * let's add an if statement that checks whether the value property of 
 * this._author or this._body is falsy.
 * 
 * One way we can test for falsyness in JavaScript is to negate the value. 
 * For example, to test if val is falsy by using:
 * 
 *   if (!val) {
 *     alert('I am falsy!');
 *   }
 * 
 * 2. If the conditions of the if statement are met, let's call the alert() 
 * function with "Please enter your name and comment" as the argument.
 * 
 * 3. Finally, let's add a return statement after the alert() call to keep the 
 * comment from being added.
*/

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
    /* Aqui tratará a lógica para analisar se um determinado post
      é abusivo ou não. */
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

  /* Método responsável por remover o post abusivo (através do click) */
  _toggleAbuse(event) {
    event.preventDefault();

    this.setState({
      isAbusive: !this.state.isAbusive
    });
  }
}

/* Componente - Caixa de Comentários */
class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: [
        { id: 1, author: 'Morgan McCircuit', body: 'Great picture!', avatarUrl: 'images/default-avatar.png' },
        { id: 2, author: 'Bending Bender', body: 'Excellent stuff', avatarUrl: 'images/default-avatar.png' }
      ]
    };
  }

  render() {
    /* Aqui é para poder mostrar os comentários disponíveis */
    const comments = this._getComments();
    return (
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />
        <h3>Comments</h3>
        {this._getPopularMessage(comments.length)}
        <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
        <div className="comment-list">
          {comments}
        </div>
      </div>
    );
  }

  /* Método para poder retornar o post mais popular enviado  */
  _getPopularMessage(commentCount) {
    const POPULAR_COUNT = 10;
    if (commentCount > POPULAR_COUNT) {
      return (
        <div>This post is getting really popular, don't miss out!</div>
      );
    }
  }

  /* Método para poder retornar o array dos elementos do JSX */
  _getComments() {
    return this.state.comments.map((comment) => {
      return (<Comment
        author={comment.author}
        body={comment.body}
        avatarUrl={comment.avatarUrl}
        key={comment.id} />);
    });
  }

  /* Método para poder retornar a quantidade de comentários postados pelos usuários */
  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  }

  /* Método responsável por adicionar comentários no formulário */
  _addComment(commentAuthor, commentBody) {
    let comment = {
      id: Math.floor(Math.random() * (9999 - this.state.comments.length + 1)) + this.state.comments.length,
      author: commentAuthor,
      body: commentBody
    };

    /* Aqui irei inserir o comentário que foi recém adicionado */
    this.setState({
      comments: this.state.comments.concat([comment])
    });
  }
}

/* Componente responsável para adicionar comentários - Formulário */
class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = {
      characters: 0
    };
  }

  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <label>New comment</label>
        <div className="comment-form-fields">
          <input placeholder="Name:" ref={c => this._author = c} />
          <textarea placeholder="Comment:" ref={c => this._body = c} onChange={this._getCharacterCount.bind(this)}></textarea>
        </div>
        <p>{this.state.characters} characters</p>
        <div className="comment-form-actions">
          <button type="submit">
            Post comment
            </button>
        </div>
      </form>
    );
  }

  /* Método responsável por contar a quantidade de caracteres digitados na 'textarea'  */
  _getCharacterCount(e) {
    this.setState({
      characters: this._body.value.length
    });
  }

  /* Método responsável por enviar o comentário para o post e 'setar' os campos depois de enviado */
  _handleSubmit(event) {
    event.preventDefault();
    /* start steps 1, 2, 3*/
    if (!this._author.value || !this._body.value) {
      alert('Please enter your name and comment');
      return;
      /* end steps 1, 2, 3*/
    }

    this.props.addComment(this._author.value, this._body.value);

    this._author.value = '';
    this._body.value = '';

    this.setState({ characters: 0 });
  }
}

