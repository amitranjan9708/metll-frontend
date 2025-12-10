import { RequestHandler } from "express";
import { z } from "zod";
import { getPrisma } from "../lib/prisma";
import { WaitlistResponse } from "@shared/api";

const waitlistSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  email: z.string().email("Invalid email address"),
  suggestion: z.string().max(1000, "Suggestion is too long").optional(),
});

export const handleWaitlist: RequestHandler = async (req, res) => {
  try {
    // Validate request body
    const validationResult = waitlistSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        error: validationResult.error.errors[0]?.message || "Invalid input",
      } as WaitlistResponse);
    }

    const { name, email, suggestion } = validationResult.data;

    // Get Prisma client (lazy-loaded)
    const prisma = await getPrisma();

    // Check if email already exists
    const existing = await prisma.waitlist.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        error: "This email is already on the waitlist",
      } as WaitlistResponse);
    }

    // Create waitlist entry
    const waitlistEntry = await prisma.waitlist.create({
      data: {
        name,
        email,
        suggestion: suggestion || null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Successfully joined the waitlist!",
      data: {
        id: waitlistEntry.id,
        name: waitlistEntry.name,
        email: waitlistEntry.email,
      },
    } as WaitlistResponse);
  } catch (error) {
    console.error("Error creating waitlist entry:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to join waitlist. Please try again later.",
    } as WaitlistResponse);
  }
};


