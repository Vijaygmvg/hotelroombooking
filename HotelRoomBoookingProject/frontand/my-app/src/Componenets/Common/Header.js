import React from 'react'

function Header({title=" "}) {
  return (
    <header>

     <div>
        this is also the header 
        <div>
            {title}
        </div>
     </div>
    </header>
  )
}

export default Header