import Svg from "react-native-svg";
import { LightModeLogo } from "./lightModeLogo";
import { DarkModeLogo } from "./darkModeLogo";

type LogoProps = {
  color: "light" | "dark";
};

export default function Logo({ color }: LogoProps) {
  const logoWidth = 180;
  const logoHeight = 60;

  return (
    <Svg width={logoWidth} height={logoHeight} fill="none" viewBox="0 0 160 60">
      {color === "dark" ? <DarkModeLogo /> : <LightModeLogo />}
    </Svg>
  );
}
