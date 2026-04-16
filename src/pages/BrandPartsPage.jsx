import React, { useState, useEffect, useMemo } from 'react' // Добавили useMemo
import { useParams, useNavigate } from 'react-router-dom'
import {
	Container,
	Typography,
	Button,
	Box,
	Dialog,
	IconButton,
	CircularProgress,
	TextField,
	InputAdornment,
	List,
	ListItem,
	Divider,
	Autocomplete,
	ToggleButton, // Добавили для сортировки
	ToggleButtonGroup, // Добавили для сортировки
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import ImageIcon from '@mui/icons-material/Image'
import SortIcon from '@mui/icons-material/Sort' // Иконка сортировки
import { motion, AnimatePresence } from 'framer-motion'

function BrandPartsPage({ onAddToCart }) {
	const { brandId } = useParams()
	const navigate = useNavigate()

	const [parts, setParts] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const [loading, setLoading] = useState(true)
	const [openLightbox, setOpenLightbox] = useState(false)
	const [selectedImg, setSelectedImg] = useState('')

	// Состояние сортировки: 'default', 'asc' (дешевле), 'desc' (дороже)
	const [sortBy, setSortBy] = useState('default')

	// --- ЛОГИКА ФИЛЬТРАЦИИ И СОРТИРОВКИ ---
	const processedParts = useMemo(() => {
		// 1. Сначала фильтруем по поиску
		let result = parts.filter(part =>
			part.name.toLowerCase().includes(searchTerm.toLowerCase()),
		)

		// 2. Затем сортируем, если выбран режим
		if (sortBy === 'asc') {
			result.sort((a, b) => a.price - b.price)
		} else if (sortBy === 'desc') {
			result.sort((a, b) => b.price - a.price)
		}

		return result
	}, [parts, searchTerm, sortBy])

	const handleSortChange = (event, newSort) => {
		if (newSort !== null) {
			setSortBy(newSort)
		}
	}

	const handleImageClick = imageUrl => {
		setSelectedImg(
			imageUrl || 'https://via.placeholder.com/600x400?text=Нет+фото',
		)
		setOpenLightbox(true)
	}

	const handleCloseLightbox = () => {
		setOpenLightbox(false)
		setSelectedImg('')
	}

	useEffect(() => {
		const fetchParts = async () => {
			setLoading(true)
			try {
				const response = await fetch(
					`http://127.0.0.1:8000/api/parts/${brandId}`,
				)
				if (!response.ok) throw new Error('Ошибка загрузки')
				const data = await response.json()
				setParts(data)
			} catch (error) {
				console.error('Ошибка:', error)
			} finally {
				setLoading(false)
			}
		}
		if (brandId) fetchParts()
	}, [brandId])

	return (
		<Container sx={{ mt: 15, mb: 10 }}>
			<Button
				startIcon={<ArrowBackIcon />}
				onClick={() => navigate('/catalog')}
				sx={{
					mb: 4,
					color: 'rgba(255,255,255,0.6)',
					'&:hover': { color: '#00e5ff' },
				}}
			>
				НАЗАД В КАТАЛОГ
			</Button>

			<Typography
				variant='h2'
				sx={{ fontWeight: 900, mb: 2, textTransform: 'uppercase' }}
			>
				ТЮНИНГ <span style={{ color: '#00e5ff' }}>{brandId}</span>
			</Typography>

			{/* БЛОК ПОИСКА И СОРТИРОВКИ */}
			<Box
				sx={{
					mb: 6,
					display: 'flex',
					flexDirection: { xs: 'column', md: 'row' },
					gap: 2,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Autocomplete
					fullWidth
					freeSolo
					options={[
						...new Set(parts.map(part => part.name.split(' ')[0])),
					].sort()}
					inputValue={searchTerm}
					onInputChange={(event, newInputValue) => {
						setSearchTerm(newInputValue)
					}}
					sx={{ maxWidth: '600px' }}
					renderInput={params => (
						<TextField
							{...params}
							placeholder={`Поиск запчастей ${brandId}...`}
							InputProps={{
								...params.InputProps,
								startAdornment: (
									<InputAdornment position='start'>
										<SearchIcon sx={{ color: '#00e5ff', ml: 1 }} />
									</InputAdornment>
								),
							}}
							sx={{
								'& .MuiOutlinedInput-root': {
									color: 'white',
									bgcolor: 'rgba(255,255,255,0.05)',
									borderRadius: '12px',
									'& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
									'&:hover fieldset': { borderColor: '#00e5ff' },
									'&.Mui-focused fieldset': { borderColor: '#00e5ff' },
								},
							}}
						/>
					)}
					componentsProps={{
						paper: {
							sx: {
								bgcolor: '#1a1a1a',
								color: 'white',
								border: '1px solid rgba(0,229,255,0.2)',
								marginTop: '8px',
								'& .MuiAutocomplete-option': {
									'&:hover': { bgcolor: 'rgba(0,229,255,0.1)' },
								},
							},
						},
					}}
				/>

				{/* ПЕРЕКЛЮЧАТЕЛЬ СОРТИРОВКИ */}
				<ToggleButtonGroup
					value={sortBy}
					exclusive
					onChange={handleSortChange}
					sx={{
						bgcolor: 'rgba(255,255,255,0.05)',
						border: '1px solid rgba(255,255,255,0.1)',
						borderRadius: '12px',
						height: '56px',
						'& .MuiToggleButton-root': {
							color: 'rgba(255,255,255,0.5)',
							border: 'none',
							px: 3,
							'&.Mui-selected': {
								color: '#00e5ff',
								bgcolor: 'rgba(0,229,255,0.1)',
								'&:hover': { bgcolor: 'rgba(0,229,255,0.15)' },
							},
							'&:hover': { color: '#00e5ff' },
						},
					}}
				>
					<ToggleButton value='default'>
						<SortIcon sx={{ mr: 1, fontSize: 20 }} /> ВСЕ
					</ToggleButton>
					<ToggleButton value='asc'>ДЕШЕВЛЕ</ToggleButton>
					<ToggleButton value='desc'>ДОРОЖЕ</ToggleButton>
				</ToggleButtonGroup>
			</Box>

			{loading ? (
				<Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
					<CircularProgress sx={{ color: '#00e5ff' }} />
				</Box>
			) : (
				<Box
					sx={{
						bgcolor: 'rgba(255,255,255,0.02)',
						borderRadius: 4,
						border: '1px solid rgba(255,255,255,0.05)',
						overflow: 'hidden',
					}}
				>
					<List disablePadding>
						<AnimatePresence mode='popLayout'>
							{processedParts.map((part, index) => (
								<motion.div
									key={part.id}
									layout // Магия Framer Motion: карточки будут плавно меняться местами
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 20 }}
									transition={{ duration: 0.3 }}
								>
									<ListItem
										sx={{
											display: 'flex',
											flexDirection: { xs: 'column', md: 'row' },
											alignItems: 'center',
											py: 3,
											px: 4,
											'&:hover': { bgcolor: 'rgba(0, 229, 255, 0.03)' },
											transition: 'background 0.3s ease',
										}}
									>
										<Box
											sx={{ flexGrow: 1, cursor: 'pointer' }}
											onClick={() => handleImageClick(part.image)}
										>
											<Box
												sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
											>
												<Typography
													variant='h6'
													sx={{ color: 'white', fontWeight: 700 }}
												>
													{part.name}
												</Typography>
												<IconButton
													size='small'
													sx={{ color: '#00e5ff', opacity: 0.6 }}
												>
													<ImageIcon fontSize='small' />
												</IconButton>
											</Box>
											<Typography
												variant='body2'
												sx={{ color: 'rgba(255,255,255,0.5)', mt: 0.5 }}
											>
												{part.description ||
													'Нажмите, чтобы посмотреть фото детали.'}
											</Typography>
										</Box>

										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: 4,
												mt: { xs: 2, md: 0 },
												width: { xs: '100%', md: 'auto' },
												justifyContent: 'space-between',
											}}
										>
											<Typography
												variant='h5'
												sx={{
													color: '#00e5ff',
													fontWeight: 900,
													minWidth: '120px',
													textAlign: 'right',
												}}
											>
												{part.price?.toLocaleString()} ₽
											</Typography>
											<Button
												variant='contained'
												onClick={() => onAddToCart(part)}
												sx={{
													bgcolor: 'rgba(0, 229, 255, 0.1)',
													color: '#00e5ff',
													fontWeight: 700,
													borderRadius: '8px',
													border: '1px solid #00e5ff',
													px: 4,
													'&:hover': { bgcolor: '#00e5ff', color: '#000' },
												}}
											>
												В КОРЗИНУ
											</Button>
										</Box>
									</ListItem>
									{index < processedParts.length - 1 && (
										<Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
									)}
								</motion.div>
							))}
						</AnimatePresence>
					</List>
				</Box>
			)}
			{
				<Dialog
					open={openLightbox}
					onClose={handleCloseLightbox}
					maxWidth='md'
					fullWidth
					PaperProps={{
						sx: {
							bgcolor: 'transparent',
							boxShadow: 'none',
							overflow: 'visible',
						},
					}}
				>
					<IconButton
						onClick={handleCloseLightbox}
						sx={{
							position: 'absolute',
							top: -45,
							right: 0,
							color: 'white',
							bgcolor: 'rgba(0,0,0,0.5)',
							'&:hover': { bgcolor: '#00e5ff', color: '#000' },
						}}
					>
						<CloseIcon />
					</IconButton>
					<img
						src={selectedImg}
						alt='Detail'
						style={{
							width: '100%',
							borderRadius: '16px',
							border: '2px solid #00e5ff',
						}}
					/>
				</Dialog>
			}
		</Container>
	)
}

export default BrandPartsPage
