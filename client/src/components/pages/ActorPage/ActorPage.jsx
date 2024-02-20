import React, { useEffect, useState } from 'react'
// import image from '../../../assets/BradPitt.png'
import ApiClient from '../../../libs/api/ApiClient'
import LoadingActorMovie from '../../generics/LoadingActorMovie'
import { useParams } from 'react-router-dom'

function ActorPage () {
  const [actor, setActor] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  console.log(actor)
  useEffect(() => {
    const fetchActor = async () => {
      setLoading(true)
      try {
        const res = await ApiClient.getActor(id)
        if (res) {
          setActor(res)
        } else {
          console.log('No users found.')
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      }
      setLoading(false)
    }
    fetchActor()
  }, [])

  return (
    (loading && <LoadingActorMovie/>) ||
        <div className="w-full h-full overflow-hidden">
            <div className="w-2/3 h-full p-6">
                <div className="h-1/2 flex flex-row gap-4">
                    <div className="flex-shrink-0">
                        <img className="h-full rounded-3xl" src={actor.image} alt="movie thumbnail" />
                        <div>
                            <h2 className="text-violet-600 text-4xl">Personal details</h2>
                            <ul className="list-disc pl-6 text-violet-400">
                                <li><strong>Birth date:</strong> {actor.birthPlace}</li>
                                <li><strong>Gender:</strong> {actor.gender}</li>
                                <li><strong>Birth date:</strong> {actor.birthDate}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col w-full pl-4">
                        <h1 className="text-violet-800 text-6xl mb-4">{actor.name}</h1>
                        <p className="text-violet-400 text-2xl mt-4">{actor.bio}</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ActorPage
