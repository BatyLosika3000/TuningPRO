import React, { useState, useEffect } from 'react'
import {
	Box,
	Container,
	Typography,
	Button,
	IconButton,
	Stack,
} from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'

// Список изображений для слайдера (портфолио)
const MY_PROJECTS = [
	{ id: 1, img: 'images_main/car1.jpg' },
	{ id: 2, img: 'images_main/car_interior1.jpg' },
	{ id: 3, img: 'images_main/car2.jpg' },
	{ id: 4, img: 'images_main/car_interior2.jpg' },
	{ id: 5, img: 'images_main/car3.jpg' },
	{ id: 6, img: 'images_main/car_interior3.jpg' },
	{ id: 7, img: 'images_main/Nikita.png' },
]

// Варианты анимации для слайдов (Framer Motion)
const slideVariants = {
	enter: dir => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
	center: { zIndex: 1, x: 0, opacity: 1 },
	exit: dir => ({ zIndex: 0, x: dir < 0 ? '100%' : '-100%', opacity: 0 }),
}

const MainPage = ({ onOpenModal }) => {
	// Состояние: [текущая страница, направление движения]
	const [[page, direction], setPage] = useState([0, 0])

	// Бесшовный расчет индекса для цикличного слайдера
	const index =
		((page % MY_PROJECTS.length) + MY_PROJECTS.length) % MY_PROJECTS.length

	const paginate = newDir => setPage([page + newDir, newDir])

	// Автопереключение слайдов каждые 10 секунд
	useEffect(() => {
		const timer = setInterval(() => paginate(1), 10000)
		return () => clearInterval(timer)
	}, [page])

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<Box sx={{ pt: { xs: 15, md: 22 }, pb: 10, textAlign: 'center' }}>
				{/* ГЛАВНЫЙ ТЕКСТ (HERO SECTION) */}
				<Container maxWidth='lg'>
					<Typography
						variant='h1'
						sx={{
							fontWeight: 950,
							fontSize: { xs: '2.5rem', md: '5rem' },
							lineHeight: 0.9,
							letterSpacing: -2,
							mb: 3,
						}}
					>
						НОВЫЙ УРОВЕНЬ <br />{' '}
						<span style={{ color: '#00e5ff' }}>ТВОЕГО АВТО</span>
					</Typography>
					<Typography
						variant='h6'
						sx={{
							color: 'rgba(255,255,255,0.4)',
							fontWeight: 300,
							mb: 8,
							maxWidth: 600,
							mx: 'auto',
						}}
					>
						Эксклюзивные решения для тех, кто ценит стиль, мощь и
						индивидуальность.
					</Typography>
				</Container>

				{/* СЛАЙДЕР ПОРТФОЛИО */}
				<Box
					sx={{
						position: 'relative',
						height: { xs: '350px', md: '650px' },
						width: '100%',
						overflow: 'hidden',
						bgcolor: '#000',
						borderY: '1px solid rgba(0, 229, 255, 0.1)',
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
								x: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
								opacity: { duration: 0.4 },
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

					{/* КНОПКИ НАВИГАЦИИ СЛАЙДЕРА */}
					<IconButton
						onClick={() => paginate(-1)}
						sx={{
							position: 'absolute',
							left: { xs: 10, md: 30 },
							top: '50%',
							transform: 'translateY(-50%)',
							zIndex: 10,
							bgcolor: 'rgba(0,0,0,0.5)',
							color: '#fff',
							backdropFilter: 'blur(5px)',
							'&:hover': { bgcolor: '#00e5ff', color: '#000' },
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
							transform: 'translateY(-50%)',
							zIndex: 10,
							bgcolor: 'rgba(0,0,0,0.5)',
							color: '#fff',
							backdropFilter: 'blur(5px)',
							'&:hover': { bgcolor: '#00e5ff', color: '#000' },
						}}
					>
						<ChevronRight fontSize='large' />
					</IconButton>
				</Box>

				{/* ИНДИКАТОРЫ (DASHES) */}
				<Stack
					direction='row'
					spacing={1.5}
					justifyContent='center'
					sx={{ mt: 4 }}
				>
					{MY_PROJECTS.map((_, i) => (
						<Box
							key={i}
							sx={{
								width: i === index ? 40 : 12,
								height: 4,
								borderRadius: 2,
								bgcolor: i === index ? '#00e5ff' : 'rgba(255,255,255,0.1)',
								transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
							}}
						/>
					))}
				</Stack>

				{/* КНОПКА ПРИЗЫВА К ДЕЙСТВИЮ */}
				<Button
					variant='contained'
					onClick={onOpenModal}
					sx={{
						mt: 8,
						px: { xs: 5, md: 10 },
						py: 2.5,
						borderRadius: '50px',
						fontWeight: 900,
						fontSize: '1.1rem',
						textTransform: 'uppercase',
						letterSpacing: 1,

						// Основной фон с запасом для анимации перелива
						background: 'linear-gradient(45deg, #00e5ff, #00b0ff, #00e5ff)',
						backgroundSize: '200% auto',
						color: '#000',

						// Мягкая начальная тень
						boxShadow: '0 4px 15px rgba(0, 229, 255, 0.2)',

						// Плавность всех переходов
						transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',

						'&:hover': {
							// Плавное смещение градиента
							backgroundPosition: 'right center',

							// Легкое масштабирование без рывков
							transform: 'translateY(-3px) scale(1.02)',

							// Глубокое неоновое свечение
							boxShadow: '0 12px 30px rgba(0, 229, 255, 0.4)',

							// Чтобы кнопка не становилась серой (стандарт MUI)
							filter: 'brightness(1.1)',
						},

						'&:active': {
							transform: 'translateY(-1px) scale(0.98)',
							boxShadow: '0 5px 15px rgba(0, 229, 255, 0.3)',
						},
					}}
				>
					Записаться на тюнинг
				</Button>
			</Box>
		</motion.div>
	)
}

export default MainPage
