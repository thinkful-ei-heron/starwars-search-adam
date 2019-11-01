import React from 'react';
import Context from '../Context';

class Results extends React.Component {
    static contextType = Context 
    render() {
        const filteredItems = this.context.STORE.filter(obj => obj.name === this.context.currentKeyword);
        return (
            <div className='results-container'>
                {filteredItems.map(obj => {
                    return (
                        <div className='result-item'>
                            {obj.name}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Results;