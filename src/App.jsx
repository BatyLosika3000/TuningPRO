import React, { useState, useEffect } from 'react'
import {
	ThemeProvider,
	createTheme,
	CssBaseline,
	Box,
	Container,
	Typography,
	AppBar,
	Toolbar,
	Button,
	Grid,
	IconButton,
	Stack,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	CircularProgress,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from '@mui/material'
import {
	Instagram,
	Telegram,
	WhatsApp,
	LocationOn,
	Phone,
	ChevronLeft,
	ChevronRight,
	Menu as MenuIcon,
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'

const MY_PROJECTS = [
	{ id: 1, img: '/images_main/car1.jpg' },
	{ id: 2, img: '/images_main/car_interior1.jpg' },
	{ id: 3, img: '/images_main/car2.jpg' },
	{ id: 4, img: '/images_main/car_interior2.jpg' },
	{ id: 5, img: '/images_main/car3.jpg' },
	{ id: 6, img: '/images_main/car_interior3.jpg' },
	{ id: 7, img: '/images_main/Nikita.png' },
]

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: { main: '#00e5ff' },
		background: { default: '#050505', paper: '#111111' },
	},
	typography: {
		fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				html: { scrollBehavior: 'smooth' },
				body: { overflowX: 'hidden' },
			},
		},
	},
})

const slideVariants = {
	enter: direction => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
	center: { zIndex: 1, x: 0, opacity: 1 },
	exit: direction => ({
		zIndex: 0,
		x: direction < 0 ? '100%' : '-100%',
		opacity: 0,
	}),
}

