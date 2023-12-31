import { useState } from 'react'

const PersonForm = ({
  name, 
  handleNameChange,
  number,
  handleNumberChange,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input 
                value={name} 
                onChange={handleNameChange}
              />
      </div>
      <div>
        number: <input
                  value={number}
                  onChange={handleNumberChange}
                />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({value, handleChange}) => {
  return (
    <>
      filter shown with <input 
                        value={value}
                        onChange={handleChange}
                      /> 
    </>
  )
}

const Person = ({person}) => <div>{person.name} {person.phone}</div>

const Persons = ({persons}) => {
  return (
    <>
      {persons.map(person => 
        <Person key={person.name} person={person} /> 
      )}
    </>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      phone: '040-1234567'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setNewFilter] = useState('')

  const personsToShow = filter.trim().length > 0
    ? persons.filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  const handleAddPersonFormSubmit = (e) => {
    e.preventDefault();
    const sanitizedNewName = newName.trim()
    const sanitizedNewPhone = newPhone.trim()

    if (sanitizedNewName.length <= 0 || sanitizedNewPhone.length <= 0) {
      return;
    }

    const personDuplicateIndex = persons.findIndex(curPerson => {
      return curPerson.name === sanitizedNewName
    })
    
    if (personDuplicateIndex !== -1) {
      alert(`${sanitizedNewName} is already added to phonebook`)
      return;
    }

    const newPerson = {
      name: sanitizedNewName,
      phone: sanitizedNewPhone
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewPhone('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleChange={(e) => setNewFilter(e.target.value)} />
      
      <h2>add a new</h2>
      <PersonForm 
        name={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        number={newPhone}
        handleNumberChange={(e) => setNewPhone(e.target.value)} 
        handleSubmit={handleAddPersonFormSubmit}
      />
      
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App