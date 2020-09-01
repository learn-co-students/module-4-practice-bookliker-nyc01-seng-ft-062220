import React from "react";
import {Menu} from "semantic-ui-react"

const BookList = (props) => {

    const clickHandler = (e) => {
        props.chooseBook(props.book)
    }

    return (
        <Menu vertical inverted>
            <Menu.Item onClick={clickHandler}>
                {props.book.title}
            </Menu.Item>
        </Menu>
    )
}

export default BookList;