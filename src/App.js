import React from "react";
import { Menu } from "semantic-ui-react";
import BookContainer from './container/BookContainer'

function App() {
  return (
    <div>
      <Menu inverted>
        <Menu.Item header>Bookliker</Menu.Item>
      </Menu>
      <main>
          <BookContainer />
      </main>
    </div>
  );
}

export default App;
