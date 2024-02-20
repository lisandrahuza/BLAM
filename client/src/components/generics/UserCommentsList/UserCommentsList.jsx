import React, { useEffect, useState } from 'react'
import UserComment from '../UserComment'
import PropTypes from 'prop-types'
import ApiClient from '../../../libs/api/ApiClient'

UserCommentsList.propTypes = {
  userId: PropTypes.number.isRequired
}
function UserCommentsList ({ userId }) {
  // const comms = [<UserComment key={1}/>, <UserComment key={2}/>, <UserComment key={3}/>, <UserComment key={4}/>, <UserComment key={5}/>, <UserComment key={6}/>, <UserComment key={7}/>, <UserComment key={8}/>, <UserComment key={9}/>, <UserComment key={10}/>, <UserComment key={11}/>, <UserComment key={12}/>, <UserComment key={13}/>, <UserComment key={14}/>, <UserComment key={15}/>, <UserComment key={16}/>, <UserComment key={17}/>, <UserComment key={18}/>, <UserComment key={19}/>]
  const [comms, setComms] = useState([])

  useEffect(() => {
    const fetchComms = async () => {
      if (userId) {
        try {
          const res = await ApiClient.getCommsByUserId(userId)
          if (res) {
            setComms(res)
          } else {
            console.log('No users found.')
          }
        } catch (error) {
          console.error('Error fetching users:', error)
        }
      }
    }
    fetchComms()
  }, [])

  const renderedComms = comms?.map((com, index) => {
    return <UserComment key={index} comment={com}/>
  })

  return <div className="h-full space-y-2 p-2 overflow-y-auto scrollbar scrollbar-thumb-cyan-950 scrollbar-thumb-rounded-full">
    {renderedComms}
     {<UserComment/>}
  </div>
}

export default UserCommentsList
