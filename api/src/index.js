import 'dotenv/config';

import app from './app.js';

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`BrewBuddy API running on http://localhost:${PORT}`);
});
