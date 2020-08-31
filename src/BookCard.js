import React from "react";

import {
    Container,
    Header,
    Menu,
    Button,
    List,
    Image
  } from "semantic-ui-react";



class BookCard extends React.Component {





    mapUsers = (book) => {
        return book.users.map(user => <List.Item content={user.username} /> )
    }

    render() {
        let book = this.props.selectedBook
 
        return (
            book === '' ? 

            null 
            
            :

            <Container text >
            <Header>{book.title}</Header>
            <Image
              src={book.img_url}
              size="small"
            />
            <p>{book.description}</p>
            <Button
              onClick={this.props.increaseLikes}
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
              { this.mapUsers(book) }
            </List>
          </Container>
        )
    }

}

export default BookCard