import mongoose from 'mongoose';

export default function connectToDatabase(databaseUrl: string) {
	mongoose
		.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => console.log('Succesfully connected to database.'))
		.catch((err) => console.log('Could not connect to database.', err));
}
