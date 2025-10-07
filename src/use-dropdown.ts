import { useCallback, useMemo, useState } from 'react';
import {
  Keyboard,
  LayoutChangeEvent,
  LayoutRectangle,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';

function useDropdown(maxMenuHeight?: number, maxHeightFraction: number = 2.5) {
  const [enable, setEnable] = useState(false);
  const { height } = useWindowDimensions();
  const finalMenuHeight = maxMenuHeight ?? height / maxHeightFraction;

  const [dropdownLayout, setDropdownLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });

  const toggleMenu = useCallback(() => {
    Keyboard.dismiss();

    setEnable((prev) => {
      // If opening and layout not measured yet, wait for measurement
      if (!prev && dropdownLayout.width === 0) {
        // Use a single RAF with a small delay to ensure layout is measured
        setTimeout(() => {
          requestAnimationFrame(() => {
            setEnable(true);
          });
        }, 0);
        return false;
      }
      return !prev;
    });
  }, [dropdownLayout.width]);

  const onLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      setDropdownLayout(layout);
    },
    []
  );

  const menuStyle: ViewStyle = useMemo(() => {
    const style: ViewStyle = {};
    if (dropdownLayout.width > 0) {
      style.width = dropdownLayout.width;
    }
    // Ensure menu is positioned correctly from the start
    style.minWidth =
      dropdownLayout.width > 0 ? dropdownLayout.width : undefined;
    return style;
  }, [dropdownLayout.width]);

  const defaultListStyle: ViewStyle = useMemo(
    () => ({
      maxHeight: finalMenuHeight,
    }),
    [finalMenuHeight]
  );

  return {
    enable,
    setEnable,
    toggleMenu,
    onLayout,
    menuStyle,
    defaultListStyle,
    dropdownLayout,
  };
}

export default useDropdown;
