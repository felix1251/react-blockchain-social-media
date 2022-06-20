import { Modal, useMantineTheme } from "@mantine/core";
import PostShare from "../PostShare/PostShare.jsx";
import './PostModal.css'

function ShareModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={ theme.colors.dark[9]}
      overlayOpacity={0.55}
      overlayBlur={3}
      transition="fade"
      trapFocus={false}
      classNames={{ modal: 'Post-Modal'}}
      transitionDuration={300}
      transitionTimingFunction="ease"
      opened={modalOpened}
      title="Create Post"
      onClose={() => setModalOpened(false)}
    >
    <PostShare setModalOpened={setModalOpened}/>
    </Modal>
  );
}

export default ShareModal;
