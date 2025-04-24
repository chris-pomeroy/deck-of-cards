import {PanResponder, View} from 'react-native';
import React, {FC, useMemo, useState} from "react";
import {SvgProps} from "react-native-svg";

type Props = {
    Card: FC<SvgProps>;
    onSwipe: () => void;
    zIndex: number;
}

export function Card({Card, onSwipe, zIndex}: Props) {

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
            width: "100%",
            height: "100%",
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            zIndex: zIndex
        }}>
            <Card {...panResponder.panHandlers}
                  width={"90%"}
                  height={"90%"}
                  style={{
                      left: dx,
                      transform: [{rotate: `${dx * 0.03}deg`}],
                  }}
            />
        </View>
    );
}

