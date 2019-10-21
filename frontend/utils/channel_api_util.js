export function fetchSubscribedChannels(channel){
    return $.ajax({
      method: "get",
      url: "/api/channels",
      data: {
        channel
      }
    })
  }

  export function addChannel(channel){
    return $.ajax({
      method: "post",
      url: "/api/channels",
      data: {
        channel
      }
    })
  }

  export function addUserToChannel(channel){
    // console.log(`/api/channels/${channel.channel_id}/add_user`)
    return $.ajax({
      method: "post",
      url: `/api/channels/${channel.channel_id}/add_user`,
      data: {
        channel
      }
    })
  }

  // window.addUserToChannel = addUserToChannel
  // window.fetchSubscribedChannels = fetchSubscribedChannels
  // window.addChannel = addChannel

