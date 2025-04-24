import {PanResponder, View} from 'react-native';
import React, {FC, useMemo, useState} from "react";
import {SvgProps} from "react-native-svg";

type Props = {
    Svg: FC<SvgProps>;
    onSwipe: () => void;
    zIndex: number;
}

export function Card({Svg, onSwipe, zIndex}: Props) {

    const DX_THRESHOLD = 100;

    const [dx, setDx] = useState(0);

    const panResponder = useMemo(() => PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => setDx(gestureState.dx),
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx > DX_THRESHOLD) {
                onSwipe()
            }
            if (gestureState.dx < -DX_THRESHOLD) {
                onSwipe()
            }
            setDx(0)
        }
    }), []);

    return (
        <View style={{
            width: "80%",
            aspectRatio: 0.688544052,
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            zIndex: zIndex
        }}>
            <Svg {...panResponder.panHandlers}
                  width={"100%"}
                  height={"100%"}
                 preserveAspectRatio="none"
                  style={{
                      left: dx,
                      transform: [{rotate: `${dx * 0.03}deg`}],
                  }}
            />
        </View>
    );
}

