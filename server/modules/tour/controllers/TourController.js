import 'dotenv/config';
import amqplib from 'amqplib';
import { validateTour } from "../../../middleware/validate";

class TourController {
    /***
     * @static
     * @desc Add message to queue
     * @param {object} req express req object
     * @param {object} res express res object
     * @param next
     * */
    static async addEntry(req, res, next) {
        const { error } = validateTour(req.body);
        if (error) return  res.status(400).json(error.details[0].message);

        const { user_name, customer_name, email, title, charges, date, time, phone, reference  } = req.body;

        try {
            // create queue
            const q = 'tour';

            // connect to rabbitmq server
            const conn = await amqplib.connect(process.env.amqplib);

            // create queue channel
            const ch = await conn.createChannel();

            // Ensure queue for messages
            await ch.assertQueue(q, { durable: true });

            // Stringify the messages
            const qm = JSON.stringify({ user_name, customer_name, email, title, charges, date, time, phone, reference });

            // Send to queue
            await ch.sendToQueue(q, Buffer.from(qm, 'utf8'));

            console.log(" [x] Sent %s", qm);

            return res.status(200).json({
                msg: 'Notification received and will be dispatched immediately!'
            })
        } catch (e) {
            return next(e);
        }
    }
}

export default TourController;