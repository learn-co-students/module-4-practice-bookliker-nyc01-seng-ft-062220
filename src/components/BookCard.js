import React from 'react'
import {
    Container,
    Header,
    Button,
    List,
    Image
  } from "semantic-ui-react";

class BookCard extends React.Component {

    state = {
        currentUser: {id:1, username: "pouros"}
    }

    users = () => {
        return this.props.book.users.map(user => <List.Item key={user.id} icon="user" content={user.username} />)
    }

    clickHandler = () => {
        if (this.props.book.users.map(userObj => userObj.id).includes(this.state.currentUser.id)){
            let newBookObj = this.props.book.users.filter(userObj => userObj.id !== this.state.currentUser.id)
            this.props.book.users = newBookObj
            this.props.toggleHandler(this.props.book)
            this.patchBook(this.props.book)
        } else {
            this.props.book.users.push(this.state.currentUser)
            this.props.toggleHandler(this.props.book)
            this.patchBook(this.props.book)
        }
    }

    patchBook = (bookObj) => {
        const options = {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(bookObj)
        }

        fetch(`http://localhost:3000/books/${bookObj.id}`, options)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                window.alert("Sorry something went wrong")
                window.location.reload()
            }
        })
    }
    render(){
        let book = this.props.book
    
        return(
            <Container>
                <Header>{book.title}</Header>
                <Image
                    src={book.img_url}
                    size="small"
                />
                <p>{book.description}</p>
                { book.users? 
                
                <Button
                    color="red"
                    content="Like"
                    icon="heart"
                    onClick={this.clickHandler}
                    label={{
                    basic: true,
                    color: "red",
                    pointing: "left",
                    content: `${book.users.length}`
                    }}
                />
                :
                "loading..."
                }
                <Header>Liked by</Header>
                <List>
                    {book.users?
                    this.users()
                    :
                    "loading..."
                    }
                </List>
            </Container>
            )
    }

}

export default BookCard