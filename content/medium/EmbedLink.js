import React from "react"

function EmbedLink({title, src}) {

  return (
    <div>
      <p>

      title: {title}
      </p>
      <p>
        <a href={src} target="_blank">read the post in medium</a>

      </p>
    </div>
  )
}

export default EmbedLink