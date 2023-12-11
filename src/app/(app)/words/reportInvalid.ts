"use server";
import { kv } from "@vercel/kv";

export async function reportInvalid(word: string) {
	await kv.rpush("invalid", word);
}
