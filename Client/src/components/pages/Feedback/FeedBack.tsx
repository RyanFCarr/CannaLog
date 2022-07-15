import { Cancel, Send } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import BasePage from '../BasePage';
import './feedback.css';

const Layout: React.FC = () => {
	return <BasePage title="Feedback" Body={<FeedBack />} Footer={<Footer />} />;
};

const FeedBack: React.FC = () => {
	return (
		<>
			<Typography variant="h6" component="h6" marginBottom={3} marginTop={3} textAlign={'center'}>
				Give us your feedback...
			</Typography>

			<form className="contact-form">
				<div id="container">
					<TextField
						id="outlined-basic"
						placeholder="Enter your name"
						label="Name"
						variant="outlined"
						required
						type="text"
						fullWidth={true}
					/>
					<br />
					<br />

					<TextField
						id="outlined-basic"
						label="name@example.com"
						placeholder="Enter email address"
						variant="outlined"
						required
						type="email"
						fullWidth={true}
					/>
					<br />
					<br />

					<TextField id="outlined-basic" placeholder="Enter Subject" label="Subject" variant="outlined" required fullWidth={true} />
					<br />
					<br />

					<Typography variant="subtitle1" component="h6" marginBottom={2} marginTop={2} textAlign={'center'}>
						Let us know your thoughts
					</Typography>

					<TextField
						id="outlined-basic"
						label="Message"
						placeholder="Enter Message"
						multiline
						minRows={4}
						required
						type="text"
						fullWidth={true}
					/>
					<br />
					<br />
				</div>
			</form>
		</>
	);
};

const Footer: React.FC = () => {
	return (
		<Box display="flex" justifyContent="space-around" mt={1.5} marginBottom={2}>
			<Button variant="contained" startIcon={<Cancel />}>
				Cancel
			</Button>
			<Button variant="contained" startIcon={<Send />}>
				Submit
			</Button>
		</Box>
	);
};

export default Layout;
