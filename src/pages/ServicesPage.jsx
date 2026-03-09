import React, { useState } from 'react'
import {
	Box,
	Container,
	Typography,
	Grid,
	Button,
	Stack,
	Card,
} from '@mui/material'
import {
	AddShoppingCart,
	ChevronRight,
	ArrowBack,
	AirlineSeatReclineExtra,
	Palette,
	AutoFixHigh,
	SettingsInputComponent,
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'

const ALL_SERVICES = {
	ИНТЕРЬЕР: {
		'Перетяжка салона': [
			{ name: 'Перетяжка сидений', price: 45000 },
			{ name: 'Перетяжка потолка', price: 15000 },
			{ name: 'Перетяжка дверных карт', price: 12000 },
			{ name: 'Перетяжка торпеды', price: 35000 },
			{ name: 'Перетяжка руля', price: 8000 },
			{ name: 'Перетяжка AIRBAG', price: 5000 },
			{ name: 'Перетяжка консолей', price: 10000 },
			{ name: 'Перетяжка мелких элементов', price: 3000 },
		],
		'Лазерная гравировка': [
			{ name: 'Гравировка на алькантаре', price: 3500 },
			{ name: 'Восстановление пиктограмм', price: 1500 },
		],
		'Замена лент ремней': [
			{ name: 'Цветные ремни', price: 7000 },
			{ name: 'Дизайнерские ремни', price: 10000 },
		],
		'Изменение анатомии': [
			{ name: 'Замена пенолитья', price: 8000 },
			{ name: 'Боковая поддержка', price: 15000 },
		],
		'Ремонт и реставрация': [
			{ name: 'Покраска кожи', price: 5000 },
			{ name: 'Реставрация пластика', price: 4000 },
		],
		'Ламинация деталей': [
			{ name: 'Классический карбон', price: 15000 },
			{ name: 'Кованый карбон', price: 20000 },
		],
		'Дополнительные услуги': [
			{ name: 'Индивидуальная перфорация', price: 15000 },
			{ name: 'Изготовление ковров', price: 25000 },
			{ name: 'Дизайн-проект', price: 10000 },
		],
	},
	СТАЙЛИНГ: {
		'Оклейка авто': [
			{ name: 'Защитная полиуретановая пленка', price: 150000 },
			{ name: 'Цветная полиуретановая пленка', price: 180000 },
			{ name: 'Виниловая пленка', price: 110000 },
		],
		'Оклейка деталей салона': [
			{ name: 'Приборная панель', price: 5000 },
			{ name: 'Мониторы', price: 3500 },
		],
		Стекла: [
			{ name: 'Тонировка', price: 6000 },
			{ name: 'Атермальная тонировка', price: 10000 },
		],
		'Дополнительные услуги': [
			{ name: 'Покраска суппортов', price: 20000 },
			{ name: 'Антихром', price: 15000 },
		],
	},
	ДЕТЕЙЛИНГ: {
		'Перечень услуг': [
			{ name: 'Полировка авто', price: 20000 },
			{ name: 'Покрытие керамикой', price: 35000 },
			{ name: 'Химчистка салона', price: 15000 },
			{ name: 'Озонация салона', price: 2500 },
		],
	},
	'ДОП. ОБОРУДОВАНИЕ': {
		'Перечень услуг': [
			{ name: 'Доводчики дверей', price: 60000 },
			{ name: 'Шумоизоляция', price: 75000 },
			{ name: 'Звездное небо', price: 50000 },
		],
	},
}

const MAIN_CATEGORIES = [
	{
		id: 'ИНТЕРЬЕР',
		icon: <AirlineSeatReclineExtra sx={{ fontSize: { xs: 30, md: 40 } }} />,
		desc: 'Салон',
	},
	{
		id: 'СТАЙЛИНГ',
		icon: <Palette sx={{ fontSize: { xs: 30, md: 40 } }} />,
		desc: 'Внешний вид',
	},
	{
		id: 'ДЕТЕЙЛИНГ',
		icon: <AutoFixHigh sx={{ fontSize: { xs: 30, md: 40 } }} />,
		desc: 'Уход',
	},
	{
		id: 'ДОП. ОБОРУДОВАНИЕ',
		icon: <SettingsInputComponent sx={{ fontSize: { xs: 30, md: 40 } }} />,
		desc: 'Допы',
	},
]

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
		},
	},
	exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const cardVariants = {
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

const ServicesPage = ({ onAddToCart }) => {
	const [selectedMain, setSelectedMain] = useState(null)
	const [activeSub, setActiveSub] = useState(null)

	const handleSelectMain = id => {
		setSelectedMain(id)
		if (ALL_SERVICES[id]) {
			setActiveSub(Object.keys(ALL_SERVICES[id])[0])
		}
		// Прокрутка вверх при выборе категории на мобилке
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<Box
			sx={{
				pt: { xs: 12, md: 18 }, // Меньше отступ сверху для мобилок
				pb: { xs: 8, md: 15 },
				minHeight: '100vh',
				color: '#fff',
				position: 'relative',
				backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.9)), url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop')`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundAttachment: 'fixed',
			}}
		>
			<Container maxWidth='lg' sx={{ position: 'relative', zIndex: 2 }}>
				<AnimatePresence mode='wait'>
					{!selectedMain ? (
						<motion.div
							key='grid'
							variants={containerVariants}
							initial='hidden'
							animate='visible'
							exit='exit'
						>
							<Typography
								variant='h2'
								sx={{
									fontWeight: 950,
									textAlign: 'center',
									mb: { xs: 4, md: 8 },
									fontSize: { xs: '2.5rem', md: '3.75rem' }, // Адаптивный размер шрифта
									textShadow: '0 4px 20px rgba(0,0,0,0.5)',
								}}
							>
								НАШИ <span style={{ color: '#00e5ff' }}>УСЛУГИ</span>
							</Typography>
							<Grid container spacing={{ xs: 2, md: 3 }}>
								{MAIN_CATEGORIES.map(cat => (
									<Grid item xs={6} sm={6} md={3} key={cat.id}>
										<motion.div variants={cardVariants}>
											<Card
												onClick={() => handleSelectMain(cat.id)}
												sx={{
													bgcolor: 'rgba(17, 17, 17, 0.8)',
													backdropFilter: 'blur(10px)',
													p: { xs: 2, md: 4 }, // Меньше паддинг на мобилках
													borderRadius: { xs: 4, md: 8 },
													textAlign: 'center',
													cursor: 'pointer',
													border: '1px solid rgba(255,255,255,0.1)',
													transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
													'&:hover': {
														borderColor: '#00e5ff',
														transform: 'translateY(-10px)',
														bgcolor: 'rgba(0, 229, 255, 0.05)',
														boxShadow: '0 10px 30px rgba(0,229,255,0.2)',
													},
												}}
											>
												<Box sx={{ color: '#00e5ff', mb: { xs: 1, md: 2 } }}>
													{cat.icon}
												</Box>
												<Typography
													variant='h6'
													sx={{
														fontWeight: 900,
														fontSize: { xs: '0.8rem', md: '1.1rem' }, // Масштабируем текст
													}}
												>
													{cat.id}
												</Typography>
											</Card>
										</motion.div>
									</Grid>
								))}
							</Grid>
						</motion.div>
					) : (
						<motion.div
							key='details'
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -30 }}
							transition={{ duration: 0.5, ease: 'easeOut' }}
						>
							<Button
								startIcon={<ArrowBack />}
								onClick={() => setSelectedMain(null)}
								sx={{
									color: '#00e5ff',
									mb: { xs: 2, md: 4 },
									fontWeight: 700,
									fontSize: { xs: '0.8rem', md: '0.9rem' },
									'&:hover': { bgcolor: 'rgba(0,229,255,0.1)' },
								}}
							>
								Назад к направлениям
							</Button>
							<Typography
								variant='h3'
								sx={{
									fontWeight: 950,
									mb: { xs: 3, md: 6 },
									fontSize: { xs: '1.8rem', md: '3rem' },
									textShadow: '0 2px 10px rgba(0,0,0,0.5)',
								}}
							>
								{selectedMain}
							</Typography>

							<Grid container spacing={{ xs: 2, md: 4 }}>
								{/* Левая колонка - Меню подкатегорий */}
								<Grid item xs={12} md={5}>
									<Stack
										direction={{ xs: 'row', md: 'column' }} // На мобилках в ряд с прокруткой
										spacing={2}
										sx={{
											overflowX: { xs: 'auto', md: 'visible' }, // Горизонтальный скролл на мобилках
											pb: { xs: 2, md: 0 },
											'&::-webkit-scrollbar': { display: 'none' }, // Прячем скроллбар
										}}
									>
										{Object.keys(ALL_SERVICES[selectedMain]).map(sub => (
											<Box
												key={sub}
												onClick={() => setActiveSub(sub)}
												sx={{
													p: { xs: 2, md: 3 },
													minWidth: { xs: '200px', md: 'auto' }, // Чтобы в ряду не сжимались
													cursor: 'pointer',
													borderRadius: { xs: 3, md: 4 },
													bgcolor:
														activeSub === sub
															? '#00e5ff'
															: 'rgba(255,255,255,0.05)',
													backdropFilter: 'blur(5px)',
													color: activeSub === sub ? '#000' : '#fff',
													border: '1px solid',
													borderColor:
														activeSub === sub
															? '#00e5ff'
															: 'rgba(255,255,255,0.1)',
													display: 'flex',
													justifyContent: 'space-between',
													alignItems: 'center',
													transition: '0.3s',
													'&:hover': {
														bgcolor:
															activeSub === sub
																? '#00e5ff'
																: 'rgba(255,255,255,0.12)',
													},
												}}
											>
												<Typography
													sx={{
														fontWeight: 800,
														fontSize: { xs: '0.75rem', md: '0.9rem' },
													}}
												>
													{sub.toUpperCase()}
												</Typography>
												<ChevronRight
													sx={{ display: { xs: 'none', md: 'block' } }}
												/>
											</Box>
										))}
									</Stack>
								</Grid>

								{/* Правая колонка - Список услуг */}
								<Grid item xs={12} md={7}>
									<Box
										sx={{
											bgcolor: 'rgba(17, 17, 17, 0.7)',
											backdropFilter: 'blur(15px)',
											borderRadius: { xs: 4, md: 6 },
											p: { xs: 2, md: 4 },
											border: '1px solid rgba(255,255,255,0.08)',
											minHeight: { xs: 'auto', md: 450 },
										}}
									>
										<Typography
											variant='h5'
											sx={{
												fontWeight: 900,
												mb: { xs: 2, md: 4 },
												color: '#00e5ff',
												fontSize: { xs: '1.1rem', md: '1.5rem' },
											}}
										>
											{activeSub}
										</Typography>
										<Stack spacing={1.5}>
											{activeSub &&
												ALL_SERVICES[selectedMain][activeSub].map(
													(item, idx) => (
														<Box
															key={idx}
															sx={{
																p: 2,
																display: 'flex',
																justifyContent: 'space-between',
																alignItems: 'center',
																bgcolor: 'rgba(255,255,255,0.03)',
																borderRadius: 3,
																border: '1px solid rgba(255,255,255,0.05)',
																transition: '0.2s',
																'&:hover': {
																	bgcolor: 'rgba(255,255,255,0.07)',
																	borderColor: 'rgba(0,229,255,0.3)',
																},
															}}
														>
															<Box sx={{ pr: 2 }}>
																<Typography
																	sx={{
																		fontWeight: 600,
																		fontSize: { xs: '0.85rem', md: '1rem' },
																	}}
																>
																	{item.name}
																</Typography>
																<Typography
																	sx={{
																		color: '#00e5ff',
																		fontWeight: 900,
																		fontSize: { xs: '0.85rem', md: '1rem' },
																	}}
																>
																	{item.price
																		? `от ${item.price.toLocaleString()} ₽`
																		: 'Цена по запросу'}
																</Typography>
															</Box>
															<Button
																variant='contained'
																size='small'
																onClick={() => onAddToCart(item)}
																sx={{
																	bgcolor: '#222',
																	minWidth: { xs: 40, md: 45 },
																	height: { xs: 40, md: 45 },
																	borderRadius: 2.5,
																	border: '1px solid rgba(255,255,255,0.1)',
																	'&:hover': {
																		bgcolor: '#00e5ff',
																		color: '#000',
																		transform: 'scale(1.05)',
																	},
																}}
															>
																<AddShoppingCart
																	sx={{ fontSize: { xs: 18, md: 20 } }}
																/>
															</Button>
														</Box>
													),
												)}
										</Stack>
									</Box>
								</Grid>
							</Grid>
						</motion.div>
					)}
				</AnimatePresence>
			</Container>
		</Box>
	)
}

export default ServicesPage
