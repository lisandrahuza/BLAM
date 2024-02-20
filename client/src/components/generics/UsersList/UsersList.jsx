import React, { useEffect, useState } from 'react'
import UserView from '../UserView'
import ApiClient from '../../../libs/api/ApiClient'
import PropTypes from 'prop-types'

UsersList.propTypes = {
  setUser: PropTypes.func.isRequired,
  setRefresh: PropTypes.func.isRequired,
  refresh: PropTypes.bool.isRequired
}

function UsersList ({ setUser, setRefresh, refresh }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await ApiClient.getUsers()
        if (res && res.length > 0) {
          setUsers(res)
        } else {
          console.log('No users found.')
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    setRefresh(false)
    fetchUsers()
  }, [refresh])

  const renderedUsers = users.map((user, index) => (
      <UserView key={index} onClick={() => setUser(user)} user={user}/>
  ))

  return (
      <div className="h-[95%] overflow-y-auto scrollbar scrollbar-thumb-cyan-950 scrollbar-thumb-rounded-full">
        {renderedUsers}
      </div>
  )
}

export default UsersList
