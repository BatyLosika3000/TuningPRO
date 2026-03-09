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

const MY_PROJECTS = [
	{ id: 1, img: 'images_main/car1.jpg' },
	{ id: 2, img: 'images_main/car_interior1.jpg' },
	{ id: 3, img: 'images_main/car2.jpg' },
	{ id: 4, img: 'images_main/car_interior2.jpg' },
	{ id: 5, img: 'images_main/car3.jpg' },
	{ id: 6, img: 'images_main/car_interior3.jpg' },
	{ id: 7, img: 'images_main/Nikita.png' },
]

const slideVariants = {
	enter: dir => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
	center: { zIndex: 1, x: 0, opacity: 1 },
	exit: dir => ({ zIndex: 0, x: dir < 0 ? '100%' : '-100%', opacity: 0 }),
}

const MainPage = ({ onOpenModal }) => {
	const [[page, direction], setPage] = useState([0, 0])

	// Улучшенная формула индекса
	const index =
		((page % MY_PROJECTS.length) + MY_PROJECTS.length) % MY_PROJECTS.length

	const paginate = newDir => setPage([page + newDir, newDir])

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
						Эксклюзивные решения для тех, кто ценит стиль
					</Typography>
				</Container>

				{/* СЛАЙДЕР С ИСПРАВЛЕННЫМ ВЫРАВНИВАНИЕМ */}
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
								x: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
								opacity: { duration: 0.4 },
							}}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover', // Растягивает фото по размеру блока
								position: 'absolute',
								top: 0,
								left: 0,
							}}
						/>
					</AnimatePresence>

					{/* ИСПРАВЛЕННЫЕ КНОПКИ */}
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
							'&:hover': { bgcolor: '#00e5ff', color: '#000' },
						}}
					>
						<ChevronRight fontSize='large' />
					</IconButton>
				</Box>

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
								width: i === index ? 30 : 10,
								height: 6,
								borderRadius: 3,
								bgcolor: i === index ? '#00e5ff' : 'rgba(255,255,255,0.2)',
								transition: '0.4s',
							}}
						/>
					))}
				</Stack>

				<Button
					variant='contained'
					onClick={onOpenModal}
					sx={{
						mt: 6,
						px: { xs: 5, md: 10 },
						py: 2,
						borderRadius: '50px',
						fontWeight: 900,
						background: 'linear-gradient(90deg, #00e5ff, #00b0ff)',
						color: '#000',
					}}
				>
					Записаться на тюнинг
				</Button>
			</Box>
		</motion.div>
	)
}

export default MainPage
