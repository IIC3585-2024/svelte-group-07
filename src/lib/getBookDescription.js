import axios from 'axios';

export default async function getBookDescription(bookKey) {
  if (!bookKey) {
    return "No description available"
  }
  try {
    const response = await axios.get(`https://openlibrary.org${bookKey}.json`);
    return response.data.description || "No description available";
  } catch (error) {
    console.error(error);
  }
}