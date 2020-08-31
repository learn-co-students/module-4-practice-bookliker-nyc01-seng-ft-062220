import React from "react";

import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image
} from "semantic-ui-react";

import BookList from "./BookList";
import BookCard from "./BookCard";

class App extends React.Component {

  state = {
    books: [],
    selectedBook: ''
}

componentDidMount() {
    fetch('http://localhost:3000/books')
        .then(res => res.json())
        .then(books => this.setState({ books: books }))
}

  clickHandler = (key) => {
    this.selectedBook(key.target.innerText)
  }

  selectedBook = (book) => {
    const found = this.state.books.find(ele => ele.title === book)
    this.setState({...this.state, selectedBook: found})
  }

  increaseLikes=()=>{
    const found = this.state.selectedBook.users.find(user => user.id === 1)
    const bookId = this.state.selectedBook.id

  if (found === undefined ) {
    this.setState( {...this.state.selectedBook.users.push({ 
      "id":1, 
      "username":"pouros" 
    })} )
    this.updateLikes(bookId)
  } else {
    let idx = this.state.selectedBook.users.indexOf({ 
      "id":1, 
      "username":"pouros" 
    })
    
    this.setState({...this.state.selectedBook.users.splice(idx, 1)})
    this.updateLikes(bookId)
  }

  }

  updateLikes =(bookId)=>{
    fetch(`http://localhost:3000/books/${bookId}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        this.state.selectedBook
      )
    })
  }


  render() {

    return (
      <div>
        <Menu inverted>
          <Menu.Item header>Bookliker</Menu.Item>
        </Menu>
        <main>
          <Menu vertical inverted>
            <Menu.Item as={"a"} >
              <BookList clickHandler={this.clickHandler} data={this.state.books}/>
            </Menu.Item>
            </Menu>
          <BookCard selectedBook={this.state.selectedBook} increaseLikes={this.increaseLikes} />
        </main>
      </div>
    );
  }
}

export default App;
