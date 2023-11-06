import { React, useState, useEffect } from 'react';

function app() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:3000/api/read")
      .then(response => response.json())
      .then(json => setUsers(json))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>      ) : (
        <>
          <h1>Users</h1>
          <table border={1}>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>age</th>
              <th>degree</th>
              <th>college</th>
            </tr>
            {users.map(user => (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.degree}</td>
                <td>{user.college}</td>
              </tr>
            ))}
          </table>
        </>
      )}
    </div>
  )
}

export default app