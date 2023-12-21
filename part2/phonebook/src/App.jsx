import { useState } from 'react'

const Person = ({person}) => <div>{person.name} {person.phone}</div>

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
      filter shown with <input 
                          value={filter}
                          onChange={(e) => setNewFilter(e.target.value)}
                        />
      <h2>add a new</h2>
      <form onSubmit={handleAddPersonFormSubmit}>
        <div>
          name: <input 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)}
                />
        </div>
        <div>
          number: <input
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <Person key={person.name} person={person} /> 
      )}
    </div>
  )
}

export default App