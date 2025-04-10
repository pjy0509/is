// (?:\uD83C\uDFF4[\uDB40\uDC61-\uDB40\uDC7A]*\uDB40\uDC7F)
// Matches flag tag sequences:
//  - \uD83C\uDFF4: The base code point for the flag emoji.
//  - [\uDB40\uDC61-\uDB40\uDC7A]*: Zero or more tag characters ranging from U+E0061 to U+E007A.
//  - \uDB40\uDC7F: The tag termination character U+E007F.
// This part matches sequences where a flag emoji is followed by multiple tag characters, ending with a tag termination character.
//
// [\u0030-\u0039\u0023\u002A][\uFE00-\uFE0F]?\u20E3
// Matches keycap emojis:
//  - [\u0030-\u0039\u0023\u002A]: A digit (0-9), hash (#), or asterisk (*) character.
//  - [\uFE00-\uFE0F]?: Optionally followed by Variation Selector-16 (U+FE0F).
//  - \u20E3: Followed by the keycap combining character (U+20E3).
// This part matches patterns where a digit, hash, or asterisk is optionally followed by Variation Selector-16 and then the keycap combining character.
//
// (?:[\p{Extended_Pictographic}\p{Emoji_Presentation}][\uFE00-\uFE0F]?(?:\u200D[\p{Extended_Pictographic}\p{Emoji_Presentation}][\uFE00-\uFE0F]?)?)+
// Matches general and gesture emojis:
//  - [\p{Extended_Pictographic}\p{Emoji_Presentation}]: An extended pictographic character or an emoji presentation character.
//  - [\uFE00-\uFE0F]?: Optionally followed by Variation Selector-16 (U+FE0F).
//  - (?:\u200D[\p{Extended_Pictographic}\p{Emoji_Presentation}][\uFE00-\uFE0F]?)?: Optionally followed by a Zero Width Joiner (U+200D) and another extended pictographic or emoji presentation character, which may also be followed by Variation Selector-16.
// This part matches single emojis or sequences of emojis joined by Zero Width Joiners, allowing for complex emoji compositions.

export function $emoji(x: string): boolean {
    return /^(?:\uD83C\uDFF4[\uDB40\uDC61\uDB40\uDC62\uDB40\uDC63\uDB40\uDC64\uDB40\uDC65\uDB40\uDC66\uDB40\uDC67\uDB40\uDC68\uDB40\uDC69\uDB40\uDC6A\uDB40\uDC6B\uDB40\uDC6C\uDB40\uDC6D\uDB40\uDC6E\uDB40\uDC6F\uDB40\uDC70\uDB40\uDC71\uDB40\uDC72\uDB40\uDC73\uDB40\uDC74\uDB40\uDC75\uDB40\uDC76\uDB40\uDC77\uDB40\uDC78\uDB40\uDC79\uDB40\uDC7A]*\uDB40\uDC7F|[\u0030-\u0039\u0023\u002A][\uFE00-\uFE0F]?\u20E3|(?:[\p{Extended_Pictographic}\p{Emoji_Presentation}][\uFE00-\uFE0F]?(?:\u200D[\p{Extended_Pictographic}\p{Emoji_Presentation}][\uFE00-\uFE0F]?)?)+)$/u.test(x);
}