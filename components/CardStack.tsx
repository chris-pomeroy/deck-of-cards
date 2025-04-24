import * as CardImages from '../assets/cards';
import CardBack from '../assets/cards/back.svg'
import BackIcon from '../assets/icons/back.svg';
import RewindIcon from '../assets/icons/rewind.svg';
import {SafeAreaView, TouchableOpacity, View} from "react-native";
import {FC, useState} from "react";
import {Card} from "@/components/Card";
import {SvgProps} from "react-native-svg";
import {Colors} from "@/constants/Colors";

const CARDS_TO_RENDER = 5

function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default function CardStack() {

    const [cardNames] = useState<string[]>(() => shuffleArray(Object.keys(CardImages)))
    const [currentCard, setCurrentCard] = useState(0)

    const cardMap = CardImages as Record<string, FC<SvgProps>>

    return (
        <SafeAreaView style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.dark.background
        }}>
            {cardNames.slice(currentCard, currentCard + CARDS_TO_RENDER).map((cardName, index) => (
                <Card
                    Svg={cardMap[cardName]}
                    onSwipe={() => setCurrentCard(prev => prev + 1)}
                    zIndex={CARDS_TO_RENDER - index}
                    key={cardName}
                />
            ))}
            <View style={{
                position: "absolute",
                bottom: 50,
                flexDirection: "row",
                display: currentCard > 0 ? "flex" : "none"
            }}>
                <TouchableOpacity
                    style={{
                        zIndex: CARDS_TO_RENDER + 1,
                    }}
                    onPress={() => setCurrentCard(0)}>
                    <RewindIcon
                        width={100}
                        height={100}
                        style={{
                            marginRight: 20
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setCurrentCard(prev => prev - 1)}>
                    <BackIcon
                        width={100}
                        height={100}
                        style={{
                            marginRight: 20
                        }}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}