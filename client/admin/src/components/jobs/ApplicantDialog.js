import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

const ApplicantDialog = ({ open, setOpen, details }) => {
	return (
		<Dialog open={deleteOpen} onClose={handleDeleteClose}>
			<DialogTitle>{t('Delete Job?')}</DialogTitle>
			<DialogContent></DialogContent>
			<DialogActions>
				<Button onClick={handleClose} autoFocus>
					{t('Cancel')}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ApplicantDialog
