import { RequestHandler } from "express";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const waitlistSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    suggestion: z.string().optional(),
});

export const handleJoinWaitlist: RequestHandler = async (req, res) => {
    try {
        const { name, email, suggestion } = waitlistSchema.parse(req.body);

        const existingUser = await prisma.waitlist.findUnique({
            where: { email },
        });

        if (existingUser) {
            res.status(409).json({ message: "You are already on the waitlist!" });
            return;
        }

        const entry = await prisma.waitlist.create({
            data: {
                name,
                email,
                suggestion: suggestion || null,
            },
        });

        res.status(201).json({ message: "Successfully joined the waitlist!", id: entry.id });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: error.errors[0].message });
            return;
        }
        console.error("Waitlist error:", error);
        res.status(500).json({ message: "Something went wrong. Please try again." });
    }
};
