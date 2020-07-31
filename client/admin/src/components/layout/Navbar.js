import React, { useState, useContext } from 'react'

import { AuthContext } from '../../context/authContext/authContext'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { useTranslation } from 'react-i18next'

import SideDrawer from './SideDrawer'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
	},
	brand: {
		textDecoration: 'none'
	}
}))

const HideOnScroll = (props) => {
	const trigger = useScrollTrigger()

	return (
		<Slide appear={false} direction='down' in={!trigger}>
			{props.children}
		</Slide>
	)
}

const Navbar = (props) => {
	const { t, i18n } = useTranslation()
	const classes = useStyles()
	const [open, setOpen] = useState(false)

	const { logoutAdmin, authToken } = useContext(AuthContext)

	const handleLogout = () => {
		logoutAdmin()
	}

	const handleLangChange = (e) => {
		i18n.changeLanguage(e.target.value)
	}

	return (
		<>
			<HideOnScroll {...props}>
				<AppBar position='fixed'>
					<Toolbar>
						{authToken.length > 0 ? (
							<IconButton
								edge='start'
								className={classes.menuButton}
								color='inherit'
								aria-label='menu'
								onClick={() => setOpen(true)}
							>
								<MenuIcon />
							</IconButton>
						) : null}
						<Box className={classes.title}>
							<Typography
								className={classes.brand}
								component={Link}
								to='/'
								color='inherit'
								variant='h6'
							>
								{t('JobSetu Admin')}
							</Typography>
						</Box>
						<Box>
							<FormControl variant='outlined'>
								<Select
									defaultValue='en'
									style={{
										color: '#fff',
										marginRight: '3rem'
									}}
									displayEmpty
									onChange={handleLangChange}
								>
									<MenuItem value='en'>{t('English')}</MenuItem>
									<MenuItem value='hi'>{t('Hindi')}</MenuItem>
								</Select>
							</FormControl>
						</Box>

						{authToken.length > 0 ? (
							<Button onClick={handleLogout} color='inherit'>
								{t('Logout')}
							</Button>
						) : (
							<Button component={Link} to='/login' color='inherit'>
								{t('Login')}
							</Button>
						)}
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<SideDrawer open={open} setOpen={setOpen} />
		</>
	)
}

export default Navbar
