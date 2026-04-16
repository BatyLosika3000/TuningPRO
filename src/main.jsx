import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Импортируем компонент роутера
import App from './App'

// Находим корневой элемент в index.html и рендерим в него наше приложение
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		{/* Оборачиваем App в BrowserRouter. 
        Это позволяет использовать useNavigate, useParams и Routes внутри любых компонентов проекта.
    */}
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
)
