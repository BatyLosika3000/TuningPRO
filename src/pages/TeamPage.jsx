import React, { useState } from 'react'
import {
	Box,
	Container,
	Typography,
	Grid,
	Card,
	CardMedia,
	CardContent,
	Stack,
	Chip,
	IconButton,
	Dialog,
	Button,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material'
import { motion } from 'framer-motion'
import {
	Close,
	Engineering,
	DesignServices,
	Construction,
	Build,
	ElectricalServices,
	Palette,
	Psychology,
	Telegram,
	Star,
} from '@mui/icons-material'

const publicUrl = import.meta.env.BASE_URL

const TEAM = [
	{
		id: 1,
		name: 'Александр Волков',
		role: 'Chief Technical Officer',
		icon: <Engineering />,
		img: `${publicUrl}images_team/volkov.jpg`,
		experience: '12 лет',
		telegram: 'https://t.me/artyom_krakhtinov',
		specialization: 'Комплексный инжиниринг, Stage 3+ тюнинг двигателей.',
		bio: 'Александр — сердце технического отдела. Специализируется на постройке уникальных силовых агрегатов для драг-рейсинга. Под его руководством реализованы проекты по увеличению мощности Nissan GT-R R35 до 1500+ л.с.',
		skills: [
			'Проектирование ДВС',
			'Турбо-системы',
			'Метанол',
			'Управление',
			'Настройка ЭБУ',
			'Сборка моторов',
		],
	},
	{
		id: 2,
		name: 'Дмитрий Соколов',
		role: 'Exterior Designer',
		icon: <DesignServices />,
		img: `${publicUrl}images_team/sokolov.jpg`,
		experience: '9 лет',
		telegram: 'https://t.me/artyom_krakhtinov',
		specialization:
			'Проектирование обвесов (Carbon/FRP), редизайн интерфейсов.',
		bio: 'Дмитрий создает облик автомобиля. Мастер 3D-сканирования кузова и последующего моделирования аэродинамических элементов.',
		skills: [
			'AutoCAD/SolidWorks',
			'Композиты',
			'GUI Design',
			'Аэродинамика',
			'3D Моделирование',
		],
	},
	{
		id: 3,
		name: 'Игорь Морозов',
		role: 'Interior Master',
		icon: <Construction />,
		img: `${publicUrl}images_team/morozov.jpg`,
		experience: '15 лет',
		telegram: 'https://t.me/artyom_krakhtinov',
		specialization:
			'Эксклюзивная перетяжка салона, работа с экзотической кожей.',
		bio: 'Игорь — художник интерьера. Создает уникальные дизайны строчки и восстанавливает анатомию сидений.',
		skills: [
			'Nappa/Alcantara',
			'Реставрация',
			'Дизайн строчки',
			'Шумоизоляция',
			'Кожа',
		],
	},
	{
		id: 4,
		name: 'Роман Кузнецов',
		role: 'Electronics Engineer',
		icon: <ElectricalServices />,
		img: `${publicUrl}images_team/kuznetsov.jpg`,
		experience: '8 лет',
		telegram: 'https://t.me/artyom_krakhtinov',
		specialization: 'Чип-тюнинг (ECU), мультимедиа системы, проводка Stage 3.',
		bio: 'Роман — эксперт по «мозгам» автомобиля. Настройка блоков управления Bosch, Siemens, Denso.',
		skills: [
			'WinOLS/EVC',
			'ECU Tuning',
			'CAN-шина',
			'Hi-End Audio',
			'Диагностика',
		],
	},
	{
		id: 5,
		name: 'Максим Белов',
		role: 'Chassis Expert',
		icon: <Build />,
		img: `${publicUrl}images_team/belov.jpg`,
		experience: '7 лет',
		telegram: 'https://t.me/artyom_krakhtinov',
		specialization:
			'Спортивные подвески, тормозные системы, настройка геометрии.',
		bio: 'Максим отвечает за управляемость. Профессиональная настройка винтовых подвесок (KW, Ohlins).',
		skills: [
			'Подвеска KW',
			'Brembo Systems',
			'Геометрия',
			'Сход-развал',
			'Настройка клиренса',
		],
	},
	{
		id: 6,
		name: 'Виктор Зайцев',
		role: 'Detailing Master',
		icon: <Palette />,
		img: `${publicUrl}images_team/zaitsev.jpg`,
		experience: '10 лет',
		telegram: 'https://t.me/artyom_krakhtinov',
		specialization: 'Полировка, керамика, оклейка PPF, сложная покраска.',
		bio: 'Виктор — перфекционист по кузову. Нанесение многослойных керамических покрытий.',
		skills: [
			'PPF Оклейка',
			'Керамика 9H',
			'Восстановление ЛКП',
			'Candy',
			'Детейлинг',
		],
	},
	{
		id: 7,
		name: 'Олег Новиков',
		role: 'Exhaust Fabricator',
		icon: <Build />,
		img: `${publicUrl}images_team/novikov.jpg`,
		experience: '6 лет',
		telegram: 'https://t.me/artyom_krakhtinov',
		specialization: 'Изготовление выхлопных систем из титана и инконеля.',
		bio: 'Олег — мастер сварки. Создает индивидуальные выхлопные системы для суперкаров.',
		skills: [
			'TIG Сварка',
			'Титан',
			'Расчет трасс',
			'Звуковая калибровка',
			'Аргон',
		],
	},
	{
		id: 8,
		name: 'Елена Рудина',
		role: 'Consultant',
		icon: <Psychology />,
		img: `${publicUrl}images_team/rudina.jpg`,
		experience: '5 лет',
		telegram: 'https://t.me/artyom_krakhtinov',
		specialization: 'Консультации по проектам, подбор тюнинг-пакетов.',
		bio: 'Елена помогает заказчикам структурировать их желания в техническое задание.',
		skills: [
			'Consulting',
			'Project Management',
			'VIP Relations',
			'Planning',
			'Аналитика',
		],
	},
]

const TeamPage = () => {
	const [selectedMaster, setSelectedMaster] = useState(null)

	return (
		<Box sx={{ py: { xs: 8, md: 12 }, minHeight: '100vh' }}>
			<Container maxWidth='lg'>
				<Typography
					variant='h2'
					align='center'
					sx={{
						fontWeight: 950,
						mb: 2,
						textTransform: 'uppercase',
						letterSpacing: -2,
						fontSize: { xs: '2.5rem', md: '3.75rem' },
					}}
				>
					Наши <span style={{ color: '#00e5ff' }}>Мастера</span>
				</Typography>
				<Typography
					variant='h6'
					align='center'
					sx={{
						color: 'rgba(255,255,255,0.6)',
						mb: { xs: 6, md: 10 },
						fontWeight: 400,
						maxWidth: 600,
						mx: 'auto',
					}}
				>
					Команда экспертов, превращающая автомобили в произведения искусства
				</Typography>

				<Grid container spacing={4} justifyContent='center'>
					{TEAM.map((member, index) => (
						<Grid
							item
							xs={12}
							sm={6}
							md={4}
							lg={3}
							key={member.id}
							sx={{ display: 'flex', justifyContent: 'center' }}
						>
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
								whileHover={{ y: -10 }}
								onClick={() => setSelectedMaster(member)}
								style={{ width: '100%' }}
							>
								<Card
									sx={{
										bgcolor: '#111',
										borderRadius: 5,
										border: '1px solid rgba(255,255,255,0.05)',
										cursor: 'pointer',
										transition: '0.3s',
										'&:hover': {
											border: '1px solid #00e5ff',
											'& .team-card-media': { filter: 'grayscale(0%)' },
										},
									}}
								>
									<Box sx={{ overflow: 'hidden', position: 'relative' }}>
										<CardMedia
											component='img'
											height='350'
											image={member.img}
											className='team-card-media'
											sx={{ filter: 'grayscale(100%)', transition: '0.6s' }}
										/>
										<Box
											sx={{
												position: 'absolute',
												top: 16,
												left: 16,
												bgcolor: '#00e5ff',
												color: '#000',
												borderRadius: '50%',
												width: 36,
												height: 36,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}
										>
											{member.icon}
										</Box>
									</Box>
									<CardContent sx={{ p: 3, textAlign: 'center' }}>
										<Typography variant='h6' sx={{ fontWeight: 800 }}>
											{member.name}
										</Typography>
										<Typography
											variant='caption'
											sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}
										>
											{member.role}
										</Typography>
									</CardContent>
								</Card>
							</motion.div>
						</Grid>
					))}
				</Grid>

				<Dialog
					open={Boolean(selectedMaster)}
					onClose={() => setSelectedMaster(null)}
					maxWidth='sm'
					fullWidth
					PaperProps={{
						sx: {
							bgcolor: '#0d0d0d',
							borderRadius: 7,
							border: '1px solid rgba(255,255,255,0.07)',
							color: '#fff',

							// Настройки невидимого скролла всего окна
							maxHeight: '90vh', // Высота окна
							overflowY: 'auto', // Скролл включен
							'&::-webkit-scrollbar': { display: 'none' }, // Chrome/Safari/Edge
							msOverflowStyle: 'none', // IE/Edge
							scrollbarWidth: 'none', // Firefox
						},
					}}
				>
					{selectedMaster && (
						<Box sx={{ p: { xs: 3, md: 5 }, position: 'relative' }}>
							<IconButton
								onClick={() => setSelectedMaster(null)}
								sx={{
									position: 'absolute',
									right: 16,
									top: 16,
									color: 'rgba(255,255,255,0.5)',
									zIndex: 10,
								}}
							>
								<Close />
							</IconButton>

							<Stack spacing={4}>
								<Box
									sx={{
										display: 'flex',
										gap: 3,
										alignItems: 'center',
										flexDirection: { xs: 'column', sm: 'row' },
										textAlign: { xs: 'center', sm: 'left' },
									}}
								>
									<Box
										component='img'
										src={selectedMaster.img}
										sx={{
											width: 120,
											height: 120,
											borderRadius: '50%',
											objectFit: 'cover',
											border: '3px solid #00e5ff',
										}}
									/>
									<Box>
										<Typography variant='h4' sx={{ fontWeight: 950, mb: 1 }}>
											{selectedMaster.name}
										</Typography>
										<Chip
											label={selectedMaster.role}
											sx={{
												bgcolor: 'rgba(0,229,255,0.1)',
												color: '#00e5ff',
												fontWeight: 700,
											}}
										/>
									</Box>
								</Box>

								<Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />

								<Grid container spacing={4}>
									<Grid item xs={12} md={7}>
										<Typography
											variant='overline'
											sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}
										>
											Специализация:
										</Typography>
										<Typography sx={{ mb: 3 }}>
											{selectedMaster.specialization}
										</Typography>
										<Typography
											variant='overline'
											sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}
										>
											О мастере:
										</Typography>
										<Typography
											variant='body2'
											sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}
										>
											{selectedMaster.bio}
										</Typography>
									</Grid>

									<Grid
										item
										xs={12}
										md={5}
										sx={{
											bgcolor: 'rgba(255,255,255,0.02)',
											p: 3,
											borderRadius: 4,
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											textAlign: 'center',
										}}
									>
										<Typography
											variant='overline'
											sx={{
												color: 'rgba(255,255,255,0.5)',
												fontWeight: 700,
												mb: 2,
												display: 'block',
											}}
										>
											Навыки:
										</Typography>
										<List dense disablePadding sx={{ width: 'fit-content' }}>
											{selectedMaster.skills.map(skill => (
												<ListItem
													key={skill}
													disablePadding
													sx={{ mb: 1, justifyContent: 'center' }}
												>
													<ListItemIcon sx={{ minWidth: 30, color: '#00e5ff' }}>
														<Star fontSize='small' />
													</ListItemIcon>
													<ListItemText
														primary={skill}
														primaryTypographyProps={{
															variant: 'body2',
															fontWeight: 600,
														}}
													/>
												</ListItem>
											))}
										</List>
										<Divider
											sx={{
												borderColor: 'rgba(255,255,255,0.07)',
												my: 2,
												width: '100%',
											}}
										/>
										<Typography variant='body1' sx={{ fontWeight: 800 }}>
											Опыт: {selectedMaster.experience}
										</Typography>
									</Grid>
								</Grid>

								<Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
									<Button
										variant='contained'
										fullWidth
										startIcon={<Telegram />}
										href={selectedMaster.telegram}
										target='_blank'
										sx={{
											bgcolor: '#00e5ff',
											color: '#000',
											fontWeight: 900,
											borderRadius: 3,
											py: 1.5,
											boxShadow: '0 4px 20px rgba(0, 229, 255, 0.3)',
											'&:hover': {
												bgcolor: '#fff',
												transform: 'translateY(-2px)',
											},
											transition: '0.3s',
										}}
									>
										Связаться в Telegram
									</Button>
								</Box>
							</Stack>
						</Box>
					)}
				</Dialog>
			</Container>
		</Box>
	)
}

export default TeamPage
