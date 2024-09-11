import React from 'react'
import Button from 'react-bootstrap/Button';

import form from 'react-bootstrap/form';


export default function SearchBar() {
  return (
    <>
      <div className="d-flex justify-content-center">
        <form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={search} onChange={(e)=>{setSearch(e.target.value)}}
        />
        <Button variant="outline-success ">Search</Button>
      </div>

    </>
  )
}
