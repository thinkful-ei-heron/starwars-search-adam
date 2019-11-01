import React from 'react';
import SelectCategory from './SelectCategory/SelectCategory';

class App extends React.Component {
  
  handleSearchSubmit = () => {

  }
  render() {
    return (
      <div className='App'>
        <header>
          <h1>Star Wars Search</h1>
        </header>
        <main>
          <SelectCategory />
        </main>
      </div>
    );
  }
}

export default App;