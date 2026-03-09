import React, { useState } from 'react'
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

// Импорты страниц
import MainPage from './pages/MainPage'
import WorksPage from './pages/WorksPage'
import ServicesPage from './pages/ServicesPage'
// Импорт нового компонента корзины
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
	const [currentTab, setCurrentTab] = useState('Главная')
	const [open, setOpen] = useState(false) // Модалка записи
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [cartOpen, setCartOpen] = useState(false) // Состояние боковой корзины
	const [loading, setLoading] = useState(false)

	// Состояние корзины (массив товаров)
	const [cart, setCart] = useState([])

	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		carModel: '',
	})
	const [errors, setErrors] = useState({ name: '', phone: '', carModel: '' })

	const navItems = ['Главная', 'Услуги', 'Наши работы']

	// Логика корзины
	const addToCart = item => {
		setCart(prev => [...prev, { ...item, cartId: Date.now() }])
	}

	const removeFromCart = cartId => {
		setCart(prev => prev.filter(item => item.cartId !== cartId))
	}

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
		alert(
			`Спасибо, ${formData.name}! Заявка на ${formData.carModel} принята.\nВыбрано: ${itemsList || 'Консультация'}`,
		)

		setOpen(false)
		setCart([]) // Очистка корзины после заказа
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
						onClick={() => setCurrentTab('Главная')}
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
								key={item}
								onClick={() => setCurrentTab(item)}
								sx={{
									fontWeight: 600,
									color: currentTab === item ? '#00e5ff' : '#fff',
									'&:hover': { color: '#00e5ff', background: 'transparent' },
								}}
							>
								{item}
							</Button>
						))}
					</Stack>

					<Stack direction='row' spacing={1} alignItems='center'>
						{/* ИКОНКА КОРЗИНЫ В ШАПКЕ */}
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

			{/* КОРЗИНА (SIDEBAR) */}
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
					{navItems.map(text => (
						<ListItem key={text} disablePadding>
							<ListItemButton
								onClick={() => {
									setCurrentTab(text)
									setMobileMenuOpen(false)
								}}
							>
								<ListItemText
									primary={text}
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

			{/* РЕНДЕРИНГ СТРАНИЦ */}
			<AnimatePresence mode='wait'>
				{currentTab === 'Главная' && (
					<MainPage key='main' onOpenModal={() => setOpen(true)} />
				)}

				{currentTab === 'Наши работы' && (
					<WorksPage key='works' onOrderClick={() => setOpen(true)} />
				)}

				{currentTab === 'Услуги' && (
					<ServicesPage
						key='services'
						onAddToCart={addToCart} // Теперь передаем функцию добавления в корзину
					/>
				)}
			</AnimatePresence>

			{/* FOOTER (без изменений) */}
			<Box
				sx={{ py: 10, bgcolor: '#000', borderTop: '1px solid #111', mt: 10 }}
			>
				<Container>
					<Grid
						container
						spacing={6}
						textAlign='center'
						justifyContent='center'
					>
						<Grid item xs={12} md={4}>
							<Typography variant='h6' sx={{ fontWeight: 900, mb: 2 }}>
								TUNINGPRO
							</Typography>
							<Typography
								variant='body2'
								sx={{
									color: 'rgba(255,255,255,0.4)',
									maxWidth: 280,
									mx: 'auto',
								}}
							>
								Премиальное дооснащение автомобилей в Барнауле.
							</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography
								variant='overline'
								sx={{ color: '#00e5ff', fontWeight: 900 }}
							>
								Контакты
							</Typography>
							<Stack spacing={1.5} sx={{ mt: 2 }} alignItems='center'>
								<Stack direction='row' spacing={1}>
									<LocationOn sx={{ color: '#00e5ff' }} />
									<Typography variant='body2'>пр. Ленина, д. 46</Typography>
								</Stack>
								<Stack direction='row' spacing={1}>
									<Phone sx={{ color: '#00e5ff' }} />
									<Typography variant='body2'>+7 (913) 239-09-63</Typography>
								</Stack>
							</Stack>
						</Grid>
						<Grid item xs={12} md={4}>
							<Typography
								variant='overline'
								sx={{ color: '#00e5ff', fontWeight: 900 }}
							>
								Соцсети
							</Typography>
							<Stack
								direction='row'
								spacing={2}
								sx={{ mt: 2 }}
								justifyContent='center'
							>
								<IconButton
									href='https://t.me/HNKNT0S'
									target='_blank'
									sx={{ color: '#00e5ff', border: '1px solid #222' }}
								>
									<Telegram />
								</IconButton>
								<IconButton
									href='https://wa.me/79132390963'
									target='_blank'
									sx={{ color: '#00e5ff', border: '1px solid #222' }}
								>
									<WhatsApp />
								</IconButton>
							</Stack>
						</Grid>
					</Grid>
				</Container>
			</Box>

			{/* MODAL ЗАПИСИ */}
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
							placeholder='+79001234567'
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
