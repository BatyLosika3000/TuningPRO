import React, { useState } from 'react'
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
} from '@mui/material'
import { Close, CheckCircle, ArrowForward, Build } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'

const COMPLETED_WORKS = [
	{
		id: 1,
		brand: 'BMW',
		model: 'M4 Competition (G82)',
		price: '240 000 ₽',
		description:
			'Основная задача заключалась в создании дерзкого внешнего вида и безопасном увеличении мощности для динамичной езды по городу.',
		details: [
			'Полная оклейка кузова в матовую полиуретановую пленку (Satin Black).',
			'Пакет «Антихром»: окрас решетки радиатора и шильдиков в черный глянец.',
			'Программное увеличение мощности Stage 1 до 600 л.с.',
			'Нанесение защитной керамики на колесные диски и суппорты.',
		],
		img: 'images_our_works/car1.jpg',
	},
	{
		id: 2,
		brand: 'Mercedes-Benz',
		model: 'S-Class Maybach',
		price: '185 000 ₽',
		description:
			'Работа над созданием атмосферы бизнес-джета внутри автомобиля для максимального комфорта в ночное время.',
		details: [
			'Интеграция системы «Звездное небо» (2500 мерцающих нитей с управлением со смартфона).',
			'Установка бесшумных автоматических доводчиков всех дверей.',
			'Детейлинг-химчистка светлого салона с разбором.',
			'Консервация кожаных элементов защитным составом от прокраса джинсами.',
		],
		img: 'images_our_works/car2.jpg',
	},
	{
		id: 3,
		brand: 'Audi',
		model: 'RS6 Avant',
		price: '420 000 ₽',
		description:
			'Комплексный проект по доработке выхлопной системы и установке карбонового обвеса для улучшения аэродинамики.',
		details: [
			'Монтаж титановой выхлопной системы Akrapovič Evolution Line.',
			'Установка карбонового диффузора, сплиттера и боковых порогов.',
			'Перепрошивка КПП для более быстрых переключений в режиме Dynamic.',
			'Замена штатных тормозных шлангов на армированные.',
		],
		img: 'images_our_works/car3.jpg',
	},
	{
		id: 4,
		brand: 'Porsche',
		model: '911 Turbo S',
		price: '310 000 ₽',
		description:
			'Фокус на сохранении идеального состояния ЛКП при активной эксплуатации на треке и трассе.',
		details: [
			'Бронирование всей передней части и зон риска пленкой SunTek PPF.',
			'Восстановительная полировка кузова до зеркального блеска.',
			'Нанесение трех слоев нанокерамики для гидрофобного эффекта.',
		],
		img: 'images_our_works/car4.jpg',
	},
	{
		id: 5,
		brand: 'Toyota',
		model: 'Mark II',
		price: '270 000 ₽',
		description:
			'Комплекс для ценителей японской классики. Подход к защите, достойный Legends Never Die.',
		details: [
			'Бронирование ключевых зон риска пленкой SunTek PPF.',
			'Восстановительная полировка кузова с удалением помутнений.',
			'Нанесение трех слоев нанокерамики с эффектом «мокрого» блеска.',
		],
		img: 'images_our_works/car5.jpg',
	},
	{
		id: 6,
		brand: 'Nissan',
		model: 'GT-R (R35)',
		price: '550 000 ₽',
		description:
			'Легендарный «Годзилла», прошедший через полную техническую и визуальную трансформацию.',
		details: [
			'Установка кованых дисков Rays TE37.',
			'Титановая выхлопная система с «отстрелами».',
			'Stage 2 (мощность до 800 л.с.).',
			'Антигравийная защита «морды» и расширителей арок.',
		],
		img: 'images_our_works/car6.jpg',
	},
	{
		id: 7,
		brand: 'Lamborghini',
		model: 'Urus',
		price: '890 000 ₽',
		description:
			'Самый быстрый кроссовер с рекордным количеством кованого карбона.',
		details: [
			'Полный обвес из кованого карбона.',
			'Перешив салона алькантарой с неоновой прострочкой.',
			'Установка спортивной выхлопной системы.',
			'Чип-тюнинг двигателя и снятие ограничителя скорости.',
		],
		img: 'images_our_works/car7.jpg',
	},
]

// Настройки появления для сетки
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15, // Задержка между появлением каждой карточки
		},
	},
}

