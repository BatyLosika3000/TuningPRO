import React, { useState, useEffect } from 'react'

// --- 1. ИМПОРТЫ БИБЛИОТЕК (UI, Иконки, Роутинг) ---
import {
	ThemeProvider,
	createTheme,
	CssBaseline,
	Box,
	AppBar,
	Toolbar,
	Typography,
	Stack,
	Button,
	IconButton,
	Container,
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	Badge,
	Avatar,
} from '@mui/material'
import {
	Telegram,
	WhatsApp,
	LocationOn,
	Phone,
	ShoppingCart,
	Logout,
} from '@mui/icons-material'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

// --- 2. ИМПОРТЫ СТРАНИЦ И КОМПОНЕНТОВ ---
import MainPage from './pages/MainPage'
import WorksPage from './pages/WorksPage'
import ServicesPage from './pages/ServicesPage'
import TeamPage from './pages/TeamPage'
import CatalogPage from './pages/CatalogPage'
import BrandPartsPage from './pages/BrandPartsPage'
import ReviewsPage from './pages/ReviewsPage'
import CartDrawer from './components/CartDrawer'

// --- 3. ГЛОБАЛЬНЫЕ КОНСТАНТЫ И НАСТРОЙКИ ---
const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: { main: '#00e5ff' },
		background: { default: '#050505', paper: '#0a0a0a' },
	},
	typography: { fontFamily: '"Inter", sans-serif' },
})

const CAR_BRANDS = ['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Lexus']

const navItems = [
	{ label: 'Главная', path: '/' },
	{ label: 'Услуги', path: '/services' },
	{ label: 'Каталог', path: '/catalog' },
	{ label: 'Наши работы', path: '/works' },
	{ label: 'Мастера', path: '/team' },
	{ label: 'Отзывы', path: '/reviews' },
]

