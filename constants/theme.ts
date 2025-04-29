import {scale, verticalScale} from "@/utils/styling";

export const Colors = {
    primary: "#A3E635",
    primaryLight: "#B9EF5C",
    primaryDark: "#83B82B",
    // primaryLight: "#0EA5E9",
    // primaryDark: "#0369A1",
    text: "#FFF",
    textLight: "#E5E5E5",
    textLighter: "#D4D4D4",
    white: "#FFF",
    black: "#000",
    rose: "#EF4444",
    green: "#16A34A",
    neutral50: "#FAFAFA",
    neutral100: "#F5F5F5",
    neutral200: "#E5E5E5",
    neutral300: "#D4D4D4",
    neutral350: "#CCCCCC",
    neutral400: "#A3A3A3",
    neutral500: "#737373",
    neutral600: "#525252",
    neutral700: "#404040",
    neutral800: "#262626",
    neutral900: "#171717",
};

export const spacingX = {
    _3: scale(3),
    _5: scale(5),
    _7: scale(7),
    _10: scale(10),
    _12: scale(12),
    _15: scale(15),
    _20: scale(20),
    _25: scale(25),
    _30: scale(30),
    _35: scale(35),
    _40: scale(40),
};

export const spacingY = {
    _5: verticalScale(5),
    _7: verticalScale(7),
    _10: verticalScale(10),
    _12: verticalScale(12),
    _15: verticalScale(15),
    _17: verticalScale(17),
    _20: verticalScale(20),
    _25: verticalScale(25),
    _30: verticalScale(30),
    _35: verticalScale(35),
    _40: verticalScale(40),
    _50: verticalScale(50),
    _60: verticalScale(60),
};

export const radius = {
    _3: verticalScale(3),
    _6: verticalScale(6),
    _10: verticalScale(10),
    _12: verticalScale(12),
    _15: verticalScale(15),
    _17: verticalScale(17),
    _20: verticalScale(20),
    _30: verticalScale(30),
};
