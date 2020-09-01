import React from "react";
import {Image, Header, List} from "semantic-ui-react"


class Book extends React.Component {
    state = {
        currentUser: {id:1, username: "pouros"}
    }

    renderUsers = () => {
        return this.props.book.users.map(userObj => <List.Item key={userObj.id} icon="user" content={userObj.username}/>)
    }

    clickHandler = () => {
        if (this.props.book.users.map(userObj => userObj.id).includes(this.state.currentUser.id)){
            let newBookObj = this.props.book.users.filter(userObj => userObj.id !== this.state.currentUser.id)
            this.props.book.users = newBookObj
            this.props.userToggleHandler(this.props.book)
            this.patchBook(this.props.book)
        } else {
            this.props.book.users.push(this.state.currentUser)
            this.props.userToggleHandler(this.props.book)
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
        return (
            <>
                <Header>{this.props.book.title}</Header>
                <Image
                src={this.props.book.img_url}
                size="small"
                />
                <p>Book description:</p>
                <p>{this.props.book.description}</p>
                <button onClick={this.clickHandler}> {"👍"} Like</button>
                <Header>Liked by: {this.props.book.users.length} users</Header>
                <List>
                    {this.renderUsers()}
                </List>
            </>
        )
    }
}

export default Book;