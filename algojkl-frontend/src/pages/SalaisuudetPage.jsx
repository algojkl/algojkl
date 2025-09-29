import React, { useState } from 'react'
import starterDesktop from '../images/Page_starters/21.jpg'
import starterMobile from '../images/mobiili/21.png'
import useDevice from '../hooks/useDevice'

const SalaisuudetPage = () => {
  const isMobile = useDevice()
  const starterImage = isMobile ? starterMobile : starterDesktop

  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [content, setContent] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL

  const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })

    const data = await res.json()

    if (res.ok && data.success) {
      setContent(data.content)
      setIsAuthenticated(true)
      setError('')
    } else {
      setError(data.message || 'Väärä salasana')
    }
  } catch (err) {
    setError('Palvelinvirhe: ' + err.message)
  }
}


  if (!isAuthenticated) {
    return (
     <div>
      <img src={starterImage} alt="starter_image_rules" className="starter" />
        <div className="login-container">
            <h2>Syötä salasana päästäksesi sisältöön:</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Salasana"
              />
              <button type="submit">Kirjaudu</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    </div>
    )
  }

  if (!content) return <p>Ladataan sisältöä...</p>;

  return (
    <div>
      <img src={starterImage} alt="starter_image_rules" className="starter" />
        <div className="salaisuudet-page-content">
          {content.secretText.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
    </div>
  )
}

export default SalaisuudetPage;
