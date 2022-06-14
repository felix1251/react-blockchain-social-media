import React, { useEffect } from 'react'
// import { useState } from 'react';
import { Drawer, ScrollArea } from '@mantine/core';
// import { useMoralis } from 'react-moralis';

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
                              closeButton: { color: "var(--white)" },
                              title: { fontWeight: 800, fontSize: "20px" },
                        }}
                  >
                        <ScrollArea
                              style={{ height: "60vh" }}
                        >
                              <div style={{ width: "100%" }}>
                                    hi
                              </div>
                        </ScrollArea>
                  </Drawer>
            </div>
      )
}

export default CommentsModal