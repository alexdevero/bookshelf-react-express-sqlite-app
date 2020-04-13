// Import deps
import React from 'react'

// Import components
import { BookshelfListRow } from './bookshelf-list-row'

// Import styles
import './../styles/bookshelf-list.css'

// Create interfaces
interface BookUI {
  id: number;
  author: string;
  title: string;
  pubDate: string;
  rating: string;
}

interface BookshelfListUI {
  books: BookUI[];
  loading: boolean;
  handleBookRemove: (id: number, title: string) => void;
}

// Create BookshelfList component
export const BookshelfList = (props: BookshelfListUI) => {
  // Show loading message
  if (props.loading) return <p>Leaderboard table is loading...</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item" />

            <th className="table-head-item">Title</th>

            <th className="table-head-item">Author</th>

            <th className="table-head-item">Pub. date</th>

            <th className="table-head-item">Rating</th>

            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.books.length > 0 ? (
            props.books.map((book: BookUI, idx) => (
              <BookshelfListRow
                key={book.id}
                book={book}
                position={idx + 1}
                handleBookRemove={props.handleBookRemove}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no books to show. Create one!</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}
