import React from "react";
import BookList from "../Component/BookList"
import Book from "../Component/Book"

class BookContainer extends React.Component {
    state = {
        books: [],
        book: []
    }

    componentDidMount() {
        this.getBooks()
    }

    getBooks = () => {
        fetch("http://localhost:3000/books")
        .then(resp => resp.json())
        .then(books => this.setState({books: books}))
    }

    chooseBook = (bookObj) => {
        this.setState({book: [bookObj]})
    }

    userToggleHandler = (bookObj) => {
            let filteredArray = this.state.books.filter(book => book.id !== bookObj.id)
            this.setState({books: [...filteredArray, bookObj].sort((a,b) => a.id - b.id)})
        }
    
    renderBookList = () => {
        return this.state.books.map(bookObj => <BookList key={bookObj.id} book={bookObj} chooseBook={this.chooseBook} />)
    }

    renderBookCard = () => {
        return this.state.book.map(bookObj => <Book key={bookObj.id} book={bookObj} userToggleHandler={this.userToggleHandler} />)
    }
 
    render(){
        return(
            <>
                <div className="book-list">{this.renderBookList()}</div>
                <div className="book-card">{this.renderBookCard()}</div>
            </>
        )
    }
}

export default BookContainer;