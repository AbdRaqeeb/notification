import express from 'express';
import 'dotenv/config';
import { error } from "./middleware/error";
import inquirySubscriber from './modules/inquiry/dispatcher/inquirySubscriber';
import tourSubscriber from './modules/tour/dispatcher/tourSubscriber';
import verifySubscriber from './modules/verify/dispatcher/verifySubscriber';

const app = express();

//Initiate middleware
app.use(express.json({ extended: false }));

//import routes
import VerifyRoutes from './modules/verify/routes/VerifyRoutes';
import TourRoutes from './modules/tour/routes/TourRoutes';
import InquiryRoutes from './modules/inquiry/routes/InquiryRoutes';


app.use('/api/v1/notification/verify', VerifyRoutes);
app.use('/api/v1/notification/tour', TourRoutes);
app.use('/api/v1/notification/inquiry', InquiryRoutes);

app.get('/', (req, res) => {
   res.status(200).send('Welcome to the notification service');
});

// consume messages from rabbitmq queue
inquirySubscriber();
tourSubscriber();
verifySubscriber();

app.use(error);

const PORT= process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log(`Notification service server running on port ${PORT}`);
});

