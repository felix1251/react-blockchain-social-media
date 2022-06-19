import { Modal, useMantineTheme } from "@mantine/core";
import LogoSearch from "../LogoSearch/LogoSearch";
import './SearchModal.css'

function SearchModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();
  return (
    <Modal
      overlayColor={ theme.colors.dark[9]}
      overlayOpacity={0.55}
      overlayBlur={3}
      transition="fade"
      classNames={{ modal: 'Search-Modal'}}
      transitionDuration={300}
      transitionTimingFunction="ease"
      opened={modalOpened}
      title="Search..."
      onClose={() => setModalOpened(false)}
    >
      <LogoSearch onModal={true} setModalOpened={setModalOpened}/>
    </Modal>
  );
}

export default SearchModal;
