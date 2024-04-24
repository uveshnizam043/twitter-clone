function extractUsername(email) {
    // Split the email address at the "@" symbol
    const parts = email.split("@");
    // Return the part before the "@" symbol
    return parts[0];
}
export { extractUsername }