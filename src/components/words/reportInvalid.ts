"use server";
import { kv } from "@vercel/kv";

export async function reportInvalid(word: string): Promise<void> {
	await kv.rpush("invalid", word);
}
