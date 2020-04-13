// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Import components
import { BookshelfList } from './bookshelf-list'

// Import styles
import './../styles/bookshelf.css'

// Create Bookshelf component
export const Bookshelf = () => {
  // Prepare states
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [pubDate, setPubDate] = useState('')
  const [rating, setRating] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch all books on initial render
  useEffect(() => {
    fetchBooks()
  }, [])

  // Fetch all books
  const fetchBooks = async () => {
    // Send GET request to 'books/all' endpoint
    axios
      .get('http://localhost:4001/books/all')
      .then(response => {
        // Update the books state
        setBooks(response.data)

        // Update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the book list: ${error}`))
  }

  // Reset all input fields
  const handleInputsReset = () => {
    setAuthor('')
    setTitle('')
    setPubDate('')
    setRating('')
  }

  // Create new book
  const handleBookCreate = () => {
    // Send POST request to 'books/create' endpoint
    axios
      .post('http://localhost:4001/books/create', {
        author: author,
        title: title,
        pubDate: pubDate,
        rating: rating
      })
      .then(res => {
        console.log(res.data)

        // Fetch all books to refresh
        // the books on the bookshelf list
        fetchBooks()
      })
      .catch(error => console.error(`There was an error creating the ${title} book: ${error}`))
  }

  // Submit new book
  const handleBookSubmit = () => {
    // Check if all fields are filled
    if (author.length > 0 && title.length > 0 && pubDate.length > 0 && rating.length > 0) {
      // Create new book
      handleBookCreate()

      console.info(`Book ${title} by ${author} added.`)

      // Reset all input fields
      handleInputsReset()
    }
  }

  // Remove book
  const handleBookRemove = (id: number, title: string) => {
    // Send PUT request to 'books/delete' endpoint
    axios
      .put('http://localhost:4001/books/delete', { id: id })
      .then(() => {
        console.log(`Book ${title} removed.`)

        // Fetch all books to refresh
        // the books on the bookshelf list
        fetchBooks()
      })
      .catch(error => console.error(`There was an error removing the ${title} book: ${error}`))
  }

  // Reset book list (remove all books)
  const handleListReset = () => {
    // Send PUT request to 'books/reset' endpoint
    axios.put('http://localhost:4001/books/reset')
    .then(() => {
      // Fetch all books to refresh
      // the books on the bookshelf list
      fetchBooks()
    })
    .catch(error => console.error(`There was an error resetting the book list: ${error}`))
  }

  return (
    <div className="book-list-wrapper">
      {/* Form for creating new book */}
      <div className="book-list-form">
        <div className="form-wrapper" onSubmit={handleBookSubmit}>
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="title">Enter title:</label>
              <input className="form-input" type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="author">Enter author:</label>
              <input className="form-input" type="text" id="author" name="author" value={author} onChange={(e) => setAuthor(e.currentTarget.value)} />
            </fieldset>
          </div>

          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="pubDate">Enter publication date:</label>
              <input className="form-input" type="text" id="pubDate" name="pubDate" value={pubDate} onChange={(e) => setPubDate(e.currentTarget.value)} />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="rating">Enter rating:</label>
              <input className="form-input" type="text" id="rating" name="rating" value={rating} onChange={(e) => setRating(e.currentTarget.value)} />
            </fieldset>
          </div>
        </div>

        <button onClick={handleBookSubmit} className="btn btn-add">Add the book</button>
      </div>

      {/* Render bookshelf list component */}
      <BookshelfList books={books} loading={loading} handleBookRemove={handleBookRemove} />

      {/* Show reset button if list contains at least one book */}
      {books.length > 0 && (
        <button className="btn btn-reset" onClick={handleListReset}>Reset books list.</button>
      )}
    </div>
  )
}
