/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
import { createStyles, MantineTheme } from '@mantine/core';
import { colors } from '../../config/colors.config';

export const getRootStyles = (theme: MantineTheme): React.CSSProperties => ({
  borderColor: colors.primary,
});

export const getSuccessRootStyles = (theme: MantineTheme): React.CSSProperties => ({
  borderColor: colors.success,
  borderWidth: 2,
  borderStyle: 'dashed',
  padding: theme.spacing.md,
  borderRadius: 4,
  position: 'relative',
});

export const getIconStyles = (theme) => ({
  height: 70,
});

export const getCheckIconStyles = (theme) => ({
  height: 60,
  backgroundColor: colors.success,
  borderRadius: '50%',
  color: 'white',
  display: 'block',
});

export default createStyles((theme: MantineTheme, params, getRef): Record<string, any> => {
  return {
    icon: getIconStyles(theme),
    successRoot: getSuccessRootStyles(theme),
    root: getRootStyles(theme),
    checkIcon: getCheckIconStyles(theme),
  };
});
