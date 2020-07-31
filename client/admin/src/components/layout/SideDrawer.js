import React from 'react'

import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AddIcon from '@material-ui/icons/AddCircle'
import ViewDayIcon from '@material-ui/icons/ViewDay'
import DashIcon from '@material-ui/icons/Dashboard'
import BookIcon from '@material-ui/icons/Book'
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark'

import { useTranslation } from 'react-i18next'

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

const SideDrawer = ({ open, setOpen }) => {
	const classes = useStyles()

	const { t } = useTranslation()

	return (
		<div className={classes.root}>
			<Drawer
				className={classes.drawer}
				variant='temporary'
				anchor='left'
				open={open}
				classes={{
					paper: classes.drawerPaper
				}}
				ModalProps={{ onBackdropClick: () => setOpen(false) }}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={() => setOpen(false)}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem
						button
						onClick={() => setOpen(false)}
						component={Link}
						to='/'
					>
						<ListItemIcon>
							<DashIcon />
						</ListItemIcon>
						<ListItemText primary={t('Dashboard')} />
					</ListItem>
					<ListItem
						button
						onClick={() => setOpen(false)}
						component={Link}
						to='/add-job'
					>
						<ListItemIcon>
							<AddIcon />
						</ListItemIcon>
						<ListItemText primary={t('Add new job')} />
					</ListItem>
					<ListItem
						button
						onClick={() => setOpen(false)}
						component={Link}
						to='/view-job'
					>
						<ListItemIcon>
							<ViewDayIcon />
						</ListItemIcon>
						<ListItemText primary={t('View all jobs')} />
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem
						button
						onClick={() => setOpen(false)}
						component={Link}
						to='/add-courses'
					>
						<ListItemIcon>
							<BookIcon />
						</ListItemIcon>
						<ListItemText primary={t('Add new courses')} />
					</ListItem>
					<ListItem
						button
						onClick={() => setOpen(false)}
						component={Link}
						to='/view-courses'
					>
						<ListItemIcon>
							<CollectionsBookmarkIcon />
						</ListItemIcon>
						<ListItemText primary={t('View all courses')} />
					</ListItem>
				</List>
			</Drawer>
		</div>
	)
}

export default SideDrawer
