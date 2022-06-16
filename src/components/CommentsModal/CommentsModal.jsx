import React  from 'react'
// import { useState } from 'react';
import { Drawer } from '@mantine/core';
import Comments from '../SinglePost/Comments';
// import { useMoralis } from 'react-moralis';

const CommentsModal = (props) => {
      const { opened, modalCommentLoading, postId, modalComment, closeCommentModal, hasMore, scrollRef } = props
      return (
            <div>
                  <Drawer
                        opened={opened}
                        onClose={() => closeCommentModal()}
                        title="Comments"
                        padding="sm"
                        position="right"
                        size="xl"
                        styles={{
                              drawer: {
                                    color: 'var(--white)', backgroundColor: "var(--card-background)", fontSize: "18px"
                              },
                              closeButton: { color: "var(--white)" },
                              title: { fontWeight: 800, fontSize: "20px" },
                        }}
                  >
                        <Comments comments={modalComment} loading={modalCommentLoading} onSinglePage={false} postId={postId} hasMore={hasMore} scrollRef={scrollRef}/>
                  </Drawer>
            </div>
      )
}

export default CommentsModal