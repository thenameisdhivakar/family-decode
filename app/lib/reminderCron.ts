import cron from "node-cron";
import twilio from "twilio";

import { connectDB } from "./mongodb";
import Event from "../models/Calendar";

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
);

console.log("WhatsApp Reminder Cron Started");

cron.schedule("* * * * *", async () => {
    try {
        console.log("Checking events...");

        await connectDB();

        const events = await Event.find({
            reminder: false,
        });

        // INDIA TIME
        const now = new Date(
            new Date().toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
            })
        );

        for (const event of events) {
            // SPLIT DATE
            const [year, month, day] =
                event.date
                    .split("-")
                    .map(Number);

            // SPLIT TIME
            const [hours, minutes] =
                event.time
                    .split(":")
                    .map(Number);

            // CREATE EVENT DATE
            const eventDateTime = new Date(
                year,
                month - 1,
                day,
                hours,
                minutes
            );

            // DIFFERENCE IN MINUTES
            const diffMinutes =
                (eventDateTime.getTime() -
                    now.getTime()) /
                (1000 * 60);

            console.log(
                event.title,
                "Remaining Minutes:",
                diffMinutes
            );

            // SEND BEFORE 2 MINUTES
            if (
                diffMinutes <= 2 &&
                diffMinutes > 0
            ) {
                console.log(
                    "Sending WhatsApp Reminder..."
                );

                const message =
                    await client.messages.create({
                        body: `⏰ Reminder: ${event.title} starts in 2 minutes at ${event.time}`,
                        from:
                            process.env
                                .TWILIO_WHATSAPP_NUMBER!,
                        to: `whatsapp:${event.phone}`,
                    });

                console.log(
                    "WhatsApp Sent:",
                    message.sid
                );

                // UPDATE REMINDER STATUS
                await Event.findByIdAndUpdate(
                    event._id,
                    {
                        reminder: true,
                    }
                );
            }
        }
    } catch (error) {
        console.log(
            "Reminder Error:",
            error
        );
    }
});