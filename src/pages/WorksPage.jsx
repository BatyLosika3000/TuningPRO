import React, { useState, useMemo } from 'react'
import {
	Box,
	Container,
	Typography,
	Grid,
	Card,
	CardMedia,
	CardContent,
	Divider,
	Dialog,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Button,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import { Close, CheckCircle, ArrowForward, Build } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'

// --- Константы данных (можно вынести в отдельный файл) ---
const COMPLETED_WORKS = [
	{
		id: 1,
		brand: 'BMW',
		model: 'M4 Competition (G82)',
		price: 240000,
		description:
			'Создание дерзкого внешнего вида и безопасное увеличение мощности для динамичной езды.',
		details: [
			'Оклейка в матовый полиуретан (Satin Black)',
			'Пакет «Антихром» (черный глянец)',
			'Stage 1 до 600 л.с.',
			'Керамика на диски и суппорты',
		],
		img: 'images_our_works/car1.jpg',
	},
	{
		id: 2,
		brand: 'Mercedes-Benz',
		model: 'S-Class Maybach',
		price: 185000,
		description:
			'Атмосфера бизнес-джета внутри автомобиля для максимального комфорта.',
		details: [
			'Система «Звездное небо» (2500 нитей)',
			'Бесшумные доводчики дверей',
			'Детейлинг-химчистка салона',
			'Защита кожи составом от прокраса',
		],
		img: 'images_our_works/car2.jpg',
	},
	{
		id: 3,
		brand: 'Audi',
		model: 'RS6 Avant',
		price: 420000,
		description:
			'Комплексный проект по выхлопной системе и карбоновому обвесу.',
		details: [
			'Выхлоп Akrapovič Evolution Line',
			'Карбоновый обвес (диффузор, сплиттер)',
			'Прошивка КПП (быстрые переключения)',
			'Армированные тормозные шланги',
		],
		img: 'images_our_works/car3.jpg',
	},
	{
		id: 4,
		brand: 'Porsche',
		model: '911 Turbo S',
		price: 310000,
		description:
			'Сохранение идеального состояния ЛКП при активной эксплуатации на треке.',
		details: [
			'Бронирование пленкой SunTek PPF',
			'Восстановительная полировка',
			'Три слоя нанокерамики',
		],
		img: 'images_our_works/car4.jpg',
	},
	{
		id: 5,
		brand: 'Toyota',
		model: 'Mark II',
		price: 270000,
		description:
			'Легендарная японская классика. Подход к защите Legends Never Die.',
		details: [
			'Бронирование зон риска SunTek PPF',
			'Удаление помутнений ЛКП',
			'Эффект «мокрого» блеска керамикой',
		],
		img: 'images_our_works/car5.jpg',
	},
	{
		id: 6,
		brand: 'Nissan',
		model: 'GT-R (R35)',
		price: 550000,
		description: 'Трансформация «Годзиллы»: от технической части до эстетики.',
		details: [
			'Кованые диски Rays TE37',
			'Титановый выхлоп с отстрелами',
			'Stage 2 (800 л.с.)',
			'Антигравийная защита арок',
		],
		img: 'images_our_works/car6.jpg',
	},
	{
		id: 7,
		brand: 'Lamborghini',
		model: 'Urus',
		price: 890000,
		description:
			'Самый быстрый кроссовер с рекордным количеством кованого карбона.',
		details: [
			'Полный обвес из кованого карбона',
			'Алькантара с неоновой прострочкой',
			'Спортивный выхлоп',
			'Снятие ограничителя скорости',
		],
		img: 'images_our_works/car7.jpg',
	},
]

// --- Анимации Framer Motion ---
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.12 },
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 20, scale: 0.95 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { type: 'spring', damping: 25, stiffness: 120 },
	},
}

