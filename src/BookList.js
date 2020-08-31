import React from "react";
import BookCard from "./BookCard"

import {
    Container,
    Header,
    Menu,
    Button,
    List,
    Image
  } from "semantic-ui-react";
  

class BookList extends React.Component {

    render() {
        let book = this.props.data.map(bookObj => <li onClick={(key) => this.props.clickHandler(key)} key={bookObj.id} >{bookObj.title}</li>)
            return (
                <ul>
                    { book }
                </ul>
            )
    }

}

export default BookList