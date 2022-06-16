
import { Drawer, Loader } from '@mantine/core';
import NotificationCard from '../NotificationCard/NotificationCard';
import "./NotificationModal.css"
import { ScrollArea } from '@mantine/core';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const option = {
      offset: 0,
      debounce: 0,
}

const NotificationModal = (props) => {
      const { loading, notifOpen, setNotifOpen, position, size, padding, data, notifHeight, notifFetch, hasMore } = props

      const onBottomFetch = () => {
            let onScroll = true
            notifFetch(onScroll)
      }

      const scrollRef = useBottomScrollListener(onBottomFetch, option);

      return (
            <div>
                  <Drawer
                        opened={notifOpen}
                        onClose={() => setNotifOpen()}
                        title="Notifications"
                        position={position}
                        padding={padding}
                        size={size}
                        overlayOpacity={.6}
                        styles={{
                              drawer: { color: 'var(--white)', backgroundColor: "var(--card-background)" },
                              closeButton: { color: 'var(--white)' },
                              title: { fontWeight: 800 },

                        }}
                  >
                        <ScrollArea viewportRef={scrollRef} style={{ height: notifHeight }} scrollbarSize={19}>
                              {data?.map((notif, key) => {
                                    return <NotificationCard key={key} viewed={notif.viewed} ethAddress={notif.ethAddress} 
                                                setNotifOpen={setNotifOpen} userId={notif.userId} username={notif.username} pfp={notif.pfp}
                                                type={notif.type} classId={notif.classId}/>
                              })}
                              {<div className={'loader-post'}>
                                    <div className='loader-container'>
                                          {!hasMore && !loading && <span>ends here</span>}
                                          {loading && <Loader color={"lime"} size="xl" variant="dots" />}
                                    </div>
                              </div>}
                        </ScrollArea>

                  </Drawer>
            </div>
      )
}

export default NotificationModal