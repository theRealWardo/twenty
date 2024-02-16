import React from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { encode } from 'base-64';
import { getSvgPath } from 'figma-squircle';

import { IconComponent } from '@/ui/display/icon/types/IconComponent';
import { SoonPill } from '@/ui/display/pill/components/SoonPill';

export type ButtonSize = 'medium' | 'small';
export type ButtonPosition = 'standalone' | 'left' | 'middle' | 'right';
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonAccent = 'default' | 'blue' | 'danger';

export type SquircleButtonProps = {
  className?: string;
  Icon?: IconComponent;
  title?: string;
  fullWidth?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  position?: ButtonPosition;
  accent?: ButtonAccent;
  soon?: boolean;
  disabled?: boolean;
  focus?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  width: number;
  height: number;
};

const StyledSquircleButton = styled.button<
  Pick<
    SquircleButtonProps,
    'fullWidth' | 'variant' | 'size' | 'position' | 'accent' | 'focus'
  > & { svgBase64: string }
>`
  align-items: center;
  background: url(${({ svgBase64 }) => svgBase64}) no-repeat top left;
  background-size: contain;
  background-color: ${({ theme }) => theme.color.blue};

  border: none;

  &:hover {
    border: none;
  }
  &:active {
    border: none;
  }

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  flex-direction: row;
  font-family: ${({ theme }) => theme.font.family};
  font-weight: 500;
  gap: ${({ theme }) => theme.spacing(1)};
  height: ${({ size }) => (size === 'small' ? '24px' : '32px')};
  padding: ${({ theme }) => {
    return `0 ${theme.spacing(2)}`;
  }};

  transition: background 0.1s ease;

  white-space: nowrap;

  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  &:focus {
    outline: none;
    border: none;
  }
`;

const StyledSoonPill = styled(SoonPill)`
  margin-left: auto;
`;

export const SquircleButton = ({
  className,
  Icon,
  title,
  fullWidth = false,
  variant = 'primary',
  size = 'medium',
  accent = 'default',
  position = 'standalone',
  soon = false,
  disabled = false,
  focus = false,
  onClick,
  width = 172,
  height = 32,
}: SquircleButtonProps) => {
  const theme = useTheme();

  const fillColor = theme.background.transparent.primary;

  const svgPath = getSvgPath({
    width,
    height,
    cornerRadius: 8, // defaults to 0
    cornerSmoothing: 0.8, // cornerSmoothing goes from 0 to 1
  });

  const svgText = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><path d="${svgPath}" fill="${fillColor}" /></svg>`;

  const backgroundImageEncoded = encode(svgText);

  const base64SVG = `data:image/svg+xml;base64,${backgroundImageEncoded}`;

  return (
    <StyledSquircleButton
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      position={position}
      disabled={soon || disabled}
      focus={focus}
      accent={accent}
      className={className}
      onClick={onClick}
      svgBase64={base64SVG}
    >
      {Icon && <Icon size={theme.icon.size.sm} />}
      {title}
      {soon && <StyledSoonPill />}
    </StyledSquircleButton>
  );
};
