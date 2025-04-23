export async function fetchResolvedQueries() {
  const response = await fetch("http://localhost:3000/api/chat");
  const chats = await response.json();
  return chats;
}
