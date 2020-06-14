import React, { useState, useContext } from 'react'

import { GlobalContext } from '../../context/globalContext'
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

import Drawer from './Drawer'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
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
	const classes = useStyles()
	const [open, setOpen] = useState(false)

	const { logoutAdmin, isAuth } = useContext(GlobalContext)

	const handleLogout = () => {
		logoutAdmin()
	}

	return (
		<>
			<HideOnScroll {...props}>
				<AppBar position='fixed'>
					<Toolbar>
						{isAuth ? (
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
						<Typography
							component={Link}
							to='/'
							color='inherit'
							variant='h6'
							className={classes.title}
						>
							{props.title}
						</Typography>
						{isAuth ? (
							<Button onClick={handleLogout} color='inherit'>
								Logout
							</Button>
						) : (
							<Button component={Link} to='/login' color='inherit'>
								Login
							</Button>
						)}
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<Drawer open={open} setOpen={setOpen} />
		</>
	)
}

export default Navbar
