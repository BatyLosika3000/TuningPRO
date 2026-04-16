import React from 'react'
import {
	Drawer,
	Box,
	Typography,
	IconButton,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	Button,
	Divider,
	Stack,
} from '@mui/material'
import { Close, DeleteOutline, ShoppingBagOutlined } from '@mui/icons-material'

const CartDrawer = ({ isOpen, onClose, cart, onRemove, onCheckout }) => {
	// Расчет общей стоимости
	const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

	return (
		<Drawer
			anchor='right'
			open={isOpen}
			onClose={onClose}
			// Размытие фона при открытии корзины
			BackdropProps={{
				sx: { backdropFilter: 'blur(4px)', bgcolor: 'rgba(0,0,0,0.5)' },
			}}
			PaperProps={{
				sx: {
					width: { xs: '100%', sm: 400 },
					bgcolor: '#111',
					color: '#fff',
					borderLeft: '1px solid rgba(255,255,255,0.1)',
				},
			}}
		>
			<Box
				sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}
			>
				{/* Шапка корзины */}
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
					sx={{ mb: 3 }}
				>
					<Typography variant='h5' sx={{ fontWeight: 900, letterSpacing: -1 }}>
						ВАШ ЗАКАЗ
					</Typography>
					<IconButton onClick={onClose} sx={{ color: '#fff' }}>
						<Close />
					</IconButton>
				</Stack>

				<Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

				{/* Список товаров */}
				<Box sx={{ flexGrow: 1, overflowY: 'auto', my: 2, pr: 1 }}>
					{cart.length === 0 ? (
						<Stack
							alignItems='center'
							justifyContent='center'
							sx={{ height: '100%', opacity: 0.2 }}
						>
							<ShoppingBagOutlined sx={{ fontSize: 80, mb: 2 }} />
							<Typography variant='h6'>КОРЗИНА ПУСТА</Typography>
						</Stack>
					) : (
						<List>
							{cart.map(item => (
								<ListItem
									key={item.cartId}
									sx={{
										px: 0,
										py: 2,
										borderBottom: '1px solid rgba(255,255,255,0.05)',
									}}
								>
									<ListItemText
										primary={item.name}
										secondary={`${item.price.toLocaleString()} ₽`}
										primaryTypographyProps={{
											fontWeight: 700,
											fontSize: '1.1rem',
										}}
										secondaryTypographyProps={{
											color: '#00e5ff',
											fontWeight: 900,
											sx: { mt: 0.5 },
										}}
									/>
									<ListItemSecondaryAction>
										<IconButton
											edge='end'
											onClick={() => onRemove(item.cartId)}
										>
											<DeleteOutline sx={{ color: '#ff4444' }} />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							))}
						</List>
					)}
				</Box>

				{/* Итого и кнопка оформления */}
				{cart.length > 0 && (
					<Box sx={{ pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
						<Stack
							direction='row'
							justifyContent='space-between'
							sx={{ mb: 3 }}
						>
							<Typography variant='h6' sx={{ fontWeight: 900 }}>
								ИТОГО:
							</Typography>
							<Typography
								variant='h6'
								sx={{ fontWeight: 950, color: '#00e5ff' }}
							>
								{totalPrice.toLocaleString()} ₽
							</Typography>
						</Stack>
						<Button
							fullWidth
							variant='contained'
							onClick={onCheckout}
							sx={{
								py: 2,
								borderRadius: 4,
								bgcolor: '#00e5ff',
								color: '#000',
								fontWeight: 900,
								fontSize: '1rem',
								'&:hover': { bgcolor: '#fff' },
							}}
						>
							ОФОРМИТЬ ПРОЕКТ
						</Button>
					</Box>
				)}
			</Box>
		</Drawer>
	)
}

export default CartDrawer
