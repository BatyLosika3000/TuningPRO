import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Импорт иконки стрелки
import { motion } from 'framer-motion';

// Импортируем наши данные
import { partsData } from '../data/partsData';

function BrandPartsPage() {
  const { brandId } = useParams(); // Получаем ID марки из URL
  const navigate = useNavigate();

  // Безопасное получение данных
  const parts = partsData[brandId] || [];

  // Если зашли по адресу несуществующего бренда
  if (!partsData[brandId]) {
    return (
      <Container maxWidth="lg" sx={{ mt: 20, textAlign: 'center' }}>
        <Typography variant="h3" color="white" sx={{ fontWeight: 800, mb: 4 }}>
          Марка <span style={{ color: '#00e5ff' }}>{brandId}</span> не найдена
        </Typography>
        <Button 
          variant="contained"
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/catalog')} 
          sx={{ 
            bgcolor: '#00e5ff', 
            color: '#000', 
            fontWeight: 800, 
            px: 4, 
            py: 1.5,
            borderRadius: '0px',
            '&:hover': { bgcolor: '#00b2cc' }
          }}
        >
          Вернуться в каталог
        </Button>
      </Container>
    );
  }

  return (
		<Container maxWidth='lg' sx={{ mt: 15, mb: 10 }}>
			{/* --- БЛОК КНОПКИ НАЗАД (КАК В УСЛУГАХ) --- */}
			<Box sx={{ mb: 6 }}>
				<Button
					variant='text' // База - текст, чтобы не было лишних рамок
					onClick={() => navigate('/catalog')}
					// Иконка стрелки (MUI ArrowBack)
					startIcon={<ArrowBackIcon />}
					sx={{
						bgcolor: 'transparent', // По умолчанию фон прозрачный
						color: '#00e5ff', // Текст и иконка бирюзовые
						fontWeight: 800, // Жирное начертание (как на примере)
						fontSize: '0.95rem', // Чуть компактнее шрифт
						textTransform: 'uppercase', // Капсом (как на примере)
						letterSpacing: 2, // Разрядка букв
						padding: '10px 24px', // Увеличили отступы для зоны фона
						borderRadius: '12px', // Скругление углов (как на примере)
						// Плавная анимация появления фона
						transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

						// --- НАСТРОЙКА ИКОНКИ ---
						// Убираем маргины по умолчанию, чтобы иконка была ближе к тексту
						'& .MuiButton-startIcon': {
							marginRight: '14px',
							marginLeft: '0px',
							transition: 'transform 0.3s ease-in-out',
						},
						'& .MuiButton-startIcon svg': {
							fontSize: '1.3rem', // Размер иконки
						},

						// --- ХОВЕР ЭФФЕКТ (ПРИ НАВЕДЕНИИ) - ТОЧНО КАК НА ПРИМЕРЕ ---
						'&:hover': {
							// 1. Основной фон - очень темный, глубокий бирюзовый (cyan-dark)
							bgcolor: 'rgba(0, 50, 60, 0.8)',

							// 2. Внутреннее свечение - для эффекта объема
							boxShadow: '0 0 15px rgba(0, 229, 255, 0.2) inset',

							color: '#00e5ff', // Текст остается бирюзовым

							// Эффект легкого смещения иконки влево
							'& .MuiButton-startIcon': {
								transform: 'translateX(-4px)',
							},
						},
						'&:active': {
							bgcolor: 'rgba(0, 30, 40, 0.9)', // Чуть темнее при клике
						},
					}}
				>
					Назад к брендам
				</Button>
			</Box>

			{/* ЗАГОЛОВОК СТРАНИЦЫ */}
			<Typography
				variant='h2'
				sx={{
					fontWeight: 900,
					mb: 6,
					textTransform: 'uppercase',
					letterSpacing: -2,
				}}
			>
				ЗАПЧАСТИ <span style={{ color: '#00e5ff' }}>{brandId}</span>
			</Typography>

			{/* СЕТКА ТОВАРОВ */}
			<Grid container spacing={3}>
				{parts.length > 0 ? (
					parts.map((part, index) => (
						<Grid item xs={12} sm={6} md={4} key={part.id}>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1, duration: 0.5 }}
							>
								<Card
									sx={{
										bgcolor: '#0a0a0a',
										borderRadius: 4,
										border: '1px solid rgba(255,255,255,0.05)',
										transition: '0.3s',
										'&:hover': {
											borderColor: 'rgba(0, 229, 255, 0.2)',
											transform: 'translateY(-5px)',
											boxShadow: '0 10px 40px rgba(0, 229, 255, 0.05)',
										},
									}}
								>
									<CardMedia
										component='img'
										height='240'
										image={part.image} // Путь должен начинаться со слеша / в partsData
										alt={part.name}
										sx={{ objectFit: 'cover' }}
									/>
									<CardContent sx={{ p: 3 }}>
										<Typography
											variant='h6'
											sx={{ color: 'white', fontWeight: 800, mb: 1 }}
										>
											{part.name}
										</Typography>
										<Typography
											sx={{
												color: '#00e5ff',
												fontWeight: 800,
												fontSize: '1.2rem',
												mb: 2,
											}}
										>
											{part.price.toLocaleString()} ₽
										</Typography>
										<Button
											fullWidth
											variant='contained'
											sx={{
												bgcolor: '#00e5ff',
												color: '#000',
												fontWeight: 800,
												py: 1.2,
												borderRadius: '0px',
												'&:hover': { bgcolor: '#00b2cc' },
											}}
										>
											В корзину
										</Button>
									</CardContent>
								</Card>
							</motion.div>
						</Grid>
					))
				) : (
					<Grid item xs={12}>
						<Typography
							sx={{
								color: 'rgba(255,255,255,0.3)',
								textAlign: 'center',
								mt: 10,
								fontSize: '1.2rem',
							}}
						>
							В данный момент товаров для бренда {brandId} нет в наличии.
						</Typography>
					</Grid>
				)}
			</Grid>
		</Container>
	)
}

export default BrandPartsPage;