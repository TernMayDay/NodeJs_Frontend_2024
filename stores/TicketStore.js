const api = runApi()

export const useTicketStore = defineStore('ticketStore', () => {
  const checkTicket = async (ticketData) => {
    try {
      const response = await api.updateTicket(ticketData)
      return response.data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error checkTicket', error)
      throw error
    }
  }

  return {
    checkTicket
  }
})