// --- Компонент ---
const WorksPage = ({ onOrderClick }) => {
	const [selectedWork, setSelectedWork] = useState(null)
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	// Форматирование цены (рубли)
	const formatPrice = value =>
		new Intl.NumberFormat('ru-RU', {
			style: 'currency',
			currency: 'RUB',
			maximumFractionDigits: 0,
		}).format(value)

	const handleActionClick = () => {
		const work = selectedWork
		setSelectedWork(null)
		if (onOrderClick) {
			// Небольшая задержка, чтобы диалог успел начать закрываться
			setTimeout(() => onOrderClick(work), 300)
		}
	}

	return (
		<Box
			sx={{
				pt: { xs: 10, md: 15 },
				pb: 10,
				minHeight: '100vh',
				backgroundColor: '#0a0a0a',
				backgroundImage: `radial-gradient(circle at 50% 0%, rgba(0, 229, 255, 0.15) 0%, transparent 50%), 
                          linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.95))`,
				backgroundAttachment: 'fixed',
			}}
		>
			<Container maxWidth='xl'>
				{/* Заголовок */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<Typography
						variant='h2'
						sx={{
							fontWeight: 900,
							textAlign: 'center',
							mb: { xs: 6, md: 10 },
							color: '#fff',
							fontSize: { xs: '2.5rem', md: '4.5rem' },
							letterSpacing: -1,
						}}
					>
						НАШИ{' '}
						<span
							style={{
								color: '#00e5ff',
								textShadow: '0 0 30px rgba(0,229,255,0.4)',
							}}
						>
							РАБОТЫ
						</span>
					</Typography>
				</motion.div>

				{/* Сетка карточек */}
				<motion.div
					variants={containerVariants}
					initial='hidden'
					animate='visible'
				>
					<Grid container spacing={4} justifyContent='center'>
						{COMPLETED_WORKS.map(work => (
							<Grid item xs={12} sm={6} md={4} key={work.id}>
								<motion.div variants={itemVariants} whileHover={{ y: -8 }}>
									<Card
										onClick={() => setSelectedWork(work)}
										sx={{
											bgcolor: 'rgba(25, 25, 25, 0.6)',
											backdropFilter: 'blur(12px)',
											borderRadius: 5,
											cursor: 'pointer',
											border: '1px solid rgba(255,255,255,0.08)',
											overflow: 'hidden',
											transition: 'all 0.3s ease-in-out',
											'&:hover': {
												borderColor: '#00e5ff',
												boxShadow:
													'0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(0,229,255,0.1)',
												bgcolor: 'rgba(35, 35, 35, 0.8)',
											},
										}}
									>
										<Box sx={{ overflow: 'hidden', height: 260 }}>
											<CardMedia
												component='img'
												image={work.img}
												alt={work.model}
												loading='lazy'
												sx={{
													height: '100%',
													transition: 'transform 0.5s ease',
													'.MuiCard-root:hover &': { transform: 'scale(1.1)' },
												}}
											/>
										</Box>
										<CardContent sx={{ p: 3 }}>
											<Typography
												variant='caption'
												sx={{
													color: 'rgba(255,255,255,0.5)',
													fontWeight: 700,
													textTransform: 'uppercase',
												}}
											>
												{work.brand}
											</Typography>
											<Typography
												variant='h5'
												sx={{ fontWeight: 800, color: '#fff', mt: 0.5 }}
											>
												{work.model}
											</Typography>
											<Typography
												variant='h6'
												sx={{ color: '#00e5ff', mt: 1, fontWeight: 700 }}
											>
												{formatPrice(work.price)}
											</Typography>
										</CardContent>
									</Card>
								</motion.div>
							</Grid>
						))}
					</Grid>
				</motion.div>
			</Container>

			{/* Модальное окно деталей */}
			<AnimatePresence>
				{selectedWork && (
					<Dialog
						open={!!selectedWork}
						onClose={() => setSelectedWork(null)}
						maxWidth='lg'
						fullWidth
						scroll='body'
						PaperProps={{
							sx: {
								bgcolor: '#111',
								backgroundImage: 'none',
								borderRadius: { xs: 0, md: 6 },
								border: '1px solid rgba(255,255,255,0.1)',
								overflow: 'hidden',
							},
						}}
					>
						<Box
							sx={{
								position: 'relative',
								display: 'flex',
								flexDirection: { xs: 'column', md: 'row' },
							}}
						>
							<IconButton
								onClick={() => setSelectedWork(null)}
								sx={{
									position: 'absolute',
									right: 16,
									top: 16,
									zIndex: 10,
									bgcolor: 'rgba(0,0,0,0.6)',
									color: '#fff',
									'&:hover': { bgcolor: '#00e5ff', color: '#000' },
								}}
							>
								<Close />
							</IconButton>

							{/* Изображение в диалоге */}
							<Box
								sx={{
									width: { xs: '100%', md: '55%' },
									height: { xs: 300, md: 'auto' },
								}}
							>
								<img
									src={selectedWork.img}
									alt={selectedWork.model}
									style={{ width: '100%', height: '100%', objectFit: 'cover' }}
								/>
							</Box>

							{/* Контент в диалоге */}
							<Box
								sx={{
									p: { xs: 3, md: 6 },
									width: { xs: '100%', md: '45%' },
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<Typography
									variant='overline'
									sx={{ color: '#00e5ff', fontWeight: 800, letterSpacing: 2 }}
								>
									Детали проекта
								</Typography>
								<Typography
									variant='h3'
									sx={{
										color: '#fff',
										fontWeight: 900,
										mb: 1,
										mt: 1,
										fontSize: { xs: '2rem', md: '3rem' },
									}}
								>
									{selectedWork.model}
								</Typography>
								<Typography
									variant='h4'
									sx={{ color: '#00e5ff', fontWeight: 700, mb: 3 }}
								>
									{formatPrice(selectedWork.price)}
								</Typography>

								<Typography
									variant='body1'
									sx={{
										color: 'rgba(255,255,255,0.7)',
										mb: 4,
										lineHeight: 1.8,
									}}
								>
									{selectedWork.description}
								</Typography>

								<Divider sx={{ mb: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

								<Typography
									variant='subtitle1'
									sx={{
										color: '#fff',
										fontWeight: 700,
										mb: 2,
										display: 'flex',
										alignItems: 'center',
										gap: 1,
									}}
								>
									<Build sx={{ fontSize: 18, color: '#00e5ff' }} /> Список
									доработок:
								</Typography>

								<List sx={{ mb: 4 }}>
									{selectedWork.details.map((detail, idx) => (
										<ListItem key={idx} disableGutters sx={{ py: 0.5 }}>
											<ListItemIcon sx={{ minWidth: 32 }}>
												<CheckCircle sx={{ color: '#00e5ff', fontSize: 20 }} />
											</ListItemIcon>
											<ListItemText
												primary={detail}
												primaryTypographyProps={{
													color: '#eee',
													fontSize: '0.95rem',
												}}
											/>
										</ListItem>
									))}
								</List>

								<Button
									variant='contained'
									fullWidth
									onClick={handleActionClick}
									endIcon={<ArrowForward />}
									sx={{
										mt: 'auto',
										py: 2,
										borderRadius: 3,
										bgcolor: '#00e5ff',
										color: '#000',
										fontWeight: 900,
										'&:hover': {
											bgcolor: '#fff',
											transform: 'translateY(-2px)',
										},
										transition: 'all 0.3s',
									}}
								>
									Заказать аналогичный тюнинг
								</Button>
							</Box>
						</Box>
					</Dialog>
				)}
			</AnimatePresence>
		</Box>
	)
}

export default WorksPage
