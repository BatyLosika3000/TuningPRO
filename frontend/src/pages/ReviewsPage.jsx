import React, { useState, useEffect } from 'react'
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Box,
    Avatar,
    Rating,
    Stack,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    IconButton,
    CircularProgress,
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { AddComment, Close } from '@mui/icons-material'

const API_URL = 'http://127.0.0.1:8000/api/reviews'

function ReviewsPage() {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        car: '',
        text: '',
        rating: 5,
    })

    // Проверка авторизации
    const isAuthenticated = !!localStorage.getItem('userId')

    useEffect(() => {
        fetchReviews()
    }, [])

    const fetchReviews = async () => {
        try {
            const response = await fetch(API_URL)
            const data = await response.json()
            setReviews(data.reverse())
        } catch (error) {
            console.error('Ошибка загрузки:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleOpen = () => {
        // Двойная проверка на случай, если кнопка всё же вызовет
        if (!isAuthenticated) {
            alert('Пожалуйста, авторизуйтесь, чтобы оставить отзыв')
            return
        }

        const savedUser = localStorage.getItem('tuning_user')
        let initialName = ''
        if (savedUser) {
            try {
                const user = JSON.parse(savedUser)
                initialName = user.first_name || ''
            } catch (e) {
                console.error('Ошибка парсинга пользователя', e)
            }
        }

        setFormData(prev => ({ ...prev, name: initialName }))
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        setFormData({ name: '', car: '', text: '', rating: 5 })
    }

    const handleSubmit = async () => {
        if (!isAuthenticated) {
            alert('Сессия истекла. Пожалуйста, войдите снова.')
            handleClose()
            return
        }

        if (!formData.text || !formData.name || !formData.car) {
            alert('Заполните все поля (Имя, Автомобиль и Отзыв)!')
            return
        }

        const userId = localStorage.getItem('userId')
        const payload = {
            name: formData.name,
            car: formData.car,
            text: formData.text,
            rating: parseFloat(formData.rating),
            user_id: parseInt(userId),
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                const savedReview = await response.json()
                const formattedReview = {
                    id: savedReview.id || savedReview.Код_Отзыва,
                    name: savedReview.name || savedReview.Имя_Пользователя,
                    car: savedReview.car || savedReview.Модель_Авто,
                    text: savedReview.text || savedReview.Текст_Отзыва,
                    rating: savedReview.rating || savedReview.Рейтинг,
                    date: savedReview.date || savedReview.Дата_Публикации,
                }

                setReviews([formattedReview, ...reviews])
                handleClose()
                alert('Отзыв успешно опубликован!')
            } else {
                const errData = await response.json()
                alert(errData.detail || 'Ошибка при отправке')
            }
        } catch (error) {
            console.error('Ошибка:', error)
            alert('Не удалось связаться с сервером')
        }
    }

    return (
        <Container maxWidth='lg' sx={{ mt: 15, mb: 10 }}>
            {/* HEADER */}
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                justifyContent='space-between'
                alignItems='center'
                sx={{ mb: 8 }}
                spacing={4}
            >
                <Typography
                    variant='h2'
                    sx={{
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        fontSize: { xs: '2.5rem', md: '4rem' },
                        textAlign: { xs: 'center', md: 'left' },
                        color: '#fff',
                    }}
                >
                    ОТЗЫВЫ <span style={{ color: '#00e5ff' }}>КЛИЕНТОВ</span>
                </Typography>

                {/* КНОПКА С ПРОВЕРКОЙ АВТОРИЗАЦИИ - ТЕПЕРЬ ПОЛНОСТЬЮ НЕАКТИВНА */}
                <Button
                    variant='contained'
                    startIcon={<AddComment />}
                    onClick={handleOpen}
                    disabled={!isAuthenticated}
                    sx={{
                        bgcolor: isAuthenticated ? '#00e5ff' : 'rgba(255,255,255,0.1)',
                        color: isAuthenticated ? '#000' : 'rgba(255,255,255,0.3)',
                        fontWeight: 900,
                        px: 4,
                        py: 2,
                        borderRadius: '50px',
                        boxShadow: isAuthenticated ? '0 0 20px rgba(0, 229, 255, 0.3)' : 'none',
                        transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        // Стили для отключенного состояния
                        '&.Mui-disabled': {
                            bgcolor: 'rgba(255,255,255,0.05)',
                            color: 'rgba(255,255,255,0.2)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            cursor: 'not-allowed',
                            pointerEvents: 'auto', // Чтобы отображался стандартный курсор "запрещено"
                            opacity: 0.6,
                        },
                        '&:hover': {
                            bgcolor: isAuthenticated ? '#fff' : 'rgba(255,255,255,0.05)',
                            transform: isAuthenticated ? 'translateY(-3px)' : 'none',
                            boxShadow: isAuthenticated ? '0 10px 30px rgba(0, 229, 255, 0.5)' : 'none',
                        },
                    }}
                >
                    {isAuthenticated ? 'Оставить отзыв' : 'Войдите, чтобы оставить отзыв'}
                </Button>
            </Stack>

            {/* REVIEWS GRID - без изменений */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                    <CircularProgress sx={{ color: '#00e5ff' }} />
                </Box>
            ) : (
                <Grid container spacing={4}>
                    <AnimatePresence mode='popLayout'>
                        {reviews.map((review, index) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                key={review.id || index}
                                sx={{ display: 'flex' }}
                            >
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    style={{ width: '100%', display: 'flex' }}
                                >
                                    <Card
                                        sx={{
                                            bgcolor: '#0a0a0a',
                                            borderRadius: 6,
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            transition: '0.3s',
                                            '&:hover': {
                                                borderColor: '#00e5ff',
                                                boxShadow: '0 10px 40px rgba(0, 229, 255, 0.15)',
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ p: 4, flexGrow: 1 }}>
                                            <Stack
                                                direction='row'
                                                spacing={2}
                                                alignItems='center'
                                                sx={{ mb: 3 }}
                                            >
                                                <Avatar
                                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.name}`}
                                                    sx={{
                                                        width: 60,
                                                        height: 60,
                                                        border: '2px solid #00e5ff',
                                                        boxShadow: '0 0 15px rgba(0, 229, 255, 0.2)',
                                                    }}
                                                />
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography
                                                        variant='h6'
                                                        sx={{ fontWeight: 800, color: '#fff' }}
                                                    >
                                                        {review.name || 'Аноним'}
                                                    </Typography>
                                                    <Typography
                                                        variant='caption'
                                                        sx={{
                                                            color: '#00e5ff',
                                                            fontWeight: 700,
                                                            textTransform: 'uppercase',
                                                        }}
                                                    >
                                                        {review.car || 'Авто не указано'}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ textAlign: 'right' }}>
                                                    <Rating
                                                        value={Number(review.rating) || 0}
                                                        readOnly
                                                        size='small'
                                                        sx={{ color: '#00e5ff' }}
                                                    />
                                                    <Typography
                                                        variant='caption'
                                                        display='block'
                                                        sx={{ color: 'rgba(255,255,255,0.3)' }}
                                                    >
                                                        {review.date
                                                            ? new Date(review.date).toLocaleDateString(
                                                                    'ru-RU',
                                                              )
                                                            : ''}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                            <Typography
                                                variant='body1'
                                                sx={{
                                                    color: 'rgba(255,255,255,0.8)',
                                                    lineHeight: 1.6,
                                                    pl: 2,
                                                    borderLeft: '3px solid #00e5ff',
                                                    fontStyle: 'italic',
                                                }}
                                            >
                                                "{review.text || 'Текст отзыва отсутствует'}"
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </AnimatePresence>
                </Grid>
            )}

            {/* DIALOG FORM - без изменений */}
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        bgcolor: '#111',
                        backgroundImage: 'none',
                        color: '#fff',
                        borderRadius: 8,
                        border: '1px solid rgba(0, 229, 255, 0.3)',
                        p: 1,
                        maxWidth: '500px',
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        fontWeight: 900,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: '#fff',
                    }}
                >
                    ОСТАВИТЬ ОТЗЫВ
                    <IconButton
                        onClick={handleClose}
                        sx={{ color: 'rgba(255,255,255,0.5)' }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                p: 2,
                                bgcolor: 'rgba(0, 229, 255, 0.03)',
                                borderRadius: 4,
                            }}
                        >
                            <Typography
                                sx={{
                                    mb: 1,
                                    color: 'rgba(255,255,255,0.6)',
                                    fontSize: '0.9rem',
                                }}
                            >
                                Ваша оценка мастерской:
                            </Typography>
                            <Rating
                                size='large'
                                value={formData.rating}
                                onChange={(e, val) => setFormData({ ...formData, rating: val })}
                                sx={{ color: '#00e5ff' }}
                            />
                        </Box>
                        <TextField
                            fullWidth
                            label='Ваше имя'
                            variant='filled'
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            sx={fieldStyle}
                        />
                        <TextField
                            fullWidth
                            label='Марка и модель авто'
                            variant='filled'
                            value={formData.car}
                            onChange={e => setFormData({ ...formData, car: e.target.value })}
                            sx={fieldStyle}
                        />
                        <TextField
                            fullWidth
                            label='Расскажите о результате работы'
                            multiline
                            rows={4}
                            variant='filled'
                            value={formData.text}
                            onChange={e => setFormData({ ...formData, text: e.target.value })}
                            sx={fieldStyle}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button
                        fullWidth
                        variant='contained'
                        onClick={handleSubmit}
                        sx={{
                            bgcolor: '#00e5ff',
                            color: '#000',
                            fontWeight: 900,
                            py: 2,
                            borderRadius: 4,
                            '&:hover': { bgcolor: '#fff' },
                        }}
                    >
                        ОПУБЛИКОВАТЬ
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

const fieldStyle = {
    bgcolor: 'rgba(255,255,255,0.05)',
    borderRadius: 3,
    '& .MuiFilledInput-root': {
        color: 'white',
        '&:before, &:after': { display: 'none' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#00e5ff' },
}

export default ReviewsPage