import React from 'react'
import { Menu } from "semantic-ui-react";

const BookList = ({book, chooseBook}) => {
    
    const clickHandler = (e) => {
        chooseBook(book)
    }

    return (
        <Menu.Item as={"a"} onClick={clickHandler}>
            {book.title}
        </Menu.Item>
    )
}

export default BookList