import React, { useEffect, useState } from 'react'
// import image from '../../../assets/batman.jpeg'
import ActorList from '../../generics/ActorsList'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchMovieAction } from '../../../store/actions/movieActions'
import LoadingActorMovie from '../../generics/LoadingActorMovie'
import ApiClient from '../../../libs/api/ApiClient'

function MoviePage () {
  const dispatch = useDispatch()
  const { data, isLoading } = useSelector(state => state.movie)
  const { data: user } = useSelector(state => state.user)
  const { id } = useParams()
  useEffect(() => {
    const fetchMov = async () =>
      dispatch(fetchMovieAction(id))

    fetchMov()
  }, [])
  const [userRating, setUserRating] = useState(0)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [error, setError] = useState('')
  const [feedbackList, setFeedbackList] = useState([
    { user: 'Adelina', message: 'Great movie!' },
    { user: 'Bogdan', message: 'Awesome storyline.' }
    // Add more feedback entries as needed
  ])

  const handleRatingChange = (rating) => {
    setUserRating(rating)
  }

  const handleFeedbackChange = (event) => {
    setFeedbackMessage(event.target.value)
  }

  const handleFeedbackSubmit = () => {
    if (user.name) {
      if (feedbackMessage.trim() !== '') {
        setFeedbackList([...feedbackList, { user: user.name, message: feedbackMessage }])
        setFeedbackMessage('')
        setError('')
        ApiClient.addReview({
          message: feedbackMessage,
          user,
          rating: userRating,
          film: data.id
        })
      }
    } else {
      setError('You are not logged in')
    }
  }

  return (
    (isLoading && <LoadingActorMovie/>) ||
        <div className="w-full h-full overflow-hidden flex">
            <div className="w-2/3 h-full p-6">
                <div className="h-1/2 flex flex-row gap-4">
                    <img className="h-full rounded-xl" src={data.image} alt="movie thumbnail" />
                    <div className="flex flex-col">
                        <h1 className="text-violet-800 text-6xl">{data.name}</h1>
                        <p className="text-violet-400 text-2xl">
                            {data.description}
                            {/* Batman`s origin story features him swearing vengeance against criminals after witnessing the murder of his parents Thomas and Martha as a child, a vendetta tempered with the ideal of justice. He trains himself physically and intellectually, crafts a bat-inspired persona, and monitors the Gotham streets at night */}
                        </p>
                    </div>
                </div>
                <div className="w-full h-1/2">
                    <ActorList actors={data.actors || []}/>
                </div>
            </div>

            <div className="w-1/3 h-full p-10">
                <div className="flex flex-col mb-10">
                    <p className="flex items-center text-violet-400 text-3xl">
                        <span className="mr-2">Rating:</span> <span className="list-disc pl-2">{userRating}/10</span>
                    </p>
                    <div className="flex items-center text-violet-400 text-3xl">
                        <span className="mr-2">Your Rating:</span>
                        <div>
                            {[...Array(10)].map((star, index) => (
                                <span
                                    key={index}
                                    role="button"
                                    onClick={() => handleRatingChange(index + 1)}
                                    className={index < userRating ? 'text-yellow-400 cursor-pointer' : 'text-gray-300 cursor-pointer'}
                                >
                  &#9733;
                </span>
                            ))}
                        </div>
                    </div>
                    <p className="flex items-center text-violet-400 text-3xl">
                        <span className="mr-2">Popularity:</span> <span className="list-disc pl-2">High</span>
                    </p>
                </div>

                <div className="mb-10">
                    <h2 className="text-4xl text-violet-800 mb-2">Feedback</h2>
                    <div className="bg-gray-100 p-6 rounded-md overflow-y-auto max-h-48 scrollbar-thin scrollbar-thumb-purple-950 scrollbar-track-gray-100">
                        {feedbackList.map((feedback, index) => (
                            <div key={index} className="mb-2">
                                <strong>{feedback.user}:</strong> {feedback.message}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-4xl text-violet-800 mb-2">Leave Your Feedback</h2>
                    <textarea
                        value={feedbackMessage}
                        onChange={handleFeedbackChange}
                        className="w-full h-32 p-2 border rounded-md"
                        placeholder="Write your feedback here..."
                    />
                    <div className='flex flex-row gap-5 items-center'>
                        <button onClick={handleFeedbackSubmit} className="mt-2 bg-violet-600 text-white px-4 py-2 rounded-md">Submit Feedback</button>
                        <p className="text-pink-500 text-xl">{error}</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default MoviePage
