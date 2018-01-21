/**----------------------------------------------------------------------------
 * 5.4 Loading Comments by AJAX
 * ----------------------------------------------------------------------------
 * Let's load comments from a remote server by using AJAX.
 *
 * 1. In CommentBox, instead of initializing the comments state with an array 
 * of objects, let's initialize it as an empty array so we can later populate 
 * it with data from the remote server.
 * 
 * 2. We started implementing the _fetchComments() method, but our success 
 * callback is still not complete. The callback function should have comments 
 * as its only argument. Then set the state of the component using the comments 
 * argument given to the callback.
 * 
 * 3. Now that our method to fetch comments is fully implemented, let's declare 
 * a new lifecycle method in CommentBox and call this._fetchComments() from 
 * there. We want our comments to start loading before our component starts the 
 * rendering process, so let's declare the appropriate lifecycle method for 
 * this operation.
 */

class CommentBox extends React.Component {
  constructor() {
    super();

    /* start step 1 */
    this.state = {
      showComments: false,
      comments: []
    };
    /* end step 1 */
  }

  render() {
    const comments = this._getComments();
    return (
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />

        {this._getPopularMessage(comments.length)}
        <h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>
        <div className="comment-list">
          {comments}
        </div>
      </div>
    );
  }

  _fetchComments() {
    $.ajax({
      method: 'GET',
      url: 'comments.json',
      /* start step 2 */
      success: (comments) => {
        this.setState({ comments });
      }
      /* end step 1 */
    });
  }
  /* start step 3 */
  componentWillMount() {
    this._fetchComments();
  }
  /* end step 3 */

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
        id={comment.id}
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
      body: commentBody,
      avatarUrl: 'images/default-avatar.png'
    };

    this.setState({
      comments: this.state.comments.concat([comment])
    });
  }

  _deleteComment(commentID) {
    const comments = this.state.comments.filter(
      comment => comment.id !== commentID
    );

    this.setState({ comments });
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

  _handleDelete(event) {
    event.preventDefault();

    if (confirm('Are you sure?')) {
      this.props.onDelete(this.props.id);
    }
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

  _getCharacterCount(e) {
    this.setState({
      characters: this._body.value.length
    });
  }

  _handleSubmit(event) {
    event.preventDefault();

    if (!this._author.value || !this._body.value) {
      alert('Please enter your name and comment.');
      return;
    }

    this.props.addComment(this._author.value, this._body.value);

    this._author.value = '';
    this._body.value = '';

    this.setState({ characters: 0 });
  }
}


/**----------------------------------------------------------------------------
* 5.5 Implementing a List of Authors
* -----------------------------------------------------------------------------
* Let's add a new feature to our app: Let's display a list of author avatars 
* above the comment list. We have added a new component to our app called 
* CommentAvatarList to help with displaying the author avatars.
*
* 1. We added a new method to CommentBox called _getAvatars(). Make this 
* method return an array of avatarUrl strings by using the map() function on 
* the comments property of the state.
* 
* 2. Now let's go to the render() method of CommentBox and invoke the 
* <CommentAvatarList /> component immediately after the <CommentForm /> 
* component.
* 
* 3. Lastly, let's pass an avatars prop to the CommentAvatarList component 
* with the value returned by the this._getAvatars() method.
*/

class CommentBox extends React.Component {

  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: []
    };
  }

  componentWillMount() {
    this._fetchComments();
  }

  render() {
    const comments = this._getComments();
    return (
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />
        { /* start steps 2 and 3 */}
        <CommentAvatarList avatars={this._getAvatars()} />
        { /* end steps 2 and 3 */}
        {this._getPopularMessage(comments.length)}
        <h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>
        <div className="comment-list">
          {comments}
        </div>
      </div>
    );
  }

  _getAvatars() {
    /* start step 1 */
    return this.state.comments.map((comment) => comment.avatarUrl);
    /* end step 1 */
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
        id={comment.id}
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
      body: commentBody,
      avatarUrl: 'images/default-avatar.png'
    };

    this.setState({
      comments: this.state.comments.concat([comment])
    });
  }

  _fetchComments() {
    $.ajax({
      method: 'GET',
      url: 'comments.json',
      success: (comments) => {
        this.setState({ comments });
      }
    });
  }

  _deleteComment(commentID) {
    const comments = this.state.comments.filter(
      comment => comment.id !== commentID
    );

    this.setState({ comments });
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

  _handleDelete(event) {
    event.preventDefault();

    if (confirm('Are you sure?')) {
      this.props.onDelete(this.props.id);
    }
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

  _getCharacterCount(e) {
    this.setState({
      characters: this._body.value.length
    });
  }

  _handleSubmit(event) {
    event.preventDefault();

    if (!this._author.value || !this._body.value) {
      alert('Please enter your name and comment.');
      return;
    }

    this.props.addComment(this._author.value, this._body.value);

    this._author.value = '';
    this._body.value = '';

    this.setState({ characters: 0 });
  }
}

class CommentAvatarList extends React.Component {
  render() {
    const { avatars = [] } = this.props;
    return (
      <div className="comment-avatars">
        <h4>Authors</h4>
        <ul>
          {avatars.map((avatarUrl, i) => (
            <li key={i}>
              <img src={avatarUrl} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}


/**----------------------------------------------------------------------------
* 5.7 Passing Functions as Props
* -----------------------------------------------------------------------------
* Our comment delete functionality is almost fully implemented, but we're not 
* passing the onDelete prop to the Comment component yet.
*
* In the _getComments() method, let's pass an onDelete prop and give it 
* the _deleteComment method.
*/

class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: []
    };
  }

  componentWillMount() {
    this._fetchComments();
  }

  render() {
    const comments = this._getComments();
    return (
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />
        <CommentAvatarList avatars={this._getAvatars()} />
        {this._getPopularMessage(comments.length)}
        <h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>
        <div className="comment-list">
          {comments}
        </div>
      </div>
    );
  }

  _getComments() {
    return this.state.comments.map((comment) => {
      return (<Comment
        id={comment.id}
        author={comment.author}
        body={comment.body}
        avatarUrl={comment.avatarUrl}
        { /* start step 1 */ }
        onDelete={this._deleteComment.bind(this)}
        { /* end step 1 */ }
        key={comment.id} />);
    });
  }

  _getAvatars() {
    return this.state.comments.map(comment => comment.avatarUrl);
  }

  _getPopularMessage(commentCount) {
    const POPULAR_COUNT = 10;
    if (commentCount > POPULAR_COUNT) {
      return (
        <div>This post is getting really popular, don't miss out!</div>
      );
    }
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
      body: commentBody,
      avatarUrl: 'images/default-avatar.png'
    };

    this.setState({
      comments: this.state.comments.concat([comment])
    });
  }

  _fetchComments() {
    $.ajax({
      method: 'GET',
      url: 'comments.json',
      success: (comments) => {
        this.setState({ comments });
      }
    });
  }

  _deleteComment(commentID) {
    if (!commentID) {
      return;
    }

    const comments = this.state.comments.filter(
      comment => comment.id !== commentID
    );

    this.setState({ comments });
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
          <a href="#" onClick={this._handleDelete.bind(this)}>Delete comment</a>
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

  _handleDelete(event) {
    event.preventDefault();

    if (confirm('Are you sure?')) {
      this.props.onDelete(this.props.id);
    }
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

  _getCharacterCount(e) {
    this.setState({
      characters: this._body.value.length
    });
  }

  _handleSubmit(event) {
    event.preventDefault();

    if (!this._author.value || !this._body.value) {
      alert('Please enter your name and comment.');
      return;
    }

    this.props.addComment(this._author.value, this._body.value);

    this._author.value = '';
    this._body.value = '';

    this.setState({ characters: 0 });
  }
}

class CommentAvatarList extends React.Component {
  render() {
    const { avatars = [] } = this.props;
    return (
      <div className="comment-avatars">
        <h4>Authors</h4>
        <ul>
          {avatars.map((avatarUrl, i) => (
            <li key={i}>
              <img src={avatarUrl} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}


/**----------------------------------------------------------------------------
* 5.8 Better UI for Delete Confirmation 
* -----------------------------------------------------------------------------
* Let's add one last feature to our app: Instead of using the browser's native 
* confirm() function, let's make our own inline confirmation message in the 
* Comment component.
*
* We have added a new component to our app called RemoveCommentConfirmation 
* that will help us get this done.
* 
* 1. In the Comment component's render() method, let's replace the <a> tag 
* that contains the "Delete comment" text with our new component 
* <RemoveCommentConfirmation />. Then, let's give this component an onDelete 
* prop that calls the _handleDelete() method.
* 
* 2. Now in the RemoveCommentConfirmation component, let's add a new property 
* to the state called showConfirm and initialize it to false.
* 
* 3. Still in RemoveCommentConfirmation, within the _confirmDelete() method, 
* call the onDelete() method that was passed to this component through props.
*/

/* Componente responsável pelos comentários realizados pelos usuários */
class Comment extends React.Component {
  /* Todas as vezes que usamos 'this.state' devemos usar o 'constructor() 
  + super()' */
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

    /* Aqui tratará a lógica para analisar se um determinado post é abusivo ou 
    não. */
    if (!this.state.isAbusive) {
      commentBody = this.props.body
    } else {
      commentBody = <em>Post marcado como abusivo!</em>;
    }

    return (
      <div className="comment">
        <img src={this.props.avatarUrl} alt={`${this.props.author} fotos`} />
        <p className="comment-header">{this.props.author}</p>
        <p className="comment-body">{commentBody}</p>
        <div className="comment-actions">
          { /* start step 1 */}
          <RemoveCommentConfirmation onDelete={this._handleDelete.bind(this)} />
          { /* end step 1 */}
          <a href='#' onClick={this._toggleAbuse.bind(this)}>Reportar como Abusivo</a>
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

  /* Método responsável por apresentar um evento que permitirá interagir com 
      o usuário para confirmar se ele tem certeza sobre a exclusão do comentário */
  _handleDelete(event) {
    this.props.onDelete(this.props.id);
  }
}

/* Componente - Caixa de Comentários */
class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: []
    };
  }

  componentWillMount() {
    this._fetchComments();
  }

  render() {
    /* Mostra comentários disponíveis */
    const comments = this._getComments();
    return (
      <div className="comment-box">
        <CommentForm addComment={this._addComment.bind(this)} />
        <CommentAvatarList avatars={this._getAvatars()} />
        {this._getPopularMessage(comments.length)}
        <h3 className="comment-count">{this._getCommentsTitle(comments.length)}</h3>
        <div className="comment-list">
          {comments}
        </div>
      </div>
    );
  }

  /* Método responsável por retornar as imagens de acordo com os posts enviados */
  _getAvatars() {
    return this.state.comments.map((comment) => comment.avatarUrl);
  }

  /* Método para poder retornar o post mais popular enviado  */
  _getPopularMessage(commentCount) {
    const POPULAR_COUNT = 10;

    if (commentCount > POPULAR_COUNT) {
      return (
        <div>Este post é bastante popular! Fique por dentro desse post!!!</div>
      );
    }
  }

  /* Método para poder retornar o array dos elementos do JSX */
  _getComments() {
    return this.state.comments.map((comment) => {
      return (<Comment
        id={comment.id}
        author={comment.author}
        body={comment.body}
        avatarUrl={comment.avatarUrl}
        onDelete={this._deleteComment.bind(this)}
        key={comment.id} />);
    });
  }

  /* Método para poder retornar a quantidade de comentários postados 
      pelos usuários*/
  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'Sem comentários ainda...';
    } else if (commentCount === 1) {
      return '1 comentário';
    } else {
      return `${commentCount} comentários`;
    }
  }

  /* Método responsável por adicionar comentários no formulário */
  _addComment(commentAuthor, commentBody) {
    let comment = {
      id: Math.floor(Math.random() * (9999 - this.state.comments.length + 1)) + this.state.comments.length,
      author: commentAuthor,
      body: commentBody,
      avatarUrl: 'images/avatar-default.png'
    };

    /* Aqui irei inserir o comentário que foi recém postado */
    this.setState({
      comments: this.state.comments.concat([comment])
    });
  }

  /* Método responsável por recuperar os dados já inclusos no arquivo 
      'components.json' - data store */
  _fetchComments() {
    $.ajax({
      method: 'GET',
      url: 'scripts/components.json',
      success: (comments) => {
        this.setState({ comments });
      }
    });
  }

  /* Método responsável por deletar os comentários pelo ID */
  _deleteComment(commentID) {
    const comments = this.state.comments.filter(
      comment => comment.id !== commentID
    );

    this.setState({ comments });
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
        <label>Novo Comentário</label>
        <div className="comment-form-fields">
          <input placeholder="Nome:" ref={c => this._author = c} />
          <textarea placeholder="Comentário:" ref={c => this._body = c} onChange={this._getCharacterCount.bind(this)}></textarea>
        </div>
        <p>{this.state.characters} caracteres</p>
        <div className="comment-form-actions">
          <button type="submit">Postar Comentário</button>
        </div>
      </form>
    );
  }

  /* Método responsável por contar a quantidade de caracteres digitados 
  na 'textarea' */
  _getCharacterCount(e) {
    this.setState({
      characters: this._body.value.length
    });
  }

  /* Método responsável por enviar o comentário para o post e 'setar' os 
      campos depois de enviado */
  _handleSubmit(event) {
    event.preventDefault();

    if (!this._author.value || !this._body.value) {
      alert('Por favor, digite o seu nome e o comentário.');
      return;
    }

    this.props.addComment(this._author.value, this._body.value);

    this._author.value = '',
      this._body.value = ''

    this.setState({ characters: 0 });
  }
}

/* Componente responsável por adicionar os Avatars nos posts */
class CommentAvatarList extends React.Component {
  render() {
    const { avatars = [] } = this.props;

    return (
      <div className="comment-avatars">
        <h4>Autores</h4>
        <ul>
          {avatars.map((avatarUrl, i) => (
            <li key={i}><img src={avatarUrl} /></li>
          ))}
        </ul>
      </div>
    );
  }
}

/* Componente responsável pela confirmação da exclusão do post já enviado!! */
class RemoveCommentConfirmation extends React.Component {
  constructor() {
    super();

    this.state = {
      /* start step 2 */
      showConfirm: false
      /* end step 2 */
    };
  }

  render() {
    let confirmNode;

    if (this.state.showConfirm) {
      return (
        <span>
          <a href="" onClick={this._confirmDelete.bind(this)}>Sim </a> - ou -
          <a href="" onClick={this._toggleConfirmMessage.bind(this)}> Não</a>
        </span>
      );
    } else {
      confirmNode = <a href="" onClick={this._toggleConfirmMessage.bind(this)}>Deseja Excluir Comentário?</a>;
    }
    return (
      <span>{confirmNode}</span>
    );
  }

  _toggleConfirmMessage(e) {
    e.preventDefault();

    this.setState({
      showConfirm: !this.state.showConfirm
    });
  }

  _confirmDelete(e) {
    e.preventDefault();
    /* start step 3 */
    this.props.onDelete(this.props.id);
    /* end step 3 */
  }
}

let target = document.getElementById('comment-app');

ReactDOM.render(<CommentBox />, target); 