import { useState } from 'react'

const Person = ({person}) => <div>{person.name}</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleAddPersonFormSubmit = (e) => {
    e.preventDefault();
    const sanitizedNewName = newName.trim()

    if (sanitizedNewName.length <= 0) {
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
      name: sanitizedNewName
    }
    
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPersonFormSubmit}>
        <div>
          name: <input 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <Person key={person.name} person={person} /> 
      )}
    </div>
  )
}

export default App