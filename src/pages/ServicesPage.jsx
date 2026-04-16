import React, { useState, useEffect } from 'react'
import {
	Box,
	Container,
	Typography,
	Grid,
	Button,
	Stack,
	CircularProgress,
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

const MAIN_CATEGORIES = [
	{ id: 'ИНТЕРЬЕР', icon: <AirlineSeatReclineExtra sx={{ fontSize: 40 }} /> },
	{ id: 'СТАЙЛИНГ', icon: <Palette sx={{ fontSize: 40 }} /> },
	{ id: 'ДЕТЕЙЛИНГ', icon: <AutoFixHigh sx={{ fontSize: 40 }} /> },
	{
		id: 'ДОП. ОБОРУДОВАНИЕ',
		icon: <SettingsInputComponent sx={{ fontSize: 40 }} />,
	},
]

const ServicesPage = ({ onAddToCart }) => {
	const [allServices, setAllServices] = useState({})
	const [loading, setLoading] = useState(true)
	const [selectedMain, setSelectedMain] = useState(null)
	const [activeSub, setActiveSub] = useState(null)

	useEffect(() => {
		fetch('http://127.0.0.1:8000/api/services')
			.then(res => res.json())
			.then(data => {
				const grouped = data.reduce((acc, item) => {
					const cat = item.Категория
					const sub = item.Подкатегория || 'Общее'
					if (!acc[cat]) acc[cat] = {}
					if (!acc[cat][sub]) acc[cat][sub] = []
					acc[cat][sub].push({
						id: item.Код_Услуги,
						name: item.Название_Услуги,
						price: item.Базовая_Цена,
					})
					return acc
				}, {})
				setAllServices(grouped)
				setLoading(false)
			})
			.catch(() => setLoading(false))
	}, [])

	const handleSelectMain = id => {
		setSelectedMain(id)
		if (allServices[id]) {
			setActiveSub(Object.keys(allServices[id])[0])
		}
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	if (loading)
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					pt: 20,
					bgcolor: '#000',
					minHeight: '100vh',
				}}
			>
				<CircularProgress sx={{ color: '#00e5ff' }} />
			</Box>
		)

	return (
		<Box
			sx={{
				minHeight: '100vh',
				bgcolor: '#000',
				pt: 15,
				pb: 10,
				color: '#fff',
			}}
		>
			<Container maxWidth='lg'>
				<AnimatePresence mode='wait'>
					{!selectedMain ? (
						<motion.div
							key='main-categories'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.4 }}
						>
							<Typography
								variant='h2'
								sx={{
									fontWeight: 950,
									textAlign: 'center',
									mb: 8,
									textTransform: 'uppercase',
								}}
							>
								НАШИ <span style={{ color: '#00e5ff' }}>УСЛУГИ</span>
							</Typography>
							<Grid container spacing={3} justifyContent='center'>
								{MAIN_CATEGORIES.map(cat => (
									<Grid item xs={12} sm={6} md={3} key={cat.id}>
										<Box
											onClick={() => handleSelectMain(cat.id)}
											sx={{
												p: 4,
												bgcolor: '#0a0a0a',
												borderRadius: 5,
												textAlign: 'center',
												cursor: 'pointer',
												border: '1px solid rgba(255,255,255,0.05)',
												transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
												'&:hover': {
													borderColor: '#00e5ff',
													transform: 'translateY(-10px)',
													boxShadow: '0 10px 30px rgba(0, 229, 255, 0.15)',
													'& .icon-box': {
														transform: 'scale(1.1)',
														color: '#fff',
													},
												},
											}}
										>
											<Box
												className='icon-box'
												sx={{ color: '#00e5ff', mb: 2, transition: '0.3s' }}
											>
												{cat.icon}
											</Box>
											<Typography variant='h6' fontWeight={900}>
												{cat.id}
											</Typography>
										</Box>
									</Grid>
								))}
							</Grid>
						</motion.div>
					) : (
						<motion.div
							key='service-details'
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.4 }}
						>
							<Button
								startIcon={<ArrowBack />}
								onClick={() => setSelectedMain(null)}
								sx={{
									color: '#00e5ff',
									mb: 4,
									fontWeight: 900,
									'&:hover': { bgcolor: 'rgba(0,229,255,0.1)' },
								}}
							>
								НАЗАД К КАТЕГОРИЯМ
							</Button>

							<Typography
								variant='h2'
								sx={{ fontWeight: 950, mb: 6, textTransform: 'uppercase' }}
							>
								{selectedMain}
							</Typography>

							<Grid container spacing={4}>
								{/* Подкатегории (Боковое меню) */}
								<Grid item xs={12} md={4}>
									<Stack spacing={1.5}>
										{allServices[selectedMain] &&
											Object.keys(allServices[selectedMain]).map(sub => (
												<Box
													key={sub}
													onClick={() => setActiveSub(sub)}
													sx={{
														p: 2.5,
														borderRadius: 3,
														cursor: 'pointer',
														bgcolor:
															activeSub === sub
																? '#00e5ff'
																: 'rgba(255,255,255,0.03)',
														color: activeSub === sub ? '#000' : '#fff',
														display: 'flex',
														justifyContent: 'space-between',
														alignItems: 'center',
														transition: '0.3s',
														border: '1px solid',
														borderColor:
															activeSub === sub
																? '#00e5ff'
																: 'rgba(255,255,255,0.05)',
														'&:hover': {
															bgcolor:
																activeSub === sub
																	? '#00e5ff'
																	: 'rgba(255,255,255,0.08)',
														},
													}}
												>
													<Typography
														sx={{
															fontSize: '0.85rem',
															fontWeight: 900,
															letterSpacing: 0.5,
														}}
													>
														{sub.toUpperCase()}
													</Typography>
													<ChevronRight
														sx={{ opacity: activeSub === sub ? 1 : 0.3 }}
													/>
												</Box>
											))}
									</Stack>
								</Grid>

								{/* Список услуг (Контент) */}
								<Grid item xs={12} md={8}>
									<Box
										sx={{
											p: { xs: 2, md: 4 },
											bgcolor: 'rgba(255,255,255,0.01)',
											borderRadius: 5,
											border: '1px solid rgba(255,255,255,0.05)',
											backdropFilter: 'blur(10px)',
										}}
									>
										<Typography
											variant='h5'
											sx={{
												mb: 4,
												fontWeight: 900,
												color: '#00e5ff',
												textTransform: 'uppercase',
											}}
										>
											{activeSub}
										</Typography>
										<Stack spacing={2}>
											<AnimatePresence mode='popLayout'>
												{activeSub &&
													allServices[selectedMain][activeSub]?.map(item => (
														<motion.div
															key={item.id}
															initial={{ opacity: 0, y: 10 }}
															animate={{ opacity: 1, y: 0 }}
															transition={{ duration: 0.3 }}
														>
															<Box
																sx={{
																	display: 'flex',
																	justifyContent: 'space-between',
																	alignItems: 'center',
																	p: 3,
																	borderRadius: 4,
																	bgcolor: 'rgba(255,255,255,0.03)',
																	border: '1px solid rgba(255,255,255,0.05)',
																	transition: '0.3s',
																	'&:hover': {
																		bgcolor: 'rgba(255,255,255,0.06)',
																		borderColor: 'rgba(0, 229, 255, 0.3)',
																	},
																}}
															>
																<Box>
																	<Typography
																		sx={{
																			fontWeight: 800,
																			fontSize: '1.1rem',
																			mb: 0.5,
																		}}
																	>
																		{item.name}
																	</Typography>
																	<Typography
																		sx={{
																			color: '#00e5ff',
																			fontWeight: 900,
																			fontSize: '1.2rem',
																		}}
																	>
																		{Number(item.price).toLocaleString()} ₽
																	</Typography>
																</Box>
																<Button
																	variant='contained'
																	onClick={() => onAddToCart(item)}
																	sx={{
																		minWidth: 55,
																		height: 55,
																		bgcolor: '#1a1a1a',
																		color: '#fff',
																		borderRadius: 3,
																		transition: '0.3s',
																		'&:hover': {
																			bgcolor: '#00e5ff',
																			color: '#000',
																			transform: 'scale(1.1)',
																		},
																	}}
																>
																	<AddShoppingCart />
																</Button>
															</Box>
														</motion.div>
													))}
											</AnimatePresence>
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
