import React, { useState } from 'react';
import { 
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';

function FeedbackForm({ send }) {
  const [ fname, setFname ] = useState('')
  const [ lname, setLname ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ company, setCompany ] = useState('')
  const [ postcode, setPostcode ] = useState('')
  const [ priority, setPriority ] = useState(1)
  const [ feedback, setFeedback ] = useState('')

  function isValidEmail(email) {
    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
  }

  function isValidPhone(phone) {
    return /^[0-9]{11}$/.test(phone);
  }
  
  function isValidPostcode(postcode) {
    return /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/.test(postcode);
  }

  function allIsValid() {
    return fname && lname && email && isValidEmail(email) && phone && isValidPhone(phone) && postcode && isValidPostcode(postcode) && feedback
  }

  function preventEventAndSend(e) {
    e.preventDefault()
    send()
  }

  return (
    <form method="POST">
      <Grid container spacing={3} className="feedback-form">
        <Grid item xs={12}>
          <Typography component="paragraph" variant="subtitle1" color="textSecondary">Fields marked as * are required.</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            className="feedback-form__first-name"
            margin="normal"
            required
            fullWidth
            id="firstname"
            name="firstname"
            label="First name"
            onChange={(e) => setFname(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            className="feedback-form__last-name"
            margin="normal"
            required
            fullWidth
            id="lastname"
            name="lastname"
            label="Last name"
            onChange={(e) => setLname(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            className="feedback-form__email"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            error={!!email && !isValidEmail(email)}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            className="feedback-form__phone"
            margin="normal"
            required
            fullWidth
            id="phone"
            name="phone"
            label="Phone Number"
            error={!!phone && !isValidPhone(phone)}
            onChange={(e) => setPhone(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            className="feedback-form__company"
            margin="normal"
            fullWidth
            id="company"
            name="company"
            label="Company"
            onChange={(e) => setCompany(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            className="feedback-form__postcode"
            margin="normal"
            fullWidth
            required
            id="postcode"
            name="postcode"
            label="Postcode"
            error={!!postcode && !isValidPostcode(postcode)}
            onChange={(e) => setPostcode(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl 
            className="feedback-form__priority"
            fullWidth 
            id="postcode"
            name="postcode"
            margin="normal"
            onChange={(e) => setPriority(e.target.value)}
            >
            <InputLabel htmlFor="priority">Priority</InputLabel>
            <Select
              native
              >
              <option value={1}>Normal</option>
              <option value={2}>High</option>
              <option value={3}>Urgent</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField 
            className="feedback-form__feedback"
            margin="normal"
            fullWidth
            multiline
            required
            id="feedback"
            name="feedback"
            label="Your Feedback"
            rows="4"
            defaultValue="Dear Sir/Madam..."
            onChange={(e) => setFeedback(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            className="feedback-form__submit"
            type="submit"
            fullWidth
            id="submit"
            name="submit"
            variant="contained"
            color="primary"
            onClick={(e) => preventEventAndSend(e)}
            disabled={!allIsValid()}
          >
            Send Feedback
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default FeedbackForm;