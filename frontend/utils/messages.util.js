export const fetchAllMessages = (message) => {
  return $.ajax({
      method: 'GET',
      url: '/api/messages',
      data: {message}
    })
}

  export const sendMessage = (message) => (
    $.ajax({
      method: 'POST',
      url: '/api/messages',
      data: {
          message
      }
    })
  );  

  export function createChat(message){
    return $.ajax({
      method: 'POST',
      url: '/api/create_chat',
      data: {
        message
      }
    })   
  }


window.fetchAllMessages = fetchAllMessages
window.sendMessage = sendMessage