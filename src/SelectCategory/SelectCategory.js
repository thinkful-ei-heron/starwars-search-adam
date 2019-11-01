import React from 'react';
import ValidationError from '../ValidationError/ValidationError';
import Context from '../Context';
import Results from '../Results/Results';


class SelectCategory extends React.Component {
    state = {
        STORE: [],
        currentKeyword: '',
        touched: false,
        pages: null
    }

    getCategoryData = (category) => {
        console.log(category)
        const endpoint = category.toLowerCase();
        const newArray = []
        fetch(`https://swapi.co/api/${endpoint}`)
            .then(res => res.json())
            .then(res => Math.ceil(res.count / 10))
            .then((pages) => {
                for (let i = 1; i <= pages; i++) { 
                    fetch(`https://swapi.co/api/${endpoint}/?page=${i}`)
                        .then(res => res.json())

                        .then(res => newArray.push(res.results)
                            
                        )
                        .catch(err => console.log('Something went wrong, please try again later'));
                }
            })
            .catch(err => console.log('Something went wrong, please try again later'))
            console.log(newArray)
            this.setState(newArray)

    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
        const filteredSTORE = this.state.STORE.filter(obj => obj.name.includes(this.state.currentKeyword))
        console.log(filteredSTORE)
        this.setState({
            STORE: filteredSTORE
        })
    }

    updateKeyword = (keyword) => {
        this.setState({
            currentKeyword: keyword,
            touched: true
        })
    }

    validateKeyword = () => {
        const keyword = this.state.currentKeyword.trim();
        if (keyword.length === 0) {
            return 'This is a required field';
        }
    }

    render() {
        const value = {
            STORE: this.state.STORE,
            currentKeyword: this.state.currentKeyword
        };
        return (
            <Context.Provider value={value}>
                <main className='main-content'>
                    <div className='forms-container'>
                        <form className='select-form'>
                            <h2>Search the Entire Star Wars Universe!</h2>
                            <div className='select-group'>
                                <label htmlFor='category' className='select-category'>Search by Planets, Spaceships, Vehicles, People, Films, or Species:</label>
                                <select onChange={(e) => this.getCategoryData(e.target.value)} className='select-search-category' name='category' id='category'>
                                    <option value=''>--Select a category--</option>
                                    <option value='Planets'>Planets</option>
                                    <option value='Starships'>Starships</option>
                                    <option value='Vehicles'>Vehicles</option>
                                    <option value='People'>People</option>
                                    <option value='Films'>Films</option>
                                    <option value='Species'>Species</option>
                                </select>
                            </div>
                        </form>

                        <form className='submit-form' onSubmit={(e) => this.handleSubmit(e)}>
                            <label htmlFor={this.currentCategory} className='search-label'>{this.currentCategory}</label>
                            <input onChange={(e) => this.updateKeyword(e.target.value)} type='text' className='search-input' id={this.currentCategory} value={this.state.currentKeyword} />
                            {this.state.touched && <ValidationError message={this.validateKeyword()} />}
                            <button type='submit' className='submit-button'
                                disabled={this.validateKeyword()}>
                                Search
                        </button>
                        </form>

                    </div>
                    <Results />
                </main>
            </Context.Provider>
        )
    }
}

export default SelectCategory;