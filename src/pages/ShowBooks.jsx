import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
const ShowBooks = () => {
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const {id} = useParams()
  useEffect(() =>{
      setLoading(true)
      axios
      // .get(`http://localhost:5555/books/${id}`)
      .get(`https://sadnguyencoder.pythonanywhere.com/book/api/v1//${id}`)
      .then((response) =>{
          setBook(response.data)
          setLoading(false)
      })
      .catch((error) =>{
          console.log(error)
          setLoading(false)
      })
  }, [])
  return (
    <div className='px-40 py-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Book Details</h1>
      {loading ? <Spinner /> : (
        <div className='flex flex-col border-2 border-gray-300 rounded-lg px-4 py-2 relative hover:shadow-xl items-center'>
          <div className='my-4 px-24 py-2 border-2 border-gray-500 rounded-full'>
            <span className='text-xl mr-4 text-gray-500'>ID</span>
            <span>{book.ISBN}</span>
          </div>
          <div className='my-4 px-24 p-3 border-2 border-gray-500 rounded-full'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4 px-24 p-3 border-2 border-gray-500 rounded-full'>
            <span className='text-xl mr-4 text-gray-500'>Author</span>
            <span>{book.authors}</span>
          </div>

          <div className='my-4 px-24 p-3 border-2 border-gray-500 rounded-full'>
            <span className='text-xl mr-4 text-gray-500'>Genres</span>
            <span>{book.genres}</span>
          </div>
          

          
          <div className='my-4 px-24 p-3 border-2 border-gray-500 rounded-full'>
            <span className='text-xl mr-4 text-gray-500'>Publisher</span>
            <span>{book.publisher}</span>
          </div>

          <div className='my-4 px-24 p-3 border-2 border-gray-500 rounded-full'>
            <span className='text-xl mr-4 text-gray-500'>Edition</span>
            <span>{book.edition}</span>
          </div>
          
          <div className='my-4 px-24 p-3 border-2 border-gray-500 rounded-full'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{book.publication_date}</span>
          </div>

          <div className='my-4 px-24 p-3 border-2 border-gray-500 rounded-full'>
            <span className='text-xl mr-4 text-gray-500'>Language</span>
            <span>{book.language}</span>
          </div>
          
          <div className='my-4 px-24 p-3 border-2 border-gray-500 rounded-full'>
            <span className='text-xl mr-4 text-gray-500'>Number of Copies</span>
            <span>{book.number_of_copies_available}</span>
          </div>
           
          <div className='my-4 px-24 p-3 border-2 border-gray-500 rounded-full'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4 px-24 p-3 border-2 border-gray-500 rounded-full'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBooks
