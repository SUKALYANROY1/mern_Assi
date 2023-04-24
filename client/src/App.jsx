import { useEffect, useState } from 'react'
import axios from 'axios'

import UserTable from './components/UserTable'



const queries = [
  {
    title: '1. Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.',
    query: (user) => parseInt(user.income.substring(1)) < 5 && (user.car === 'BMW' || user.car === 'Mercedes-Benz'),
  },
  {
    title: '2. Male Users which have phone price greater than 10,000.',
    query: (user) => user.gender === 'Male' && parseInt(user.phone_price) > 10000,
  },
  {
    title: '3. Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.',
    query: (user) => user.last_name.at(0) === 'M' && user.quote.length > 15 && user.email.includes(user.last_name.toLowerCase())
  },
  {
    title: '4. Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.',
    query: (user) => ['BMW', 'Mercedes-Benz', "Audi"].includes(user.car) && !/\d/.test(user.email)
  },
]

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/users')
        setUsers(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="app flex flex-col justify-center align-center gap-10">
      {
        queries.map((item, idx) => (
          <div key={idx}>
            <h3 className='text-xl'>{item.title}</h3>
            <UserTable users={users.filter(item.query)} />
          </div>
        ))
      }
      {/* <CityTable /> */}
    </div>
  )
}

export default App