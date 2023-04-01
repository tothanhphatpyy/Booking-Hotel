import React from 'react';
import {IconSvgType} from './type';
import download from './asset/download.svg';
import upload from './asset/upload.svg';
import buy_sell from './asset/buy_sell.svg';
import {Container} from '../Container';
import {SvgXml} from 'react-native-svg';

interface IconSvgProps {
  name: IconSvgType;
  color?: any;
  size?: number;
  width?: number;
  height?: number;
}

const IconSvg: React.FC<IconSvgProps> = ({name, size = 30, width, height}) => {
  const renderIcon = () => {
    switch (name) {
      case 'buy_sell':
        return (
          <Container width={size} height={size}>
            <SvgXml width={width} height={height} xml={buy_sell} />
          </Container>
        );
      case 'upload':
        return (
          <Container width={size} height={size}>
            <SvgXml width={width} height={height} xml={upload} />
          </Container>
        );
      case 'download':
        return (
          <Container width={size} height={size}>
            <SvgXml width={width} height={height} xml={download} />
          </Container>
        );
      default:
        return null;
    }
  };

  return <>{renderIcon()}</>;
};

export {IconSvg};
