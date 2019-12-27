import React from 'react';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../Theme';

const {
  smallIconSize,
  iconSize,
  largeIconSize,
  hugeIconSize,
} = Theme.specifications;

const {primary: primaryColor} = Theme.colors;
const {
  lightest: lightestColor,
  lighter: lighterColor,
  light: lightColor,
  darkest: darkestColor,
} = Theme.gray;
const {tiny} = Theme.spacing;

// ------------------------------------------------------
// Header
// ------------------------------------------------------
export const getHeaderBackIcon = () => (
  <IconEntypo
    name="chevron-left"
    color={lightestColor}
    size={iconSize}
    style={{padding: Theme.spacing.tiny}}
  />
);

// ------------------------------------------------------
// Routes
// ------------------------------------------------------
export const getNavbarBrowseIcon = ({tintColor}) => (
  <IconEntypo name="home" color={tintColor} size={iconSize * 0.9} />
);

export const getNavbarExploreIcon = ({tintColor}) => (
  <IconMaterialIcons
    name="photo-library"
    color={tintColor}
    size={iconSize * 0.9}
  />
);

export const getNavbarLibraryIcon = ({tintColor}) => (
  <IconEntypo name="folder-video" color={tintColor} size={iconSize * 0.85} />
);

// ------------------------------------------------------
// SearchInput
// ------------------------------------------------------
export const getSearchInputBackIcon = ({style}) => (
  <IconEntypo
    name="chevron-thin-left"
    size={smallIconSize}
    color={darkestColor}
    style={style}
  />
);

export const getSearchInputLabelIcon = () => (
  <IconFeather
    name="search"
    color={darkestColor}
    size={smallIconSize * 1.1}
    style={{paddingHorizontal: tiny}}
  />
);

export const getSearchInputCloseIcon = () => (
  <IconAntDesign name="close" color={darkestColor} size={smallIconSize * 1.2} />
);
