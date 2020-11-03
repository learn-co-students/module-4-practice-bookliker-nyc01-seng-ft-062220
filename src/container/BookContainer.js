import React, {Component} from 'react'
import { Container, Menu } from "semantic-ui-react";
import BookCard from '../components/BookCard'
import BookList from '../components/BookList'

class BookContainer extends Component {

    state = {
        books: [], 
        currentBook: [], 
    }

    componentDidMount = () => {
        fetch('http://localhost:3000/books')
        .then(resp => resp.json())
        .then(resp => this.setState({
            books: resp, 
            currentBook: resp[0]
        }))
    }

    renderBookList = () => {
        return this.state.books.map(bookObj => <BookList key={bookObj.id} book={bookObj} chooseBook={this.chooseBook} />)
    }

    chooseBook = (bookObj) => {
        console.log(bookObj)
        this.setState({currentBook: bookObj})
    }

    toggleHandler = (bookObj) => {
        let filteredArray = this.state.books.filter(book => book.id !== bookObj.id)
        this.setState({books: [...filteredArray, bookObj].sort((a,b) => a.id - b.id)})
    }

    render(){
        
        return (
            <main>
                <Menu vertical inverted>
                    {this.renderBookList()}
                </Menu>
                <Container text>
                    <BookCard book={this.state.currentBook} toggleHandler={this.toggleHandler}/>
                </Container>
            </main>
        )
    }
}

export default BookContainer