import React from 'react'

import { Link } from 'react-router-dom'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AddIcon from '@material-ui/icons/AddCircle'
import ViewDayIcon from '@material-ui/icons/ViewDay'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	drawer: {
		width: 250,
		flexShrink: 0
	},
	drawerPaper: {
		width: 250
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	}
}))

const SideDrawer = (props) => {
	const classes = useStyles()
	const theme = useTheme()

	return (
		<div className={classes.root}>
			<Drawer
				className={classes.drawer}
				variant='temporary'
				anchor='left'
				open={props.open}
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={() => props.setOpen(false)}>
						{theme.direction === 'ltr' ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem
						button
						onClick={() => props.setOpen(false)}
						component={Link}
						to='/add-job'
					>
						<ListItemIcon>
							<AddIcon />
						</ListItemIcon>
						<ListItemText primary='Add new job' />
					</ListItem>
					<ListItem
						button
						onClick={() => props.setOpen(false)}
						component={Link}
						to='/view-job'
					>
						<ListItemIcon>
							<ViewDayIcon />
						</ListItemIcon>
						<ListItemText primary='View added jobs' />
					</ListItem>
				</List>
				<Divider />
			</Drawer>
		</div>
	)
}

export default SideDrawer
