export const AMBASSADOR_END_DATE = new Date('2026-10-24T23:59:59+05:30');

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  totalDays: number;
}

export function getTimeRemaining(): TimeRemaining | null {
  const now = new Date();
  const diff = AMBASSADOR_END_DATE.getTime() - now.getTime();
  if (diff <= 0) return null;

  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    totalMs: diff,
    totalDays,
  };
}

export function isProgramActive(): boolean {
  return new Date() < AMBASSADOR_END_DATE;
}

export type UrgencyLevel = 'normal' | 'high' | 'critical';

export function getUrgencyLevel(): UrgencyLevel {
  const remaining = getTimeRemaining();
  if (!remaining) return 'critical';
  if (remaining.totalDays <= 7) return 'critical';
  if (remaining.totalDays <= 30) return 'high';
  return 'normal';
}

export function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export function getShareMessage(referralCode: string, daysLeft: number): string {
  const urgency =
    daysLeft <= 7
      ? `⚠️ Only ${daysLeft} days left — this offer ends soon!`
      : daysLeft <= 30
      ? `🔥 Only ${daysLeft} days left!`
      : `⏳ Offer ends in ${daysLeft} days.`;

  return (
    `😳 Someone on Metll may have already confessed to you anonymously...\n\n` +
    `Metll is an anonymous confession app — join before Oct 24 to find out who! 💌\n\n` +
    `${urgency}\n\n` +
    `Download & use my code to join FREE: ${referralCode}\n` +
    `(After Oct 24, key features become paid 🔒)`
  );
}
