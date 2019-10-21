import React from 'react';
import ChannelList from './channel_list'
import ChatList from './chat_list'
import SidebarHeader from './sidebar_header'

export default function Sidebar(
    {createChat, preseneChange, logout, 
        addChannel,  chatChannels, channelList, 
        users, currentWorkspace, 
         receiveMessage, currentUser, isAdmin,
        receiveComment, receivePost, changePost, history, notifications}){
    return(
        <section className="sidebar">

            <SidebarHeader
                currentWorkspace={currentWorkspace}
                currentUser={currentUser}
                logout={logout}
            />

            <ChannelList
                currentWorkspace={currentWorkspace}
                isAdmin={isAdmin}
                addChannel={addChannel}
                channelList={channelList}
                currentWorkspace={currentWorkspace}
                receiveComment={receiveComment} 
                receivePost={receivePost} 
                changePost={changePost}
                notifications={notifications.posts}
            />

            <ChatList
                currentWorkspace={currentWorkspace}
                receiveMessage={receiveMessage}
                users={users}
                chatChannels={chatChannels}
                preseneChange={preseneChange}
                createChat={createChat}
                currentUser={currentUser}
                history={history}
                notifications={notifications.messages}
            />
        </section>
    )
}

