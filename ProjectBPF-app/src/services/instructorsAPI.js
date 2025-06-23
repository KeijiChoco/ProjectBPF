import axios from 'axios'

const API_URL = "https://https://spfuxcghnwehwzejxieg.supabase.co/rest/v1/instructors"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwZnV4Y2dobndlaHd6ZWp4aWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzOTM4NzUsImV4cCI6MjA2NTk2OTg3NX0.E4HskffLXUw4MqhXofh5FLM3HwjNdMe4t8yeKF2FE00"

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
}

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(API_URL, { headers })
        return response.data
    },

    async createNote(data) {
        const response = await axios.post(API_URL, data, { headers })
        return response.data
    }
}