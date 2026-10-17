export default function validateHtmlId(inHtmlId) {
    const localHtmlId = inHtmlId;

    if (typeof localHtmlId !== "string" || !localHtmlId.trim()) {
        throw new TypeError("targetHtmlId must be a non-empty string");
    }

    return true;
}
