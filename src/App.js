import React from "react";
import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image
} from "semantic-ui-react";

class App extends React.Component {

  state = {
    books: [],
    bookTitle: "",
    bookDesc: "",
    bookImg: "",
    users: [],
    liked: false
  }

  componentDidMount() {
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(books => this.setState({books: books}))
  }

  clickHandler = (e) => {
    let bookTitle = e.target.innerText

    let selectedBook = this.state.books.find(book => book.title === bookTitle)
    
    this.setState({
      bookTitle: selectedBook.title,
      bookDesc: selectedBook.description,
      bookImg: selectedBook.img_url,
      users: selectedBook.users
    })
  }

  likeHandler = (e) => {
    let newStatus = !this.state.liked
    
    let newArray = [...this.state.users]

    let book = this.state.books.find(book => book.description === this.state.bookDesc)
    
    if (newStatus === true ) {

      const options ={
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            "accept": "application/json"
          },
          body: JSON.stringify({
            users: [...newArray, {id: 1, username: "pouros"}]
          })
        }
  
        fetch(`http://localhost:3000/books/${book.id}`, options)
        .then(res => res.json())
        .then(res => {
          this.setState({
            users: [...this.state.users, {id: 1, username: "pouros"}],
            liked: newStatus
          })
        })

    } else {
      const options ={
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({
          users: [newArray.pop()]
        })
      }

      fetch(`http://localhost:3000/books/${book.id}`, options)
        .then(res => res.json())
        .then(res => {
          this.setState({
            liked: newStatus
          })
        })
    }

  }

  render() {

    return (
      <div>
        <Menu inverted>
          <Menu.Item header>Bookliker</Menu.Item>
        </Menu>
        <main>
          <Menu vertical inverted>
            {this.state.books.map(book => <Menu.Item as={"a"} onClick={this.clickHandler}>
              {book.title}
            </Menu.Item>)}
          </Menu>
          <Container text>
            <Header>{this.state.bookTitle === "" ? 'Book title' : this.state.bookTitle}</Header>
              {this.state.bookImg === "" ? <Image src="https://react.semantic-ui.com/images/wireframe/image.png" size="small" />: <Image src={this.state.bookImg} size="small" />}
            
            <p>{this.state.bookDesc === "" ? 'Book description' : this.state.bookDesc}</p>
            <Button
              onClick={this.likeHandler}
              color="red"
              content="Like"
              icon="heart"
              label={{
                basic: true,
                color: "red",
                pointing: "left",
                content: "2,048"
              }}
            />
            <Header>Liked by</Header>
            <List>
              {this.state.users.length === 0 ? <List.Item icon="user" content="User name" />: this.state.users.map(user => <List.Item icon="user" content={user.username} />)}
            </List>
          </Container>
        </main>
      </div>
    );
  }
}

export default App;
