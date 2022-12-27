import Container from '@components/Container';
import { Flex, Text } from '@mantine/core';
import useStyles from './Styles';

const Footer = () => {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Container className={classes.container}>
        <Text size="md">Copyright © {new Date().getFullYear()} · All Rights Reserved by Impler</Text>
        <Flex gap="xs">
          <Text>
            <a href="#" className={classes.link}>
              Terms of Use
            </a>
          </Text>
          <Text>|</Text>
          <Text>
            <a href="#" className={classes.link}>
              Privacy Policy
            </a>
          </Text>
        </Flex>
      </Container>
    </footer>
  );
};

export default Footer;