function App() {
	const navigate = useNavigate()
	const location = useLocation()

	// --- 4. СОСТОЯНИЯ (States) ---
	const [open, setOpen] = useState(false) // Модалка заявки
	const [regOpen, setRegOpen] = useState(false) // Модалка регистрации
	const [profileOpen, setProfileOpen] = useState(false) // Окно профиля
	const [cartOpen, setCartOpen] = useState(false) // Состояние корзины
	const [loading, setLoading] = useState(false)

	const [user, setUser] = useState(null) // Данные авторизованного пользователя
	const [cart, setCart] = useState([]) // Содержимое корзины

	const [formData, setFormData] = useState({
		// Поля заявки
		name: '',
		phone: '',
		carModel: '',
		comment: '',
	})
	const [regData, setRegData] = useState({
		// Поля регистрации
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
	})

	// --- 5. ЭФФЕКТЫ (Side Effects) ---

	// Инициализация пользователя из localStorage при старте
	useEffect(() => {
		const savedUser = localStorage.getItem('Код_клиента')
		if (savedUser) {
			const parsed = JSON.parse(savedUser)
			setUser(parsed)
			setFormData(prev => ({
				...prev,
				name: parsed.first_name || '',
				phone: parsed.phone || '',
			}))
		}
	}, [])

	// Обновление стейта пользователя при закрытии окна регистрации (синхронизация)
	useEffect(() => {
		const savedUser = localStorage.getItem('tuning_user')
		if (savedUser) {
			const parsed = JSON.parse(savedUser)
			setUser(parsed)
		}
	}, [regOpen])

	// --- 6. ОБРАБОТЧИКИ (Handlers) ---

	const addToCart = item =>
		setCart(prev => [...prev, { ...item, cartId: Date.now() }])

	const removeFromCart = cartId =>
		setCart(prev => prev.filter(item => item.cartId !== cartId))

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleRegister = async () => {
		try {
			// 1. Подготовка данных для API (согласно вашей schemas.py)
			const clientData = {
				first_name: regData.firstName,
				last_name: regData.lastName,
				phone: regData.phone,
				email: regData.email,
			}

			// 2. Отправка запроса на бэкенд
			const response = await fetch('http://127.0.0.1:8000/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(clientData),
			})

			const result = await response.json()

			if (response.ok) {
				// 3. Формируем объект пользователя для UI
				const userData = {
					first_name: regData.firstName,
					email: regData.email,
				}

				// 4. СОХРАНЕНИЕ В LOCALSTORAGE (Критически важный момент)
				// Сохраняем весь объект пользователя
				localStorage.setItem('tuning_user', JSON.stringify(userData))

				// Сохраняем ID из базы (result.id соответствует new_client.Код_Клиента в main.py)
				// Именно этот 'userId' проверяет страница ReviewsPage.jsx
				localStorage.setItem('userId', result.id)

				// 5. Обновляем состояние приложения
				setUser(userData)
				setRegOpen(false)

				// Очищаем поля формы
				setRegData({ firstName: '', lastName: '', phone: '', email: '' })

				alert('Регистрация прошла успешно! Теперь вы можете оставлять отзывы.')
			} else {
				// Вывод ошибки от FastAPI (например, если номер уже есть в базе)
				alert(result.detail || 'Ошибка при регистрации')
			}
		} catch (error) {
			console.error('Ошибка регистрации:', error)
			alert('Не удалось связаться с сервером')
		}
	}

	const handleSubmit = async () => {
		try {
			const response = await fetch('http://127.0.0.1:8000/api/orders', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			})

			if (response.ok) {
				const data = await response.json()
				if (data.Код_Клиента) {
					localStorage.setItem('userId', data.Код_Клиента.toString())
				}
				alert('Заявка отправлена!')
				setOpen(false)
				setFormData({ name: '', phone: '', carModel: '', comment: '' })
			} else {
				alert('Ошибка при отправке данных')
			}
		} catch (error) {
			alert('Сервер недоступен')
		}
	}

	const handleLogout = () => {
		localStorage.removeItem('tuning_user')
		setUser(null)
		setProfileOpen(false)
		setFormData({ name: '', phone: '', carModel: '' })
	}

	// --- 7. ВЕРСТКА (JSX) ---
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			{/* ШАПКА САЙТА */}
			<AppBar
				position='fixed'
				sx={{
					background: 'rgba(5, 5, 5, 0.8)',
					backdropFilter: 'blur(15px)',
					borderBottom: '1px solid rgba(255,255,255,0.05)',
				}}
				elevation={0}
			>
				<Toolbar
					sx={{
						justifyContent: 'space-between',
						height: 80,
						px: { xs: 2, md: 6 },
					}}
				>
					<Typography
						variant='h5'
						sx={{ fontWeight: 900, cursor: 'pointer', letterSpacing: -1.5 }}
						onClick={() => navigate('/')}
					>
						TUNING<span style={{ color: '#00e5ff' }}>PRO</span>
					</Typography>

					{/* НАВИГАЦИЯ ДЛЯ ПК */}
					<Stack
						direction='row'
						spacing={4}
						sx={{ display: { xs: 'none', md: 'flex' } }}
					>
						{navItems.map(item => (
							<Button
								key={item.label}
								onClick={() => navigate(item.path)}
								sx={{
									fontWeight: 600,
									color: location.pathname === item.path ? '#00e5ff' : '#fff',
								}}
							>
								{item.label}
							</Button>
						))}
					</Stack>

					{/* БЛОК ПОЛЬЗОВАТЕЛЯ И КОРЗИНЫ */}
					<Stack direction='row' spacing={2} alignItems='center'>
						{user ? (
							<Stack
								direction='row'
								spacing={1}
								alignItems='center'
								onClick={() => setProfileOpen(true)}
								sx={{
									bgcolor: 'rgba(0,229,255,0.1)',
									px: 2,
									py: 0.5,
									borderRadius: 5,
									border: '1px solid rgba(0,229,255,0.2)',
									cursor: 'pointer',
									transition: '0.3s',
									'&:hover': { bgcolor: 'rgba(0,229,255,0.2)' },
								}}
							>
								<Avatar
									sx={{
										width: 24,
										height: 24,
										bgcolor: '#00e5ff',
										color: '#00',
										fontSize: 12,
									}}
								>
									{user.first_name ? user.first_name[0] : 'U'}
								</Avatar>
								<Typography
									variant='body2'
									sx={{
										fontWeight: 700,
										color: '#00e5ff',
										display: { xs: 'none', sm: 'block' },
									}}
								>
									{user.first_name}
								</Typography>
							</Stack>
						) : (
							<Button
								variant='contained'
								onClick={() => setRegOpen(true)}
								sx={{
									borderRadius: 5,
									bgcolor: '#fff',
									color: '#000',
									fontWeight: 700,
								}}
							>
								Войти
							</Button>
						)}

						<Badge badgeContent={cart.length} color='primary'>
							<IconButton color='inherit' onClick={() => setCartOpen(true)}>
								<ShoppingCart />
							</IconButton>
						</Badge>
					</Stack>
				</Toolbar>
			</AppBar>

			{/* КОРЗИНА (ВЫЕЗЖАЮЩАЯ ПАНЕЛЬ) */}
			<CartDrawer
				isOpen={cartOpen}
				onClose={() => setCartOpen(false)}
				cart={cart}
				onRemove={removeFromCart}
				onCheckout={() => {
					setCartOpen(false)
					setOpen(true)
				}}
			/>

			{/* ОСНОВНОЙ КОНТЕНТ (МАРШРУТИЗАЦИЯ) */}
			<Box sx={{ mt: 10 }}>
				<AnimatePresence mode='wait'>
					<Routes location={location} key={location.pathname}>
						<Route
							path='/'
							element={<MainPage onOpenModal={() => setOpen(true)} />}
						/>
						<Route
							path='/services'
							element={<ServicesPage onAddToCart={addToCart} />}
						/>
						<Route
							path='/catalog'
							element={<CatalogPage onOrderClick={() => setOpen(true)} />}
						/>
						<Route
							path='/works'
							element={<WorksPage onOrderClick={() => setOpen(true)} />}
						/>
						<Route
							path='/team'
							element={<TeamPage onOrderClick={() => setOpen(true)} />}
						/>
						<Route
							path='/catalog/:brandId'
							element={<BrandPartsPage onAddToCart={addToCart} />}
						/>
						<Route
							path='/reviews'
							element={<ReviewsPage onOrderClick={() => setOpen(true)} />}
						/>
					</Routes>
				</AnimatePresence>
			</Box>

			{/* ПОДВАЛ (FOOTER) */}
			<Box
				component='footer'
				sx={{
					bgcolor: '#050505',
					pt: 8,
					pb: 4,
					borderTop: '1px solid rgba(0,229,255,0.1)',
				}}
			>
				<Container maxWidth='lg'>
					<Grid
						container
						justifyContent='space-between'
						alignItems='flex-start'
					>
						<Grid item xs={12} md={4}>
							<Typography
								variant='h4'
								sx={{ fontWeight: 900, mb: 2, letterSpacing: -2 }}
							>
								TUNING<span style={{ color: '#00e5ff' }}>PRO</span>
							</Typography>
							<Typography
								variant='body2'
								sx={{ color: 'rgba(255,255,255,0.5)', mb: 3, lineHeight: 1.6 }}
							>
								Профессиональный тюнинг и обслуживание автомобилей
								премиум-класса.
							</Typography>
							<Stack direction='row' spacing={1}>
								<IconButton sx={{ color: '#fff' }}>
									<Telegram />
								</IconButton>
								<IconButton sx={{ color: '#fff' }}>
									<WhatsApp />
								</IconButton>
							</Stack>
						</Grid>
						<Grid
							item
							xs={12}
							md={4}
							sx={{
								textAlign: { xs: 'left', md: 'right' },
								mt: { xs: 4, md: 0 },
							}}
						>
							<Typography
								sx={{
									fontWeight: 800,
									mb: 3,
									textTransform: 'uppercase',
									fontSize: 12,
									color: '#00e5ff',
								}}
							>
								Связаться с нами
							</Typography>
							<Stack
								spacing={2}
								alignItems={{ xs: 'flex-start', md: 'flex-end' }}
							>
								<Box
									sx={{
										display: 'flex',
										gap: 2,
										flexDirection: { xs: 'row', md: 'row-reverse' },
									}}
								>
									<LocationOn sx={{ color: '#00e5ff' }} />
									<Typography variant='body2'>
										Барнаул, пр-т Ленина, 1
									</Typography>
								</Box>
								<Box
									sx={{
										display: 'flex',
										gap: 2,
										flexDirection: { xs: 'row', md: 'row-reverse' },
									}}
								>
									<Phone sx={{ color: '#00e5ff' }} />
									<Typography variant='h6' sx={{ fontWeight: 900 }}>
										+7 (999) 123-45-67
									</Typography>
								</Box>
							</Stack>
						</Grid>
					</Grid>
				</Container>
			</Box>

			{/* --- МОДАЛЬНЫЕ ОКНА --- */}

			{/* 1. РЕГИСТРАЦИЯ */}
			<Dialog
				open={regOpen}
				onClose={() => setRegOpen(false)}
				PaperProps={{
					sx: { borderRadius: 4, bgcolor: '#111', p: 2, minWidth: 350 },
				}}
			>
				<DialogTitle sx={{ fontWeight: 900, textAlign: 'center' }}>
					РЕГИСТРАЦИЯ
				</DialogTitle>
				<DialogContent>
					<Stack spacing={2.5} sx={{ mt: 1 }}>
						<TextField
							label='Имя'
							fullWidth
							value={regData.firstName}
							onChange={e =>
								setRegData({ ...regData, firstName: e.target.value })
							}
						/>
						<TextField
							label='Фамилия'
							fullWidth
							value={regData.lastName}
							onChange={e =>
								setRegData({ ...regData, lastName: e.target.value })
							}
						/>
						<TextField
							label='Телефон'
							fullWidth
							value={regData.phone}
							onChange={e => setRegData({ ...regData, phone: e.target.value })}
						/>
						<TextField
							label='Email'
							type='email'
							fullWidth
							value={regData.email}
							onChange={e => setRegData({ ...regData, email: e.target.value })}
						/>
					</Stack>
				</DialogContent>
				<DialogActions sx={{ p: 3 }}>
					<Button
						fullWidth
						onClick={handleRegister}
						variant='contained'
						sx={{ py: 1.5, borderRadius: 3, fontWeight: 800 }}
					>
						{loading ? 'Загрузка...' : 'Зарегистрироваться'}
					</Button>
				</DialogActions>
			</Dialog>

			{/* 2. ПРОФИЛЬ */}
			<Dialog
				open={profileOpen}
				onClose={() => setProfileOpen(false)}
				PaperProps={{
					sx: { borderRadius: 4, bgcolor: '#111', p: 2, minWidth: 320 },
				}}
			>
				<DialogTitle
					sx={{
						fontWeight: 900,
						textAlign: 'center',
						borderBottom: '1px solid rgba(255,255,255,0.05)',
						mb: 2,
					}}
				>
					ПРОФИЛЬ
				</DialogTitle>
				<DialogContent>
					{user && (
						<Stack spacing={3}>
							<Box>
								<Typography
									variant='caption'
									sx={{
										color: 'rgba(255,255,255,0.4)',
										textTransform: 'uppercase',
									}}
								>
									ФИО
								</Typography>
								<Typography variant='body1' sx={{ fontWeight: 600 }}>
									{user.first_name} {user.last_name}
								</Typography>
							</Box>
							<Box>
								<Typography
									variant='caption'
									sx={{
										color: 'rgba(255,255,255,0.4)',
										textTransform: 'uppercase',
									}}
								>
									Телефон
								</Typography>
								<Typography variant='body1' sx={{ fontWeight: 600 }}>
									{user.phone}
								</Typography>
							</Box>
							<Box>
								<Typography
									variant='caption'
									sx={{
										color: 'rgba(255,255,255,0.4)',
										textTransform: 'uppercase',
									}}
								>
									Email
								</Typography>
								<Typography variant='body1' sx={{ fontWeight: 600 }}>
									{user.email}
								</Typography>
							</Box>
						</Stack>
					)}
				</DialogContent>
				<DialogActions sx={{ p: 3, flexDirection: 'column', gap: 1 }}>
					<Button
						fullWidth
						onClick={() => setProfileOpen(false)}
						variant='outlined'
						sx={{ borderRadius: 2 }}
					>
						Закрыть
					</Button>
					<Button
						fullWidth
						onClick={handleLogout}
						color='error'
						startIcon={<Logout />}
					>
						Выйти из системы
					</Button>
				</DialogActions>
			</Dialog>

			{/* 3. ОФОРМЛЕНИЕ ЗАЯВКИ */}
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				PaperProps={{
					sx: { borderRadius: 8, bgcolor: '#111', p: 3, maxWidth: 450 },
				}}
			>
				<DialogTitle sx={{ fontWeight: 900, textAlign: 'center' }}>
					ОФОРМИТЬ ЗАЯВКУ
				</DialogTitle>
				<DialogContent sx={{ mt: 1 }}>
					<Stack spacing={3}>
						<TextField
							fullWidth
							label='Ваше имя'
							name='name'
							value={formData.name}
							onChange={handleInputChange}
						/>
						<TextField
							fullWidth
							label='Телефон'
							name='phone'
							value={formData.phone}
							onChange={handleInputChange}
						/>
						<FormControl fullWidth>
							<InputLabel>Марка авто</InputLabel>
							<Select
								name='carModel'
								value={formData.carModel}
								label='Марка авто'
								onChange={handleInputChange}
							>
								{CAR_BRANDS.map(brand => (
									<MenuItem key={brand} value={brand}>
										{brand}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>
				</DialogContent>
				<DialogActions sx={{ pb: 2, justifyContent: 'center' }}>
					<Button
						onClick={handleSubmit}
						variant='contained'
						sx={{
							px: 8,
							py: 1.5,
							borderRadius: 10,
							bgcolor: '#00e5ff',
							color: '#000',
							fontWeight: 800,
						}}
					>
						ОТПРАВИТЬ
					</Button>
				</DialogActions>
			</Dialog>
		</ThemeProvider>
	)
}

export default App
