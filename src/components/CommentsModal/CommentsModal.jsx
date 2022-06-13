import React from 'react'
import { useState } from 'react';
import { Drawer } from '@mantine/core';

const CommentsModal = (props) => {
      const { setOpened, opened } = props
      return (
            <div>
                  <Drawer
                        opened={opened}
                        onClose={() => setOpened(false)}
                        title="Comments"
                        padding="xl"
                        position="right"
                        size="xl"
                        styles={{
                              drawer: {
                                    color: 'var(--white)', backgroundColor: "var(--card-background)", fontSize: "18px"
                              },
                              closeButton: { display: "none" },
                              title: { fontWeight: 800, fontSize: "20px" },
                        }}
                  >
                        
                  </Drawer>
            </div>
      )
}

export default CommentsModal