// Настройки для каждой карточки с работой
const itemVariants = {
	hidden: { opacity: 0, y: 30, scale: 0.95 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: 'spring',
			damping: 20,
			stiffness: 100,
		},
	},
}

const WorksPage = ({ onOrderClick }) => {
	const [selectedWork, setSelectedWork] = useState(null)

	const handleActionClick = () => {
		setSelectedWork(null)
		if (onOrderClick) {
			setTimeout(() => onOrderClick(), 200)
		}
	}

	return (
		<Box
			sx={{
				pt: { xs: 12, md: 18 },
				pb: 15,
				minHeight: '100vh',
				position: 'relative',
				backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.92)), url('https://img.mercedes-benz-kiev.com/data/lineup/e-class-limousine/mercedes-benz-e-class-limousine-12.jpeg')`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundAttachment: 'fixed',
			}}
		>
			<Container sx={{ position: 'relative', zIndex: 2 }}>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<Typography
						variant='h2'
						sx={{
							fontWeight: 950,
							textAlign: 'center',
							mb: { xs: 5, md: 8 },
							color: '#fff',
							fontSize: { xs: '2.5rem', md: '4rem' },
							textShadow: '0 5px 15px rgba(0,0,0,0.5)',
						}}
					>
						НАШИ <span style={{ color: '#00e5ff' }}>РАБОТЫ</span>
					</Typography>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial='hidden'
					animate='visible'
				>
					<Grid
						container
						spacing={4}
						sx={{
							justifyContent: { xs: 'center', md: 'flex-start' },
						}}
					>
						{COMPLETED_WORKS.map(work => (
							<Grid
								item
								xs={12}
								sm={6}
								md={4}
								key={work.id}
								sx={{
									display: { xs: 'flex', md: 'block' },
									justifyContent: 'center',
								}}
							>
								<motion.div
									variants={itemVariants}
									whileHover={{ y: -10 }}
									style={{
										width: '100%',
										maxWidth: window.innerWidth < 900 ? '400px' : 'none',
									}}
								>
									<Card
										onClick={() => setSelectedWork(work)}
										sx={{
											bgcolor: 'rgba(20, 20, 20, 0.7)',
											backdropFilter: 'blur(10px)',
											borderRadius: 6,
											cursor: 'pointer',
											border: '1px solid rgba(255,255,255,0.1)',
											transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
											width: '100%',
											'&:hover': {
												borderColor: '#00e5ff',
												boxShadow: '0 15px 40px rgba(0,229,255,0.15)',
												bgcolor: 'rgba(30, 30, 30, 0.85)',
											},
										}}
									>
										<CardMedia
											component='img'
											height='240'
											image={work.img}
											sx={{
												objectFit: 'cover',
												filter: 'brightness(0.9)',
												transition: '0.3s',
												'.MuiCard-root:hover &': { filter: 'brightness(1.1)' },
											}}
										/>
										<CardContent sx={{ p: 3 }}>
											<Typography
												variant='h6'
												sx={{ fontWeight: 900, color: '#fff' }}
											>
												{work.model}
											</Typography>
											<Typography
												variant='h6'
												sx={{ color: '#00e5ff', mt: 1, fontWeight: 700 }}
											>
												{work.price}
											</Typography>
										</CardContent>
									</Card>
								</motion.div>
							</Grid>
						))}
					</Grid>
				</motion.div>
			</Container>

			<AnimatePresence>
				{selectedWork && (
					<Dialog
						open={Boolean(selectedWork)}
						onClose={() => setSelectedWork(null)}
						maxWidth='lg'
						fullWidth
						PaperComponent={motion.div}
						PaperProps={{
							initial: { scale: 0.9, opacity: 0 },
							animate: { scale: 1, opacity: 1 },
							exit: { scale: 0.9, opacity: 0 },
							transition: { type: 'spring', damping: 25, stiffness: 300 },
							sx: {
								bgcolor: 'rgba(17, 17, 17, 0.95)',
								backdropFilter: 'blur(20px)',
								borderRadius: { xs: 0, md: 8 },
								color: '#fff',
								overflow: 'hidden',
								height: { xs: '100vh', md: '700px' },
								maxHeight: { xs: '100vh', md: '85vh' },
								margin: { xs: 0, md: 2 },
								border: '1px solid rgba(255,255,255,0.1)',
							},
						}}
					>
						<Box
							sx={{
								display: 'flex',
								flexDirection: { xs: 'column', md: 'row' },
								height: '100%',
								position: 'relative',
							}}
						>
							<IconButton
								onClick={() => setSelectedWork(null)}
								sx={{
									position: 'absolute',
									right: 15,
									top: 15,
									zIndex: 10,
									color: '#fff',
									bgcolor: 'rgba(0,0,0,0.5)',
									backdropFilter: 'blur(4px)',
									'&:hover': { bgcolor: '#00e5ff', color: '#000' },
								}}
							>
								<Close />
							</IconButton>

							<Box
								sx={{
									width: { xs: '100%', md: '50%' },
									height: { xs: '35vh', md: '100%' },
									flexShrink: 0,
								}}
							>
								<img
									src={selectedWork.img}
									alt={selectedWork.model}
									style={{ width: '100%', height: '100%', objectFit: 'cover' }}
								/>
							</Box>

							<Box
								sx={{
									width: { xs: '100%', md: '50%' },
									display: 'flex',
									flexDirection: 'column',
									height: { xs: '65vh', md: '100%' },
								}}
							>
								<Box
									sx={{
										p: { xs: 3, md: 5 },
										overflowY: 'auto',
										flexGrow: 1,
										'&::-webkit-scrollbar': { display: 'none' },
										msOverflowStyle: 'none',
										scrollbarWidth: 'none',
									}}
								>
									<Typography
										variant='overline'
										sx={{ color: '#00e5ff', fontWeight: 900, letterSpacing: 2 }}
									>
										ДЕТАЛИ ПРОЕКТА
									</Typography>
									<Typography
										variant='h3'
										sx={{
											fontWeight: 950,
											mb: 1,
											mt: 1,
											lineHeight: 1.1,
											fontSize: { xs: '1.8rem', md: '2.8rem' },
										}}
									>
										{selectedWork.model}
									</Typography>
									<Typography
										variant='h5'
										sx={{
											color: '#00e5ff',
											fontWeight: 900,
											mb: 3,
											fontSize: { xs: '1.2rem', md: '1.5rem' },
										}}
									>
										{selectedWork.price}
									</Typography>

									<Typography
										variant='body1'
										sx={{
											color: 'rgba(255,255,255,0.7)',
											mb: 4,
											lineHeight: 1.6,
											fontSize: { xs: '0.9rem', md: '1rem' },
										}}
									>
										{selectedWork.description}
									</Typography>

									<Divider
										sx={{ mb: 4, borderColor: 'rgba(255,255,255,0.1)' }}
									/>

									<Typography
										variant='subtitle1'
										sx={{
											fontWeight: 800,
											mb: 2,
											display: 'flex',
											alignItems: 'center',
											gap: 1,
										}}
									>
										<Build sx={{ fontSize: 20, color: '#00e5ff' }} /> Список
										доработок:
									</Typography>

									<List sx={{ mb: 2 }}>
										{selectedWork.details.map((item, i) => (
											<ListItem key={i} disableGutters sx={{ py: 0.5 }}>
												<ListItemIcon sx={{ minWidth: 35 }}>
													<CheckCircle
														sx={{ color: '#00e5ff', fontSize: 20 }}
													/>
												</ListItemIcon>
												<ListItemText
													primary={item}
													primaryTypographyProps={{
														fontSize: { xs: '0.85rem', md: '0.95rem' },
													}}
												/>
											</ListItem>
										))}
									</List>
								</Box>

								<Box
									sx={{
										p: { xs: 2, md: 4 },
										bgcolor: 'rgba(0,0,0,0.2)',
										borderTop: '1px solid rgba(255,255,255,0.05)',
										mt: 'auto',
									}}
								>
									<Button
										variant='contained'
										fullWidth
										onClick={handleActionClick}
										endIcon={<ArrowForward />}
										sx={{
											py: { xs: 1.5, md: 2 },
											borderRadius: 4,
											bgcolor: '#00e5ff',
											color: '#000',
											fontWeight: 900,
											fontSize: '1rem',
											transition: '0.3s',
											'&:hover': {
												bgcolor: '#fff',
												transform: 'scale(1.02)',
											},
										}}
									>
										Заказать такой же тюнинг
									</Button>
								</Box>
							</Box>
						</Box>
					</Dialog>
				)}
			</AnimatePresence>
		</Box>
	)
}

export default WorksPage
