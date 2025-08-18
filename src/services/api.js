// src/services/api.js
export const sendMessageToBot = async (userMessage) => {
  // Mock delay to feel like a real API call
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Simple fake responses
  const responses = [
    "Your report has been recorded anonymously. Thank you for your courage.",
    "We will forward your complaint to the concerned department.",
    "Can you please provide the location of the incident?",
    "All data is stored securely and anonymously."
  ];

  // Return a random response
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};