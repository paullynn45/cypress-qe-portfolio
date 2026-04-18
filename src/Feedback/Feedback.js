import React, { useState } from 'react';
import { 
  Container, 
  CssBaseline, 
  Typography
} from '@material-ui/core';

import FeedbackForm from '../FeedbackForm';

function Feedback() {
  const [ sent, setSent ] = useState(false)

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography component="h1" variant="h5" gutterBottom={true}>Feedback Form</Typography>
      {
        sent 
          ? <Typography component="h2" variant="h6" className="feedback__sent">Thank you for your feedback</Typography>
          : <FeedbackForm send={() => setSent(true)}/>
      }
    </Container>
  );
}

export default Feedback;