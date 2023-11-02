import React from 'react'

const Gallery = () => {
  return (
    <div className="row">
        {Array.from({ length: 9 }).map(() => {
           return( 
           <div className='col-m-6 mb-5'>
                <div class="card" style={{width: "18rem;"}}>
                    <img src="https://via.placeholder.com/200" class="card-img-top" alt="Image"/>
                    <div class="card-body">
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
           )
        })}
    </div>
  )
}

export default Gallery