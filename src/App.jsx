import React, { useState, useEffect } from 'react'
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
	CircularProgress,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Badge,
} from '@mui/material'
import {
	Menu as MenuIcon,
	Close,
	Telegram,
	WhatsApp,
	LocationOn,
	Phone,
	ShoppingCart,
} from '@mui/icons-material'
import { AnimatePresence } from 'framer-motion'
// ДОБАВЛЯЕМ ЭТИ ИМПОРТЫ
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

// Импорты страниц
import MainPage from './pages/MainPage'
import WorksPage from './pages/WorksPage'
import ServicesPage from './pages/ServicesPage'
import TeamPage from './pages/TeamPage'
import CatalogPage from './pages/CatalogPage'
import BrandPartsPage from './pages/BrandPartsPage'
import CartDrawer from './components/CartDrawer'

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: { main: '#00e5ff' },
		background: { default: '#050505', paper: '#111111' },
	},
	typography: { fontFamily: '"Inter", sans-serif' },
})

const CAR_BRANDS = [
	'BMW',
	'Mercedes-Benz',
	'Audi',
	'Porsche',
	'Lexus',
	'Land Rover',
	'Tesla',
	'Другое',
]

function App() {
	const navigate = useNavigate() // Для переключения страниц
	const location = useLocation() // Для отслеживания текущего пути

	const [open, setOpen] = useState(false)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [cartOpen, setCartOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [cart, setCart] = useState([])

	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		carModel: '',
	})
	const [errors, setErrors] = useState({ name: '', phone: '', carModel: '' })

	// Соответствие путей и названий вкладок для подсветки в меню
	const navItems = [
		{ label: 'Главная', path: '/' },
		{ label: 'Услуги', path: '/services' },
		{ label: 'Каталог', path: '/catalog' },
		{ label: 'Наши работы', path: '/works' },
		{ label: 'Мастера', path: '/team' },
	]

	const addToCart = item =>
		setCart(prev => [...prev, { ...item, cartId: Date.now() }])
	const removeFromCart = cartId =>
		setCart(prev => prev.filter(item => item.cartId !== cartId))

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
		if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
	}

	const validate = () => {
		let tempErrors = { name: '', phone: '', carModel: '' }
		let isValid = true
		if (formData.name.trim().length < 2) {
			tempErrors.name = 'Минимум 2 символа'
			isValid = false
		}
		const phoneRegex = /^((\+7|8)+([0-9]){10})$/
		if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
			tempErrors.phone = 'Формат: +79001234567'
			isValid = false
		}
		if (!formData.carModel) {
			tempErrors.carModel = 'Выберите марку'
			isValid = false
		}
		setErrors(tempErrors)
		return isValid
	}

	const handleSubmit = async () => {
		if (!validate()) return
		setLoading(true)
		await new Promise(r => setTimeout(r, 1500))
		const itemsList = cart.map(i => i.name).join(', ')
		alert(`Спасибо, ${formData.name}! Заявка принята.`)
		setOpen(false)
		setCart([])
		setFormData({ name: '', phone: '', carModel: '' })
		setLoading(false)
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			{/* HEADER */}
			<AppBar
				position='fixed'
				sx={{
					background: 'rgba(5, 5, 5, 0.8)',
					backdropFilter: 'blur(15px)',
					borderBottom: '1px solid rgba(255,255,255,0.1)',
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

					{/* DESKTOP NAV */}
					<Stack
						direction='row'
						spacing={4}
						sx={{
							display: { xs: 'none', md: 'flex' },
							position: 'absolute',
							left: '50%',
							transform: 'translateX(-50%)',
						}}
					>
						{navItems.map(item => (
							<Button
								key={item.label}
								onClick={() => navigate(item.path)}
								sx={{
									fontWeight: 600,
									// Подсвечиваем, если путь совпадает или начинается с нужного (для вложенных страниц каталога)
									color:
										location.pathname === item.path ||
										(item.path !== '/' &&
											location.pathname.startsWith(item.path))
											? '#00e5ff'
											: '#fff',
									'&:hover': { color: '#00e5ff', background: 'transparent' },
								}}
							>
								{item.label}
							</Button>
						))}
					</Stack>

					<Stack direction='row' spacing={1} alignItems='center'>
						<Badge badgeContent={cart.length} color='primary'>
							<IconButton color='inherit' onClick={() => setCartOpen(true)}>
								<ShoppingCart />
							</IconButton>
						</Badge>
						<IconButton
							color='inherit'
							edge='end'
							onClick={() => setMobileMenuOpen(true)}
							sx={{ display: { md: 'none' } }}
						>
							<MenuIcon />
						</IconButton>
					</Stack>
				</Toolbar>
			</AppBar>

			{/* КОРЗИНА И МЕНЮ (Drawer-ы) */}
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

			<Drawer
				anchor='right'
				open={mobileMenuOpen}
				onClose={() => setMobileMenuOpen(false)}
				PaperProps={{ sx: { width: 280, bgcolor: '#111' } }}
			>
				<List sx={{ pt: 4 }}>
					{navItems.map(item => (
						<ListItem key={item.label} disablePadding>
							<ListItemButton
								onClick={() => {
									navigate(item.path)
									setMobileMenuOpen(false)
								}}
							>
								<ListItemText
									primary={item.label}
									primaryTypographyProps={{
										textAlign: 'center',
										fontWeight: 700,
									}}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>

			{/* ОСНОВНОЙ КОНТЕНТ С РОУТИНГОМ */}
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
						<Route path='/catalog/:brandId' element={<BrandPartsPage />} />
						<Route
							path='/works'
							element={<WorksPage onOrderClick={() => setOpen(true)} />}
						/>
						<Route
							path='/team'
							element={<TeamPage onOrderClick={() => setOpen(true)} />}
						/>
					</Routes>
				</AnimatePresence>
			</Box>

			{/* FOOTER */}
			<Box
				sx={{
					py: 8,
					bgcolor: '#000',
					borderTop: '1px solid rgba(255,255,255,0.05)',
					mt: 10,
				}}
			>
				<Container maxWidth='lg'>
					<Grid container spacing={4}>
						{/* 1. БРЕНД И ОПИСАНИЕ */}
						<Grid item xs={12} md={4}>
							<Typography
								variant='h6'
								sx={{ fontWeight: 900, mb: 2, letterSpacing: -1 }}
							>
								TUNING<span style={{ color: '#00e5ff' }}>PRO</span>
							</Typography>
							<Typography
								variant='body2'
								sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, mb: 3 }}
							>
								Премиальное дооснащение и тюнинг автомобилей в Барнауле. Мы
								создаем уникальные проекты для тех, кто ценит стиль и качество.
							</Typography>

							{/* СОЦСЕТИ (SVG) */}
							<Stack direction='row' spacing={2}>
								<IconButton
									href='https://t.me/your_link'
									target='_blank'
									sx={{
										p: 0,
										'&:hover': {
											transform: 'translateY(-3px)',
											transition: '0.3s',
										},
									}}
								>
									<svg width='32' height='32' viewBox='0 0 24 24' fill='none'>
										<circle cx='12' cy='12' r='10' fill='#0088CC' />
										<path
											d='M7.5 12L10.5 13.5L16 10L11.5 15L15.5 18L17.5 7L7.5 12Z'
											fill='white'
										/>
									</svg>
								</IconButton>

								<IconButton
									href='https://wa.me/your_number'
									target='_blank'
									sx={{
										p: 0,
										'&:hover': {
											transform: 'translateY(-3px)',
											transition: '0.3s',
										},
									}}
								>
									<svg width='32' height='32' viewBox='0 0 24 24' fill='none'>
										<circle cx='12' cy='12' r='10' fill='#25D366' />
										<path
											d='M15.5 14.5C15.3 14.9 14.5 15.2 14.1 15.2C13.7 15.2 13.3 15.4 11.5 14.6C9.2 13.6 7.7 11.2 7.6 11.1C7.5 11 6.9 10.2 6.9 9.3C6.9 8.4 7.3 8 7.5 7.8C7.7 7.6 8 7.5 8.3 7.5H8.6C8.8 7.5 9 7.5 9.2 8C9.4 8.5 9.9 9.7 10 9.8C10.1 9.9 10.1 10.1 10 10.3C9.9 10.5 9.8 10.6 9.7 10.8C9.6 10.9 9.4 11.1 9.3 11.2C9.1 11.4 8.9 11.6 9.1 11.9C9.3 12.2 10.1 13.5 11.2 14.5C12.7 15.8 13.9 16.2 14.3 16.4C14.7 16.6 15.2 16.1 15.2 16.1C15.4 15.9 15.7 15.5 16 15.3C16.3 14.9 16.4 14.8 16.7 14.9C17 15 18.3 15.6 18.5 15.7C18.7 15.8 18.9 15.9 19 16C19.1 16.1 19.1 16.6 18.9 17.1'
											fill='white'
										/>
									</svg>
								</IconButton>

								<IconButton
									href='https://youtube.com/your_channel'
									target='_blank'
									sx={{
										p: 0,
										'&:hover': {
											transform: 'translateY(-3px)',
											transition: '0.3s',
										},
									}}
								>
									<svg width='32' height='32' viewBox='0 0 24 24' fill='none'>
										<circle cx='12' cy='12' r='10' fill='#FF0000' />
										<path d='M10 9L15 12L10 15V9Z' fill='white' />
									</svg>
								</IconButton>
							</Stack>
						</Grid>
						{/* 3. КОНТАКТЫ */}
						<Grid item xs={6} md={3}>
							<Typography
								variant='subtitle1'
								sx={{ fontWeight: 700, mb: 2, color: '#fff' }}
							>
								Контакты
							</Typography>
							<Stack spacing={2}>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
									<Phone sx={{ color: '#00e5ff', fontSize: 20 }} />
									<Typography
										variant='body2'
										sx={{ color: 'rgba(255,255,255,0.6)' }}
									>
										+7 (999) 123-45-67
									</Typography>
								</Box>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
									<LocationOn sx={{ color: '#00e5ff', fontSize: 20 }} />
									<Typography
										variant='body2'
										sx={{ color: 'rgba(255,255,255,0.6)' }}
									>
										Барнаул, проспект Ленина, 1
									</Typography>
								</Box>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
									<Typography
										variant='body2'
										sx={{ color: 'rgba(255,255,255,0.4)', ml: 4 }}
									>
										Пн-Сб: 10:00 — 20:00
									</Typography>
								</Box>
							</Stack>
						</Grid>
					</Grid>

					{/* COPIRIGHT */}
					<Box
						sx={{
							mt: 8,
							pt: 3,
							borderTop: '1px solid rgba(255,255,255,0.05)',
							textAlign: 'center',
						}}
					>
						<Typography
							variant='caption'
							sx={{ color: 'rgba(255,255,255,0.2)' }}
						>
							© 2026 TUNINGPRO. Все права защищены. Разработка студии.
						</Typography>
					</Box>
				</Container>
			</Box>

			{/* MODAL ЗАПИСИ (без изменений) */}
			<Dialog
				open={open}
				onClose={() => !loading && setOpen(false)}
				PaperProps={{
					sx: {
						borderRadius: 8,
						bgcolor: 'rgba(17, 17, 17, 0.85)',
						backdropFilter: 'blur(15px)',
						p: 3,
						maxWidth: 450,
					},
				}}
			>
				{/* Твое содержимое диалога */}
				<DialogTitle
					sx={{ fontWeight: 900, textAlign: 'center', fontSize: '2rem' }}
				>
					ЗАЯВКА
				</DialogTitle>
				<DialogContent sx={{ mt: 1 }}>
					<Stack spacing={3}>
						<TextField
							fullWidth
							label='Ваше имя'
							name='name'
							value={formData.name}
							onChange={handleInputChange}
							error={!!errors.name}
							helperText={errors.name}
						/>
						<TextField
							fullWidth
							label='Телефон'
							name='phone'
							value={formData.phone}
							onChange={handleInputChange}
							error={!!errors.phone}
							helperText={errors.phone}
						/>
						<FormControl fullWidth error={!!errors.carModel}>
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
						disabled={loading}
						sx={{
							px: 8,
							py: 1.5,
							borderRadius: 10,
							bgcolor: '#00e5ff',
							color: '#000',
							fontWeight: 800,
						}}
					>
						{loading ? (
							<CircularProgress size={24} color='inherit' />
						) : (
							'ОТПРАВИТЬ'
						)}
					</Button>
				</DialogActions>
			</Dialog>
		</ThemeProvider>
	)
}

export default App
