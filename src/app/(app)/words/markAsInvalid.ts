"use server";
import { kv } from "@vercel/kv";

export async function markAsInvalid(word: string) {
	await kv.rpush("invalid", word);
}
