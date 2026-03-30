import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Container,
	Typography,
	Grid,
	Card,
	CardContent,
	Box,
} from '@mui/material'
import { motion } from 'framer-motion'

// Импортируем логотипы и данные
import { BRAND_LOGOS, partsData } from '../data/partsData'

// Явно прописываем, какие марки показывать в каталоге
const CATALOG_ITEMS = [
	{ id: 'BMW', name: 'M Performance' },
	{ id: 'Mercedes-Benz', name: 'AMG Style' },
	{ id: 'Audi', name: 'RS Custom' },
	{ id: 'Porsche', name: 'Exclusive' },
	{ id: 'Lexus', name: 'F Sport' },
	{ id: 'Tesla', name: 'Performance' },
	{ id: 'Land Rover', name: 'Off-road' },
]

function CatalogPage() {
	const navigate = useNavigate()

	return (
		<Container sx={{ mt: 15, mb: 10 }}>
			<Typography
				variant='h2'
				sx={{ fontWeight: 900, textAlign: 'center', mb: 8 }}
			>
				КАТАЛОГ <span style={{ color: '#00e5ff' }}>БРЕНДОВ</span>
			</Typography>

			<Grid container spacing={4}>
				{CATALOG_ITEMS.map(item => (
					<Grid item xs={12} sm={6} md={3} key={item.id}>
						<motion.div whileHover={{ scale: 1.05 }}>
							<Card
								onClick={() => navigate(`/catalog/${item.id}`)}
								sx={{
									bgcolor: '#0a0a0a',
									borderRadius: 6,
									cursor: 'pointer',
									border: '1px solid rgba(255,255,255,0.05)',
									'&:hover': { borderColor: '#00e5ff' },
								}}
							>
								<CardContent sx={{ textAlign: 'center', p: 4 }}>
									<Box
										sx={{
											width: 80,
											height: 80,
											mx: 'auto',
											mb: 3,
											color: 'rgba(255,255,255,0.7)',
											transition: '0.3s',
											'& svg': { width: '100%', height: '100%' },
											'.MuiCard-root:hover &': { color: '#00e5ff' },
										}}
									>
										{/* Берем иконку из BRAND_LOGOS или показываем заглушку */}
										{BRAND_LOGOS[item.id] || (
											<div style={{ fontSize: '12px' }}>Добавьте SVG</div>
										)}
									</Box>
									<Typography
										variant='h6'
										sx={{ fontWeight: 800, color: 'white' }}
									>
										{item.id}
									</Typography>
								</CardContent>
							</Card>
						</motion.div>
					</Grid>
				))}
			</Grid>
		</Container>
	)
}

export default CatalogPage