function App() {
	const [[page, direction], setPage] = useState([0, 0])
	const [open, setOpen] = useState(false)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		carModel: '',
	})

	const index = Math.abs(page % MY_PROJECTS.length)
	const paginate = newDirection => setPage([page + newDirection, newDirection])

	useEffect(() => {
		const timer = setInterval(() => paginate(1), 8000)
		return () => clearInterval(timer)
	}, [page])

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async () => {
		setLoading(true)
		await new Promise(resolve => setTimeout(resolve, 1500))
		alert(`Спасибо, ${formData.name}! Заявка на ${formData.carModel} принята.`)
		setOpen(false)
		setFormData({ name: '', phone: '', carModel: '' })
		setLoading(false)
	}

	const navItems = ['Каталог', 'Услуги', 'Наши работы']

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<AppBar
				position='fixed'
				sx={{
					background: 'rgba(5, 5, 5, 0.85)',
					backdropFilter: 'blur(15px)',
					borderBottom: '1px solid rgba(255,255,255,0.08)',
				}}
				elevation={0}
			>
				<Toolbar sx={{ px: { xs: 2, md: 5 } }}>
					<Typography
						variant='h5'
						sx={{ fontWeight: 900, letterSpacing: -1.5 }}
					>
						TUNING<span style={{ color: '#00e5ff' }}>PRO</span>
					</Typography>

					<Box sx={{ flexGrow: 1 }} />

					{/* Десктопное меню — возвращено на центр/право */}
					<Stack
						direction='row'
						spacing={4}
						sx={{ display: { xs: 'none', md: 'flex' } }}
					>
						{navItems.map(item => (
							<Button
								key={item}
								color='inherit'
								sx={{
									fontWeight: 500,
									fontSize: '0.9rem',
									'&:hover': { color: '#00e5ff', background: 'transparent' },
								}}
							>
								{item}
							</Button>
						))}
					</Stack>

					<Box sx={{ flexGrow: { xs: 0, md: 1 } }} />

					{/* Заглушка для симметрии на десктопе */}
					<Box sx={{ width: 120, display: { xs: 'none', md: 'block' } }} />

					<IconButton
						color='inherit'
						edge='end'
						onClick={() => setMobileMenuOpen(true)}
						sx={{ display: { md: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			<Drawer
				anchor='right'
				open={mobileMenuOpen}
				onClose={() => setMobileMenuOpen(false)}
				PaperProps={{ sx: { width: 250, bgcolor: '#111' } }}
			>
				<List sx={{ pt: 4 }}>
					{navItems.map(text => (
						<ListItem key={text} disablePadding>
							<ListItemButton onClick={() => setMobileMenuOpen(false)}>
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

			<Box sx={{ pt: { xs: 12, md: 18 }, pb: 10, textAlign: 'center' }}>
				<Container maxWidth='lg'>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<Typography
							variant='h1'
							sx={{
								fontWeight: 950,
								mb: 2,
								fontSize: { xs: '2.5rem', md: '5rem' },
								lineHeight: 0.9,
								letterSpacing: -2,
							}}
						>
							НОВЫЙ УРОВЕНЬ <br />{' '}
							<span style={{ color: '#00e5ff' }}>ТВОЕГО АВТО</span>
						</Typography>
						<Typography
							variant='h6'
							sx={{
								color: 'rgba(255,255,255,0.5)',
								fontWeight: 300,
								mb: 6,
								px: 2,
							}}
						>
							Эксклюзивные решения для тех, кто ценит стиль
						</Typography>
					</motion.div>
				</Container>

				<Box
					sx={{
						position: 'relative',
						height: { xs: '350px', md: '650px' },
						width: '100%',
						overflow: 'hidden',
						bgcolor: '#000',
					}}
				>
					<AnimatePresence initial={false} custom={direction} mode='popLayout'>
						<motion.img
							key={page}
							custom={direction}
							src={MY_PROJECTS[index].img}
							variants={slideVariants}
							initial='enter'
							animate='center'
							exit='exit'
							transition={{
								x: { duration: 1, ease: [0.4, 0, 0.2, 1] },
								opacity: { duration: 0.5 },
							}}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								position: 'absolute',
								top: 0,
								left: 0,
							}}
						/>
					</AnimatePresence>

					<IconButton
						onClick={() => paginate(-1)}
						sx={{
							position: 'absolute',
							left: { xs: 10, md: 30 },
							top: '50%',
							zIndex: 10,
							bgcolor: 'rgba(0,0,0,0.4)',
							color: '#fff',
						}}
					>
						<ChevronLeft fontSize='large' />
					</IconButton>
					<IconButton
						onClick={() => paginate(1)}
						sx={{
							position: 'absolute',
							right: { xs: 10, md: 30 },
							top: '50%',
							zIndex: 10,
							bgcolor: 'rgba(0,0,0,0.4)',
							color: '#fff',
						}}
					>
						<ChevronRight fontSize='large' />
					</IconButton>
				</Box>

				<Stack
					direction='row'
					spacing={1.5}
					justifyContent='center'
					sx={{ mt: 3 }}
				>
					{MY_PROJECTS.map((_, i) => (
						<Box
							key={i}
							onClick={() => setPage([i, i > index ? 1 : -1])}
							sx={{
								width: i === index ? 30 : 10,
								height: 10,
								borderRadius: '5px',
								bgcolor: i === index ? '#00e5ff' : 'rgba(255,255,255,0.2)',
								transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
								cursor: 'pointer',
							}}
						/>
					))}
				</Stack>

				<Box sx={{ mt: 6, px: 2 }}>
					<Button
						variant='contained'
						onClick={() => setOpen(true)}
						sx={{
							px: { xs: 4, md: 12 },
							py: 2.5,
							borderRadius: '50px',
							fontSize: '1.1rem',
							fontWeight: 800,
							textTransform: 'uppercase',
							background: 'linear-gradient(90deg, #00e5ff, #00b0ff)',
							color: '#000',
							width: { xs: '100%', sm: 'auto' },
						}}
					>
						Записаться на тюнинг
					</Button>
				</Box>
			</Box>

			<Dialog
				open={open}
				onClose={() => !loading && setOpen(false)}
				BackdropProps={{
					sx: { backdropFilter: 'blur(10px)', bgcolor: 'rgba(0,0,0,0.8)' },
				}}
				PaperProps={{
					sx: {
						borderRadius: 8,
						bgcolor: '#111',
						border: '1px solid rgba(255,255,255,0.1)',
						p: 3,
						maxWidth: '450px',
					},
				}}
			>
				<DialogTitle
					sx={{ fontWeight: 900, textAlign: 'center', fontSize: '2rem' }}
				>
					ВАША <span style={{ color: '#00e5ff' }}>ЗАЯВКА</span>
				</DialogTitle>
				<DialogContent sx={{ mt: 1 }}>
					<Stack spacing={3}>
						<TextField
							fullWidth
							label='Ваше имя'
							name='name'
							variant='outlined'
							value={formData.name}
							onChange={handleInputChange}
							disabled={loading}
							InputProps={{ sx: { borderRadius: 4 } }}
						/>
						<TextField
							fullWidth
							label='Телефон'
							name='phone'
							variant='outlined'
							value={formData.phone}
							onChange={handleInputChange}
							disabled={loading}
							InputProps={{ sx: { borderRadius: 4 } }}
						/>
						<TextField
							fullWidth
							label='Марка авто'
							name='carModel'
							variant='outlined'
							value={formData.carModel}
							onChange={handleInputChange}
							disabled={loading}
							InputProps={{ sx: { borderRadius: 4 } }}
						/>
					</Stack>
				</DialogContent>
				<DialogActions sx={{ pb: 2, px: 3, justifyContent: 'center' }}>
					<Button
						onClick={() => setOpen(false)}
						sx={{ color: 'rgba(255,255,255,0.5)' }}
						disabled={loading}
					>
						Закрыть
					</Button>
					<Button
						variant='contained'
						onClick={handleSubmit}
						disabled={loading || !formData.name || !formData.phone}
						sx={{
							px: 6,
							borderRadius: 10,
							bgcolor: '#00e5ff',
							color: '#000',
							fontWeight: 700,
							minWidth: '160px',
						}}
					>
						{loading ? (
							<CircularProgress size={24} color='inherit' />
						) : (
							'Жду звонка'
						)}
					</Button>
				</DialogActions>
			</Dialog>

			<Box
				component='footer'
				sx={{ py: 10, bgcolor: '#000', borderTop: '1px solid #111' }}
			>
				<Container>
					<Grid
						container
						spacing={6}
						justifyContent='center'
						textAlign='center'
					>
						<Grid item xs={12} md={4}>
							<Typography variant='h6' sx={{ fontWeight: 900, mb: 2 }}>
								TUNINGPRO
							</Typography>
							<Typography
								variant='body2'
								sx={{
									color: 'rgba(255,255,255,0.4)',
									lineHeight: 1.8,
									maxWidth: '300px',
									mx: 'auto',
								}}
							>
								Профессиональное дооснащение автомобилей премиум-класса. <br />{' '}
								Барнаул 2026.
							</Typography>
						</Grid>

						<Grid item xs={12} md={4}>
							<Typography
								variant='overline'
								sx={{ color: '#00e5ff', fontWeight: 900 }}
							>
								Контакты
							</Typography>
							<Stack spacing={2} sx={{ mt: 2 }} alignItems='center'>
								<Stack direction='row' spacing={2} alignItems='center'>
									<LocationOn sx={{ color: '#00e5ff' }} />
									<Typography variant='body1'>пр. Ленина, д. 46</Typography>
								</Stack>
								<Stack direction='row' spacing={2} alignItems='center'>
									<Phone sx={{ color: '#00e5ff' }} />
									<Typography variant='body1'>+7 (913) 239-09-63</Typography>
								</Stack>
							</Stack>
						</Grid>

						<Grid item xs={12} md={4}>
							<Typography
								variant='overline'
								sx={{ color: '#00e5ff', fontWeight: 900 }}
							>
								Мы в соцсетях
							</Typography>
							<Stack
								direction='row'
								spacing={2}
								sx={{ mt: 2 }}
								justifyContent='center'
							>
								<IconButton
									component='a'
									href='https://t.me/HNKNT0S'
									target='_blank'
									sx={{ border: '1px solid #222' }}
								>
									<Telegram />
								</IconButton>
								<IconButton
									component='a'
									href='https://wa.me/79132390963'
									target='_blank'
									sx={{ border: '1px solid #222' }}
								>
									<WhatsApp />
								</IconButton>
								<IconButton
									component='a'
									href='https://instagram.com/'
									target='_blank'
									sx={{ border: '1px solid #222' }}
								>
									<Instagram />
								</IconButton>
							</Stack>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</ThemeProvider>
	)
}

export default App
