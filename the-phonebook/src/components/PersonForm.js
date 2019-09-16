import React from 'react'

const PersonForm = (props) => {
    return (<form onSubmit={props.addName}>
        <div>
            name: <input value={props.newName} onChange={props.handleNameChange} required />
        </div>
        <div>
            number: <input value={props.newNumber} onChange={props.handleNumberChange} required />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>)
}

export default PersonForm