import React, { useState, useMemo } from 'react'
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
	Fade,
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
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

const TEAM_DATA = [
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
	const team = useMemo(() => TEAM_DATA, [])

	const dialogStyles = {
		bgcolor: '#0d0d0d',
		borderRadius: 7,
		border: '1px solid rgba(255,255,255,0.07)',
		color: '#fff',
		maxHeight: '90vh',
		overflowY: 'auto',
		'&::-webkit-scrollbar': { display: 'none' },
		msOverflowStyle: 'none',
		scrollbarWidth: 'none',
	}

	return (
		<Box sx={{ py: { xs: 8, md: 12 }, minHeight: '100vh', bgcolor: '#000' }}>
			<Container maxWidth='lg'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
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
				</motion.div>

				<Grid container spacing={4} justifyContent='center'>
					{team.map((member, index) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: index * 0.05 }}
								whileHover={{ y: -10 }}
								onClick={() => setSelectedMaster(member)}
							>
								<Card
									sx={{
										bgcolor: '#0a0a0a',
										borderRadius: 5,
										border: '1px solid rgba(255,255,255,0.05)',
										cursor: 'pointer',
										transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
										'&:hover': {
											borderColor: '#00e5ff',
											boxShadow: '0 10px 30px rgba(0, 229, 255, 0.1)',
											'& .team-card-media': {
												filter: 'grayscale(0%) scale(1.05)',
											},
										},
									}}
								>
									<Box
										sx={{
											overflow: 'hidden',
											position: 'relative',
											height: 350,
										}}
									>
										<CardMedia
											component='img'
											image={member.img}
											className='team-card-media'
											sx={{
												filter: 'grayscale(100%)',
												transition: '0.6s ease-in-out',
												height: '100%',
												objectFit: 'cover',
											}}
										/>
										<Box
											sx={{
												position: 'absolute',
												top: 16,
												left: 16,
												bgcolor: '#00e5ff',
												color: '#000',
												borderRadius: '50%',
												width: 40,
												height: 40,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
											}}
										>
											{member.icon}
										</Box>
									</Box>
									<CardContent sx={{ p: 3, textAlign: 'center' }}>
										<Typography
											variant='h6'
											sx={{ fontWeight: 800, color: '#fff' }}
										>
											{member.name}
										</Typography>
										<Typography
											variant='caption'
											sx={{
												color: '#00e5ff',
												fontWeight: 700,
												textTransform: 'uppercase',
												letterSpacing: 1,
											}}
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
					TransitionComponent={Fade}
					transitionDuration={400}
					PaperProps={{ sx: dialogStyles }}
				>
					{selectedMaster && (
						<Box sx={{ p: { xs: 3, md: 5 }, position: 'relative' }}>
							<IconButton
								onClick={() => setSelectedMaster(null)}
								sx={{
									position: 'absolute',
									right: 16,
									top: 16,
									color: 'rgba(255,255,255,0.3)',
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
											width: 140,
											height: 140,
											borderRadius: '50%',
											objectFit: 'cover',
											border: '4px solid #00e5ff',
											boxShadow: '0 0 20px rgba(0, 229, 255, 0.2)',
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
												fontWeight: 800,
											}}
										/>
									</Box>
								</Box>

								<Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

								<Grid container spacing={4}>
									<Grid item xs={12} md={7}>
										<Typography
											variant='overline'
											sx={{ color: '#00e5ff', fontWeight: 800 }}
										>
											Специализация:
										</Typography>
										<Typography sx={{ mb: 3, fontWeight: 500 }}>
											{selectedMaster.specialization}
										</Typography>

										<Typography
											variant='overline'
											sx={{ color: '#00e5ff', fontWeight: 800 }}
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

									<Grid item xs={12} md={5}>
										<Box
											sx={{
												bgcolor: 'rgba(255,255,255,0.03)',
												p: 3,
												borderRadius: 4,
												border: '1px solid rgba(255,255,255,0.05)',
											}}
										>
											<Typography
												variant='overline'
												sx={{
													color: '#00e5ff',
													fontWeight: 800,
													mb: 2,
													display: 'block',
												}}
											>
												Навыки:
											</Typography>
											<List dense disablePadding>
												{selectedMaster.skills.map(skill => (
													<ListItem key={skill} disablePadding sx={{ mb: 1 }}>
														<ListItemIcon
															sx={{ minWidth: 30, color: '#00e5ff' }}
														>
															<Star fontSize='small' />
														</ListItemIcon>
														<ListItemText
															primary={skill}
															primaryTypographyProps={{
																variant: 'body2',
																fontWeight: 700,
															}}
														/>
													</ListItem>
												))}
											</List>
											<Divider
												sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }}
											/>
											<Typography
												variant='h6'
												sx={{ fontWeight: 900, textAlign: 'center' }}
											>
												Опыт:{' '}
												<span style={{ color: '#00e5ff' }}>
													{selectedMaster.experience}
												</span>
											</Typography>
										</Box>
									</Grid>
								</Grid>

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
										borderRadius: 4,
										py: 2,
										fontSize: '1rem',
										boxShadow: '0 8px 25px rgba(0, 229, 255, 0.3)',
										'&:hover': { bgcolor: '#fff', transform: 'scale(1.02)' },
										transition: '0.3s',
									}}
								>
									Обсудить проект в Telegram
								</Button>
							</Stack>
						</Box>
					)}
				</Dialog>
			</Container>
		</Box>
	)
}

export default TeamPage
