import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Modal from './components/modal'
import phoneService from './components/server-comm'

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [messageBox, setMessageBox] = useState(null);
    useEffect(() => {
        phoneService.getPeople().then(people => setPersons(people)).catch(err => console.log('Connection failed'));
    }, [])

    const addName = (event) => {
        event.preventDefault();
        //trimming spaces or tabs at the beggining or end of string
        let trimmed = newName ? newName.replace(/^[\s]+|[\s]+$/g, '') : '';
        let alreadyAdded = false, existingID = 0;
        for (let index = 0; index < persons.length; index++) {
            if (checkForExistingName(persons[index]['name'], trimmed)) {
                alreadyAdded = true;
                existingID = persons[index]['id'];
                break;
            }
        }
        if (!/\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})/g.test(newNumber)) {
            alert(`Invalid phone number input format, try (xxx) xxx xxxx/ xxx-xxx-xxxx/(xxx)xxxxxxx/xxx.xxx.xxxx or just xxxxxxxxxx `)
        }
        else if (alreadyAdded) {
            return (window.confirm(`${trimmed} is already added to phonebook, replace the old number with a new one?`))
                ?
                ((id) => {
                    let personToChange = persons.find(p => p.id === id);
                    const changedNum = { ...personToChange, number: newNumber };
                    return phoneService.updatePerson(id, changedNum)
                        .then((returnedNum) => setPersons(persons.map(person => person.id !== id ? person : returnedNum)))
                        .catch(error => {
                            displayMsgBox({message: `Information of ${trimmed} has already been removed from server`,style:{ color: 'red',border: 'red 3px solid', fontSize: 18}})
                            persons.filter(p => p !== p.id);
                        })
                        .finally(() => { setNewName(''); setNewNumber(''); });
                })(existingID)
                :
                setNewName('');
        }
        else {
            phoneService.createPerson({ name: trimmed, number: newNumber })
                .then(person => {
                    console.log('succesfully created');
                    setPersons([...persons, person])
                    setNewName('');
                    setNewNumber('');
                })
                .catch(err => console.log('invalid entry data', err))
                .finally(() => displayMsgBox({message: `Added ${trimmed} to the phonebook`,style:{ color: 'green',border: 'green 3px solid', fontSize: 18}}));
        }
    }

    const handleNameChange = (event) => {
        //Only matches word characters, followed by either zero to one dot or a space. For example.- Dr. Stone
        let filterInput = evalAndTrim(event.target.value, /[a-z]+\.?\s?/gi);
        setNewName(filterInput);
    }

    const handleNumberChange = (event) => {
        //Only matches numeric,dots and parenthesis
        let filterInput = evalAndTrim(event.target.value, /[0-9()\s.-]/g);
        setNewNumber(filterInput);
    }

    const updateFilter = (event) => {
        let filterInput = evalAndTrim(event.target.value, /[a-z]+\.?\s?/gi);
        setFilter(filterInput);
    }

    const filteredList = () => {
        let returnFilteredPerson = (name) => {
            let re = new RegExp(filter, 'gi');
            return re.test(name);
        }
        let filterPersons = persons.filter((person) => {
            return (!filter) ? person : returnFilteredPerson(person.name);
        });
        return (filterPersons.map(person => <div key={person.name} > {person.name} {person.number} <button onClick={() => deleteNumberandUpdateList(person.name, person.id)}>delete</button></div>))
    }

    const deleteNumberandUpdateList = (name, id) => {
        return (window.confirm(`Delete ${name}?`))
            ?
            phoneService.deletePerson(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                })
                .catch(err => console.log('Unable to delete current person this time'))
            : false;
    }

    const checkForExistingName = (person, newName) => {
        if (newName) {
            return (newName.toLowerCase() === person.toLowerCase()) ? true : false;
        } else {
            return false;
        }
    }

    const displayMsgBox = (msg) => {
        setMessageBox(msg);
        setTimeout(() => {
            setMessageBox(null);
        }, 3000);
    }


    return (<div >
        <h2 > Phonebook </h2> 
        <Modal msg={messageBox} />
        <
            Filter filter={filter}
            updateFilter={updateFilter} />
        <h2 > Add a new contact </h2> <
            PersonForm addName={addName}
            newName={newName}
            newNumber={newNumber}
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange} />
        <h2 > Numbers </h2> <Persons filteredList={filteredList} /> </div>
    )
}

const evalAndTrim = (str, regex) => {
    str = str.match(regex);
    return !(str) ? '' : str.join('');
}


export default App